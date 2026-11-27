import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign} from './kit';
import WE from './w_fackel_en.json';
const X={W:WE,sol:'ANSWER',done:'17 MINUTES EXACTLY!',
 cards:{0:['17 MINUTES','BEFORE IT COLLAPSES'],1:['MAX. 2 PEOPLE','ON THE BRIDGE'],2:['ONLY','ONE TORCH'],4:['PAIRS WALK AT','THE SLOWER PACE'],5:['ALL ACROSS IN','17 MINUTES?'],11:['YES,','IT WORKS!'],17:['SEND THE 2 SLOWEST','TOGETHER']} as Record<number,string[]>};
const P4=[{n:'SAM',t:1,b:{n:'',c:'#2a9d8f',hair:'short',hc:'#6b4226',skin:'#f1c7a3',h:430}},{n:'ELLA',t:2,b:{n:'',c:'#e76f51',hair:'long',hc:'#e8c25a',skin:'#f6d2b5',h:420}},{n:'NOAH',t:5,b:{n:'',c:'#3d7ea6',hair:'curly',hc:'#2b1d14',skin:'#b5835a',h:450}},{n:'BILL',t:10,b:{n:'',c:'#6a4c93',hair:'bald',hc:'#ddd',skin:'#f1c7a3',h:460,beard:'#ddd',glasses:1}}];
const LX=[200,280,360,440],RX=[640,720,800,880];
const Fackel:React.FC=()=>{
  const f=useCurrentFrame(),t=f/30,S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(10);
  // Schritte: [start-satz, wer, richtung(1=hin,-1=zurück), minuten nachher]
  const steps:[number,number[],number,number][]=[[12,[0,1],1,2],[13,[0],-1,3],[14,[2,3],1,13],[15,[1],-1,15],[16,[0,1],1,17]];
  const side=[0,0,0,0];let torch=0;let clock=0;const pos=[...LX];
  for(const [k,who,dir,m] of steps){const a=s(k),u=t>=a?eio(cl((t-a)/Math.min(1.6,(S[k].b-a)))):0;if(t<a)break;
    for(const w of who){const from=dir===1?LX[w]:RX[w],to=dir===1?RX[w]:LX[w];pos[w]=from+(to-from)*u;if(u>=1)side[w]=dir===1?1:0;}
    torch=u>=1?(dir===1?1:0):torch;clock=u>=1?m:clock;}
  for(let i=0;i<4;i++) if(t<s(12)) pos[i]=LX[i];
  const carrier=(()=>{for(let i=steps.length-1;i>=0;i--){const [k,who]=steps[i];if(t>=s(k))return who[0];}return 0;})();
  const timeShown=t>=s(12)?clock:0;
  return <AbsoluteFill style={{background:'#0b1026'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1250)}><g transform='translate(540 1330) scale(1.15) translate(-540 -1330)'>
    <rect width={1080} height={1920} fill="#0f1533"/>
    {[...Array(26)].map((_,i)=><circle key={i} cx={(i*137)%1080} cy={80+(i*71)%520} r={i%4?2:4} fill="#fff" opacity={.4+.4*Math.sin(t*2+i)}/>)}
    <circle cx={880} cy={220} r={70} fill="#fdf1b0" opacity={.9}/>
    <path d="M0 1330 L430 1330 L430 1920 L0 1920Z" fill="#3a3a52" stroke={N} strokeWidth={8}/>
    <path d="M650 1330 L1080 1330 L1080 1920 L650 1920Z" fill="#3a3a52" stroke={N} strokeWidth={8}/>
    <rect x={430} y={1330} width={220} height={590} fill="#05060f"/>
    {[...Array(9)].map((_,i)=><rect key={i} x={0+i*120} y={1322} width={90} height={22} rx={4} fill="#8a5a32" stroke={N} strokeWidth={4} transform={`rotate(${i>=3&&i<=5?Math.sin(t*2+i)*2:0} ${i*120+45} 1333)`}/>)}
    <path d="M0 1260 Q540 1300 1080 1260" stroke="#c9a24a" strokeWidth={6} fill="none"/>
    {[0,1,2,3].map(i=>{const p=P4[i];const sc=.85;return <g key={i}>{fig(pos[i],1330,'fk'+i,p.b,p.n,sc,{look:pos[i]>540?-6:6})}<g transform={`translate(${pos[i]} 1400)`}><rect x={-46} y={-28} width={92} height={56} rx={14} fill="#fff" stroke={N} strokeWidth={5}/><text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill={N}>{p.n}</text></g><g transform={`translate(${pos[i]} 1470)`}><circle r={30} fill={Y} stroke={N} strokeWidth={5}/><text y={11} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill={N}>{p.t}</text></g></g>;})}
    {(()=>{const x=pos[carrier]+40;const fl=1+.1*Math.sin(t*18);return <g transform={`translate(${x} 1060)`}><circle r={120} fill="#ffcf6b" opacity={.18}/><rect x={-8} y={0} width={16} height={90} fill="#6b4226" stroke={N} strokeWidth={4}/><path d={`M0 0 C-22 -4 -26 -40 0 -${70*fl} C26 -40 22 -4 0 0Z`} fill="#ff9a1f" stroke={N} strokeWidth={4}/></g>;})()}
    </g></g>
    {t>=s(3)&&t<s(5)&&tag(540,1650,'MINUTES: 1 · 2 · 5 · 10','#fff',N,52)}
    {t>=s(12)&&<g transform="translate(540 1650)"><rect x={-200} y={-70} width={400} height={140} rx={24} fill={timeShown===17?G:'#fff'} stroke={N} strokeWidth={8}/><text y={24} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={72} fill={N}>⏱ {timeShown} MIN</text></g>}
    {t>=s(5)&&t<s(10)&&qb(t,540,900,1.3)}
    {vign}
    {cards(t,S,X.cards,[5])}
    {countdown(t,S,[7,8,9])}
    {stamp(t,sol,.8,X.sol)}
    {stamp(t,e(17)+.2,2.2,X.done,900,80)}
   </svg>
  </AbsoluteFill>;
};
export const FackelEN:React.FC=()=><Fackel/>;
