import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,CAST,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign,bubble} from './kit';
import WD from './w_portrait_de.json'; import WE from './w_portrait_en.json';
const L={
 de:{W:WD,lord:'GRAF ALBRECHT',butler:'BUTLER',sol:'LÖSUNG',done:'SEIN SOHN!',me:'ICH',father:'MEIN VATER',son:'MEIN SOHN',pic:'BILD',
  q1:['BRÜDER UND SCHWESTERN','HABE ICH KEINE'],q2:['DER VATER DIESES MANNES','IST DER SOHN MEINES VATERS'],
  cards:{0:['DIESER SATZ','VERWIRRT JEDEN'],1:['GRAF ALBRECHT','UND EIN GEMÄLDE'],2:['WEN ZEIGT','DAS BILD?'],6:['WEN ZEIGT','DAS BILD?'],12:['SEINEN','SOHN!'],13:['SOHN MEINES VATERS','= ICH SELBST'],14:['ICH BIN DER VATER','DES MANNES'],16:['DIE FALLE:','„ER SELBST"']}},
 en:{W:WE,lord:'LORD ASHFORD',butler:'BUTLER',sol:'ANSWER',done:'HIS SON!',me:'ME',father:'MY FATHER',son:'MY SON',pic:'PORTRAIT',
  q1:['BROTHERS AND SISTERS','I HAVE NONE'],q2:['THIS MAN\'S FATHER','IS MY FATHER\'S SON'],
  cards:{0:['THIS SENTENCE','BREAKS BRAINS'],1:['LORD ASHFORD','AND A PORTRAIT'],2:['WHO IS IN','THE PAINTING?'],6:['WHO IS IN','THE PORTRAIT?'],12:['HIS','SON!'],13:['MY FATHER\'S SON','= ME'],14:['I AM THAT','MAN\'S FATHER'],16:['THE TRAP:','"HIMSELF"']}},
};
const LORD={n:'',c:'#6a2c70',hair:'short',hc:'#8a8a8a',skin:'#f1c7a3',h:520,beard:'#8a8a8a'};
const BUT={n:'',c:'#1d2540',hair:'bald',hc:'#5a4a3a',skin:'#e0b090',h:500};
const Portrait:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(11),solved=t>=s(12);
  const reveal=solved?eio(cl((t-s(12))/.8)):0;
  const tree=t>=s(13);
  const box=(x:number,y:number,txt:string,col:string,a:number)=>t>=a?<g transform={`translate(${x} ${y}) scale(${PB(t,a,.3)})`}><rect x={-340} y={-75} width={680} height={150} rx={30} fill={col} stroke={N} strokeWidth={9}/><text y={24} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={66} fill={N}>{txt}</text></g>:null;
  return <AbsoluteFill style={{background:'#2b1b2e'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1000)}>
    <rect width={1080} height={1920} fill="#5a2a3a"/>
    {[...Array(12)].map((_,i)=><rect key={i} x={i*95} y={0} width={46} height={1500} fill="#4d2232" opacity={.7}/>)}
    <rect y={1500} width={1080} height={420} fill="#3a2418" stroke={N} strokeWidth={8}/>
    {[...Array(7)].map((_,i)=><line key={i} x1={i*170} y1={1500} x2={i*170-120} y2={1920} stroke="#2a180f" strokeWidth={6}/>)}
    <rect x={150} y={1560} width={780} height={300} rx={20} fill="#7a1f2b" stroke="#c9a24a" strokeWidth={10}/>
    {/* Gemälde */}
    <g transform="translate(540 620)">
      <rect x={-270} y={-330} width={540} height={660} rx={14} fill="#c9a24a" stroke={N} strokeWidth={10}/>
      <rect x={-235} y={-295} width={470} height={590} fill="#2e4a3a" stroke={N} strokeWidth={6}/>
      {[-60,0,60].map(d=><path key={d} d={`M${-245+(d+60)*0} -300 l14 -16 l14 16`} fill="none"/>)}
      <g opacity={1-reveal*.2}><ellipse cy={-40} rx={110} ry={130} fill="#141e18" opacity={1-reveal}/><path d="M-170 300 Q-170 110 0 90 Q170 110 170 300Z" fill="#141e18" opacity={1-reveal}/></g>
      <g opacity={reveal}>
        <path d="M-170 300 Q-170 110 0 90 Q170 110 170 300Z" fill="#6a2c70" stroke={N} strokeWidth={6}/>
        <ellipse cy={-40} rx={100} ry={120} fill="#f1c7a3" stroke={N} strokeWidth={6}/>
        <path d="M-100 -60 Q-100 -170 0 -165 Q100 -170 100 -60 Q60 -120 0 -110 Q-60 -120 -100 -60Z" fill="#6b4226" stroke={N} strokeWidth={5}/>
        <circle cx={-36} cy={-40} r={10} fill={N}/><circle cx={36} cy={-40} r={10} fill={N}/><path d="M-30 30 Q0 50 30 30" stroke={N} strokeWidth={6} fill="none"/>
      </g>
      {!solved&&t>=s(2)&&<g transform={`translate(0 -20) scale(${1+.05*Math.sin(t*4)})`}><circle r={90} fill={C} stroke={N} strokeWidth={8}/><text y={58} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={170} fill={N}>?</text></g>}
      <rect x={-140} y={340} width={280} height={56} rx={10} fill="#c9a24a" stroke={N} strokeWidth={6}/><text y={380} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={32} fill={N}>{X.pic}</text>
    </g>
    {fig(250,1700,'lord_'+lang,LORD,X.lord,1.4,{look:6})}
    {fig(860,1700,'butler_'+lang,BUT,X.butler,1.35,{look:-6})}
    {tag(250,1800,X.lord,'#fff',N,44)}{tag(860,1800,X.butler,'#fff',N,44)}
    </g>
    {t>=s(4)&&t<e(5)+.6&&bubble(540,1110,t<s(5)?X.q1:X.q2,PB(t,t<s(5)?s(4):s(5),.3),lang==='de'?56:60,-250)}
    {tree&&<g>
      <rect x={0} y={600} width={1080} height={1100} fill="#000" opacity={.72*cl((t-s(13))/.4)}/>
      {box(540,800,X.father,'#cfe8ff',s(13))}
      <path d="M540 875 L540 1015" stroke="#fff" strokeWidth={10} opacity={t>=s(13)+.4?1:0}/>
      {box(540,1090,X.me+' = '+X.lord.split(' ').pop(),Y,s(13)+.4)}
      <path d="M540 1165 L540 1305" stroke="#fff" strokeWidth={10} opacity={t>=s(14)?1:0}/>
      {box(540,1380,X.son+' = '+X.pic,'#bff0d8',s(14))}
    </g>}
    {vign}
    {cards(t,S,X.cards,[6])}
    {countdown(t,S,[8,9,10])}
    {stamp(t,sol,1.0,X.sol)}
    {stamp(t,e(16)+.2,2.4,X.done,640,110)}
    {flash(t,s(12))}
   </svg>
  </AbsoluteFill>;
};
export const PortraitDE:React.FC=()=><Portrait lang="de"/>;
export const PortraitEN:React.FC=()=><Portrait lang="en"/>;
