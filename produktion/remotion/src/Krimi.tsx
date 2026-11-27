import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,FONT,fig} from './kit';
const W=1920,H=1080;
const req=(require as any).context('./krimi_de',false,/\.json$/);
const J:Record<string,any>={};req.keys().forEach((k:string)=>{J[k.replace('./','').replace('.json','')]=req(k);});
const TITLE=1.4,TIMER=10,SOLC=0.9,GAP=1.3;
type Seg={k:number;t0:number;a0:number;a1:number;tm0:number;tm1:number;b0:number;b1:number;end:number};
const SEGS:Seg[]=[];let T=0.5;const INTRO0=T;T+=J['00_intro'].duration+1;
for(let k=1;k<=10;k++){const id=String(k).padStart(2,'0');const t0=T;const a0=t0+TITLE,a1=a0+J[id+'a'].duration;const tm0=a1+.3,tm1=tm0+TIMER;const b0=tm1+SOLC,b1=b0+J[id+'b'].duration;SEGS.push({k,t0,a0,a1,tm0,tm1,b0,b1,end:b1+GAP});T=b1+GAP;}
export const OUTRO0=T;T+=J['99_outro'].duration+2.5;
export const KRIMI_DUR=T;export const KSEGS=SEGS;export const KINTRO0=INTRO0;
const tag=(x:number,y:number,s:string,bg='#fff',fg=N,size=40)=>{const w=s.length*size*.6+60;return <g transform={`translate(${x} ${y})`}><rect x={-w/2+6} y={-size*.85+8} width={w} height={size*1.7} rx={18} fill="#000" opacity={.25}/><rect x={-w/2} y={-size*.85} width={w} height={size*1.7} rx={18} fill={bg} stroke={N} strokeWidth={6}/><text y={size*.36} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={size} fill={fg}>{s}</text></g>;};
const ring=(x:number,y:number,r:number,t:number,a:number)=>t<a?null:<g opacity={PB(t,a,.35)}><circle cx={x} cy={y} r={r+10*Math.sin(t*6)} fill="none" stroke={R} strokeWidth={14} strokeDasharray="30 14"/></g>;
const P=(c:string,hair='short',hc='#3b2a20',skin='#f1c7a3',h=500,extra:any={})=>({n:'',c,hair,hc,skin,h,...extra});
const clock=(x:number,y:number,r:number,hh:number,mm:number,digits=true,flip=false)=>{const ha=(hh%12+mm/60)*30,ma=mm*6;return <g transform={`translate(${x} ${y}) scale(${flip?-1:1} 1)`}><circle r={r} fill="#fff" stroke={N} strokeWidth={r*.08}/>{[...Array(12)].map((_,i)=><line key={i} x1={Math.sin(i*Math.PI/6)*r*.78} y1={-Math.cos(i*Math.PI/6)*r*.78} x2={Math.sin(i*Math.PI/6)*r*.92} y2={-Math.cos(i*Math.PI/6)*r*.92} stroke={N} strokeWidth={r*.06}/>)}<line x1={0} y1={0} x2={Math.sin(ha*Math.PI/180)*r*.5} y2={-Math.cos(ha*Math.PI/180)*r*.5} stroke={N} strokeWidth={r*.1} strokeLinecap="round"/><line x1={0} y1={0} x2={Math.sin(ma*Math.PI/180)*r*.78} y2={-Math.cos(ma*Math.PI/180)*r*.78} stroke={N} strokeWidth={r*.06} strokeLinecap="round"/><circle r={r*.07} fill={N}/></g>;};
// ---------------- Szenen ----------------
const S1=(t:number,s:Seg,sol:boolean)=><g>
  <rect width={W} height={H} fill="#cfe6f5"/><rect y={760} width={W} height={320} fill="#9aa5b1"/>
  <g transform="translate(420 460)"><rect x={-330} y={-260} width={660} height={560} fill="#e9d8b4" stroke={N} strokeWidth={8}/><path d="M-370 -260 L0 -420 L370 -260Z" fill="#c0563a" stroke={N} strokeWidth={8}/>{[0,1,2].map(i=><rect key={i} x={-260+i*190} y={-180} width={130} height={170} rx={60} fill="#7fb3d5" stroke={N} strokeWidth={6}/>)}<rect x={-80} y={80} width={160} height={220} fill="#7a4a2a" stroke={N} strokeWidth={6}/><text y={-300} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill={N}>RATHAUS</text></g>
  {fig(880,1010,'k1h',P('#e76f51','long','#7a3b1a'),'',1.15,{look:8,arm:'up'})}
  <g transform={`translate(1450 560) rotate(-4) scale(${1+.0*sol})`}><rect x={-330} y={-170} width={660} height={340} rx={18} fill="#fff7dc" stroke={N} strokeWidth={8}/><text x={-290} y={-100} fontFamily={FONT} fontWeight={700} fontSize={48} fill={N}>EINZELFAHRSCHEIN</text><text x={-290} y={-40} fontFamily={FONT} fontWeight={700} fontSize={34} fill="#555">Stadtbus · Erwachsene · 2,90 €</text><g transform="translate(20 70) rotate(-6)"><rect x={-280} y={-55} width={560} height={110} rx={10} fill="none" stroke="#6a4c93" strokeWidth={7}/><text y={18} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={42} fill="#6a4c93">L3 · RATHAUS · 10:42</text></g></g>
  {tag(1450,300,'TAT: 10:20 UHR',R,'#fff',46)}
  {sol&&ring(1510,630,300,t,s.b0)}
