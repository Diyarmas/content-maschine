import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,W,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person} = require('./figs.js');
import WDE from './words_seile_de.json';
import WEN from './words_seile_en.json';

type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);

const TXT={
 de:{
  cards:{0:['STURM','ZIEHT AUF'],1:['IN 45 MIN:','SIGNALFEUER'],2:['UHR','KAPUTT'],4:['2 SEILE','1 FEUERZEUG'],6:['45 MIN','EXAKT'],8:['JEDES SEIL:','60 MIN'],10:['UNGLEICH-','MÄSSIG'],11:['NICHT IN','DER MITTE'],12:['WIE?']} as Record<number,string[]>,
  s1:'SEIL 1',s2:'SEIL 2',min:'MIN',sol:'LÖSUNG',done:'45 MINUTEN!',half:'? MIN'},
 en:{
  cards:{0:['STORM','COMING'],1:['IN 45 MIN:','SIGNAL FIRE'],2:['WATCH','BROKEN'],4:['2 ROPES','1 LIGHTER'],6:['45 MIN','EXACT'],8:['EACH ROPE:','60 MIN'],10:['UNEVEN','BURN'],11:['NOT IN','THE MIDDLE'],12:['HOW?']} as Record<number,string[]>,
  s1:'ROPE 1',s2:'ROPE 2',min:'MIN',sol:'ANSWER',done:'45 MINUTES!',half:'? MIN'}
};
// Seilsegmente: Brenndauer (Min) und Länge (Anteil)
const SEG={
  A:{d:[10,25,5,20],l:[.30,.15,.35,.20],w:[22,12,26,16]},
  B:{d:[18,6,26,10],l:[.20,.40,.15,.25],w:[14,24,12,22]}
};
const X1=150, X2=930;
function xOf(rope:'A'|'B',tau:number){
  const g=SEG[rope];let t=0,x=X1;
  for(let i=0;i<4;i++){const len=g.l[i]*(X2-X1);
    if(tau<=t+g.d[i])return x+len*(tau-t)/g.d[i];
    t+=g.d[i];x+=len;}
  return X2;}
function flame(x:number,y:number,t:number,k:number,s:number){
  const f=1+Math.sin(t*18+k*2)*.12, f2=1+Math.sin(t*23+k)*.18;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={70} fill="#ff9a1f" opacity={.28*f}/>
    <path d={`M0 6 C-26 -6 -22 -44 0 -76*${f2} C22 -44 26 -6 0 6Z`.replace('*'+f2,'')} fill="#ff7a18" stroke={N} strokeWidth={4} transform={`scale(1 ${f2})`}/>
    <path d="M0 4 C-13 -4 -11 -26 0 -44 C11 -26 13 -4 0 4Z" fill="#ffd23c" transform={`scale(1 ${f})`}/>
  </g>;}
function rope(which:'A'|'B',y:number,t:number,sL:number,sR:number,lit:{l:number;r:number}){
  // lit.l/.r: Zündzeitpunkte (Sekunden) für linke/rechte Flamme, <0 = nie
  const g=SEG[which];const out:React.ReactNode[]=[];
  const lOn=lit.l>=0&&t>=lit.l, rOn=lit.r>=0&&t>=lit.r;
  const tauL=lOn?sL:0, tauR=rOn?60-sR:60;
  const xl=xOf(which,tauL), xr=xOf(which,tauR);
  let x=X1,tt=0;
  for(let i=0;i<4;i++){
    const len=g.l[i]*(X2-X1),xs=x,xe=x+len;x+=len;
    const a=Math.max(xs,xl),b=Math.min(xe,xr);
    // verbrannt (Asche)
    if(xl>xs)out.push(<line key={'ba'+i} x1={xs} y1={y} x2={Math.min(xe,xl)} y2={y} stroke="#2b2230" strokeWidth={4} opacity={.55} strokeDasharray="6 10" strokeLinecap="round"/>);
    if(xr<xe)out.push(<line key={'bb'+i} x1={Math.max(xs,xr)} y1={y} x2={xe} y2={y} stroke="#2b2230" strokeWidth={4} opacity={.55} strokeDasharray="6 10" strokeLinecap="round"/>);
    if(b>a){out.push(<line key={'r'+i} x1={a} y1={y} x2={b} y2={y} stroke={N} strokeWidth={g.w[i]+8} strokeLinecap="butt"/>);
      out.push(<line key={'rr'+i} x1={a} y1={y} x2={b} y2={y} stroke="#d1a665" strokeWidth={g.w[i]} strokeLinecap="butt"/>);
      out.push(<line key={'rd'+i} x1={a} y1={y} x2={b} y2={y} stroke="#9b7440" strokeWidth={g.w[i]} strokeDasharray="4 12" strokeLinecap="butt" opacity={.8}/>);}
    tt+=g.d[i];
  }
  const fl:React.ReactNode[]=[];
  const gone=xl>=xr-2;
  if(lOn&&!gone)fl.push(flame(xl,y,t,1,cl((t-lit.l)/.4)));
  if(rOn&&!gone)fl.push(flame(xr,y,t,2,cl((t-lit.r)/.4)));
  return <g>{out}{fl}</g>;}

