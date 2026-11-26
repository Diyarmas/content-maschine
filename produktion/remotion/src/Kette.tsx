import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,CAST,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign,bubble} from './kit';
import WD from './w_kette_de.json'; import WE from './w_kette_en.json';
const L={
 de:{W:WD,boss:'WAGNER',app:'TIM',sol:'LÖSUNG',done:'NUR 1 SCHNITT!',day:'TAG',days:'7 TAGE',
  cards:{0:['EIN SCHNITT ZU VIEL','= LOHN RUINIERT'],1:['GOLDSCHMIED WAGNER','& GESELLE TIM'],2:['LOHN: KETTE','MIT 7 GLIEDERN'],3:['JEDEN ABEND','GENAU 1 GLIED'],4:['JEDER SCHNITT','KOSTET VIEL'],5:['DIE MEISTEN:','6 SCHNITTE'],7:['WIE OFT','MINDESTENS?'],13:['1 SCHNITT','REICHT!'],14:['DAS DRITTE','GLIED RAUS'],15:['TEILE:','1 + 2 + 4'],18:['TAUSCHEN','BIS TAG 7']}},
 en:{W:WE,boss:'CARTER',app:'SAM',sol:'ANSWER',done:'JUST 1 CUT!',day:'DAY',days:'7 DAYS',
  cards:{0:['ONE CUT TOO MANY','= PAY RUINED'],1:['GOLDSMITH CARTER','& APPRENTICE SAM'],2:['PAY: A CHAIN','WITH 7 LINKS'],3:['EVERY EVENING','EXACTLY 1 LINK'],4:['EVERY CUT','COSTS A FORTUNE'],5:['MOST PEOPLE:','6 CUTS'],7:['HOW FEW CUTS','DOES HE NEED?'],13:['1 CUT','IS ENOUGH!'],14:['CUT THE','THIRD LINK'],15:['PIECES:','1 + 2 + 4'],18:['SWAP UNTIL','DAY 7']}},
};
const BOSS={n:'',c:'#6a4c93',hair:'short',hc:'#9a9a9a',skin:'#f1c7a3',h:520,glasses:1,beard:'#9a9a9a'};
const APP={n:'',c:'#e76f51',hair:'curly',hc:'#6b4226',skin:'#f1c7a3',h:490};
const HOLD=[[1],[2],[2,1],[4],[4,1],[4,2],[4,2,1]];
const Kette:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(12);
  const cut=t>=s(14)+.4?eio(cl((t-s(14)-.4)/.6)):0;
  const sep=t>=s(15)?eio(cl((t-s(15))/.6)):0;
  const lx=(i:number)=>150+i*130+(i<2?-60*sep:i>2?60*sep:0);
  const ly=(i:number)=>1180+(i===2?110*sep:0);
  const link=(i:number)=>{const x=lx(i),y=ly(i),v=i%2===1;const open=i===2&&cut>0;
    return <g key={i} transform={`translate(${x} ${y})`}>
      <ellipse rx={v?40:82} ry={v?72:44} fill="none" stroke={N} strokeWidth={38}/>
      <ellipse rx={v?40:82} ry={v?72:44} fill="none" stroke="#f2c14e" strokeWidth={24} strokeDasharray={open?`${200} 40`:undefined}/>
      <ellipse rx={v?40:82} ry={v?72:44} cx={-6} cy={-6} fill="none" stroke="#fff3b0" strokeWidth={6} opacity={.7} strokeDasharray="40 200"/>
    </g>;};
  const cuts5=t>=s(5)&&t<s(7)?[0,1,2,3,4,5].map(i=>{const a=s(5)+.15*i;return t>=a?<g key={i} transform={`translate(${215+i*130} 1180) scale(${PB(t,a,.25)})`}><path d="M-26 -26 L26 26 M26 -26 L-26 26" stroke={R} strokeWidth={14} strokeLinecap="round"/></g>:null;}):null;
  const dayA=s(16),dayB=e(18);
  return <AbsoluteFill style={{background:'#2b2b33'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1180)}>
    <rect width={1080} height={1920} fill="#3e4a5c"/>
    {[...Array(8)].map((_,i)=><rect key={i} x={0} y={i*140} width={1080} height={70} fill="#384354" opacity={.6}/>)}
    <rect x={0} y={1000} width={1080} height={380} fill="#6d4223" stroke={N} strokeWidth={8}/>
    <rect x={0} y={1000} width={1080} height={30} fill="#8a5a32" stroke={N} strokeWidth={6}/>
    <g transform="translate(900 520)"><rect x={-120} y={-150} width={240} height={260} rx={14} fill="#fff" stroke={N} strokeWidth={8}/><rect x={-120} y={-150} width={240} height={70} rx={14} fill={R} stroke={N} strokeWidth={8}/><text y={-100} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff">{X.days}</text><text y={60} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={130} fill={N}>7</text></g>
    {fig(220,1010,'boss_'+lang,BOSS,X.boss,1.05,{look:6})}
    {fig(600,1010,'app_'+lang,APP,X.app,1.0,{look:-6})}
    {tag(220,1060,X.boss,'#fff',N,38)}{tag(600,1060,X.app,'#fff',N,38)}
    {t>=s(2)-.2&&[0,1,3,4,5,6,2].map(link)}
    {cuts5}
    {t>=s(14)&&t<s(15)+.4&&<g transform={`translate(${lx(2)+10} ${1060-30*Math.sin(t*20)})`}><circle cx={-22} cy={-50} r={22} fill="none" stroke={N} strokeWidth={10}/><circle cx={22} cy={-50} r={22} fill="none" stroke={N} strokeWidth={10}/><path d="M-12 -30 L18 60 M12 -30 L-18 60" stroke="#aaa" strokeWidth={14} strokeLinecap="round"/></g>}
    {sep>0&&<g opacity={sep}>{tag((lx(0)+lx(1))/2,1330,'2',G,'#fff',60)}{tag(lx(2),1400,'1',G,'#fff',60)}{tag((lx(3)+lx(6))/2,1330,'4',G,'#fff',60)}</g>}
    {/* Tages-Tabelle */}
    {t>=dayA&&<g>{HOLD.map((h,d)=>{const a=dayA+(dayB-dayA)*d/7;if(t<a)return null;const x=80+d*131;return <g key={d} transform={`translate(${x} 1560) scale(${PB(t,a,.25)})`}><rect x={-60} y={-60} width={120} height={300} rx={18} fill={C} stroke={N} strokeWidth={6}/><text y={-14} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill={N}>{X.day} {d+1}</text>{h.map((v,k)=><g key={k} transform={`translate(0 ${40+k*66})`}><rect x={-44} y={-26} width={88} height={52} rx={12} fill="#f2c14e" stroke={N} strokeWidth={5}/><text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={38} fill={N}>{v}</text></g>)}</g>;})}</g>}
    </g>
    {t>=s(7)&&t<s(12)&&qb(t,540,820,1.2)}
    {vign}
    {cards(t,S,X.cards,[7])}
    {countdown(t,S,[9,10,11])}
    {stamp(t,sol,1.0,X.sol)}
    {stamp(t,e(18)+.2,2.4,X.done,700,104)}
    {flash(t,s(14)+.5)}
   </svg>
  </AbsoluteFill>;
};
export const KetteDE:React.FC=()=><Kette lang="de"/>;
export const KetteEN:React.FC=()=><Kette lang="en"/>;
