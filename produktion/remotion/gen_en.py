import re,sys,json
src,dst,comp,warpjson,mapfile=sys.argv[1:6]
t=open(src).read()
t=t.split('\nexport {N,Y,R,G,C,W')[0]  # Hut-Exporte entfernen
M=json.load(open(mapfile))
for k in sorted(M,key=len,reverse=True):
    t=t.replace("'"+k+"'","'"+M[k]+"'")
t=t.replace("export const "+comp[:-2]+":","export const "+comp+":")
t=t.replace("const f=useCurrentFrame();const t=f/30;","const f=useCurrentFrame();const t=warp(f/30);")
pre=f"""const WK=require('./{warpjson}');
const warp=(x:number)=>{{const a=WK.en,b=WK.de;if(x<=a[0])return b[0];for(let i=1;i<a.length;i++){{if(x<=a[i]){{const u=(x-a[i-1])/(a[i]-a[i-1]);return b[i-1]+u*(b[i]-b[i-1]);}}}}return b[b.length-1]+(x-a[a.length-1]);}};
"""
t=t.replace("const FLOOR=",pre+"const FLOOR=",1)
open(dst,'w').write(t)
