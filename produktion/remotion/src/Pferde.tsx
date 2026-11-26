import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,CAST,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign,bubble} from './kit';
import WD from './w_pferde_de.json'; import WE from './w_pferde_en.json';
const L={
 de:{W:WD,dad:'BAUER HUBERT',a:'LUKAS',b:'FELIX',sol:'LÖSUNG',done:'TAUSCHT PFERDE!',day:'TAG',goal:'ZIEL',rule:['LETZTES PFERD','ERBT DEN HOF'],swap:['TAUSCHT','PFERDE!'],
  cards:{0:['WER VERLIERT,','GEWINNT DEN HOF'],1:['ZWEI SÖHNE,','EIN HOF'],2:['JEDER BEKOMMT','EIN PFERD'],5:['BEIDE REITEN','SUPER LANGSAM'],6:['TAGELANG','STILLSTAND'],7:['NUR','ZWEI WORTE…'],8:['PLÖTZLICH','RASEN BEIDE!'],9:['WELCHE ZWEI','WORTE?'],15:['„TAUSCHT','PFERDE!"'],16:['JEDER REITET DAS','PFERD DES ANDEREN'],17:['ERSTER IM ZIEL =','EIGENES PFERD LETZTES']}},
 en:{W:WE,dad:'FARMER RAJESH',a:'ARJUN',b:'ROHAN',sol:'ANSWER',done:'SWAP HORSES!',day:'DAY',goal:'FINISH',rule:['LAST HORSE','INHERITS THE FARM'],swap:['SWAP','HORSES!'],
  cards:{0:['WHOEVER LOSES','WINS THE FARM'],1:['TWO SONS,','ONE FARM'],2:['EACH GETS','A HORSE'],5:['BOTH RIDE','SUPER SLOWLY'],6:['DAYS OF','STANDSTILL'],7:['JUST','TWO WORDS…'],8:['SUDDENLY','BOTH RACE!'],9:['WHICH TWO','WORDS?'],15:['"SWAP','HORSES!"'],16:['EACH RIDES THE','OTHER\'S HORSE'],17:['FIRST TO FINISH =','OWN HORSE LAST']}},
};
const DAD={n:'',c:'#8a5a32',hair:'bald',hc:'#cfcfcf',skin:'#d9a37a',h:500,beard:'#e0e0e0'};
const FR={n:'',c:'#577590',hair:'short',hc:'#ddd',skin:'#e8b48a',h:490,glasses:1};
const horse=(x:number,y:number,body:string,saddle:string,t:number,speed:number)=>{const g=Math.sin(t*speed*14)*speed;return <g transform={`translate(${x} ${y})`}>
  <path d={`M-120 -40 q-60 20 -50 90`} stroke={N} strokeWidth={22} fill="none" strokeLinecap="round"/>
  {[-80,-40,50,90].map((lx,i)=><line key={i} x1={lx} y1={10} x2={lx+(i%2?1:-1)*g*20} y2={130} stroke={N} strokeWidth={26} strokeLinecap="round"/>)}
  {[-80,-40,50,90].map((lx,i)=><line key={'i'+i} x1={lx} y1={10} x2={lx+(i%2?1:-1)*g*20} y2={124} stroke={body} strokeWidth={14} strokeLinecap="round"/>)}
  <ellipse cx={0} cy={-20} rx={140} ry={70} fill={body} stroke={N} strokeWidth={8}/>
  <path d="M100 -50 L160 -150 L200 -150 L190 -90 L130 -20Z" fill={body} stroke={N} strokeWidth={8} strokeLinejoin="round"/>
  <ellipse cx={205} cy={-135} rx={45} ry={28} fill={body} stroke={N} strokeWidth={8}/>
  <circle cx={200} cy={-145} r={6} fill={N}/><path d="M165 -165 l10 -30 l12 26" fill={body} stroke={N} strokeWidth={6}/>
  <path d="M110 -60 Q140 -150 175 -160" stroke="#3b2a20" strokeWidth={18} fill="none" strokeLinecap="round"/>
  <rect x={-40} y={-92} width={90} height={40} rx={12} fill={saddle} stroke={N} strokeWidth={6}/>
</g>;};
const rider=(x:number,y:number,col:string,skin:string,hair:string)=><g transform={`translate(${x} ${y})`}><path d="M-30 0 L-36 -100 L36 -100 L30 0Z" fill={col} stroke={N} strokeWidth={7}/><circle cy={-140} r={44} fill={skin} stroke={N} strokeWidth={7}/><path d="M-44 -150 Q-40 -196 0 -192 Q40 -196 44 -150 Q20 -170 -44 -150Z" fill={hair} stroke={N} strokeWidth={5}/><circle cx={14} cy={-144} r={6} fill={N}/><line x1={-20} y1={0} x2={-40} y2={60} stroke="#2b3150" strokeWidth={20} strokeLinecap="round"/></g>;
const Pferde:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(14);
  const slow=t>=s(5)&&t<s(8)?(t-s(5))*6:0;
  const race1=t>=s(8)?eio(cl((t-s(8))/(e(8)-s(8)+.3))):0;
  const race2=t>=s(17)?eio(cl((t-s(17))/(e(18)-s(17)))):0;
  const reset=t>=s(14);
  const hx=reset?120+560*race2:120+slow+race1*520*(t<s(9)?1:0);
  const hx2=reset?120+520*race2:120+slow*.9+race1*500*(t<s(9)?1:0);
  const swap=t>=s(15)+.3?eio(cl((t-s(15)-.3)/.9)):0;
  const LA=1180,LB=1560;
  const ra=LA+(LB-LA)*swap, rb=LB+(LA-LB)*swap;
  const sp=(t>=s(8)&&t<s(9))||(t>=s(17)&&t<e(18))?1:t>=s(5)&&t<s(8)?.15:0;
  const dayN=t>=s(5)&&t<s(8)?Math.min(30,1+Math.floor((t-s(5))*4)):0;
  return <AbsoluteFill style={{background:'#9ad1ff'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1350)}>
    <rect width={1080} height={1920} fill="#a8dcff"/>
    <circle cx={880} cy={220} r={90} fill="#ffe27a" stroke={N} strokeWidth={6}/>
    <path d="M0 760 Q270 640 540 740 Q810 640 1080 760 L1080 900 L0 900Z" fill="#7fbf6a" stroke={N} strokeWidth={6}/>
    <g transform="translate(160 640)"><rect x={-90} y={-60} width={180} height={150} fill="#c0392b" stroke={N} strokeWidth={7}/><path d="M-110 -60 L0 -150 L110 -60Z" fill="#8a2a20" stroke={N} strokeWidth={7}/><rect x={-30} y={20} width={60} height={70} fill="#fff" stroke={N} strokeWidth={5}/></g>
    <rect y={880} width={1080} height={1040} fill="#9fd07a"/>
    <rect y={1240} width={1080} height={20} fill="#fff" opacity={.7}/><rect y={1620} width={1080} height={20} fill="#fff" opacity={.7}/>
    <rect x={930} y={950} width={26} height={800} fill="#fff" stroke={N} strokeWidth={5}/>
    {[...Array(10)].map((_,i)=><rect key={i} x={930} y={950+i*80} width={26} height={40} fill={N}/>)}
    {tag(943,920,X.goal,Y,N,40)}
    {t<s(5)&&fig(330,1090,'dad_'+lang,DAD,X.dad,1.0,{look:6})}
    {t>=s(7)&&t<s(8)+.4&&fig(620,1090,'fr_'+lang,FR,'',1.0,{look:-6})}
    {t>=s(7)&&t<s(8)&&bubble(620,470,['…'],PB(t,s(7),.3),90)}
    {t>=s(3)&&t<e(4)+.5&&bubble(500,470,X.rule,PB(t,s(3),.3),56,-160)}
    {horse(hx,LA+80,'#8a5a32','#3d7ea6',t,sp)}{horse(hx2,LB+80,'#f2efe8','#e63946',t,sp)}
    {rider((reset?hx:hx)-10+(reset?(hx2-hx)*swap:0),ra-10,'#3d7ea6','#f1c7a3','#3b2a20')}
    {rider((reset?hx2:hx2)-10+(reset?(hx-hx2)*swap:0),rb-10,'#e63946','#e0a77f','#1a1a1a')}
    {tag(hx-10+(reset?(hx2-hx)*swap:0),ra+180,X.a,'#3d7ea6','#fff',34)}{tag(hx2-10+(reset?(hx-hx2)*swap:0),rb+180,X.b,'#e63946','#fff',34)}
    {dayN>0&&tag(800,1120,X.day+' '+dayN,'#fff',N,48)}
    </g>
    {t>=s(9)&&t<s(14)&&qb(t,540,800,1.2)}
    {t>=s(15)&&t<s(16)&&bubble(540,800,X.swap,PB(t,s(15),.3),80)}
    {vign}
    {cards(t,S,X.cards,[9])}
    {countdown(t,S,[11,12,13])}
    {stamp(t,sol,1.0,X.sol)}
    {stamp(t,e(18)+.2,2.4,X.done,820,96)}
    {flash(t,s(15))}
   </svg>
  </AbsoluteFill>;
};
export const PferdeDE:React.FC=()=><Pferde lang="de"/>;
export const PferdeEN:React.FC=()=><Pferde lang="en"/>;
