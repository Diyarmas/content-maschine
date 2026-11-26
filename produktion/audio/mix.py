import json,re,subprocess,sys
# usage: mix.py video voicedir out 'events-json'  events: [[sfx, sentenceIdx, offset, vol],...]
V,D,O,EV=sys.argv[1],sys.argv[2],sys.argv[3],json.loads(sys.argv[4])
M='/home/claude/m9'
w=json.load(open(D+'/words.json'))['words'];S=[];cur=[]
for x in w:
    cur.append(x)
    if re.search(r'[.?!:]$',x['w']):S.append(cur[0]['s']);cur=[]
ins=['-i',D+'/voice_tight.wav'];fc=[];lab=[]
for i,(n,k,off,v) in enumerate(EV):
    t=max(0,S[k]+off);ins+=['-i',f'{M}/sfx/{n}.mp3'];ms=int(t*1000)
    fc.append(f'[{i+1}:a]adelay={ms}|{ms},volume={v}[e{i}]');lab.append(f'[e{i}]')
f=';'.join(fc)+f';{"".join(lab)}amix=inputs={len(EV)}:duration=longest:normalize=0[sx];[0:a]highpass=f=70,acompressor=threshold=-18dB:ratio=3,loudnorm=I=-14:TP=-1.5,apad,asplit=2[v][vs];[sx][vs]sidechaincompress=threshold=0.05:ratio=6[sc];[v][sc]amix=inputs=2:duration=first:normalize=0,alimiter=limit=.95[m]'
Dd=subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',V]).decode().strip()
subprocess.check_call(['ffmpeg','-y','-v','error']+ins+['-filter_complex',f,'-map','[m]','-t',Dd,'-c:a','aac','-b:a','192k','/tmp/mix.m4a'])
subprocess.check_call(['ffmpeg','-y','-v','error','-i',V,'-i','/tmp/mix.m4a','-c:v','copy','-c:a','copy','-shortest',O])
print(O,Dd,len(S))
