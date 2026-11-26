import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,sents,cards,countdown,stamp,qb,num,tag,fig,cam,flash,vign} from './kit';
import WE from './w_crates_en.json';
const X={W:WE,sol:'ANSWER',done:'PULL FROM "MIXED"!',
 cards:{0:['90% GET','THIS WRONG'],1:['3 CRATES:','APPLES, PEARS, MIXED'],2:['EVERY LABEL','IS WRONG'],3:['ONLY','ONE FRUIT'],4:['THEN FIX','ALL 3 LABELS'],5:['WHICH CRATE?'],12:['CRATE 3:','"MIXED"'],13:['LABEL WRONG =','ONLY ONE KIND'],14:['AN APPLE?','APPLE CRATE!'],15:['"PEARS" =','MIXED'],16:['"APPLES" =','PEARS']} as Record<number,string[]>};
const TOM={n:'',c:'#2a9d8f',hair:'short',hc:'#6b4226',skin:'#f1c7a3',h:510,beard:'#6b4226'};
const CX=[200,540,880];const OLD=['APPLES','PEARS','MIXED'];
const apple=(x:number,y:number,s=1)=><g transform={`translate(${x} ${y}) scale(${s})`}><circle r={30} fill="#e63946" stroke={N} strokeWidth={5}/><path d="M0 -30 q4 -14 12 -18" stroke="#6b4226" strokeWidth={6} fill="none"/><ellipse cx={14} cy={-34} rx={10} ry={5} fill="#52b788"/></g>;
const pear=(x:number,y:number,s=1)=><g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0 -36 C-14 -36 -12 -12 -24 4 C-36 22 -20 38 0 38 C20 38 36 22 24 4 C12 -12 14 -36 0 -36Z" fill="#b5d334" stroke={N} strokeWidth={5}/><path d="M0 -36 l2 -14" stroke="#6b4226" strokeWidth={6}/></g>;
const Crates:React.FC=()=>{
  const f=useCurrentFrame(),t=f/30,S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(11);
  const contents=['pears','mixed','apples'];
  const reveal=(i:number)=>i===2?t>=s(14):i===1?t>=s(15):t>=s(16);
  const newLab=['PEARS','MIXED','APPLES'];
  const pull=t>=s(14)?eio(cl((t-s(14))/.7)):0;
  const crate=(i:number)=>{const x=CX[i],y=1560;const show=reveal(i);const hi=t>=s(12)&&i===2;
    const fruits=contents[i];
    return <g key={i}>
      {show&&[0,1,2,3,4].map(k=>{const fx=x-100+k*50,fy=y-110-(k%2)*18;return fruits==='apples'||(fruits==='mixed'&&k%2===0)?<g key={k}>{apple(fx,fy,.9)}</g>:<g key={k}>{pear(fx,fy,.9)}</g>;})}
      <rect x={x-150} y={y-110} width={300} height={190} rx={12} fill="#c98b4a" stroke={hi?G:N} strokeWidth={hi?14:8}/>
      {[0,1,2].map(k=><rect key={k} x={x-150} y={y-100+k*62} width={300} height={10} fill="#a86f35"/>)}
      {!show&&<rect x={x-130} y={y-130} width={260} height={30} rx={8} fill="#5a3a1a" stroke={N} strokeWidth={5}/>}
      <g transform={`translate(${x} ${y+20})`}>
        <rect x={-110} y={-36} width={220} height={72} rx={14} fill={show?'#bff0d8':'#fff'} stroke={N} strokeWidth={6}/>
        <text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={46} fill={N}>{show?newLab[i]:OLD[i]}</text>
        {!show&&t>=s(2)&&t<s(12)&&<line x1={-100} y1={22} x2={100} y2={-22} stroke={R} strokeWidth={8} opacity={.85}/>}
      </g>
      {num(x,y+150,i+1,hi,46)}
    </g>;};
  return <AbsoluteFill style={{background:'#ffe8b0'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1250)}>
    <rect width={1080} height={1920} fill="#ffe3a3"/>
    <rect y={1380} width={1080} height={540} fill="#c9a26b"/>
    {/* Markise */}
    {[...Array(8)].map((_,i)=><path key={i} d={`M${i*135} 460 L${i*135+135} 460 L${i*135+135} 560 Q${i*135+67} 610 ${i*135} 560Z`} fill={i%2?'#fff':'#e63946'} stroke={N} strokeWidth={6}/>)}
    <rect x={0} y={440} width={1080} height={24} fill="#7a4a28" stroke={N} strokeWidth={6}/>
    <rect x={40} y={460} width={24} height={960} fill="#7a4a28" stroke={N} strokeWidth={5}/><rect x={1016} y={460} width={24} height={960} fill="#7a4a28" stroke={N} strokeWidth={5}/>
    {fig(540,1420,'tom_en',TOM,'TOM',1.45,{look:0,arm:t>=s(14)&&t<s(15)?'up':'down'})}
    
    <rect x={0} y={1640} width={1080} height={280} fill="#8a5a32" stroke={N} strokeWidth={8}/>
    {[0,1,2].map(crate)}
    {pull>0&&t<s(16)&&<g transform={`translate(${CX[2]} ${1430-300*pull})`}>{apple(0,0,1.8)}</g>}
    </g>
    {t>=s(5)&&t<s(11)&&<g>{qb(t,CX[0],1300)}{qb(t,CX[1],1300)}{qb(t,CX[2],1300)}</g>}
    {vign}
    {cards(t,S,X.cards,[5])}
    {countdown(t,S,[8,9,10])}
    {stamp(t,sol,.8,X.sol)}
    {stamp(t,e(17)+.2,2.2,X.done,900,80)}
    {flash(t,s(12))}
   </svg>
  </AbsoluteFill>;
};
export const CratesEN:React.FC=()=><Crates/>;
