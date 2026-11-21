import json,subprocess,re,sys
TEMPO=float(sys.argv[1]) if len(sys.argv)>1 else 1.12
MAXGAP=0.24; DRAMA=0.8
a=json.load(open('align.json'));c=a['characters'];s=a['character_start_times_seconds'];e=a['character_end_times_seconds']
txt=''.join(c)
# drop tags from timing view: find indices of characters inside [...] 
intag=[False]*len(c);d=0
for i,ch in enumerate(c):
    if ch=='[':d=1
    intag[i]=bool(d)
    if ch==']':d=0
CUT=[]
for ph in CUT:
    p=txt.find(ph); assert p>=0, ph
    for i in range(p,p+len(ph)): intag[i]=True
# dramatic pause positions: before lines that start with [pause] and after the hook
drama_markers=['But one of','And there are','Here\'s the situation','No talking','Who can know','Write your','Five.','Four.','Three.','Two.','One.','The solution','Would you','And here']
drama_idx=set(txt.find(m) for m in drama_markers)
# speech chars (not tags, not whitespace)
idx=[i for i in range(len(c)) if not intag[i] and not c[i].isspace()]
keep=[];cur=[s[idx[0]],e[idx[0]]]
for a_,b_ in zip(idx,idx[1:]):
    gap=s[b_]-e[a_]
    lim=MAXGAP
    # find if a dramatic marker starts between a_ and b_
    if any(a_<m<=b_ for m in drama_idx): lim=DRAMA
    if gap>lim:
        keep.append((cur[0],cur[1]+lim/2)); cur=[s[b_]-lim/2,e[b_]]
    else: cur[1]=e[b_]
keep.append((cur[0],cur[1]+0.3))
keep[0]=(max(0,keep[0][0]-0.05),keep[0][1])
# time map
def remap(t):
    acc=0
    for k0,k1 in keep:
        if t<k0: return acc/TEMPO
        if t<=k1: return (acc+t-k0)/TEMPO
        acc+=k1-k0
    return acc/TEMPO
total=sum(k1-k0 for k0,k1 in keep)/TEMPO
# words with remapped times
words=[];i=0
for m in re.finditer(r'\S+',txt):
    if m.group().startswith('[') or m.group().endswith(']'): continue
    a0,a1=m.start(),m.end()-1
    if intag[a0]: continue
    words.append({'w':m.group(),'s':round(remap(s[a0]),3),'e':round(remap(e[a1]),3)})
json.dump({'words':words,'duration':round(total,2)},open('words.json','w'),ensure_ascii=False)
# build ffmpeg filter
f=''.join(f'[0]atrim={k0:.3f}:{k1:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.01,afade=t=out:st={max(0,k1-k0-0.015):.3f}:d=0.015[a{i}];' for i,(k0,k1) in enumerate(keep))
f+=''.join(f'[a{i}]' for i in range(len(keep)))+f'concat=n={len(keep)}:v=0:a=1,atempo={TEMPO}[o]'
open('f.txt','w').write(f)
subprocess.run(['ffmpeg','-v','error','-y','-i','voice.mp3','-filter_complex_script','f.txt','-map','[o]','-ar','44100','voice_tight.wav'],check=True)
print('segments',len(keep),'duration',round(total,1))
