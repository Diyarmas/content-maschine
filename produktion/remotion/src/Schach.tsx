import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign,bubble} from './kit';
import WD from './w_schach_de.json'; import WE from './w_schach_en.json';
const L={
 de:{W:WD,opa:'OPA HEINZ',kid:'MIA',sol:'LÖSUNG',done:'UNMÖGLICH!',bet:'10 €',
  cards:{0:['SIEHT MACHBAR AUS…','IST ES ABER NICHT'],1:['64','FELDER'],2:['2 ECKEN','RAUS'],3:['62 FELDER','ÜBRIG'],4:['31','DOMINOSTEINE'],5:['1 STEIN =','2 FELDER'],6:['WETTE:','10 EURO'],7:['GEWINNT','MIA?'],13:['NEIN!','UNMÖGLICH'],14:['JEDER STEIN:','1 WEISS + 1 SCHWARZ'],15:['BEIDE ECKEN:','GLEICHE FARBE'],16:['30 GEGEN','32'],17:['31 STEINE BRAUCHEN','31 + 31']}},
 en:{W:WE,opa:'GRANDPA GEORGE',kid:'AVA',sol:'ANSWER',done:'IMPOSSIBLE!',bet:'£10',
  cards:{0:['LOOKS DOABLE…','BUT IT ISN\'T'],1:['64','SQUARES'],2:['2 CORNERS','CUT OUT'],3:['62 SQUARES','LEFT'],4:['31','DOMINOES'],5:['1 DOMINO =','2 SQUARES'],6:['THE BET:','10 POUNDS'],7:['DOES AVA','WIN?'],13:['NO!','IMPOSSIBLE'],14:['EVERY DOMINO:','1 WHITE + 1 BLACK'],15:['BOTH CORNERS:','SAME COLOUR'],16:['30 VS','32'],17:['31 DOMINOES NEED','31 + 31']}},
};
const OPA={n:'',c:'#6a4c93',hair:'bald',hc:'#ddd',skin:'#f1c7a3',h:500,beard:'#e6e6e6',glasses:1};
const KID={n:'',c:'#f4a261',hair:'ponytail',hc:'#7a4a2a',skin:'#f6d2b5',h:400};
const CS=100,BX=140,BY=640;
// Platzierte Dominos (versuchte Belegung, 2 Felder bleiben frei)
const DOM:[number,number,boolean][]=[];
for(let r=0;r<8;r++){for(let c=0;c<8;c+=2){if(r===0&&c===0){DOM.push([0,1,true]);continue;}DOM.push([r,c,false]);}}
const Schach:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(12);
  const cut=t>=s(2)?eio(cl((t-s(2))/.6)):0;
  const isDark=(r:number,c:number)=>(r+c)%2===1;
  const removed=(r:number,c:number)=>(r===0&&c===7)||(r===7&&c===0);
  const placeN=t>=s(4)&&t<s(12)?Math.min(29,Math.floor((t-s(4))/(s(8)-s(4))*29)):0;
  const sq=(r:number,c:number)=>{const x=BX+c*CS,y=BY+r*CS;const rem=removed(r,c);const dark=isDark(r,c);
    const hl=t>=s(15)&&rem;const cnt=t>=s(16)&&!rem;
    return <rect key={r+'-'+c} x={x} y={y} width={CS} height={CS} fill={dark?'#3b2a20':'#f3e1c2'} opacity={rem?1-cut:1} stroke={hl?R:N} strokeWidth={hl?8:2}/>;};
  // Dominos: Liste so dass Ecken frei, einfache Zeilenbelegung (wird nicht vollständig)
  const doms:[number,number,number,number][]=[];
  for(let r=0;r<8;r++){for(let c=0;c<7;c+=2){const a:[number,number]=[r,c],b:[number,number]=[r,c+1];if(removed(...a)||removed(...b))continue;doms.push([r,c,r,c+1]);}}
  return <AbsoluteFill style={{background:'#2f3e46'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1040)}>
    <rect width={1080} height={1920} fill="#354f52"/>
    <rect x={BX-30} y={BY-30} width={8*CS+60} height={8*CS+60} rx={20} fill="#8a5a32" stroke={N} strokeWidth={10}/>
    {[...Array(8)].map((_,r)=>[...Array(8)].map((_,c)=>sq(r,c)))}
    {t>=s(2)&&t<s(4)&&[[0,7],[7,0]].map(([r,c],k)=><g key={k} transform={`translate(${BX+c*CS+50} ${BY+r*CS+50}) scale(${1+cut*.2})`} opacity={1-cl((t-s(3))/.6)}><path d="M-40 -40 L40 40 M40 -40 L-40 40" stroke={R} strokeWidth={14} strokeLinecap="round"/></g>)}
    {doms.slice(0,placeN).map(([r1,c1,r2,c2],i)=><rect key={'d'+i} x={BX+c1*CS+8} y={BY+r1*CS+8} width={(c2-c1+1)*CS-16} height={(r2-r1+1)*CS-16} rx={16} fill="#fff8e6" stroke={N} strokeWidth={6} opacity={t>=s(13)?.25:1}/>)}
    {t>=s(15)&&t<e(16)&&[[0,7],[7,0]].map(([r,c],k)=><rect key={'rc'+k} x={BX+c*CS+4} y={BY+r*CS+4} width={CS-8} height={CS-8} fill="#3b2a20" opacity={.6} stroke={R} strokeWidth={10} strokeDasharray="16 8"/>)}
    {t>=s(14)&&t<s(16)&&<g transform={`translate(${BX+3*CS} ${BY+3*CS})`}><rect x={0} y={0} width={2*CS} height={CS} fill="none" stroke={G} strokeWidth={14} rx={12}/><circle cx={CS/2} cy={CS/2} r={22} fill="#fff" stroke={N} strokeWidth={4}/><circle cx={1.5*CS} cy={CS/2} r={22} fill="#222" stroke={N} strokeWidth={4}/></g>}
    {fig(150,1900,'opa_'+lang,OPA,X.opa,1.0,{look:6})}
    {fig(930,1900,'kid_'+lang,KID,X.kid,1.0,{look:-6})}
    {tag(150,1880,X.opa,'#fff',N,30)}{tag(930,1880,X.kid,'#fff',N,34)}
    {t>=s(6)&&t<s(16)&&tag(540,1600,X.bet,Y,N,64)}
    </g>
    {t>=s(16)&&t<e(17)+.3&&<g><g transform={`translate(400 1600) scale(${PB(t,s(16),.3)*.85})`}><rect x={-150} y={-60} width={300} height={120} rx={20} fill="#3b2a20" stroke={N} strokeWidth={7}/><text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill="#fff">30</text></g><g transform={`translate(680 1600) scale(${PB(t,s(16)+.3,.3)*.85})`}><rect x={-150} y={-60} width={300} height={120} rx={20} fill="#f3e1c2" stroke={N} strokeWidth={7}/><text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill={N}>32</text></g></g>}
    {t>=s(7)&&t<s(12)&&qb(t,540,560,1.2)}
    {vign}
    {cards(t,S,X.cards,[7])}
    {countdown(t,S,[9,10,11])}
    {stamp(t,sol,.8,X.sol)}
    {stamp(t,e(18)+.2,2.2,X.done,700,104)}
    {flash(t,s(13))}
   </svg>
  </AbsoluteFill>;
};
export const SchachDE:React.FC=()=><Schach lang="de"/>;
export const SchachEN:React.FC=()=><Schach lang="en"/>;
