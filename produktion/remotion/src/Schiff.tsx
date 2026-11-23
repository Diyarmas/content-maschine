import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person,PPL} = require('./figs.js');
import WDE from './words_schiff_de.json';
import WEN from './words_schiff_en.json';
PPL.anil={n:'ANIL',c:'#1d3557',hair:'short',hc:'#1a1a1a',skin:'#d9a679',h:515,stache:'#1a1a1a'};
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const T={
 de:{cards:{0:['KAPITÄN ANIL','+ LEITER'],1:['LEITER AM','SCHIFF'],2:['ABSTAND','30 CM'],3:['DIE FLUT','KOMMT'],4:['+1,5 M','IN 1 STUNDE'],6:['ALLE SAGEN:','5 SPROSSEN'],7:['STIMMT','NICHT!'],8:['WORAN HÄNGT','DIE LEITER?'],9:['WIE VIELE','SPROSSEN NASS?'],18:['KEINE','EINZIGE'],19:['DAS SCHIFF','STEIGT MIT'],20:['SPROSSE BLEIBT','AUF WASSERHÖHE'],21:['FLUT = EGAL','FÜR DIE LEITER']} as Record<number,string[]>,
  sol:'LÖSUNG',done:'NULL NASS!',chip:'NASSE SPROSSEN:',m:'1,5 M'},
 en:{cards:{0:['CAPTAIN ANIL','+ A LADDER'],1:['LADDER ON','THE SHIP'],2:['GAP:','1 FOOT'],3:['THE TIDE','COMES IN'],4:['+5 FEET','IN 1 HOUR'],6:['EVERYONE SAYS:','5 RUNGS'],7:['WRONG!','THINK AGAIN'],8:['WHAT IS THE','LADDER ON?'],9:['HOW MANY','RUNGS GET WET?'],18:['NOT A','SINGLE ONE'],19:['THE SHIP','RISES TOO'],20:['RUNG STAYS','AT WATER LEVEL'],21:['TIDE = NO','CHANGE']} as Record<number,string[]>,
  sol:'ANSWER',done:'ZERO WET!',chip:'WET RUNGS:',m:'5 FT'}};