</g>;
const S2=(t:number,s:Seg,sol:boolean)=><g>
  <rect width={W} height={H} fill="#bfe3b4"/><rect y={820} width={W} height={260} fill="#a3b18a"/>
  <g transform="translate(760 470)"><rect x={-420} y={-300} width={840} height={650} fill="#f2e2c4" stroke={N} strokeWidth={8}/><path d="M-470 -300 L0 -500 L470 -300Z" fill="#8c3b2f" stroke={N} strokeWidth={8}/><rect x={-90} y={60} width={180} height={290} fill="#4a6fa5" stroke={N} strokeWidth={7}/><circle cx={60} cy={210} r={10} fill={Y}/><rect x={-360} y={-200} width={200} height={170} fill="#9ad1ff" stroke={N} strokeWidth={7}/><rect x={160} y={-200} width={200} height={170} fill="#9ad1ff" stroke={N} strokeWidth={7}/></g>
  {[0,1,2].map(i=><g key={i} transform={`translate(${880+i*70} 800)`}><rect x={-22} y={-90} width={44} height={90} rx={10} fill="#fff" stroke={N} strokeWidth={5}/><rect x={-14} y={-110} width={28} height={22} fill="#2a9d8f" stroke={N} strokeWidth={4}/>{sol&&t>=s.b0+.8&&<text y={50} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={R}>{['MI','DO','FR'][i]}</text>}</g>)}
  {fig(1500,1010,'k2i',P('#3d405b','short','#2b2b2b','#e0a77f',520),'',1.15,{look:-8})}
  {tag(1500,220,'DIEBSTAHL: MITTWOCH',R,'#fff',42)}{tag(1500,330,'HEUTE: FREITAG','#fff',N,42)}
  {sol&&ring(950,740,150,t,s.b0)}
