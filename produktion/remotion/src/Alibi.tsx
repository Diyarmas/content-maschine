import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,CAST,sents,cards,countdown,stamp,bubble,qb,num,tag,fig,cam,flash,vign} from './kit';
import WD from './w_eis_de.json'; import WE from './w_eis_en.json';
const L={
 de:{W:WD,names:['LENA','JONAS','MAX'],temp:'30°C',sol:'LÖSUNG',done:'EIS LÜGT NICHT!',
  cards:{0:['EINER LÜGT –','EIN GLAS VERRÄT IHN'],1:['30 GRAD','IN DER NACHT'],2:['TEURE KETTE','GESTOHLEN!'],3:['KOMMISSAR','BRANDT'],11:['SCHAU AUF','DIE GLÄSER!'],12:['WER','LÜGT?'],18:['MAX,','NUMMER 3!'],19:['KANTIGE','EISWÜRFEL'],20:['BEI 30 GRAD','LÄNGST GESCHMOLZEN'],22:['ER WAR NIE','AUF DER TERRASSE']},
  say:{6:['SEIT 2 STUNDEN','HIER DRAUSSEN'],8:['WAR SCHWIMMEN,','BIN GERADE RAUS'],10:['AUCH 2 STUNDEN','HIER, ICH LESE']}},
 en:{W:WE,names:['PRIYA','JACK','OLIVER'],temp:'86°F',sol:'ANSWER',done:'ICE DOESN\'T LIE!',
  cards:{0:['ONE IS LYING –','A GLASS TELLS'],1:['A SCORCHING','SUMMER NIGHT'],2:['NECKLACE','STOLEN!'],3:['DETECTIVE','MILLER'],11:['LOOK AT','THE GLASSES!'],12:['WHO IS','LYING?'],18:['OLIVER,','NUMBER 3!'],19:['SHARP-EDGED','ICE CUBES'],20:['IN THIS HEAT','LONG MELTED'],22:['NEVER ON','THE TERRACE']},
  say:{6:['OUT HERE FOR','2 HOURS'],8:['WENT SWIMMING,','JUST GOT OUT'],10:['ALSO 2 HOURS,','READING']}},
};
const BASE=[{...CAST.jule,c:'#e76f51'},{...CAST.tom,c:'#2a9d8f'},{...CAST.lars,c:'#3d7ea6'}];
const BASE_EN0={n:'',c:'#d1495b',hair:'long',hc:'#1a1a1a',skin:'#b5835a',h:480,earring:1};
const XS=[200,540,880];
const glass=(x:number,y:number,kind:'melt'|'ice',t:number)=>{
  const top=y-190,w1=120,w0=96;
  return <g>
    <path d={`M${x-w1/2} ${top} L${x-w0/2} ${y} L${x+w0/2} ${y} L${x+w1/2} ${top}Z`} fill="#eaf6ff" opacity={.35} stroke={N} strokeWidth={6}/>
    <path d={`M${x-w1/2+8} ${top+30} L${x-w0/2+6} ${y-6} L${x+w0/2-6} ${y-6} L${x+w1/2-8} ${top+30}Z`} fill={kind==='melt'?'#f7e7a1':'#f2c94c'} opacity={.95}/>
    {kind==='melt'&&<rect x={x-w1/2+10} y={top+30} width={w1-20} height={34} fill="#fff8d6" opacity={.8}/>}
    {kind==='melt'&&[0,1,2].map(i=><circle key={i} cx={x-20+i*20} cy={top+44+(i%2)*6} r={6} fill="#fff" opacity={.7}/>)}
    {kind==='ice'&&[[-26,18,-8],[10,10,10],[-4,46,4]].map(([dx,dy,r],i)=><rect key={i} x={x+dx-22} y={top+dy} width={50} height={50} rx={3} fill="#f4fbff" stroke="#5fb0dc" strokeWidth={6} transform={`rotate(${r} ${x+dx} ${top+dy+22})`}/>)}
    <circle cx={x+w1/2-14} cy={top+6} r={26} fill="#f9e04b" stroke={N} strokeWidth={5}/><circle cx={x+w1/2-14} cy={top+6} r={16} fill="#fff6b0"/>
    <line x1={x-14} y1={top-22} x2={x+6} y2={y-30} stroke="#e4572e" strokeWidth={10} strokeLinecap="round"/>
    {[0,1,2,3].map(i=>{const yy=top+60+((t*40+i*45)%120);return <circle key={'d'+i} cx={x-w1/2+12+(i%2)*4} cy={yy} r={4} fill="#fff" opacity={.6}/>;})}
  </g>;};