const Seile:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=TXT[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  // Zeitleiste der Simulation
  const t0=s(21)+1.2, t1=s(23)+.1, t2=s(26)+.2;
  const sim=t<t0?0:t<t1?lerp(0,30,(t-t0)/(t1-t0)):t<t2?lerp(30,45,(t-t1)/(t2-t1)):45;
  const sA=sim, sB=sim;
  const litA={l:t0,r:t0};
  const litB={l:t0,r:t1};
  const sBR=Math.max(0,sim-30);
  const ropesVis=P(t,s(4),.5);
  const yA=810,yB=1010;
  const flash=(()=>{const a=s(0)+.2;const d=t-a;return d>0&&d<.6?Math.max(0,Math.sin(d*40))*Math.exp(-d*4):0;})();
  const flash2=(()=>{const a=s(1)+1.8;const d=t-a;return d>0&&d<.5?Math.max(0,Math.sin(d*40))*Math.exp(-d*5):0;})();
  const lampOn=cl((t-s(27))/.6);
  const sway=Math.sin(t*1.1)*6;
  const worry=t<s(21);
  const waves=[0,1,2,3,4,5].map(i=>{const y=1210+i*70;return <path key={i} d={`M0 ${y} `+Array.from({length:13}).map((_,j)=>`Q${j*90+45} ${y+Math.sin(t*1.5+j+i)*14-14} ${j*90+90} ${y}`).join(' ')} fill="none" stroke="#7aa6d6" strokeWidth={3} opacity={.22+i*.04}/>});
  const personG=person(0,0,'mohammed',{tag:false,look:worry?-6:0,grin:!worry&&t>s(26)});
  const cd=[15,16,17,18,19].findIndex(k=>t>=s(k)&&t<s(k)+ (k<19?(s(k+1)-s(k)):1.0));
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const c:Card={a:s(kk),b:Math.max(e(kk)+.3,s(kk)+1.4),lines:l,y:300,bg:(kk===6||kk===12)?Y:undefined};return cardSvg(t,c);});
  const stampA=s(20),stampB=stampA+1.2, stp=t>stampA&&t<stampB;
  const doneA=s(26),doneB=doneA+2.4;
  const beamA=t*1.1;
  const minShow=Math.floor(sim);
  const showTimer=t>=t0-.3&&t<s(27)+1;
  return <AbsoluteFill style={{background:'#0d1a30'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <defs>
      <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b1126"/><stop offset=".6" stopColor="#28345f"/><stop offset="1" stopColor="#5a5f8f"/></linearGradient>
      <linearGradient id="se" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#274a70"/><stop offset="1" stopColor="#0a1a2e"/></linearGradient>
      <radialGradient id="lg"><stop offset="0" stopColor="#fff3b0" stopOpacity=".95"/><stop offset="1" stopColor="#ffd23c" stopOpacity="0"/></radialGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#sk)"/>
    {Array.from({length:40}).map((_,i)=><circle key={i} cx={(i*263)%1080} cy={((i*131)%520)+30} r={1.5+(i%3)} fill="#fff" opacity={.35+.25*Math.sin(t*2+i)}/>)}
    {[0,1,2,3].map(i=><ellipse key={i} cx={((i*400+t*(10+i*3))%1500)-200} cy={170+i*95} rx={330} ry={64} fill="#10162e" opacity={.8}/>)}
    <rect width={1080} height={1920} fill="#fff" opacity={Math.max(flash,flash2)*.85}/>
    <rect y={1180} width={1080} height={740} fill="url(#se)"/>
    {waves}
    {/* Leuchtturm hinten rechts */}
    <g transform={`translate(880 0)`}>
      <polygon points="-70,1230 70,1230 44,460 -44,460" fill="#e9e4d6" stroke={N} strokeWidth={6}/>
      {[0,1,2,3].map(i=><polygon key={i} points={`${-66+i*0},${1230-i*190-60} ${66},${1230-i*190-60} ${60-(i+.5)*4},${1230-i*190-140} ${-60+(i+.5)*4},${1230-i*190-140}`} fill={R} opacity={.9}/>)}
      <rect x={-52} y={400} width={104} height={64} rx={8} fill={N}/>
      <rect x={-40} y={410} width={80} height={46} rx={6} fill={lampOn>0?'#fff3b0':'#1a2240'}/>
      <polygon points="-62,400 62,400 0,340" fill={R} stroke={N} strokeWidth={6}/>
      {lampOn>0&&<g opacity={lampOn}><circle cx={0} cy={433} r={180} fill="url(#lg)"/>
        <polygon points={`0,433 ${-900*Math.cos(beamA)},${433-90} ${-900*Math.cos(beamA)},${433+90}`} fill="#fff3b0" opacity={.35}/>
        <polygon points={`0,433 ${900*Math.cos(beamA+1.6)},${433-90} ${900*Math.cos(beamA+1.6)},${433+90}`} fill="#fff3b0" opacity={.25}/></g>}
    </g>
    {/* Felsen / Deck */}
    <path d="M0 1520 Q300 1460 560 1500 T1080 1490 V1920 H0Z" fill="#2c2433" stroke={N} strokeWidth={6}/>
    <rect y={1560} width={1080} height={360} fill="#3a2d2a"/>
    {Array.from({length:9}).map((_,i)=><line key={i} x1={0} x2={1080} y1={1600+i*40} y2={1600+i*40} stroke="#2a201e" strokeWidth={4}/>)}
    {/* Tafel */}
    <g opacity={ropesVis} transform={`translate(0 ${(1-ropesVis)*40})`}>
      <rect x={60} y={640} width={960} height={540} rx={36} fill="#5a3f2e" stroke={N} strokeWidth={9} opacity={.96}/>
      <rect x={84} y={664} width={912} height={492} rx={26} fill="#46301f" opacity={.8}/>
      <text x={540} y={738} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill="#e8d3a8">{X.s1}</text>
      <text x={540} y={938} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill="#e8d3a8">{X.s2}</text>
      {[yA,yB].map((y,i)=><g key={i}><circle cx={X1-18} cy={y} r={14} fill="#bdbdbd" stroke={N} strokeWidth={4}/><circle cx={X2+18} cy={y} r={14} fill="#bdbdbd" stroke={N} strokeWidth={4}/></g>)}
      {rope('A',yA,t,sA,sA,litA)}
      {rope('B',yB,t,sB,sBR,litB)}
      {/* Beschriftungen 60 MIN */}
      {t>s(8)&&t<s(12)&&[yA,yB].map((y,i)=><g key={i} opacity={P(t,s(8),.4)}><rect x={430} y={y+34} width={220} height={52} rx={16} fill={C} stroke={N} strokeWidth={5}/><text x={540} y={y+72} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={N}>60 {X.min}</text></g>)}
      {t>s(10)&&t<s(13)&&<g opacity={P(t,s(10),.4)}>
        <line x1={540} y1={yA-50} x2={540} y2={yA+50} stroke={R} strokeWidth={8} strokeDasharray="12 10"/>
        <text x={330} y={yA-40} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={Y}>{X.half}</text>
        <text x={750} y={yA-40} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={Y}>{X.half}</text></g>}
      {t>s(11)&&t<s(13)&&<g transform={`translate(540 ${yA}) rotate(${Math.sin(t*10)*6})`} opacity={P(t,s(11),.3)}><circle r={46} fill="none" stroke={R} strokeWidth={12}/><line x1={-32} y1={-32} x2={32} y2={32} stroke={R} strokeWidth={12} strokeLinecap="round"/></g>}
    </g>
    {/* Timer */}
    {showTimer&&<g transform="translate(540 1270)"><rect x={-230} y={-64} width={460} height={128} rx={34} fill={C} stroke={N} strokeWidth={9}/>
      <text y={34} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={92} fill={sim>=30&&sim<30.8?R:N}>{minShow} {X.min}</text></g>}
    {/* Mohammed */}
    <g transform={`translate(${300+sway} 1800) scale(.8)`} dangerouslySetInnerHTML={{__html:personG}}/>
    {/* Karten */}
    {cardEls}
    {/* Countdown */}
    {cd>=0&&(()=>{const k=15+cd;const a=s(k);const b=k<19?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {stp&&(()=>{const p=PB(t,stampA,.35);const out=1-cl((t-(stampB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-400} y={-100} width={800} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={38} fontFamily={FONT} fontWeight={700} fontSize={96} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const SeileDE:React.FC=()=><Seile lang="de"/>;
export const SeileEN:React.FC=()=><Seile lang="en"/>;
