import numpy as np, wave, json, re, sys
lang=sys.argv[1]; SR=44100
w=json.load(open(f'/home/claude/m7/{lang}/words.json')); ws=w['words']; dur=w['duration']+2.0
S=[];cur=[]
for x in ws:
    cur.append(x)
    if re.search(r'[.?!:]$',x['w']): S.append((cur[0]['s'],cur[-1]['e']));cur=[]
s=lambda k:S[k][0]
e=lambda k:S[k][1]
y=np.zeros(int(dur*SR)+SR); rng=np.random.default_rng(5)
def add(t,a,g=1.0):
    i=max(0,int(t*SR)); a=a*g; y[i:i+len(a)]+=a[:len(y)-i]
def tone(f,d,dec=10,g=1):
    x=np.arange(int(d*SR))/SR; return np.sin(2*np.pi*f*x)*np.exp(-dec*x)*g
def noise(d): return rng.standard_normal(int(d*SR))
def lp(a,k): return np.convolve(a,np.ones(k)/k,'same')
def whoosh(d=.45): n=lp(noise(d),50); x=np.linspace(0,1,len(n)); return n*np.sin(np.pi*x)**2*.9
def step(): return lp(noise(.08),40)*np.exp(-np.arange(int(.08*SR))/SR*40)*4
def whoosh2(): return whoosh()
for k in (0,1,2,4,5,7,8,9,19,20,21,22): add(s(k),whoosh(),.45)
a3=s(3); b3=e(3); per=(b3-a3-1)/5
for i in range(5): add(a3+.6+i*per,tone(1320,.12,25)*.8+tone(1980,.12,30)*.3,.6)
add(s(4),tone(110,.5,6)*1.1+lp(noise(.5),40)*.5,.7)
for i in range(6): add(s(6)+i*.17,tone(900 if i%2==0 else 650,.16,6)*1.0,.55)
# Ziffern der Loesung
ws18=[];c2=[];k=0
for x in ws:
    c2.append(x)
    if re.search(r'[.?!:]$',x['w']):
        if k==18: ws18=c2
        c2=[];k+=1
for x in ws18[-6:]: add(x['s'],tone(1320,.12,25)*.9+tone(1980,.12,30)*.3,.6)
add(ws18[-1]['e']+.2,tone(70,.5,6)*1.4+lp(noise(.5),30)*.6,.9)   # Riegel
add(ws18[-1]['e']+.7,np.concatenate([tone(f,.35,6) for f in (523,659,784,1047)]),.4)
for i,k in enumerate(range(12,17)): add(s(k),tone(880 if k<16 else 1175,.18,14),.6)
add(s(17),tone(90,.4,8)*1.2+lp(noise(.4),30)*.8,.9)
add(e(22)+.35,np.concatenate([tone(f,.5,5) for f in (523,659,784,1047)]),.4)
y=y/np.abs(y).max()*.8
out=(y[:int(dur*SR)]*32767).astype(np.int16)
f=wave.open(f'sfx_tresor_{lang}.wav','wb');f.setnchannels(1);f.setsampwidth(2);f.setframerate(SR);f.writeframes(out.tobytes());f.close()
