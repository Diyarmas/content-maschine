import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,W,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person,PPL} = require('./figs.js');
import WDE from './words_moench_de.json';
import WEN from './words_moench_en.json';
PPL.tenzin={n:'TENZIN',c:'#e08a1e',hair:'bald',hc:'#1a1a1a',skin:'#d9a679',h:500};
PPL.abt={n:'ABT',c:'#7b2d26',hair:'bald',hc:'#d9d9d9',skin:'#f1c7a3',h:510,beard:'#d9d9d9'};
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const TXT={
 de:{cards:{0:['MÖNCH + BERG','+ WETTE'],1:['TAG 1:','AUFSTIEG'],2:['NACHT IM','KLOSTER'],3:['TAG 2:','ABSTIEG'],5:['GLEICHE STELLE','GLEICHE UHRZEIT'],6:['TENZIN:','"UNMÖGLICH!"'],7:['MAL SCHNELL','MAL LANGSAM'],9:['WER HAT','RECHT?'],18:['EIN','DOPPELGÄNGER'],19:['GLEICHER WEG','GEGENVERKEHR']} as Record<number,string[]>,
  sol:'LÖSUNG',done:'ABT HATTE RECHT!',day1:'TAG 1',day2:'TAG 2',same:'GLEICHE UHRZEIT'},
 en:{cards:{0:['MONK + MOUNTAIN','+ A BET'],1:['DAY 1:','CLIMB'],2:['NIGHT AT','MONASTERY'],3:['DAY 2:','DESCENT'],5:['SAME SPOT','SAME TIME'],6:['TENZIN:','"IMPOSSIBLE!"'],7:['FAST, SLOW','BREAKS'],9:['WHO IS','RIGHT?'],18:['A','DOUBLE'],19:['SAME PATH','OPPOSITE WAY']} as Record<number,string[]>,
  sol:'ANSWER',done:'ABBOT WAS RIGHT!',day1:'DAY 1',day2:'DAY 2',same:'SAME TIME'}};
