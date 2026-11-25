import numpy as np, wave, json, re, sys
lang=sys.argv[1]; SR=44100
w=json.load(open(f'/home/claude/m5/{lang}/words.json')); ws=w['words']; dur=w['duration']+2.0
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
for k in (0,1,2,3,4,6,7,8,9,18,19,20,21,22): add(s(k),whoosh(),.5)
for k in range(0,3): add(s(0)+k*.45,tone(950,.22,12),.35)
def click():
    a=lp(noise(.08),6)*np.exp(-np.arange(int(.08*SR))/SR*120)*4
    return a+tone(180,.08,40)*.8
def slice_(): return lp(noise(.35),20)*np.linspace(1,0,int(.35*SR))*1.2
add(a18:=s(18)+.3,slice_(),.8); add(s(18)+.8,slice_(),.8); add(s(19)+.3,slice_(),.9)
add(s(20)+.2,tone(300,.5,6)*.7+lp(noise(.5),30)*.3,.6)
for i in range(8): add(s(21)+i*.35,tone(700+i*60,.18,16),.4)
for i,k in enumerate(range(12,17)): add(s(k),tone(880 if k<16 else 1175,.18,14),.6)
add(s(17),tone(90,.4,8)*1.2+lp(noise(.4),30)*.8,.9)
add(e(22)+.35,np.concatenate([tone(f,.5,5) for f in (523,659,784,1047)]),.4)
y=y/np.abs(y).max()*.8
out=(y[:int(dur*SR)]*32767).astype(np.int16)
f=wave.open(f'sfx_torte_{lang}.wav','wb');f.setnchannels(1);f.setsampwidth(2);f.setframerate(SR);f.writeframes(out.tobytes());f.close()
