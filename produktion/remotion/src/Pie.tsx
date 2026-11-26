import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,CAST,sents,cards,countdown,stamp,qb,num,tag,fig,cam,flash,vign,bubble} from './kit';
import WE from './w_cake_en.json';
const X={W:WE,sol:'ANSWER',done:'IT WAS LILY!',
 cards:{0:['ONLY ONE','TELLS THE TRUTH'],1:['FIND','THE THIEF'],2:['A CHERRY PIE','COOLING'],3:['10 MINUTES LATER:','GONE!'],8:['ONLY 1','TRUTH!'],9:['WHO STOLE','THE PIE?'],15:['LILY!'],16:['EMMA TRUE?','THEN 2 TRUTHS'],17:['EMMA LIES,','JACK INNOCENT'],18:['JACK TELLS','THE TRUTH'],19:['LILY LIES –','SHE TOOK IT']} as Record<number,string[]>,
 say:{5:['JACK','DID IT!'],6:['I DIDN\'T','DO IT!'],7:['I DIDN\'T','EITHER!']} as Record<number,string[]>};
const P3=[{n:'',c:'#e76f51',hair:'long',hc:'#7a4a2a',skin:'#f1c7a3',h:480},{n:'',c:'#3d7ea6',hair:'short',hc:'#e8c25a',skin:'#f1c7a3',h:515},{n:'',c:'#9b5de5',hair:'ponytail',hc:'#2b1d14',skin:'#e0a77f',h:470}];
const NAMES=['EMMA','JACK','LILY'];const XS=[200,540,880];
const Pie:React.FC=()=>{
  const f=useCurrentFrame(),t=f/30,S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(14),solved=t>=s(15);
  const talk=Object.entries(X.say).find(([k])=>t>=s(+k)-.1&&t<e(+k)+.4);
  const pieGone=t>=s(3);
  const verdict=(i:number)=>i===0?t>=s(17):i===1?t>=s(18):t>=s(19);
  const vtxt=['LIE','TRUE','LIE'];
  return <AbsoluteFill style={{background:'#cfe8ff'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1200)}>
    <rect width={1080} height={1920} fill="#bfe3ff"/>
    {/* Haus mit Fenster */}
    <rect x={0} y={330} width={1080} height={640} fill="#f4d9b0" stroke={N} strokeWidth={8}/>
    <g transform="translate(540 640) scale(1.35)"><rect x={-230} y={-200} width={460} height={330} rx={12} fill="#2a3358" stroke={N} strokeWidth={10}/><rect x={-210} y={-180} width={200} height={290} fill="#9ad1ff" opacity={.5}/><path d="M-260 130 L260 130 L280 170 L-280 170Z" fill="#fff" stroke={N} strokeWidth={8}/>
      <ellipse cy={118} rx={140} ry={26} fill="#fff" stroke={N} strokeWidth={6}/>
      {!pieGone?<g><path d="M-110 112 Q0 40 110 112Z" fill="#e0a35a" stroke={N} strokeWidth={6}/>{[-60,-20,20,60].map(x=><circle key={x} cx={x} cy={88} r={12} fill="#c0392b" stroke={N} strokeWidth={4}/>)}{t>=s(2)&&[0,1,2].map(k=><path key={k} d={`M${-40+k*40} 40 q14 -20 0 -40`} stroke="#fff" strokeWidth={6} fill="none" opacity={.7}/>)}</g>:
       <g>{[[-50,108],[-10,112],[30,106],[70,110]].map(([x,y],k)=><circle key={k} cx={x} cy={y} r={6} fill="#c98b4a"/>)}</g>}
    </g>
    <rect y={940} width={1080} height={980} fill="#9fd07a"/>
    <rect y={940} width={1080} height={30} fill="#7fb35a"/>
    {[0,1,2].map(i=>{const hi=solved&&i===2,op=solved&&i!==2?.5:1;const bob=talk&&+talk[0]===5+i?Math.sin(t*10)*5:0;
      return <g key={i}>{fig(XS[i],1700+bob,'pie_'+i,P3[i],NAMES[i],1.5,{look:i===2&&t>=s(9)&&t<s(15)?6:0},op)}
       {i===2&&t>=s(19)+.3&&[[-20,0],[10,8],[25,-6]].map(([dx,dy],k)=><circle key={k} cx={XS[2]+dx} cy={1060+dy} r={9} fill="#c98b4a"/>)}</g>;})}
    </g>
    {[0,1,2].map(i=>t>=s(4)&&<g key={'n'+i}>{num(XS[i],1770,i+1,solved&&i===2,46)}{tag(XS[i],1865,NAMES[i],solved&&i!==2?'#bbb':'#fff',N,42)}</g>)}
    {[0,1,2].map(i=>verdict(i)&&<g key={'v'+i} transform={`translate(${XS[i]} 900) scale(${PB(t,i===0?s(17):i===1?s(18):s(19),.3)})`}><rect x={-90} y={-40} width={180} height={80} rx={20} fill={vtxt[i]==='TRUE'?G:R} stroke={N} strokeWidth={6}/><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={48} fill="#fff">{vtxt[i]}</text></g>)}
    {talk&&bubble(Math.min(Math.max(XS[+talk[0]-5],250),830),900,talk[1],PB(t,s(+talk[0])-.1,.3),58)}
    {t>=s(9)&&t<s(15)&&<g>{XS.map((x,i)=><g key={'q'+i}>{qb(t,x,900,1)}</g>)}</g>}
    {vign}
    {cards(t,S,X.cards,[9])}
    {countdown(t,S,[11,12,13])}
    {stamp(t,sol,.8,X.sol)}
    {stamp(t,e(19)+.2,2.2,X.done,760,96)}
    {flash(t,s(15))}
   </svg>
  </AbsoluteFill>;
};
export const PieEN:React.FC=()=><Pie/>;