const PATH:[number,number][]=[[130,1560],[560,1480],[250,1370],[680,1270],[330,1160],[720,1060],[420,950],[740,850],[540,760]];
const LEN:number[]=[];let tot=0;PATH.forEach((p,i)=>{if(i){tot+=Math.hypot(p[0]-PATH[i-1][0],p[1]-PATH[i-1][1]);}LEN.push(tot);});
function at(pos:number){const d=cl(pos)*tot;let i=1;while(i<LEN.length-1&&LEN[i]<d)i++;const a=PATH[i-1],b=PATH[i];const u=(d-LEN[i-1])/(LEN[i]-LEN[i-1]);return {x:lerp(a[0],b[0],u),y:lerp(a[1],b[1],u),dir:b[0]>a[0]?1:-1};}
const aUp=(u:number)=>u-.99*Math.sin(4*Math.PI*u)/(4*Math.PI);          // Aufstieg, mal schnell mal Pause
const aDn=(u:number)=>1-(.35*u+.65*Math.pow(u,2.2));                     // Abstieg
let uStar=.5;{let lo=0,hi=1;for(let i=0;i<60;i++){const m=(lo+hi)/2;if(aUp(m)<aDn(m))lo=m;else hi=m;}uStar=(lo+hi)/2;}
const MEET=at(aUp(uStar));
function fig(k:string,pos:{x:number;y:number;dir:number},t:number,o:{sc?:number;op?:number;grin?:boolean;walk?:boolean}={}){
  const sc=(o.sc??.36)*1.45;const bob=o.walk?Math.abs(Math.sin(t*7))*-8:0;
  const g=person(0,0,k,{tag:false,look:pos.dir*6,grin:!!o.grin});
  return <g opacity={o.op??1} transform={`translate(${pos.x} ${pos.y+bob}) scale(${sc*pos.dir*-1===0?sc:sc})`} dangerouslySetInnerHTML={{__html:g}}/>;
}
const Moench:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=TXT[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  // Tageszeit: Nacht in Satz 2
  const night=eio(cl((t-s(2))/1.2))*(1-eio(cl((t-s(3)+.3)/1.0)));
  const sunUp=eio(cl(t/3));
  const sunY=lerp(1050,520,sunUp*(1-night*0.0));
  const skyTop=night>0.5?'#0b1126':'#3d6fb0';
  const aT=cl((t-(s(1)+.4))/(s(2)-s(1)-.8)); const dT=cl((t-(s(3)+.3))/(s(4)-s(3)-.6));
  let tenzinPos=at(0), moving=false;
  if(t<s(1)+.4)tenzinPos=at(0);
  else if(t<s(3)){tenzinPos=at(aUp(aT));moving=aT>0&&aT<1;}
  else if(t<s(5)){tenzinPos=at(aDn(dT));moving=dT>0&&dT<1;}
  else tenzinPos=at(0);
  // Lösungsphase
  const solA=s(18)+.6, solB=s(21);
  const uS=t<solA?0:Math.min(uStar,uStar*cl((t-solA)/(solB-solA)));
  const solMode=t>=s(18);
  let tz=tenzinPos, dbl=at(0);
  if(solMode){tz=at(aDn(uS));dbl=at(aUp(uS));}
  const met=solMode&&t>solB-.05;
  const abtOn=t>s(5)&&t<s(10);
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const c:Card={a:s(kk),b:Math.max(e(kk)+.3,s(kk)+1.4),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2;
  const doneA=s(22),doneB=doneA+2.4;
  const pathD='M'+PATH.map(p=>p.join(' ')).join(' L');
  const dayChip=t>s(1)&&t<s(3)?X.day1:(t>=s(3)&&t<s(5)?X.day2:'');
  return <AbsoluteFill style={{background:'#0d1a30'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <defs>
      <linearGradient id="skd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={skyTop}/><stop offset=".7" stopColor={night>.5?'#232d5a':'#ffb870'}/><stop offset="1" stopColor={night>.5?'#3a3f78':'#ffe3a0'}/></linearGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#skd)"/>
    {night>.1&&Array.from({length:40}).map((_,i)=><circle key={i} cx={(i*263)%1080} cy={((i*131)%700)+40} r={1.5+(i%3)} fill="#fff" opacity={night*(.4+.3*Math.sin(t*2+i))}/>)}
    {night>.1?<circle cx={190} cy={380} r={70} fill="#f3efd2" opacity={night}/>:<g><circle cx={880} cy={sunY} r={110} fill="#fff1a8" opacity={.5}/><circle cx={880} cy={sunY} r={70} fill="#ffd23c"/></g>}
    {/* Berge */}
    <polygon points="0,1500 260,900 480,1300 760,640 1080,1250 1080,1920 0,1920" fill="#6b7fa8" opacity={night>.5?.5:.8}/>
    <polygon points="0,1700 330,1150 640,720 940,1200 1080,1500 1080,1920 0,1920" fill={night>.5?'#2a3a2e':'#6fa05a'} stroke={N} strokeWidth={8}/>
    <path d={pathD} fill="none" stroke={N} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round"/>
    <path d={pathD} fill="none" stroke="#e8d2a0" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round"/>
    {/* Kloster */}
    <g transform="translate(540 690)"><rect x={-110} y={-100} width={220} height={110} fill="#e9e4d6" stroke={N} strokeWidth={7}/><polygon points="-130,-100 130,-100 0,-190" fill="#b5442f" stroke={N} strokeWidth={7}/><rect x={-26} y={-60} width={52} height={70} fill={night>.5?'#ffd23c':'#5a3f2e'}/></g>
    {/* Abt */}
    {abtOn&&<g opacity={P(t,s(5),.4)}>{fig('abt',{x:660,y:760,dir:1},t,{sc:.34})}</g>}
    {/* Figuren */}
    {!solMode&&fig('tenzin',tenzinPos,t,{walk:moving,grin:t>s(6)&&t<s(8)})}
    {solMode&&fig('tenzin',tz,t,{walk:!met})}
    {solMode&&fig('tenzin',dbl,t,{walk:!met,op:.6})}
    {met&&<g><circle cx={MEET.x} cy={MEET.y-100} r={120+Math.sin(t*9)*6} fill="none" stroke={R} strokeWidth={10}/></g>}
    {/* Tages-Chip */}
    {dayChip&&<g transform="translate(160 1750)"><rect x={-120} y={-52} width={240} height={90} rx={26} fill={C} stroke={N} strokeWidth={8}/><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill={N}>{dayChip}</text></g>}
    {solMode&&t<s(23)&&<g transform="translate(540 1760)"><rect x={-300} y={-56} width={600} height={100} rx={28} fill={C} stroke={N} strokeWidth={8}/><text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={54} fill={N}>{X.same}</text></g>}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-440} y={-100} width={880} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={38} fontFamily={FONT} fontWeight={700} fontSize={90} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const MoenchDE:React.FC=()=><Moench lang="de"/>;
export const MoenchEN:React.FC=()=><Moench lang="en"/>;
