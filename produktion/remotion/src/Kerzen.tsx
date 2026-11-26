import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,CAST,sents,cards,countdown,stamp,qb,num,tag,fig,cam,flash,vign,bubble} from './kit';
import WD from './w_kerzen_de.json'; import WE from './w_kerzen_en.json';
const L={
 de:{W:WD,oma:'OMA HILDE',sol:'LÖSUNG',done:'LÄNGSTE = ZUERST AUS!',puff:'PUFF!',
  cards:{0:['FAST ALLE','WÄHLEN FALSCH'],1:['STROMAUSFALL','BEI OMA HILDE'],2:['5 KERZEN,','GLEICH LANG'],3:['EINE NACH','DER ANDEREN AUS'],5:['ALLE UNTER-','SCHIEDLICH LANG'],6:['WELCHE','ZUERST AUS?'],12:['DIE LÄNGSTE:','NUMMER 4!'],13:['AM KÜRZESTEN','GEBRANNT'],14:['FRÜH AUS =','WENIG WACHS WEG'],15:['DIE KÜRZESTE','BRANNTE AM LÄNGSTEN']}},
 en:{W:WE,oma:'GRANDMA ROSE',sol:'ANSWER',done:'LONGEST = FIRST OUT!',puff:'PUFF!',
  cards:{0:['ALMOST EVERYONE','PICKS WRONG'],1:['POWER CUT AT','GRANDMA ROSE\'S'],2:['5 CANDLES,','SAME LENGTH'],3:['BLOWN OUT','ONE BY ONE'],5:['ALL DIFFERENT','LENGTHS'],6:['WHICH ONE','WENT OUT FIRST?'],12:['THE LONGEST:','NUMBER 4!'],13:['BURNED THE','SHORTEST TIME'],14:['OUT EARLY =','LESS WAX GONE'],15:['THE SHORTEST','BURNED LONGEST']}},
};
const FIN=[.45,.7,.25,.85,.55];const ORDER=[3,1,4,0,2];const CX=[120,330,540,750,960];
const OMA={n:'',c:'#9b5de5',hair:'bun',hc:'#d9d9d9',skin:'#f1c7a3',h:470,glasses:1};
const Kerzen:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(11),solved=t>=s(12);
  const dark=t>=s(3)&&t<s(4)+.2; const lightBack=t>=s(4);
  const outT=(i:number)=>{const k=ORDER.indexOf(i);return s(3)+.4+(e(3)-s(3))*(k+1)/6;};
  const len=(i:number)=>{if(t<s(2)||(t>=s(3)&&t<s(4)+.2))return 1; if(!lightBack&&t<s(3))return 1-.03*(t-s(2)); return FIN[i];};
  const lit=(i:number)=>t>=s(2)-.2&&(t<s(3)||(dark&&t<outT(i)));
  const H=560,baseY=1520;
  const candle=(i:number)=>{const h=H*len(i),x=CX[i],top=baseY-h;const hi=solved&&i===3;const lo=t>=s(15)&&i===2;
    return <g key={i}>
      <rect x={x-50} y={top} width={100} height={h} rx={8} fill={['#f7f0e1','#ffe0e9','#e5f4ff','#fff3c4','#e8ffe5'][i]} stroke={hi?G:lo?R:N} strokeWidth={hi||lo?12:7}/>
      <path d={`M${x-50} ${top+18} q16 26 34 4 q14 30 32 2 q16 26 34 4`} fill="none" stroke="#e8dcc0" strokeWidth={6}/>
      <line x1={x} y1={top} x2={x} y2={top-22} stroke={N} strokeWidth={6} strokeLinecap="round"/>
      {lit(i)&&(()=>{const fl=1+.1*Math.sin(t*18+i*2);return <g transform={`translate(${x} ${top-22}) scale(${fl} ${1+(fl-1)*2})`}><circle r={70} cy={-30} fill="#ffcf6b" opacity={.22}/><path d="M0 0 C-22 -4 -26 -40 0 -86 C26 -40 22 -4 0 0Z" fill="#ff9a1f" stroke={N} strokeWidth={4}/><path d="M0 -4 C-10 -6 -12 -26 0 -48 C12 -26 10 -6 0 -4Z" fill="#ffe680"/></g>;})()}
      {!lit(i)&&t>=s(3)&&[0,1,2].map(k=><path key={k} d={`M${x} ${top-26-k*26} q14 -13 0 -26`} stroke="#bbb" strokeWidth={5} fill="none" opacity={.6*Math.max(0,1-(t-outT(i))/4)}/>)}
      <ellipse cx={x} cy={baseY+6} rx={80} ry={20} fill="#c9a24a" stroke={N} strokeWidth={6}/>
      {num(x,baseY+130,i+1,hi,52)}
    </g>;};
  const puffs=dark?ORDER.map((ci,k)=>{const a=outT(ci);return t>=a&&t<a+.7?<g key={k} transform={`translate(${CX[ci]} 820) scale(${PB(t,a,.25)})`} opacity={1-cl((t-a-.4)/.3)}><text textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill="#fff" stroke={N} strokeWidth={6} paintOrder="stroke">{X.puff}</text></g>:null;}):null;
  const roomLight=lightBack?1:dark?.06:t<s(2)?.55:.4;
  return <AbsoluteFill style={{background:'#000'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1200)}>
    <rect width={1080} height={1920} fill="#3b2f4a"/>
    <rect width={1080} height={1150} fill="#6b5b7a"/>
    {[...Array(9)].map((_,i)=><rect key={i} x={i*125} y={0} width={60} height={1150} fill="#5d4e6b" opacity={.6}/>)}
    <g transform="translate(860 520)"><rect x={-120} y={-150} width={240} height={300} rx={10} fill="#1d2540" stroke={N} strokeWidth={10}/><rect x={-108} y={-138} width={216} height={276} fill={lightBack?'#9ad1ff':'#22305a'}/><line x1={0} y1={-140} x2={0} y2={140} stroke={N} strokeWidth={8}/><line x1={-110} y1={0} x2={110} y2={0} stroke={N} strokeWidth={8}/></g>
    <g transform="translate(300 200)"><line x1={0} y1={-200} x2={0} y2={60} stroke={N} strokeWidth={6}/><path d="M-70 60 L70 60 L40 120 L-40 120Z" fill={lightBack?'#ffd56b':'#777'} stroke={N} strokeWidth={6}/>{lightBack&&<path d="M-90 130 L-260 600 L260 600 L90 130Z" fill="#fff5c0" opacity={.18}/>}</g>
    {fig(860,1520,'oma_'+lang,OMA,X.oma,1.25,{look:-6})}
    <rect x={0} y={1520} width={1080} height={40} rx={10} fill="#8a5a32" stroke={N} strokeWidth={8}/><rect x={0} y={1560} width={1080} height={360} fill="#6d4223" stroke={N} strokeWidth={8}/>
    {t>=s(2)-.3&&[0,1,2,3,4].map(candle)}
    {t>=s(1)&&t<s(2)-.3&&tag(860,1640,X.oma,'#fff',N,46)}
    </g>
    <rect width={1080} height={1920} fill="#05060c" opacity={1-roomLight}/>
    {dark&&ORDER.map(ci=>t<outT(ci)?<circle key={'g'+ci} cx={CX[ci]} cy={baseY-H-60} r={60} fill="#ffcf6b" opacity={.35+.1*Math.sin(t*15+ci)}/>:null)}
    {puffs}
    {t>=s(6)&&t<s(12)&&[0,1,2,3,4].map(i=><g key={'q'+i}>{qb(t,CX[i],840,.9)}</g>)}
    {solved&&t<e(13)&&<g transform={`translate(${CX[3]} 930)`}><path d="M0 -10 L-36 -70 L36 -70Z" fill={G} stroke={N} strokeWidth={6}/></g>}
    {vign}
    {cards(t,S,X.cards,[6])}
    {countdown(t,S,[8,9,10])}
    {stamp(t,sol,1.0,X.sol)}
    {stamp(t,e(15)+.3,2.2,X.done,940,74)}
    {flash(t,s(4))}{flash(t,s(12))}
   </svg>
  </AbsoluteFill>;
};
export const KerzenDE:React.FC=()=><Kerzen lang="de"/>;
export const KerzenEN:React.FC=()=><Kerzen lang="en"/>;
