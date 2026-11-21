import numpy as np, wave, json
SR=44100; D=95.0
n=int(SR*D); L=np.zeros(n); 
def add(t,sig,g=1.0):
    i=int(t*SR); j=min(n,i+len(sig)); 
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
# Whoosh bei Karten
for a in [3.9,7.3,13.9,19.1,24.3,39.96,41.4,43.6,45.55,51.0,55.6,57.4,68.3,72.0,76.3,81.0,83.4,85.7,90.5,92.1]:
    w=noise(.35,5); w=np.convolve(w,np.ones(40)/40,mode='same'); add(a-.05,w,.5)
    add(a+.1,tone(520,.12,18),.12)
# Uhr-Ticks
for k in np.arange(47.8,67.5,1.0): add(k,tone(1800,.05,90),.25); add(k,noise(.02,200),.15)
# Countdown Beeps
for s in [61.31,62.35,63.42,64.76,65.88]: add(s,tone(880,.25,6),.5)
add(66.95,tone(440,.8,3),.5)
# Stempel
for s in [43.6,67.55,89.25]: add(s,noise(.18,25),.7); add(s,tone(90,.4,10),.8)
add(45.55,noise(.2,22),.7); add(45.55,tone(70,.5,9),.8)
# X und Haken
for s in [68.5,69.8]: add(s,tone(180,.25,12),.5)
for s in [72.1,72.6]: add(s,tone(1046,.3,7),.35); add(s+.1,tone(1318,.35,6),.3)
# Bing Blasen
for s in [31.2,33.5,35.3,37.5]: add(s,tone(900,.15,20),.3)
# Hut-Wurf
for i in range(4): add(26.89+i*.45,noise(.12,30),.3); add(27.0+i*.45,tone(300,.1,30),.25)
# Jubel / Fanfare
for k,f in enumerate([523,659,784,1046]): add(89.2+k*.09,tone(f,.9,3),.35)
add(89.3,noise(1.2,3),.18)
# Hook-Stinger
add(0.0,tone(60,1.5,2.5),.8); add(0.0,noise(.4,10),.3)
add(2.0,tone(40,1.2,3),.9)
# Lösung-Rise
rs=np.linspace(0,1,int(SR*.5)); add(67.0,np.sin(2*np.pi*(300+900*rs)*rs)*rs*.5,.25)
L=np.tanh(L*1.2); L/=max(1e-9,np.abs(L).max()); L*=.85
st=(L*32767).astype(np.int16)
with wave.open('sfx.wav','wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
