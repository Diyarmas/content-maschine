import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,FONT,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign} from './kit';
import WD from './w_zahnrad_de.json'; import WE from './w_zahnrad_en.json';
const L={
 de:{W:WD,name:'OPA OTTO',sol:'LÖSUNG',done:'RUNTER!',cw:'IM UHRZEIGERSINN',
  cards:{0:['FAST ALLE','TIPPEN FALSCH'],1:['5 ZAHNRÄDER','GREIFEN INEINANDER'],2:['EIMER HÄNGT','RECHTS AM RAD 5'],3:['RAD 1 DREHT','IM UHRZEIGERSINN'],4:['HOCH ODER','RUNTER?'],10:['JEDES RAD DREHT','ANDERSHERUM'],13:['RECHTE SEITE','GEHT NACH UNTEN'],14:['SEIL WIRD','ABGEWICKELT']}},
 en:{W:WE,name:'GRANDPA FRANK',sol:'ANSWER',done:'DOWN!',cw:'CLOCKWISE',
  cards:{0:['ALMOST EVERYONE','GETS THIS WRONG'],1:['5 GEARS','LOCKED TOGETHER'],2:['BUCKET ON THE','RIGHT OF GEAR 5'],3:['GEAR 1 TURNS','CLOCKWISE'],4:['UP OR','DOWN?'],10:['EACH GEAR TURNS','THE OTHER WAY'],13:['RIGHT SIDE','MOVES DOWN'],14:['THE ROPE','UNWINDS']}},
};
const OPA={n:'',c:'#6a4c93',hair:'bald',hc:'#ddd',skin:'#f1c7a3',h:500,beard:'#ddd',glasses:1};
const GX=[150,330,510,690,870],GY=[900,990,900,990,900],GR=100,TE=12;
const COL=['#e76f51','#2a9d8f','#e9c46a','#3d7ea6','#e63946'];
const gearPath=()=>{let d='';for(let i=0;i<TE*2;i++){const a0=i/(TE*2)*Math.PI*2,a1=(i+1)/(TE*2)*Math.PI*2,r=i%2?GR*.84:GR;d+=(i?'L':'M')+(Math.cos(a0)*r).toFixed(1)+' '+(Math.sin(a0)*r).toFixed(1)+'L'+(Math.cos(a1)*r).toFixed(1)+' '+(Math.sin(a1)*r).toFixed(1);}return d+'Z';};
const GP=gearPath();
const arrow=(x:number,y:number,dir:number,col:string,op=1)=><g transform={`translate(${x} ${y}) scale(${dir} 1)`} opacity={op}><path d="M-70 -40 A80 80 0 0 1 60 -50" fill="none" stroke={col} strokeWidth={14} strokeLinecap="round"/><path d="M60 -50 l-34 -16 l10 38Z" fill={col} stroke={col} strokeWidth={6} strokeLinejoin="round"/></g>;
const Zahnrad:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(9),solved=t>=s(10);
  const spin1=t>=s(3)&&t<s(4)+.5?(t-s(3))*40:0;
  const sp=solved?(t-s(10))*45:0;
  const ang=(i:number)=>solved?(i%2?-sp:sp)+(i%2?360/TE/2:0):(i===0?spin1:(i%2?360/TE/2:0));
  const arrowOn=(i:number)=>{const steps=[s(11),s(11)+.9,s(11)+1.8,s(12),s(12)+1.2];return solved&&t>=steps[i];};
  const drop=t>=s(14)?eio(cl((t-s(14))/1.6))*260:0;
  const ropeX=GX[4]+GR-6,bucketY=1330+drop;
  return <AbsoluteFill style={{background:'#2e2a27'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1100)}>
    <rect width={1080} height={1920} fill="#cdb79e"/>
    {[...Array(10)].map((_,i)=><rect key={i} x={0} y={i*150} width={1080} height={6} fill="#bba387"/>)}
    <rect x={40} y={560} width={1000} height={560} rx={24} fill="#8a6a4a" stroke={N} strokeWidth={8}/>
    {[...Array(6)].map((_,i)=><circle key={i} cx={80+i*184} cy={600} r={10} fill="#5a4030"/>)}
    {GX.map((x,i)=><g key={i}>
      <g transform={`translate(${x} ${GY[i]}) rotate(${ang(i)})`}><path d={GP} fill={COL[i]} stroke={N} strokeWidth={7} strokeLinejoin="round"/><circle r={GR*.45} fill="none" stroke={N} strokeWidth={5} opacity={.5}/>{[0,1,2,3].map(k=><line key={k} x1={0} y1={0} x2={Math.cos(k*Math.PI/2)*GR*.7} y2={Math.sin(k*Math.PI/2)*GR*.7} stroke={N} strokeWidth={6} opacity={.35}/>)}</g>
      <circle cx={x} cy={GY[i]} r={22} fill="#ddd" stroke={N} strokeWidth={6}/>
      <text x={x} y={GY[i]+12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={N}>{i+1}</text>
    </g>)}
    {GX.map((x,i)=>arrowOn(i)&&<g key={'a'+i} transform={`translate(${x} ${GY[i]+(i%2?165:-165)})`}><rect x={-70} y={-34} width={140} height={58} rx={16} fill={i%2?R:G} stroke={N} strokeWidth={5}/><text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff">{i%2?'↺':'↻'}</text></g>)}
    {t>=s(3)&&t<s(9)&&<g transform={`translate(${GX[0]} ${GY[0]-165}) scale(${PB(t,s(3),.3)})`}><rect x={-70} y={-34} width={140} height={58} rx={16} fill={G} stroke={N} strokeWidth={5}/><text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff">↻</text></g>}
    {/* Seil + Eimer */}
    <line x1={ropeX} y1={GY[4]} x2={ropeX} y2={bucketY-70} stroke="#7a5a2a" strokeWidth={8}/>
    <g transform={`translate(${ropeX} ${bucketY})`}><path d="M-60 -70 Q0 -130 60 -70" fill="none" stroke={N} strokeWidth={6}/><path d="M-70 -70 L-55 40 L55 40 L70 -70Z" fill="#9aa5b1" stroke={N} strokeWidth={7}/><rect x={-70} y={-78} width={140} height={16} rx={6} fill="#7d8894" stroke={N} strokeWidth={5}/></g>
    {t>=s(13)&&<g transform={`translate(${ropeX-40} ${GY[4]+60})`} opacity={PB(t,s(13),.3)}><path d="M0 0 L0 90" stroke={Y} strokeWidth={16} strokeLinecap="round"/><path d="M-26 70 L0 110 L26 70Z" fill={Y} stroke={N} strokeWidth={4}/></g>}
    {/* Werkbank + Opa */}
    <rect x={-20} y={1560} width={1120} height={400} fill="#7a4a2a"/>
    {fig(150,1840,'opa_'+lang,OPA,X.name,1.0,{look:6,arm:t>=s(3)&&t<s(5)?'up':'down'})}
    {t>=s(3)&&t<s(5)&&tag(560,1440,X.cw,'#fff',N,38)}
    </g>
    {t>=s(4)&&t<s(9)&&qb(t,560,1300,1.1)}
    {vign}
    {cards(t,S,X.cards,[4])}
    {countdown(t,S,[6,7,8])}
    {stamp(t,sol,.8,X.sol)}
    {stamp(t,e(14)+.2,2.2,X.done,600,110)}
    {flash(t,s(10))}
   </svg>
  </AbsoluteFill>;
};
export const ZahnradDE:React.FC=()=><Zahnrad lang="de"/>;
export const ZahnradEN:React.FC=()=><Zahnrad lang="en"/>;
