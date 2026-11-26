import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,CAST,sents,cards,countdown,stamp,qb,num,tag,fig,cam,flash,vign,bubble} from './kit';
import WD from './w_sonntag_de.json'; import WE from './w_sonntag_en.json';
const L={
 de:{W:WD,names:['GRETA','HANS','ANNA','FRIEDRICH'],roles:['KÖCHIN','GÄRTNER','ZIMMERMÄDCHEN','BUTLER'],cal:'SONNTAG',sol:'LÖSUNG',done:'SONNTAG = KEINE POST!',nopost:'SONNTAGS KEINE POST',
  say:{5:['FRÜHSTÜCK','GEMACHT'],7:['ROSEN','GEGOSSEN'],9:['BETTEN','GEMACHT'],11:['POST AUS DEM','BRIEFKASTEN GEHOLT']},
  cards:{0:['EINER LÜGT –','DER WOCHENTAG'],1:['SONNTAG,','8 UHR'],2:['DIAMANT','GESTOHLEN!'],3:['KOMMISSAR','BRANDT FRAGT'],12:['WER','LÜGT?'],18:['DER BUTLER','FRIEDRICH!'],19:['ES IST','SONNTAG'],20:['SONNTAGS','KEINE POST'],21:['ER WAR IM','ARBEITSZIMMER']}},
 en:{W:WE,names:['MARGARET','GEORGE','LUCY','CHARLES'],roles:['COOK','GARDENER','MAID','BUTLER'],cal:'SUNDAY',sol:'ANSWER',done:'SUNDAY = NO POST!',nopost:'NO POST ON SUNDAYS',
  say:{5:['MAKING','BREAKFAST'],7:['WATERING','THE ROSES'],9:['MAKING','THE BEDS'],11:['FETCHING','THE POST']},
  cards:{0:['ONE IS LYING –','THE DAY GIVES IT AWAY'],1:['SUNDAY,','8 A.M.'],2:['DIAMOND','STOLEN!'],3:['DETECTIVE','MILLER ASKS'],12:['WHO IS','LYING?'],18:['CHARLES,','THE BUTLER!'],19:['IT IS','SUNDAY'],20:['NO POST','ON SUNDAYS'],21:['HE WAS IN','THE STUDY']}},
};
const B=[{n:'',c:'#ffffff',hair:'bun',hc:'#b5651d',skin:'#f1c7a3',h:480},{n:'',c:'#6a994e',hair:'short',hc:'#6b4226',skin:'#e0a77f',h:510,cap:'#386641'},{n:'',c:'#1d2540',hair:'ponytail',hc:'#e8c25a',skin:'#f6d2b5',h:470},{n:'',c:'#222',hair:'bald',hc:'#888',skin:'#f1c7a3',h:520}];
const XS=[135,405,675,945];
const Sonntag:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(17),solved=t>=s(18),q=t>=s(12)&&t<s(18);
  const talk=Object.entries(X.say).find(([k])=>t>=s(+k)-.1&&t<e(+k)+.4);
  const show=(i:number)=>t>=s(4+i*2)-.1;
  return <AbsoluteFill style={{background:'#2b1b12'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1200)}>
    <rect width={1080} height={1920} fill="#5b3a29"/>
    {[...Array(10)].map((_,i)=><rect key={i} x={i*108} y={0} width={54} height={1480} fill="#523323"/>)}
    <rect y={1480} width={1080} height={440} fill="#3a2418" stroke={N} strokeWidth={8}/>
    {/* Kalender */}
    <g transform="translate(180 560)"><rect x={-130} y={-150} width={260} height={280} rx={14} fill="#fff" stroke={N} strokeWidth={8}/><rect x={-130} y={-150} width={260} height={80} rx={14} fill={R} stroke={N} strokeWidth={8}/><text y={-96} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={lang==='de'?44:48} fill="#fff">{X.cal}</text><text y={80} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={140} fill={N}>29</text></g>
    {/* Vitrine leer */}
    <g transform="translate(540 600)"><rect x={-110} y={-120} width={220} height={240} rx={10} fill="#bfe3ff" opacity={.5} stroke={N} strokeWidth={8}/><rect x={-70} y={60} width={140} height={60} fill="#7a1f2b" stroke={N} strokeWidth={6}/>{t>=s(2)&&<text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={110} fill={R}>?</text>}{t<s(2)&&<path d="M0 -40 L40 0 L0 50 L-40 0Z" fill="#9fe8ff" stroke={N} strokeWidth={6}/>}</g>
    {/* Briefkasten-Fenster */}
    <g transform="translate(890 560)"><rect x={-130} y={-150} width={260} height={300} rx={10} fill="#9ad1ff" stroke={N} strokeWidth={8}/><rect x={-60} y={-10} width={120} height={80} rx={14} fill="#f6c90e" stroke={N} strokeWidth={6}/><line x1={0} y1={70} x2={0} y2={140} stroke={N} strokeWidth={10}/>{solved&&t>=s(20)&&<g><circle cx={0} cy={30} r={86} fill="none" stroke={R} strokeWidth={12}/><line x1={-60} y1={90} x2={60} y2={-30} stroke={R} strokeWidth={12}/></g>}</g>
    {[0,1,2,3].map(i=>{const hi=solved&&i===3,op=solved&&i!==3?.45:1;const bob=talk&&+talk[0]===5+i*2?Math.sin(t*10)*5:0;
      return <g key={i}>{fig(XS[i],1580+bob,'so_'+lang+i,B[i],X.names[i],1.28,{look:0},op)}
       {i===0&&<g opacity={op} transform={`translate(${XS[0]} ${1580+bob}) scale(1.28)`}><rect x={-44} y={-560} width={88} height={70} rx={24} fill="#fff" stroke={N} strokeWidth={5}/><rect x={-50} y={-500} width={100} height={20} fill="#fff" stroke={N} strokeWidth={5}/></g>}
       {i===3&&<g opacity={op} transform={`translate(${XS[3]} ${1580+bob}) scale(1.28)`}><rect x={50} y={-230} width={70} height={46} fill="#fff" stroke={N} strokeWidth={5}/><path d="M50 -230 l35 24 l35 -24" stroke={N} strokeWidth={4} fill="none"/></g>}
      </g>;})}
    </g>
    {[0,1,2,3].map(i=>show(i)&&<g key={'n'+i}>{num(XS[i],1650,i+1,solved&&i===3,44)}{tag(XS[i],1755,X.names[i],solved&&i!==3?'#bbb':'#fff',N,lang==='en'&&i===0?32:38)}<text x={XS[i]} y={1840} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={lang==='de'&&i===2?26:32} fill="#fff">{X.roles[i]}</text></g>)}
    {q&&<g>{XS.map((x,i)=><g key={'q'+i}>{qb(t,x,860,.9)}</g>)}</g>}
    {talk&&bubble(Math.min(Math.max(XS[(+talk[0]-5)/2],250),830),780,talk[1],PB(t,s(+talk[0])-.1,.3),58)}
    {t>=s(20)&&t<e(21)+.3&&tag(540,1000,X.nopost,R,'#fff',56)}
    {vign}
    {cards(t,S,X.cards,[12])}
    {countdown(t,S,[14,15,16])}
    {stamp(t,sol,1.0,X.sol)}
    {stamp(t,e(21)+.2,2.4,X.done,940,80)}
    {flash(t,s(18))}
   </svg>
  </AbsoluteFill>;
};
export const SonntagDE:React.FC=()=><Sonntag lang="de"/>;
export const SonntagEN:React.FC=()=><Sonntag lang="en"/>;