const Alibi:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(17),q=t>=s(12)&&t<s(18),solved=t>=s(18);
  const talk=Object.entries(X.say).find(([k])=>t>=s(+k)&&t<e(+k)+.4);
  const zoomG=(t>=s(11)&&t<s(12)+.6)||(t>=s(19)&&t<e(20)+.3);const zg=zoomG?eio(cl((t-(t>=s(19)?s(19):s(11)))/.6)):0;
  const zc=t>=s(19)?(t>=s(20)?XS[0]:XS[2]):540;
  const zt=`translate(${zc} 1380) scale(${1+.55*zg}) translate(${-zc} -1380)`;
  const show=(i:number)=>t>=s(5+i*2)-.1;
  const bases=[lang==='en'?BASE_EN0:BASE[0],BASE[1],BASE[2]];
  return <AbsoluteFill style={{background:'#0f1630'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol)}><g transform={zt}>
    <rect width={1080} height={1920} fill="#16224a"/>
    {[...Array(18)].map((_,i)=><circle key={i} cx={(i*197)%1080} cy={60+(i*83)%420} r={i%3?3:5} fill="#fff" opacity={.4+.4*Math.sin(t*2+i)}/>)}
    <circle cx={880} cy={200} r={80} fill="#fdf1b0" stroke={N} strokeWidth={6}/>
    {/* Villa */}
    <rect x={0} y={520} width={1080} height={900} fill="#e8d8b8" stroke={N} strokeWidth={8}/>
    {[120,420,720].map((x,i)=><g key={i}><rect x={x} y={600} width={240} height={330} rx={12} fill={i===1?'#2a3358':'#ffd56b'} stroke={N} strokeWidth={8}/><line x1={x+120} y1={600} x2={x+120} y2={930} stroke={N} strokeWidth={6}/><line x1={x} y1={765} x2={x+240} y2={765} stroke={N} strokeWidth={6}/></g>)}
    {/* Lichterkette */}
    <path d="M0 540 Q270 600 540 545 Q810 600 1080 540" stroke={N} strokeWidth={4} fill="none"/>
    {[...Array(12)].map((_,i)=>{const x=45+i*90;const y=548+28*Math.sin((i/11)*Math.PI*2)*.5+25;return <circle key={i} cx={x} cy={y} r={11} fill={['#ffd56b','#ff8c69','#9be7c4'][i%3]} opacity={.75+.25*Math.sin(t*3+i)} stroke={N} strokeWidth={3}/>;})}
    <rect y={1300} width={1080} height={620} fill="#c79a6b" stroke={N} strokeWidth={8}/>
    {[...Array(8)].map((_,i)=><line key={i} x1={0} y1={1340+i*70} x2={1080} y2={1340+i*70} stroke="#a77b50" strokeWidth={4}/>)}
    {/* Thermometer */}
    <g transform="translate(70 1020) scale(.8)"><rect x={-22} y={-150} width={44} height={200} rx={22} fill="#fff" stroke={N} strokeWidth={6}/><rect x={-10} y={-120} width={20} height={150} rx={10} fill={R}/><circle cy={60} r={34} fill={R} stroke={N} strokeWidth={6}/></g>
    {t>=s(1)&&t<s(5)&&tag(150,1110,X.temp,R,'#fff',44)}
    {/* Personen */}
    {[0,1,2].map(i=>{const hi=solved&&i===2;const op=solved&&i!==2?.45:1;const bob=talk&&+talk[0]===6+i*2?Math.sin(t*10)*5:0;
      return <g key={i} opacity={show(i)||t<s(5)?1:1}>{fig(XS[i],1290+bob,'alibi_'+lang+i,bases[i],X.names[i],1.08,{look:i===2&&q?6:0},op)}
       {i===1&&<g opacity={op}>{[0,1,2].map(k=><ellipse key={k} cx={XS[1]-46+k*46} cy={690+((t*110+k*40)%80)} rx={7} ry={11} fill="#7fd3ff" stroke={N} strokeWidth={2}/>)}<path d={`M${XS[1]-62} 870 Q${XS[1]-70} 940 ${XS[1]-40} 1000`} stroke="#fff" strokeWidth={26} fill="none" strokeLinecap="round"/><path d={`M${XS[1]+62} 870 Q${XS[1]+70} 940 ${XS[1]+40} 1000`} stroke="#fff" strokeWidth={26} fill="none" strokeLinecap="round"/></g>}
      </g>;})}
    {/* Geländer */}
    <rect x={0} y={1140} width={1080} height={22} fill="#fff" stroke={N} strokeWidth={6}/>
    {[...Array(14)].map((_,i)=><rect key={'b'+i} x={20+i*78} y={1162} width={28} height={130} rx={10} fill="#f4efe6" stroke={N} strokeWidth={5}/>)}
    <rect x={0} y={1290} width={1080} height={18} fill="#fff" stroke={N} strokeWidth={6}/>
    {/* Tisch */}
    <rect x={20} y={1480} width={1040} height={40} rx={10} fill="#8a5a32" stroke={N} strokeWidth={8}/><rect x={40} y={1520} width={1000} height={140} fill="#6d4223" stroke={N} strokeWidth={8}/>
    
    <rect x={920} y={1440} width={110} height={40} rx={6} fill="#3d5a80" stroke={N} strokeWidth={5}/><rect x={928} y={1446} width={94} height={12} fill="#fff"/>
    <g transform='translate(0 0)'>{[0,1,2].map(i=><g key={'g'+i} transform={`translate(${XS[i]} 1480) scale(1.45) translate(${-XS[i]} -1480)`}>{glass(XS[i],1480,i===0?'melt':'ice',t)}</g>)}</g>
    {t>=s(19)&&t<e(20)+.3&&<ellipse cx={(t>=s(20)?XS[0]:XS[2])} cy={1340} rx={130} ry={175} fill="none" stroke={R} strokeWidth={12} strokeDasharray="30 14"/>}
    </g>
    {[0,1,2].map(i=>show(i)&&<g key={'n'+i}>{num(XS[i],1590,i+1,solved&&i===2,46)}{tag(XS[i],1730,X.names[i],solved&&i!==2?'#bbb':'#fff')}</g>)}
    {q&&<g>{qb(t,XS[0],600)}{qb(t,XS[1],600)}{qb(t,XS[2],600)}</g>}
    {solved&&t<e(19)&&<g transform={`translate(${XS[2]} 600) scale(${PB(t,s(18),.3)})`}><circle r={56} fill={Y} stroke={N} strokeWidth={7}/><text y={28} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={76} fill={N}>!</text></g>}
    {talk&&bubble(Math.min(Math.max(XS[(+talk[0]-6)/2],270),810),560,talk[1],PB(t,s(+talk[0]),.3),50)}
    </g>
    {vign}
    {cards(t,S,X.cards,[12])}
    {countdown(t,S,[14,15,16])}
    {stamp(t,sol,1.0,X.sol)}
    {stamp(t,e(22)+.3,2.2,X.done,820,92)}
    {flash(t,s(18))}
   </svg>
  </AbsoluteFill>;
};
export const AlibiDE:React.FC=()=><Alibi lang="de"/>;
export const AlibiEN:React.FC=()=><Alibi lang="en"/>;
