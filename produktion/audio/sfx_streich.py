import numpy as np, wave, json, re, sys
lang=sys.argv[1]; SR=44100
w=json.load(open(f'/home/claude/n1/{lang}/words.json')); ws=w['words']; dur=w['duration']+2.0
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
# Wind
wind=lp(noise(dur),900)*2.5; wind*=0.5+0.5*np.sin(np.arange(len(wind))/SR*.6); y[:len(wind)]+=wind*0.4
for k in (0,1,2,3,4,6,7,8,9,18,19,20,21,22): add(s(k),whoosh(),.5)
def ignite(t0,g=.7): add(t0,lp(noise(.35),6)*np.exp(-np.arange(int(.35*SR))/SR*9)*2.5,g); add(t0+.05,tone(300,.4,7)+tone(600,.4,9),.25)
ignite(s(18)); ignite(s(21)+1.0,.5); ignite(s(22)+.3,.5); ignite(s(22)+.9,.6)
add(s(7),tone(180,.5,5)+tone(140,.5,6),.35)
for i,k in enumerate(range(12,17)): add(s(k),tone(880 if k<16 else 1175,.18,14),.6)
add(s(17),tone(90,.4,8)*1.2+lp(noise(.4),30)*.8,.9)
add(e(22)+.35,np.concatenate([tone(f,.5,5) for f in (523,659,784,1047)]),.4)
y=y/np.abs(y).max()*.8
out=(y[:int(dur*SR)]*32767).astype(np.int16)
f=wave.open(f'sfx_streich_{lang}.wav','wb');f.setnchannels(1);f.setsampwidth(2);f.setframerate(SR);f.writeframes(out.tobytes());f.close()
