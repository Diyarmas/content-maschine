import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,CAST,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign} from './kit';
import WD from './w_feuer_de.json'; import WE from './w_feuer_en.json';
const L={
 de:{W:WD,name:'PAUL',sol:'LÖSUNG',done:'FEUER GEGEN FEUER!',west:'WEST',east:'OST',wind:'WIND',
  cards:{0:['DAS FEUER','KOMMT NÄHER'],1:['ALLEIN AUF','EINER INSEL'],2:['FEUER IM','WESTEN!'],3:['WIND DRÜCKT ES','AUF IHN ZU'],4:['HAIE,','KEIN BOOT'],5:['NUR EINE SCHACHTEL','STREICHHÖLZER'],6:['WIE ÜBERLEBT','ER?'],12:['ER ZÜNDET','EIN 2. FEUER AN'],13:['DER WIND TREIBT','ES WEG'],14:['DAS GRAS VOR IHM','BRENNT AB'],15:['AB AUF DIE','VERBRANNTE FLÄCHE'],16:['NICHTS MEHR','ZUM BRENNEN']}},
 en:{W:WE,name:'HARRY',sol:'ANSWER',done:'FIGHT FIRE WITH FIRE!',west:'WEST',east:'EAST',wind:'WIND',
  cards:{0:['THE FIRE IS','COMING CLOSER'],1:['ALONE ON','AN ISLAND'],2:['FIRE IN','THE WEST!'],3:['THE WIND PUSHES','IT TOWARD HIM'],4:['SHARKS,','NO BOAT'],5:['ONLY A BOX','OF MATCHES'],6:['HOW DOES HE','SURVIVE?'],12:['HE LIGHTS','A 2ND FIRE'],13:['THE WIND CARRIES','IT AWAY'],14:['THE GRASS AHEAD','BURNS OFF'],15:['ONTO THE','BURNT GROUND'],16:['NOTHING LEFT','TO BURN']}},
};
const MAN={n:'',c:'#e9c46a',hair:'short',hc:'#6b4226',skin:'#f1c7a3',h:500,beard:'#6b4226'};
const GY=1300;
const flameAt=(x:number,h:number,t:number,k:number)=>{const fl=1+.12*Math.sin(t*16+k*1.7);return <g key={k} transform={`translate(${x} ${GY}) scale(${fl*h} ${h*(1+(fl-1)*2)})`}><path d="M0 0 C-50 -6 -60 -70 -6 -170 C10 -110 40 -120 30 -60 C50 -80 56 -40 40 -10Z" fill="#ff6b1a" stroke={N} strokeWidth={5/h}/><path d="M0 -4 C-24 -6 -28 -40 0 -90 C20 -50 26 -20 0 -4Z" fill="#ffd23f"/></g>;};
const Feuer:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(11);
  // grosses Feuer
  let big=-80; if(t>=s(2)) big=-80+330*eio(cl((t-s(2))/(s(6)-s(2)))); if(t>=s(15)) big=250+320*eio(cl((t-s(15))/(s(16)+1-s(15))));
  const bigDie=t>=s(16)+.6?1-cl((t-s(16)-.6)/1.2):1;
  // kleines Feuer
  const smallOn=t>=s(12)+.6;const small=smallOn?620+520*eio(cl((t-s(12)-.6)/(e(14)-s(12)))):620;
  const burntSmall=smallOn?small-30:600;
  const px=540+(t>=s(15)?240*eio(cl((t-s(15))/1.2)):0);
  const sharks=t>=s(4);
  return <AbsoluteFill style={{background:'#ffb36b'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff9e5e"/><stop offset="1" stopColor="#ffd59e"/></linearGradient></defs>
    <g transform={cam(t,dur,sol,540,1250)}>
    <rect width={1080} height={1920} fill="url(#sky)"/>
    {t>=s(2)&&<rect width={1080} height={1250} fill="#555" opacity={.25*cl((t-s(2))/2)*bigDie}/>}
    <rect y={1320} width={1080} height={600} fill="#2b7bb9"/>
    {[...Array(6)].map((_,i)=><path key={i} d={`M${(i*220+t*40)%1300-200} ${1450+i*60} q40 -20 80 0 q40 20 80 0`} stroke="#9fd3f0" strokeWidth={6} fill="none"/>)}
    {/* Insel */}
    <path d={`M-40 ${GY+40} L-40 ${GY-10} Q540 ${GY-40} 1120 ${GY-10} L1120 ${GY+40}Z`} fill="#d9b46a" stroke={N} strokeWidth={8}/>
    <rect x={-40} y={GY-24} width={1160} height={24} fill="#9bc26a"/>
    {[...Array(36)].map((_,i)=>{const x=i*31;const burnt=x<big||(smallOn&&x>600&&x<burntSmall);return <path key={i} d={`M${x} ${GY-20} l8 -${burnt?8:46} l8 ${burnt?8:46} l8 -${burnt?6:38} l8 ${burnt?6:38}`} fill={burnt?'#2b2b2b':'#7fae3a'} stroke={N} strokeWidth={3}/>;})}
    {big>-60&&<rect x={-40} y={GY-26} width={Math.max(0,big+20)} height={28} fill="#2b2b2b"/>}
    {smallOn&&<rect x={600} y={GY-26} width={Math.max(0,burntSmall-600)} height={28} fill="#2b2b2b"/>}
    {/* Flammen gross */}
    <g opacity={bigDie}>{[0,1,2,3,4,5].map(k=>flameAt(big-k*85,2.5-k*.25,t,k))}</g>
    {smallOn&&small<1100&&[0,1,2].map(k=>flameAt(small-k*70,1.5-k*.25,t,k+9))}
    {t>=s(2)&&[...Array(8)].map((_,i)=>{const y=(GY-200-((t*90+i*80)%700));return <circle key={'sm'+i} cx={big-90+Math.sin(t+i)*50+i*14} cy={y} r={45+i*6} fill="#666" opacity={.25*bigDie}/>;})}
    {fig(px,GY-8,'paul_'+lang,MAN,X.name,1.35,{look:t>=s(2)&&t<s(12)?-8:0,arm:t>=s(12)&&t<s(13)?'up':'down'})}
    {t>=s(5)&&t<s(13)&&<g transform={`translate(${px+100} ${GY-430}) scale(${PB(t,s(5),.3)})`}><rect x={-46} y={-30} width={92} height={60} rx={6} fill={R} stroke={N} strokeWidth={5}/><rect x={-46} y={-30} width={92} height={18} fill="#fff" stroke={N} strokeWidth={4}/></g>}
    {sharks&&[0,1,2].map(i=>{const x=((t*(60+i*20)+i*400)%1300)-100;return <path key={i} d={`M${x} ${1520+i*110} l40 -80 l30 80Z`} fill="#4a5a6a" stroke={N} strokeWidth={5}/>;})}
    {tag(120,1400,X.west,'#fff',N,36)}{tag(960,1400,X.east,'#fff',N,36)}
    </g>
    {t>=s(3)&&t<s(17)&&[0,1,2].map(i=>{const x=((t*260+i*380)%1300)-150;return <g key={'w'+i} transform={`translate(${x} ${560+i*90})`}><path d="M0 0 L120 0 M90 -20 L120 0 L90 20" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round"/></g>;})}
    {t>=s(3)&&t<s(6)&&tag(540,520,X.wind+' →','#fff',N,50)}
    {t>=s(6)&&t<s(11)&&qb(t,540,640,1.3)}
    {vign}
    {cards(t,S,X.cards,[6])}
    {countdown(t,S,[8,9,10])}
    {stamp(t,sol,.7,X.sol)}
    {stamp(t,e(17)+.2,2.4,X.done,960,80)}
    {flash(t,s(12)+.6)}
   </svg>
  </AbsoluteFill>;
};
export const FeuerDE:React.FC=()=><Feuer lang="de"/>;
export const FeuerEN:React.FC=()=><Feuer lang="en"/>;
