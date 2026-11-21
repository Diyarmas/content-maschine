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
# Hotel: Regen-Rauschen leise
rn=np.convolve(np.random.randn(n),np.ones(6)/6,mode='same')*.02; L+=rn*np.where(t<70,1,.5)
for a in [.05,2.28,8.95,12.34,15.37,17.96,23.95,27.99,31.78,36.61,38.07,42.61,51.64,53.38,60.48,63.25,66.9,70.59,73.63,75.96,79.02,81.25,83.27,85.58,86.62]:
    w=noise(.35,5); w=np.convolve(w,np.ones(40)/40,mode='same'); add(a-.05,w,.5); add(a+.1,tone(520,.12,18),.12)
for s_ in [46.07,47.05,47.95,48.93,49.6]: add(s_,tone(880,.25,6),.5)
add(50.5,tone(440,.8,3),.5)
for s_ in [50.87]: add(s_,noise(.18,25),.7); add(s_,tone(90,.4,10),.8)
for s_ in [2.28,24.0]: add(s_,tone(70,.5,9),.7)
# Schritt-Wellen beim Zimmerwechsel (Ticks)
for g in range(1,16):
    a=[55.5,57.9,59.2][g-1] if g<4 else 60.5+(g-4)*.12
    add(a,tone(420+g*18,.15,18),.22); add(a+.45,noise(.05,60),.2)
for g in range(1,9): add(77.0+(g-1)*.28+.6,tone(300,.2,16),.2); add(77.0+(g-1)*.28,tone(600+g*40,.2,14),.18)
# Freude Zimmer frei
for k,f in enumerate([523,659,784]): add(56.6+k*.09,tone(f,.8,3),.3)
add(66.9,tone(784,.4,5),.3)
# Bus Motor + Hupe
bt=np.arange(int(SR*4.5))/SR; eng=(np.sin(2*np.pi*(48+8*np.sin(bt*9))*bt)*.5)*np.exp(-bt*.35); add(70.5,eng,.5)
add(75.5,tone(392,.5,3),.25); add(75.5,tone(494,.5,3),.25)
for i in range(4): add(83.3+i*.35,tone(1046+i*100,.25,10),.28)
for k,f in enumerate([523,659,784,1046]): add(85.0+k*.09,tone(f,.9,3),.3)
# Zzz
for i in range(3): add(68.9+i*.5,tone(250,.4,6),.1)
add(0.0,tone(60,1.5,2.5),.8); add(0.0,noise(.4,10),.3)
# Tension-Pad leicht
L+=(np.sin(2*np.pi*55*t)+.5*np.sin(2*np.pi*82.5*t))*.04*np.minimum(1,t/3)*np.where(t>86,.6,1)
L=np.tanh(L*1.2); L/=max(1e-9,np.abs(L).max()); L*=.85
st=(L*32767).astype(np.int16)
with wave.open('sfx_hotel.wav','wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