</g>;
const S3=(t:number,s:Seg,sol:boolean)=><g>
  <rect width={W} height={H} fill="#e8dcc7"/>{[...Array(8)].map((_,i)=><rect key={i} x={60+i*120} y={120} width={90} height={560} fill={['#c0563a','#2a9d8f','#e9c46a','#3d7ea6'][i%4]} stroke={N} strokeWidth={5}/>)}
  <g transform="translate(1500 330)"><rect x={-230} y={-200} width={460} height={380} fill="#4a5a6a" stroke={N} strokeWidth={10}/>{[...Array(26)].map((_,i)=><line key={i} x1={-210+(i*37)%420} y1={-180+((i*53+t*400)%340)} x2={-222+(i*37)%420} y2={-150+((i*53+t*400)%340)} stroke="#cfe8ff" strokeWidth={4}/>)}<line x1={0} y1={-200} x2={0} y2={180} stroke={N} strokeWidth={8}/></g>
  <rect x={800} y={720} width={760} height={30} fill="#8a5a32" stroke={N} strokeWidth={6}/><rect x={830} y={750} width={30} height={250} fill="#6d4223"/><rect x={1500} y={750} width={30} height={250} fill="#6d4223"/>
  {fig(1180,1010,'k3i',P('#3d405b','short','#2b2b2b','#e0a77f',520),'',1.15,{look:-6})}
  <rect x={1000} y={690} width={140} height={30} fill="#fff" stroke={N} strokeWidth={4}/>
  <ellipse cx={700} cy={1000} rx={170} ry={34} fill="#8fd3ff" stroke="#4a9fd0" strokeWidth={5}/>
  <g transform="translate(700 1000) rotate(-14)"><line x1={0} y1={0} x2={0} y2={-380} stroke={N} strokeWidth={10}/><path d="M-90 -330 Q0 -460 90 -330 Q60 -300 0 -310 Q-60 -300 -90 -330Z" fill="#1d3557" stroke={N} strokeWidth={6}/><path d="M0 -10 q-20 0 -20 20" fill="none" stroke={N} strokeWidth={8}/></g>
  {[0,1,2].map(i=><circle key={i} cx={690+i*20} cy={700+((t*200+i*90)%280)} r={7} fill="#4a9fd0"/>)}
  {tag(420,820,'REGEN SEIT 14:00',R,'#fff',42)}{tag(420,930,'TAT: 14:15','#fff',N,42)}
  {sol&&ring(690,840,190,t,s.b0)}
</g>;
const S4=(t:number,s:Seg,sol:boolean)=><g>
  <rect width={W/2} height={H} fill="#bfe3b4"/><rect x={W/2} width={W/2} height={H} fill="#e8dcc7"/>
  <rect x={W/2-6} width={12} height={H} fill={N}/>
  <text x={480} y={110} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill={N}>DRAUSSEN</text><text x={1440} y={110} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill={N}>DRINNEN</text>
  <rect x={0} y={640} width={W/2} height={440} fill="#7fb069"/><rect x={W/2} y={760} width={W/2} height={320} fill="#b07a4f"/>
  <g transform="translate(480 420)"><rect x={-200} y={-180} width={400} height={330} fill="#cde9ff" stroke={N} strokeWidth={10}/><path d="M-200 -180 L-60 -40 L-140 60 L20 30 L80 150 L200 -20 L200 -180Z" fill="#888" opacity={.35}/><path d="M-40 -60 l40 30 l30 -50 l40 40" stroke={N} strokeWidth={5} fill="none"/></g>
  {[[300,760],[380,820],[460,740],[540,800],[620,770],[350,900],[580,880],[480,930]].map(([x,y],i)=><path key={i} d="M0 -26 L22 12 L-18 18Z" fill="#dff3ff" stroke="#4a9fd0" strokeWidth={5} transform={`translate(${x} ${y}) rotate(${i*40})`}/>)}
  <g transform="translate(1440 420)"><rect x={-200} y={-180} width={400} height={330} fill="#cde9ff" stroke={N} strokeWidth={10}/><path d="M-200 -180 L-60 -40 L-140 60 L20 30 L80 150 L200 -20 L200 -180Z" fill="#888" opacity={.35}/></g>
  {fig(1700,1040,'k4h',P('#f4a261','bald','#ddd','#f1c7a3',500,{beard:'#999'}),'',1.0,{look:-8,arm:'up'})}
  {sol&&ring(460,830,220,t,s.b0)}{sol&&ring(1300,900,150,t,s.b0+.6)}
