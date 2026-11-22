import numpy as np, wave, json, re, sys
lang=sys.argv[1]; SR=44100
w=json.load(open(f'/home/claude/q1/{lang}/words.json')); ws=w['words']; dur=w['duration']+2.0
S=[];cur=[]
for x in ws:
    cur.append(x)
    if re.search(r'[.?!:]$',x['w']): S.append((cur[0]['s'],cur[-1]['e']));cur=[]
s=lambda k:S[k][0]
y=np.zeros(int(dur*SR)+SR); rng=np.random.default_rng(3)
def add(t,a,g=1.0):
    i=max(0,int(t*SR)); a=a*g; y[i:i+len(a)]+=a[:len(y)-i]
def tone(f,d,dec=10,g=1):
    x=np.arange(int(d*SR))/SR; return np.sin(2*np.pi*f*x)*np.exp(-dec*x)*g
def noise(d): return rng.standard_normal(int(d*SR))
def lp(a,k): return np.convolve(a,np.ones(k)/k,'same')
def whoosh(d=.45): n=lp(noise(d),50); x=np.linspace(0,1,len(n)); return n*np.sin(np.pi*x)**2*.9
def thunder(d=2.2): n=lp(noise(d),400); x=np.arange(len(n))/SR; return n*np.exp(-x*1.4)*6
def pop(): return tone(520,.2,12)+tone(780,.2,14)
# Meer-Grundrauschen
sea=lp(noise(dur),600)*3.0; sea*=0.5+0.5*np.sin(np.arange(len(sea))/SR*0.9)
y[:len(sea)]+=sea*0.5
add(s(0)+.2,thunder(),.9); add(s(1)+1.8,thunder(1.8),.7)
for k in (0,1,2,4,6,8,10,11,12): add(s(k),whoosh(),.5)
add(s(4)+.3,pop(),.4)
t0=s(21)+1.2; t1=s(23)+.1; t2=s(26)+.2
add(t0,whoosh(.6),.9); add(t1,whoosh(.6),.8)
# Feuerknistern
t=t0
while t<t2+0.5:
    dens=14 if t<t1 else 20
    add(t,lp(noise(.015),3)*rng.uniform(.3,1),.5)
    t+=rng.exponential(1/dens)
for i,k in enumerate(range(15,20)): add(s(k),tone(880 if k<19 else 1175,.18,14),.6)
add(s(20),tone(90,.4,8)*1.2+lp(noise(.4),30)*.8,.9)
add(s(26),np.concatenate([tone(f,.5,5) for f in (523,659,784,1047)]),.4)
add(s(27),tone(110,1.8,1.6,1)+tone(165,1.8,1.6,.5),.9)
y=y/np.abs(y).max()*.8
out=(y[:int(dur*SR)]*32767).astype(np.int16)
f=wave.open(f'sfx_seile_{lang}.wav','wb');f.setnchannels(1);f.setsampwidth(2);f.setframerate(SR);f.writeframes(out.tobytes());f.close()
print(lang,dur)
