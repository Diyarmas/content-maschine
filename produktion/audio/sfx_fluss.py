import numpy as np, wave, json
SR=44100; D=98.0
n=int(SR*D); L=np.zeros(n); 
def add(t,sig,g=1.0):
    i=max(0,int(t*SR)); j=min(n,i+len(sig)); 
    if i<n: L[i:j]+=sig[:j-i]*g
def tone(f,d,dec=6,sh='sin'):
    t=np.arange(int(d*SR))/SR; w=np.sin(2*np.pi*f*t)
    return w*np.exp(-dec*t)
def noise(d,dec=8):
    t=np.arange(int(d*SR))/SR; return np.random.randn(len(t))*np.exp(-dec*t)
rng=np.random.default_rng(1); np.random.seed(1)
# Pad (dunkel, Drone) mit langsamer Modulation
t=np.arange(n)/SR
pad=(np.sin(2*np.pi*55*t)+.6*np.sin(2*np.pi*82.5*t+np.sin(t*.3))+.4*np.sin(2*np.pi*110.4*t))*.05
env=np.minimum(1,t/3)*np.where(t>89.2,0,1)
L+=pad*env*(1+.25*np.sin(2*np.pi*t/9))
# Tension-Pad ab 47.8 hoch
tp=np.sin(2*np.pi*(220+ (t-47.8).clip(0)*1.2)*t)*.03*((t>47.8)&(t<67.5))
L+=tp
# Fluss: Wind + Wasser leise
wn=np.convolve(np.random.randn(n),np.ones(40)/40,mode='same')*.05; L+=wn*(1+.3*np.sin(2*np.pi*t/7))
for a in [0, 0.89, 4.0, 5.72, 6.83, 11.72, 13.43, 16.47, 18.42, 21.06, 25.03, 27.93, 31.68, 33.82, 35.55, 37.73, 40.22, 41.4, 45.3, 58.17, 63.98, 67.02, 69.16, 72.41, 78.85, 83.63, 85.64, 89.67, 93.45, 94.45]:
    w=noise(.35,5); w=np.convolve(w,np.ones(40)/40,mode='same'); add(a-.05,w,.5); add(a+.1,tone(520,.12,18),.12)
for s_ in [51.52,52.3,53.32,54.37,55.31]: add(s_,tone(880,.25,6),.5)
add(56.8,tone(440,.8,3),.5)
add(57.47,noise(.18,25),.7); add(57.47,tone(90,.4,10),.8)
add(.0,tone(60,1.5,2.5),.8); add(.0,noise(.4,10),.3)
# Schritte
for k in np.arange(58.5,66.2,.45): add(k,noise(.05,80),.25)
for k in np.arange(72.6,78.0,.35): add(k,noise(.05,80),.25)
# Ecke findet Punkt, Peilung trifft
for s_ in [63.98,78.0]:
    for k,f in enumerate([660,880]): add(s_+k*.1,tone(f,.5,5),.35)
# Falten
for k in range(3): add(67.1+k*.8,noise(.15,20),.4)
add(70.0,tone(520,.3,8),.3)
# Gleich-lang Ticks
for s_ in [83.63,83.95]: add(s_,tone(1200,.1,40),.4)
for k,f in enumerate([523,659,784]): add(85.64+k*.09,tone(f,.8,3),.3)
# Brücke bauen
for k in np.arange(89.8,92.2,.12): add(k,tone(180+ (k-89.8)*40,.08,40),.3)
for k,f in enumerate([523,659,784,1046]): add(92.3+k*.09,tone(f,.9,3),.35)
L+=(np.sin(2*np.pi*65*t)+.5*np.sin(2*np.pi*98*t))*.035*np.minimum(1,t/3)
L=np.tanh(L*1.2); L/=max(1e-9,np.abs(L).max()); L*=.85
st=(L*32767).astype(np.int16)
with wave.open('sfx_fluss.wav','wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