</g>;
const S5=(t:number,s:Seg,sol:boolean)=><g>
  <rect width={W} height={H} fill="#f4e1c1"/>
  <g transform="translate(560 520) rotate(-5)"><rect x={-380} y={-250} width={760} height={500} rx={16} fill="#5fb0dc" stroke={N} strokeWidth={8}/><rect x={-380} y={60} width={760} height={190} fill="#f2d08a"/><circle cx={230} cy={-120} r={70} fill="#ffd93d"/><path d="M-300 60 q30 -120 40 -200 M-260 -140 q-60 10 -90 40 M-260 -140 q60 0 80 40" stroke="#3a7d44" strokeWidth={14} fill="none"/><text y={180} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill="#fff" stroke={N} strokeWidth={3}>Grüße aus Palma!</text></g>
  <g transform="translate(1380 520) rotate(4)"><rect x={-380} y={-250} width={760} height={500} rx={16} fill="#fffaf0" stroke={N} strokeWidth={8}/><line x1={0} y1={-200} x2={0} y2={200} stroke="#ccc" strokeWidth={4}/><text x={-340} y={-120} fontFamily="cursive" fontSize={44} fill="#1d3557">Grüße aus Palma!</text><text x={-340} y={-50} fontFamily="cursive" fontSize={44} fill="#1d3557">Dein Dragan</text>{[0,1,2].map(i=><line key={i} x1={40} y1={20+i*60} x2={340} y2={20+i*60} stroke="#999" strokeWidth={4}/>)}
    <g transform="translate(270 -150)"><rect x={-70} y={-80} width={140} height={160} fill="#fff" stroke="#e63946" strokeWidth={6} strokeDasharray="8 6"/><text y={-30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={22} fill={N}>DEUTSCHE</text><text y={0} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={22} fill={N}>POST</text><text y={50} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#e63946">95</text></g>
    <g transform="translate(110 -140) rotate(-12)"><circle r={78} fill="none" stroke="#333" strokeWidth={5} opacity={.8}/><text y={-14} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={22} fill="#333">BRIEFZENTRUM</text><text y={22} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={40} fill="#333">80</text><text y={52} textAnchor="middle" fontFamily="monospace" fontSize={18} fill="#333">MITTWOCH</text></g></g>
  {tag(960,960,'TAT: MITTWOCH IN MÜNCHEN',R,'#fff',42)}
  {sol&&ring(1600,370,150,t,s.b0)}
</g>;
const S6=(t:number,s:Seg,sol:boolean)=><g>
  <rect width={W} height={H} fill="#2b2d42"/>
  <g transform="translate(960 540)"><rect x={-330} y={-500} width={660} height={1000} rx={60} fill="#111" stroke="#555" strokeWidth={10}/><clipPath id="ph"><rect x={-300} y={-460} width={600} height={920} rx={30}/></clipPath><g clipPath="url(#ph)">
    <rect x={-300} y={-460} width={600} height={920} fill="#9ad1ff"/><g transform="translate(0 -210)"><rect x={-260} y={-150} width={520} height={420} fill="#e9d8b4" stroke={N} strokeWidth={6}/><path d="M-290 -150 L0 -260 L290 -150Z" fill="#c0563a" stroke={N} strokeWidth={6}/><g transform="translate(0 -40)">{clock(0,0,80,4,15)}</g></g>
    <rect x={-300} y={180} width={600} height={280} fill="#b07a4f"/>{fig(-60,640,'k6m',P('#e63946','long','#3b2a20'),'',1.0,{look:6,grin:1})}
    <g transform="translate(170 300)"><path d="M-50 -40 L-40 40 L40 40 L50 -40Z" fill="#fff" stroke={N} strokeWidth={5}/><ellipse cy={-40} rx={50} ry={12} fill="#c69c6d" stroke={N} strokeWidth={4}/></g></g></g>
  {tag(400,300,'TAT: 12:00 UHR',R,'#fff',46)}{tag(1520,300,'UHR GEHT GENAU','#fff',N,40)}
  {sol&&ring(960,290,120,t,s.b0)}
</g>;
const S7=(t:number,s:Seg,sol:boolean)=><g>
  <rect width={W} height={H} fill="#d6e4f0"/>{[...Array(40)].map((_,i)=><circle key={i} cx={(i*197)%W} cy={(i*131+t*40)%700} r={6} fill="#fff"/>)}
  <rect y={760} width={W} height={320} fill="#fff"/><rect y={760} width={W} height={20} fill="#e6eef5"/>
  <g transform="translate(900 760)"><rect x={-320} y={-10} width={640} height={60} fill="#cfd8e0"/><rect x={-330} y={-200} width={660} height={160} rx={40} fill="#e63946" stroke={N} strokeWidth={8}/><path d="M-200 -200 L-140 -320 L160 -320 L230 -200Z" fill="#e63946" stroke={N} strokeWidth={8}/><path d="M-120 -300 L-170 -210 L-10 -210 L-10 -300Z M20 -300 L20 -210 L190 -210 L140 -300Z" fill="#cfe8ff" stroke={N} strokeWidth={5}/><rect x={-180} y={-340} width={360} height={24} rx={10} fill="#fff" opacity={.6}/>{[-210,210].map(x=><g key={x}><circle cx={x} cy={-40} r={60} fill="#333" stroke={N} strokeWidth={6}/><circle cx={x} cy={-40} r={25} fill="#aaa"/></g>)}<rect x={-270} y={10} width={540} height={14} fill="#fff"/></g>
  {fig(1450,1000,'k7p',P('#3d7ea6','short','#5a4a3a','#f1c7a3',510),'',1.1,{look:-8,arm:'up'})}
  {tag(400,200,'SCHNEE: 5 BIS 8 UHR','#fff',N,42)}{tag(400,310,'TAT: 7:30 UHR',R,'#fff',42)}
  {sol&&ring(900,780,140,t,s.b0)}
</g>;
const S8=(t:number,s:Seg,sol:boolean)=><g>
  <rect width={W} height={H} fill="#f3e3c9"/>{[...Array(10)].map((_,i)=><rect key={i} x={i*200} y={0} width={100} height={700} fill="#efd9b8"/>)}
  <rect y={700} width={W} height={380} fill="#9b6b43"/><rect x={200} y={640} width={900} height={60} fill="#8a5a32" stroke={N} strokeWidth={6}/>
  <g transform="translate(1400 330)"><rect x={-150} y={-170} width={300} height={360} fill="#fff" stroke={N} strokeWidth={8}/><rect x={-150} y={-170} width={300} height={70} fill="#e63946" stroke={N} strokeWidth={8}/><text y={-120} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill="#fff">NOVEMBER</text><text y={40} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={120} fill={N}>23</text><text y={140} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={52} fill={N}>MONTAG</text><circle cx={0} cy={-190} r={12} fill={N}/></g>
  <g transform="translate(600 600)"><rect x={-90} y={-110} width={180} height={140} rx={20} fill="#e9c46a" stroke={N} strokeWidth={6}/><ellipse cx={0} cy={-110} rx={90} ry={22} fill="#f4d58d" stroke={N} strokeWidth={5}/><g transform="translate(150 -40) rotate(30)"><ellipse rx={90} ry={22} fill="#e9c46a" stroke={N} strokeWidth={5}/></g></g>
  {fig(300,1020,'k8g',P('#6a4c93','bun','#ddd','#f1c7a3',470,{glasses:1}),'OMA GRETA',1.05,{look:6})}
  {fig(860,1020,'k8j',P('#2a9d8f','short','#3b2a20','#f1c7a3',500),'JONAS',1.05,{look:-6})}
  {tag(1400,640,'WEG: FREITAG BIS DIENSTAG','#fff',N,38)}
  {sol&&ring(1400,330,240,t,s.b0)}
</g>;
const S9=(t:number,s:Seg,sol:boolean)=><g>
  <rect width={W} height={H} fill="#d8eef2"/>{[...Array(12)].map((_,i)=>[...Array(8)].map((_,j)=><rect key={i+'-'+j} x={i*160} y={j*140} width={156} height={136} fill="#cfe6ea"/>))}
  <g transform="translate(860 480)"><rect x={-480} y={-380} width={960} height={720} rx={30} fill="#eaf6ff" stroke="#888" strokeWidth={16}/><rect x={-460} y={-360} width={920} height={680} rx={20} fill="#bfdde8" opacity={.6}/>
   {clock(260,-180,110,9,40,false)}
   {fig(-80,500,'k9j',P('#e76f51','short','#2b2b2b','#e0a77f',510),'',1.0,{look:4,arm:'up'})}
   <rect x={-10} y={-50} width={70} height={120} rx={12} fill="#222" stroke={N} strokeWidth={4}/></g>
  {tag(1600,230,'TAT: 9:40 UHR',R,'#fff',44)}{tag(1600,340,'IM SPIEGEL','#fff',N,40)}
  {sol&&t>=s.b0+1.2&&<g transform={`translate(1600 680) scale(${PB(t,s.b0+1.2,.4)})`}>{clock(0,0,150,2,20,false)}<text y={220} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill={R}>ECHT: 2:20</text></g>}
  {sol&&ring(1120,300,140,t,s.b0)}
</g>;
const S10=(t:number,s:Seg,sol:boolean)=><g>
  <rect width={W} height={H} fill="#1d3557"/>{[...Array(30)].map((_,i)=><circle key={i} cx={(i*263)%W} cy={(i*97)%500} r={3} fill="#fff" opacity={.6}/>)}
  <rect y={860} width={W} height={220} fill="#444"/>
  <g transform="translate(900 560)"><path d="M-620 280 L-620 20 Q-560 -260 -200 -300 L380 -300 Q620 -240 700 20 L700 280Z" fill="#3d7ea6" stroke={N} strokeWidth={10}/><path d="M-560 30 Q-500 -220 -200 -250 L360 -250 Q560 -200 640 30Z" fill="#d6e4f0" stroke={N} strokeWidth={6}/>
   {/* Fahrersitz ganz hinten */}<path d="M-40 230 L-40 60 L140 60 L160 230Z" fill="#555" stroke={N} strokeWidth={6}/><path d="M-60 70 L-140 -160 L-80 -170 L10 60Z" fill="#555" stroke={N} strokeWidth={6}/><rect x={-200} y={-270} width={100} height={70} rx={20} fill="#555" stroke={N} strokeWidth={6}/><line x1={-150} y1={-200} x2={-140} y2={-165} stroke="#aaa" strokeWidth={8}/>
   {/* Lenkrad + Pedale */}<circle cx={420} cy={-40} r={70} fill="none" stroke={N} strokeWidth={14}/><rect x={430} y={190} width={60} height={20} fill="#222"/>
   {/* Fußmatte mit Abdruck */}<rect x={220} y={210} width={300} height={40} fill="#222"/><ellipse cx={370} cy={228} rx={110} ry={16} fill="#7a5a2a" opacity={.9}/>
   {/* Rücksitz mit Kissen */}<path d="M-560 230 L-560 70 L-300 70 L-280 230Z" fill="#555" stroke={N} strokeWidth={6}/><rect x={-520} y={30} width={150} height={50} rx={18} fill="#e9c46a" stroke={N} strokeWidth={5}/>
   {[-440,520].map(x=><g key={x}><circle cx={x} cy={290} r={90} fill="#222" stroke={N} strokeWidth={8}/><circle cx={x} cy={290} r={36} fill="#aaa"/></g>)}</g>
  {fig(1650,1000,'k10m',P('#e63946','ponytail','#3b2a20','#f1c7a3',440),'MIA 1,58 m',0.95,{look:-6})}
  {fig(220,1000,'k10p',P('#2a9d8f','short','#3b2a20','#f1c7a3',560),'PETER 1,92 m',0.95,{look:6})}
  {sol&&ring(780,380,110,t,s.b0)}{sol&&ring(1270,790,130,t,s.b0+.5)}{sol&&ring(460,610,110,t,s.b0+1)}
</g>;
const SC=[S1,S2,S3,S4,S5,S6,S7,S8,S9,S10];
const CARDS:Record<number,string>={1:'DAS BUSTICKET',2:'DIE MILCHFLASCHEN',3:'DER NASSE SCHIRM',4:'DAS FENSTER',5:'GRÜSSE AUS MALLORCA',6:'DAS SELFIE',7:'SCHNEE UNTER DEM AUTO',8:'DER ABREISSKALENDER',9:'DIE UHR IM SPIEGEL',10:'DER FAHRERSITZ'};
const timer=(t:number,s:Seg)=>{if(t<s.tm0-.2||t>s.tm1+.3)return null;const u=cl((t-s.tm0)/TIMER);const left=Math.ceil(TIMER-(t-s.tm0));const circ=2*Math.PI*120;
  return <g transform={`translate(${W-200} ${H-200}) scale(${PB(t,s.tm0-.2,.3)})`}><circle r={150} fill="#000" opacity={.3} cx={8} cy={10}/><circle r={140} fill={C} stroke={N} strokeWidth={10}/><circle r={120} fill="none" stroke={R} strokeWidth={18} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)"/><text y={60} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={170} fill={N}>{Math.max(0,Math.min(10,left))}</text></g>;};
export const KrimiDE:React.FC=()=>{const f=useCurrentFrame();const t=f/30;
  const seg=SEGS.find(s=>t>=s.t0&&t<s.end);
  let body:any=null;
  if(t<SEGS[0].t0){const it=t-INTRO0;body=<g><rect width={W} height={H} fill="#22223b"/>{[...Array(10)].map((_,i)=><g key={i} transform={`translate(${200+(i%5)*380} ${560+Math.floor(i/5)*250}) scale(${PB(t,1+i*.25,.3)})`}><rect x={-140} y={-90} width={280} height={180} rx={18} fill={C} stroke={N} strokeWidth={6}/><text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill={N}>{i+1}</text></g>)}<g transform={`translate(${W/2} 260) scale(${PB(t,0,.5)})`}><rect x={-720} y={-140} width={1440} height={280} rx={36} fill={N} stroke={Y} strokeWidth={10}/><text y={-10} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={100} fill="#fff">10 KRIMI-RÄTSEL</text><text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={60} fill={Y}>10 SEKUNDEN PRO FALL</text></g></g>;}
  else if(seg){const lt=t;const sol=t>=seg.b0-.1;
    body=<g>{SC[seg.k-1](lt,seg,sol)}
      {t<seg.a0&&<g opacity={1-cl((t-seg.a0+.3)/.3)}><rect width={W} height={H} fill="#22223b" opacity={.92}/><text x={W/2} y={470} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={80} fill={Y}>{'FALL '+seg.k}</text><text x={W/2} y={600} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={110} fill="#fff">{CARDS[seg.k]}</text></g>}
      <g transform="translate(40 40)"><rect width={230} height={70} rx={16} fill={N}/><text x={115} y={50} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={Y}>{'FALL '+seg.k+'/10'}</text></g>
      {timer(t,seg)}
      {t>=seg.tm1&&t<seg.b0+.6&&<g transform={`translate(${W/2} ${H/2}) rotate(-5) scale(${PB(t,seg.tm1,.3)})`}><rect x={-300} y={-90} width={600} height={180} rx={30} fill={C} stroke={G} strokeWidth={14}/><text y={36} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={100} fill={G}>LÖSUNG</text></g>}
    </g>;}
  else {const s0=OUTRO0;body=<g><rect width={W} height={H} fill="#f6c90e"/><g transform={`translate(${W/2} 300) scale(${PB(t,s0,.4)})`}><text textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={110} fill={N}>WIE VIELE HAST DU?</text><text y={130} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill={N}>0 – 10 👇</text></g>{t>=s0+5&&<g transform={`translate(${W/2} 760) scale(${PB(t,s0+5,.4)})`}><rect x={-620} y={-110} width={1240} height={220} rx={36} fill={N}/><text y={-10} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={70} fill="#fff">ALLE FÄLLE + 58 WEITERE</text><text y={70} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill={Y}>IM BUCH „KNOBELZEIT“ · AB 1. DEZEMBER</text></g>}</g>;}
  return <AbsoluteFill style={{background:'#000'}}><svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>{body}<g transform="translate(40 1030)" opacity={.85}><rect width={250} height={36} rx={10} fill={N}/><text x={125} y={26} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={24} fill={Y}>KNOBELZEIT</text></g></svg></AbsoluteFill>;};