const BASE=1440, STEP=44, RISE=220;
const Schiff:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=T[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  // Phase A: falsche Animation (Schiff steht), Phase B: Lösung (Schiff steigt mit)
  const upA=eio(cl((t-(s(3)+.3))/(s(5)-s(3)-.8)));
  const downA=eio(cl((t-(s(18)+.1))/.8));
  const upB=eio(cl((t-(s(19)+.3))/(s(20)-s(19)-.5)));
  const sol=t>=s(18)+.9;
  const rise=sol?upB*RISE:(t>=s(18)?(1-downA)*RISE:upA*RISE);
  const shipLift=sol?upB*RISE:0;
  const yw=BASE-rise;
  const bob=Math.sin(t*1.6)*4;
  const wet=Array.from({length:12}).filter((_,i)=>(BASE-shipLift-STEP*i)>yw+3).length;
  const showChip=t>=s(6)&&t<s(18)?true:(t>=s(20));
  const chipTxt=t>=s(20)?String(wet):'5?';
  const chipCol=t>=s(20)?G:R;
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const c:Card={a:s(kk),b:Math.max(e(kk)+.3,s(kk)+1.4),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2; const doneA=s(22),doneB=doneA+2.4;
  const hullTop=840-0, ly=(i:number)=>BASE-STEP*i;
  return <AbsoluteFill style={{background:'#5b8db8'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <defs><linearGradient id="sk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3d6fb0"/><stop offset="1" stopColor="#d8ecf7"/></linearGradient></defs>
    <rect width={1080} height={1920} fill="url(#sk2)"/>
    <circle cx={900} cy={560} r={70} fill="#ffd23c"/><circle cx={900} cy={560} r={105} fill="#ffd23c" opacity={.25}/>
    {[0,1,2].map(i=><ellipse key={i} cx={((t*12+i*430)%1500)-200} cy={520+i*70} rx={140} ry={30} fill="#fff" opacity={.5}/>)}
    {/* Pier + Lineal */}
    <g>
      <rect x={950} y={760} width={70} height={1160} fill="#8b6a46" stroke={N} strokeWidth={7}/>
      {Array.from({length:7}).map((_,i)=><line key={i} x1={950} y1={BASE-i*STEP} x2={i%5===0?990:975} y2={BASE-i*STEP} stroke={N} strokeWidth={5}/>)}
      <text x={940} y={BASE+10} textAnchor="end" fontFamily={FONT} fontWeight={700} fontSize={38} fill={N}>0</text>
      <text x={940} y={BASE-RISE+10} textAnchor="end" fontFamily={FONT} fontWeight={700} fontSize={38} fill={N}>{X.m}</text>
    </g>
    {/* Schiff */}
    <g transform={`translate(0 ${90-shipLift+bob})`}>
      <polygon points="200,840 860,840 780,1460 300,1460" fill="#b5442f" stroke={N} strokeWidth={9} strokeLinejoin="round"/>
      <rect x={200} y={828} width={660} height={26} fill="#efe8d8" stroke={N} strokeWidth={7}/>
      <rect x={430} y={640} width={240} height={190} fill="#efe8d8" stroke={N} strokeWidth={8}/>
      <rect x={470} y={690} width={60} height={60} fill="#a9c7e8" stroke={N} strokeWidth={5}/><rect x={570} y={690} width={60} height={60} fill="#a9c7e8" stroke={N} strokeWidth={5}/>
      <rect x={535} y={560} width={30} height={90} fill="#3a4a5e" stroke={N} strokeWidth={6}/>
      {[0,1,2,3].map(i=><circle key={i} cx={300+i*160} cy={1000} r={30} fill="#a9c7e8" stroke={N} strokeWidth={7}/>)}
      {/* Kapitän */}
      <g transform="translate(360 840) scale(.44)" dangerouslySetInnerHTML={{__html:person(0,0,'anil',{tag:false,look:-6,grin:false})}}/>
      {/* Leiter an der Bordwand (hängt am Schiff) */}
      <g>
        <line x1={238} y1={840} x2={238} y2={BASE-90+8} stroke={N} strokeWidth={16}/><line x1={296} y1={840} x2={296} y2={BASE-90+8} stroke={N} strokeWidth={16}/>
        <line x1={238} y1={840} x2={238} y2={BASE-90+8} stroke="#d9b77a" strokeWidth={8}/><line x1={296} y1={840} x2={296} y2={BASE-90+8} stroke="#d9b77a" strokeWidth={8}/>
        {Array.from({length:12}).map((_,i)=>{const isWet=(BASE-shipLift-STEP*i)>yw+3;return <line key={i} x1={238} y1={ly(i)-90} x2={296} y2={ly(i)-90} stroke={isWet?R:N} strokeWidth={isWet?16:12} strokeLinecap="round"/>;})}
      </g>
    </g>
    {/* Wasser */}
    <path d={`M0 ${yw} Q 135 ${yw-14} 270 ${yw} T 540 ${yw} T 810 ${yw} T 1080 ${yw} L1080 1920 L0 1920 Z`} fill="#2a7fb8" opacity={.82} stroke={N} strokeWidth={6}/>
    <line x1={0} y1={yw} x2={1080} y2={yw} stroke="#bfe3f7" strokeWidth={5} opacity={.7}/>
    {showChip&&<g transform="translate(540 1700)"><rect x={-330} y={-70} width={660} height={140} rx={34} fill={C} stroke={N} strokeWidth={9}/><text x={-290} y={22} fontFamily={FONT} fontWeight={700} fontSize={50} fill={N}>{X.chip}</text><text x={290} y={30} textAnchor="end" fontFamily={FONT} fontWeight={700} fontSize={90} fill={chipCol}>{chipTxt}</text></g>}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-400} y={-100} width={800} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={104} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const SchiffDE:React.FC=()=><Schiff lang="de"/>;
export const SchiffEN:React.FC=()=><Schiff lang="en"/>;
