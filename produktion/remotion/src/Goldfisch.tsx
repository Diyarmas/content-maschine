import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,FONT,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign} from './kit';
import WD from './w_goldfisch_de.json'; import WE from './w_goldfisch_en.json';
const L={
 de:{W:WD,woman:'FRAU LEHMANN',cat:'MORITZ',a:'FLOCKE',b:'KRÜMEL',sol:'LÖSUNG',done:'GOLDFISCHE!',
  cards:{0:['FAST ALLE DENKEN','AN EINEN MORD'],1:['FRAU LEHMANN','KOMMT HEIM'],2:['FLOCKE','UND KRÜMEL'],3:['BEIDE','TOT!'],5:['WASSER UND','GLASSCHERBEN'],6:['NUR KATER MORITZ','WAR IM HAUS'],7:['WAS IST','PASSIERT?'],13:['ZWEI','GOLDFISCHE!'],14:['DER KATER','WAR\'S'],15:['AQUARIUM','ZERBROCHEN']}},
 en:{W:WE,woman:'MRS DAVIES',cat:'OSCAR',a:'ROSIE',b:'MAX',sol:'ANSWER',done:'GOLDFISH!',
  cards:{0:['EVERYONE THINKS','OF A MURDER'],1:['MRS DAVIES','COMES HOME'],2:['ROSIE','AND MAX'],3:['BOTH','DEAD!'],5:['WATER AND','BROKEN GLASS'],6:['ONLY OSCAR','THE CAT WAS HOME'],7:['WHAT','HAPPENED?'],13:['TWO','GOLDFISH!'],14:['THE CAT','DID IT'],15:['FISH TANK','SMASHED']}},
};
const WO={n:'',c:'#2a9d8f',hair:'long',hc:'#8b4a2b',skin:'#f1c7a3',h:490};
const fish=(x:number,y:number,s:number,rot=0)=><g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><path d="M40 0 L80 -30 L72 0 L80 30Z" fill="#f28c28" stroke={N} strokeWidth={5}/><ellipse rx={50} ry={30} fill="#f7a23b" stroke={N} strokeWidth={6}/><circle cx={-26} cy={-6} r={9} fill="#fff" stroke={N} strokeWidth={3}/><path d="M-32 -12 l12 12 M-20 -12 l-12 12" stroke={N} strokeWidth={3}/><path d="M0 -28 q14 -20 30 -4" fill="#f28c28" stroke={N} strokeWidth={4}/></g>;
const cat=(x:number,y:number,t:number)=><g transform={`translate(${x} ${y})`}><ellipse cy={20} rx={90} ry={60} fill="#555" stroke={N} strokeWidth={6}/><circle cx={-40} cy={-50} r={52} fill="#555" stroke={N} strokeWidth={6}/><path d="M-82 -80 L-76 -130 L-50 -96Z M-30 -98 L-6 -130 L2 -84Z" fill="#555" stroke={N} strokeWidth={5}/><ellipse cx={-58} cy={-56} rx={9} ry={11} fill="#c7e85a" stroke={N} strokeWidth={3}/><ellipse cx={-24} cy={-56} rx={9} ry={11} fill="#c7e85a" stroke={N} strokeWidth={3}/><path d="M-46 -34 l6 6 l6 -6" stroke={N} strokeWidth={4} fill="none"/><path d={`M80 30 q60 ${-40+Math.sin(t*3)*20} 40 -90`} stroke="#555" strokeWidth={22} fill="none" strokeLinecap="round"/><path d={`M80 30 q60 ${-40+Math.sin(t*3)*20} 40 -90`} stroke={N} strokeWidth={4} fill="none" opacity={.4}/></g>;
const Goldfisch:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(12),solved=t>=s(13);
  const lift=solved?eio(cl((t-s(13))/.7)):0;
  // Rückblende: Aquarium kippt vom Regal
  const fb=t>=s(14)&&t<s(16);const tip=fb?eio(cl((t-s(14)-.6)/.8)):0;const fall=fb?eio(cl((t-s(14)-1.4)/.6)):0;
  const smash=t>=s(15)&&t<s(16);
  return <AbsoluteFill style={{background:'#2b2d42'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1250)}><g transform='translate(600 1350) scale(1.3) translate(-600 -1350)'>
    <rect width={1080} height={1920} fill="#e8d8c3"/>
    {[...Array(12)].map((_,i)=><rect key={i} x={i*95} y={0} width={44} height={1300} fill="#e1ceb5"/>)}
    {/* Regal mit leerem Platz */}
    <rect x={560} y={560} width={440} height={26} fill="#8a5a32" stroke={N} strokeWidth={6}/>
    <rect x={590} y={470} width={70} height={90} fill="#3d7ea6" stroke={N} strokeWidth={5}/><rect x={665} y={490} width={50} height={70} fill="#e9c46a" stroke={N} strokeWidth={5}/>
    {(!fb)&&<ellipse cx={860} cy={556} rx={90} ry={8} fill="#000" opacity={.15}/>}
    {fb&&<g transform={`translate(${860+fall*-60} ${470+fall*780}) rotate(${tip*35+fall*80})`} opacity={smash?0:1}><path d="M-110 -80 Q-120 80 0 90 Q120 80 110 -80Z" fill="#bfe6ff" opacity={.8} stroke={N} strokeWidth={6}/><path d="M-100 -30 Q-104 76 0 82 Q104 76 100 -30Z" fill="#7cc6f2" opacity={.8}/>{fish(-20,30,.5)}{fish(40,0,.45,180)}</g>}
    {fb&&t<s(14)+1.4&&<g transform={`translate(${980-tip*20} 520)`}><ellipse rx={34} ry={22} fill="#555" stroke={N} strokeWidth={5}/><path d="M-10 -14 l-10 -16 M6 -14 l0 -18 M20 -10 l10 -14" stroke={N} strokeWidth={4}/></g>}
    {/* Fenster + Tür */}
    <g transform="translate(250 560)"><rect x={-150} y={-200} width={300} height={360} rx={14} fill="#1d3557" stroke={N} strokeWidth={10}/><line x1={0} y1={-200} x2={0} y2={160} stroke={N} strokeWidth={8}/><line x1={-150} y1={-20} x2={150} y2={-20} stroke={N} strokeWidth={8}/><circle cx={70} cy={-120} r={30} fill="#f1faee"/></g>
    {/* Boden */}
    <rect x={-20} y={1300} width={1120} height={700} fill="#b07a4f"/>
    {[...Array(8)].map((_,i)=><line key={i} x1={-20} y1={1340+i*80} x2={1100} y2={1340+i*80} stroke="#9a6a42" strokeWidth={5}/>)}
    {/* Sofa + Kater */}
    <g transform="translate(860 1240)"><rect x={-190} y={-150} width={380} height={170} rx={40} fill="#c1440e" stroke={N} strokeWidth={8}/><rect x={-220} y={-30} width={440} height={130} rx={36} fill="#d9541d" stroke={N} strokeWidth={8}/></g>
    {cat(830,1080,t)}
    {t>=s(6)&&tag(830,960,X.cat,'#fff',N,40)}
    {/* Frau */}
    {fig(290,1560,'gw_'+lang,WO,X.woman,1.25,{look:6,arm:t>=s(3)&&t<s(7)?'up':'down'})}
    {/* Pfütze, Scherben */}
    {t>=s(4)&&<g opacity={PB(t,s(4),.4)}><path d="M380 1560 Q300 1500 420 1470 Q560 1430 700 1480 Q820 1520 760 1590 Q640 1650 480 1630 Q360 1620 380 1560Z" fill="#8fd3ff" opacity={.7} stroke="#4a9fd0" strokeWidth={5}/>
      {[[430,1520,20],[620,1600,-30],[720,1500,50],[520,1460,10],[680,1560,80],[460,1600,-60]].map(([x,y,r],i)=><path key={i} d="M0 -22 L18 10 L-14 16Z" fill="#dff3ff" stroke="#4a9fd0" strokeWidth={4} transform={`translate(${x} ${y}) rotate(${r})`}/>)}</g>}
    {/* Abgedeckte Opfer */}
    {[[510,1540,X.a],[680,1555,X.b]].map(([x,y,nm]:any,i)=><g key={i}>
      {solved&&fish(x,y,.75,i?160:10)}
      {t>=s(2)&&<g transform={`translate(${x} ${y-lift*260}) rotate(${lift*(i?20:-20)})`} opacity={1-lift}><path d="M-75 22 Q-88 -50 0 -58 Q88 -50 75 22Z" fill="#fff" stroke={N} strokeWidth={5}/></g>}
      {t>=s(2)&&tag(x+(i?40:-40),y+90,nm,Y,N,34)}
    </g>)}
    </g></g>
    {t>=s(7)&&t<s(12)&&qb(t,540,1180,1.1)}
    {vign}
    {cards(t,S,X.cards,[7])}
    {countdown(t,S,[9,10,11])}
    {stamp(t,sol,.8,X.sol)}
    {stamp(t,e(16)+.2,2.2,X.done,640,100)}
    {flash(t,s(13))}
   </svg>
  </AbsoluteFill>;
};
export const GoldfischDE:React.FC=()=><Goldfisch lang="de"/>;
export const GoldfischEN:React.FC=()=><Goldfisch lang="en"/>;
