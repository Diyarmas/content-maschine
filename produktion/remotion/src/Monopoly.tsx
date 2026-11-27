import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,FONT,sents,cards,countdown,stamp,qb,tag,fig,flash,vign,bubble} from './kit';
import WD from './w_monopoly_de.json'; import WE from './w_monopoly_en.json';
const L={
 de:{W:WD,man:'HERR WAGNER',sis:'JULIA',street:'SCHLOSSALLEE',go:'LOS',rent:'MIETE',sol:'LÖSUNG',done:'SPIEL VORBEI!',broke:['ICH BIN','PLEITE!'],
  cards:{0:['KLINGT WIE','EIN ALBTRAUM'],1:['ER SCHIEBT','SEIN AUTO'],2:['VOR EIN','HOTEL'],4:['KEIN UNFALL,','KEIN DIEB'],5:['WAS IST','PASSIERT?'],11:['ER SPIELT','MONOPOLY!'],12:['SPIELFIGUR:','DAS AUTO'],13:['HOTEL VON','SCHWESTER JULIA'],14:['MIETE','ZU HOCH']}},
 en:{W:WE,man:'MR HUGHES',sis:'SOPHIE',street:'MAYFAIR',go:'GO',rent:'RENT',sol:'ANSWER',done:'GAME OVER!',broke:['I AM','BROKE!'],
  cards:{0:['SOUNDS LIKE','A NIGHTMARE'],1:['HE PUSHES','HIS CAR'],2:['UP TO','A HOTEL'],4:['NO ACCIDENT,','NO THIEF'],5:['WHAT','HAPPENED?'],11:['HE IS PLAYING','MONOPOLY!'],12:['HIS PIECE:','THE CAR'],13:['SISTER SOPHIE\'S','HOTEL'],14:['CAN\'T PAY','THE RENT']}},
};
const MAN={n:'',c:'#3d405b',hair:'short',hc:'#5a4a3a',skin:'#f1c7a3',h:510};
const SIS={n:'',c:'#e63946',hair:'ponytail',hc:'#3b2a20',skin:'#f1c7a3',h:480};
const BX=60,BY=470,BS=960,CO=130,SP=(BS-2*CO)/9;
const COLS=['#8b4513','#8b4513','#87ceeb','#87ceeb','#87ceeb','#d63384','#d63384','#f28c28','#f28c28'];
const Board=({X,t,op}:{X:any,t:number,op:number})=>{
  const sp:JSX.Element[]=[];
  // untere Reihe (rechts nach links), rechte Spalte (unten nach oben) usw. – generisch bunt
  const pal=['#8b4513','#87ceeb','#d63384','#f28c28','#e63946','#f9c74f','#2a9d8f','#1d4ed8'];
  for(let side=0;side<4;side++)for(let i=0;i<9;i++){
    let x=0,y=0,w=SP,h=CO,sx=0,sy=0,sw=0,sh=0;
    if(side===0){x=BX+BS-CO-(i+1)*SP;y=BY+BS-CO;w=SP;h=CO;sx=x;sy=y;sw=w;sh=26;}
    if(side===1){x=BX;y=BY+BS-CO-(i+1)*SP;w=CO;h=SP;sx=x+CO-26;sy=y;sw=26;sh=h;}
    if(side===2){x=BX+CO+i*SP;y=BY;w=SP;h=CO;sx=x;sy=y+CO-26;sw=w;sh=26;}
    if(side===3){x=BX+BS-CO;y=BY+CO+i*SP;w=CO;h=SP;sx=x;sy=y;sw=26;sh=h;}
    const isProp=(i%3)!==1;const col=side===3&&i>=7?'#1d4ed8':pal[(side*2+Math.floor(i/5))%pal.length];
    sp.push(<g key={side+'-'+i}><rect x={x} y={y} width={w} height={h} fill="#d8efd3" stroke={N} strokeWidth={3}/>{isProp&&<rect x={sx} y={sy} width={sw} height={sh} fill={col} stroke={N} strokeWidth={3}/>}</g>);
  }
  return <g>
    <rect x={BX-10} y={BY-10} width={BS+20} height={BS+20} rx={8} fill="#c9e4c5" stroke={N} strokeWidth={8}/>
    {sp}
    {[[BX,BY],[BX+BS-CO,BY],[BX,BY+BS-CO],[BX+BS-CO,BY+BS-CO]].map(([x,y],i)=><rect key={i} x={x} y={y} width={CO} height={CO} fill="#d8efd3" stroke={N} strokeWidth={3}/>)}
    <text x={BX+BS-CO/2} y={BY+BS-CO/2+16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={46} fill={R} opacity={op}>{X.go}</text>
    <path d={`M${BX+BS-CO+20} ${BY+BS-24} L${BX+BS-30} ${BY+BS-24}`} stroke={R} strokeWidth={8}/>
  </g>;};
const Monopoly:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;
  const sol=s(10),solved=t>=s(11);
  // Schlossallee/Mayfair: rechte Spalte, letztes Feld vor LOS
  const fx=BX+BS-CO,fy=BY+BS-CO-SP;const cx=fx+CO/2,cy=fy+SP/2;
  const zIn=6.2,zo=solved?eio(cl((t-s(11))/1.6)):0;const z=zIn+(1-zIn)*zo;
  const fx2=540+(cx-540)*0,ccx=cx+(540-cx)*zo,ccy=cy+(1000-cy)*zo;
  const tr=`translate(540 1000) scale(${z}) translate(${-ccx} ${-ccy})`;
  const push=t>=s(1)&&t<s(2)+.6?eio(cl((t-s(1))/2)):1;const carX=cx+12-(1-push)*80;
  const hand=t>=s(1)&&t<s(3)&&!solved;
  return <AbsoluteFill style={{background:'#264653'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <rect width={1080} height={1920} fill="#6b4f3a"/>
    {[...Array(14)].map((_,i)=><rect key={i} x={0} y={i*140} width={1080} height={8} fill="#5e4532"/>)}
    <g transform={tr}>
     <Board X={X} t={t} op={zo}/>
     <rect x={fx} y={fy} width={CO} height={SP} fill="#d8efd3" stroke={N} strokeWidth={2}/>
     <rect x={fx} y={fy} width={24} height={SP} fill="#1d4ed8" stroke={N} strokeWidth={2}/>
     <text x={fx+78} y={fy+22} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={lang==='de'?11:14} fill={N} opacity={zo}>{X.street}</text>
     <text x={fx+78} y={fy+66} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={11} fill={N} opacity={zo}>{X.rent}: 2000</text>
     {/* Hotel auf Farbstreifen */}
     <g transform={`translate(${fx+12} ${cy})`}><path d="M-12 -14 L0 -24 L12 -14 L12 12 L-12 12Z" fill="#e63946" stroke={N} strokeWidth={2.5}/><rect x={-4} y={2} width={8} height={10} fill="#fff" stroke={N} strokeWidth={1.2}/></g>
     {/* Auto-Spielfigur (silbern) */}
     <g transform={`translate(${carX} ${cy+18})`}><path d="M-26 0 L-22 -12 L-10 -14 L-4 -24 L14 -24 L22 -12 L28 -10 L28 0Z" fill="#c0c7cf" stroke={N} strokeWidth={2.5}/><circle cx={-14} cy={1} r={6} fill="#8a939c" stroke={N} strokeWidth={2}/><circle cx={16} cy={1} r={6} fill="#8a939c" stroke={N} strokeWidth={2}/><path d="M-2 -22 L12 -22 L18 -13 L-6 -13Z" fill="#e5f1ff" stroke={N} strokeWidth={1.5}/></g>
     {hand&&<g transform={`translate(${carX-44} ${cy+6})`}><path d="M-60 -6 Q-30 -14 -6 -10 Q4 -8 4 -2 Q4 4 -6 6 L-60 10Z" fill="#f1c7a3" stroke={N} strokeWidth={2.5}/><path d="M-6 -10 Q6 -12 8 -6" fill="none" stroke={N} strokeWidth={2}/></g>}
     {solved&&<g opacity={zo}>
       {[[300,1000,5],[380,1040,3]].map(([x,y,n],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${i*20-10})`}><rect x={-36} y={-36} width={72} height={72} rx={14} fill="#fff" stroke={N} strokeWidth={5}/>{(n===5?[[-18,-18],[18,-18],[0,0],[-18,18],[18,18]]:[[-18,-18],[0,0],[18,18]]).map(([a,b],k)=><circle key={k} cx={a} cy={b} r={7} fill={N}/>)}</g>)}
       {[0,1,2].map(i=><rect key={i} x={560+i*12} y={880+i*10} width={180} height={90} rx={6} fill={['#f9c74f','#90be6d','#f8961e'][i]} stroke={N} strokeWidth={4}/>)}
     </g>}
    </g>
    {solved&&<g opacity={zo}>
      {fig(230,1880,'mw_'+lang,MAN,X.man,1.05,{look:6})}
      {fig(850,1880,'ms_'+lang,SIS,X.sis,1.05,{look:-6,grin:1,arm:'up'})}
    </g>}
    {t>=s(2)+.4&&t<e(3)+.5&&bubble(540,1560,X.broke,PB(t,s(2)+.4,.3),96)}
    {t>=s(13)&&tag(540,1100,X.street+' · '+X.rent+' 2000',Y,N,40)}
    {t>=s(12)&&<circle cx={955} cy={1311} r={70+8*Math.sin(t*6)} fill="none" stroke={Y} strokeWidth={12} opacity={PB(t,s(12),.3)}/>}
    {t>=s(5)&&t<s(10)&&qb(t,540,1560,1.2)}
    {vign}
    {cards(t,S,X.cards,[5])}
    {countdown(t,S,[7,8,9])}
    {stamp(t,sol,.8,X.sol)}
    {stamp(t,e(15)+.1,2.2,X.done,680,100)}
    {flash(t,s(11))}
   </svg>
  </AbsoluteFill>;
};
export const MonopolyDE:React.FC=()=><Monopoly lang="de"/>;
export const MonopolyEN:React.FC=()=><Monopoly lang="en"/>;
