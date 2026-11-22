import numpy as np, wave, sys
SR=44100
def mk(dur,events,name):
    y=np.zeros(int(dur*SR)+SR)
    def add(t,s,g=1.0):
        i=max(0,int(t*SR)); s=s*g; y[i:i+len(s)]+=s[:len(y)-i]
    def tone(f,d,dec=18,g=1):
        x=np.arange(int(d*SR))/SR; return np.sin(2*np.pi*f*x)*np.exp(-dec*x)*g
    def tick(hi):
        a=tone(1900 if hi else 1300,.05,90); b=0.4*tone(3800,.05,120); return a+b
    def whoosh(d=.5):
        n=np.random.randn(int(d*SR)); x=np.linspace(0,1,len(n)); 
        k=np.convolve(n,np.ones(60)/60,'same'); return k*np.sin(np.pi*x)**2*.5
    for e in events:
        k,t=e[0],e[1]
        if k=='tick': add(t,tick(e[2]),.18 if not e[3] else .3)
        if k=='whoosh': add(t,whoosh(),.8)
        if k=='pop': add(t,tone(520,.25,12)+tone(780,.25,14),.5)
        if k=='chime':
            for j,f in enumerate([523,659,784,1047]): add(t+j*.09,tone(f,.8,5),.4)
        if k=='buzz': add(t,tone(180,.35,6)*.5)
    y=y/max(1,np.abs(y).max())*.8
    w=wave.open(name,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y[:int(dur*SR)]*32767).astype(np.int16).tobytes());w.close()

def build(end,sol,total,name):
    ev=[('whoosh',0)]
    for i in range(8): ev.append(('pop',.4+i*.12))
    t=2.0;n=0
    while t<end:
        ev.append(('tick',t,n%2==0,t>end-5)); n+=1; t+=1.0 if t<end-5 else .5
    ev+=[('whoosh',end),('chime',sol)]
    mk(total,ev,name)
build(44.2,44.7,57,'sfx_suche_de.wav')
build(44.2,44.8,55,'sfx_suche_en.wav')
