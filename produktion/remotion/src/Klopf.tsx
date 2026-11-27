import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign,bubble} from './kit';
import WD from './w_hotel_de.json'; import WE from './w_hotel_en.json';
const L={
 de:{W:WD,woman:'FRAU BECKER',man:'FREMDER',sol:'LÖSUNG',done:'NIEMAND KLOPFT BEI SICH!',knock:'KLOPF KLOPF',say:['OH, SORRY! DACHTE,','DAS IST MEIN ZIMMER'],lift:'AUFZUG',arrest:'FESTGENOMMEN!',
  cards:{0:['EIN KLOPFEN','VERRÄT IHN'],1:['HOTEL, KURZ NACH','MITTERNACHT'],3:['ES KLOPFT!'],7:['ER GEHT','EINFACH'],8:['SIE RUFT SOFORT','DIE REZEPTION'],10:['WAS HAT IHN','VERRATEN?'],16:['ER HAT','GEKLOPFT!'],17:['NIEMAND KLOPFT AN','SEIN EIGENES ZIMMER'],18:['MAN NIMMT','DIE KARTE'],19:['ER TESTETE:','IST JEMAND DA?']}},
 en:{W:WE,woman:'MRS CLARKE',man:'STRANGER',sol:'ANSWER',done:'NOBODY KNOCKS ON THEIR OWN DOOR!',knock:'KNOCK KNOCK',say:['OH, SORRY! I THOUGHT','THIS WAS MY ROOM'],lift:'LIFT',arrest:'ARRESTED!',
  cards:{0:['ONE KNOCK','GAVE HIM AWAY'],1:['A HOTEL, JUST','AFTER MIDNIGHT'],3:['A KNOCK!'],7:['HE JUST','WALKS AWAY'],8:['SHE CALLS THE','FRONT DESK'],10:['WHAT GAVE','HIM AWAY?'],16:['HE','KNOCKED!'],17:['NOBODY KNOCKS ON','THEIR OWN ROOM'],18:['YOU\'D USE YOUR','KEY CARD'],19:['HE WAS CHECKING:','ANYONE INSIDE?']}},
};
const WO={n:'',c:'#e76f51',hair:'long',hc:'#e8c25a',skin:'#f6d2b5',h:480};
const MA={n:'',c:'#2b2d42',hair:'short',hc:'#1a1a1a',skin:'#e0a77f',h:520,cap:'#111'};
const Klopf:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(15);
  const open=t>=s(4)&&t<s(8)?eio(cl((t-s(4))/.5)):t>=s(8)?1-eio(cl((t-s(8))/.5)):0;
  const mx=t<s(7)?620:620+380*eio(cl((t-s(7))/1.6));
  const knockT=[s(3)+.1,s(3)+.5];const knocking=knockT.some(a=>t>=a&&t<a+.25);
  const replay=t>=s(16)&&t<e(16)+.3;
  return <AbsoluteFill style={{background:'#3a2a3a'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1200)}><g transform='translate(540 1480) scale(1.25) translate(-540 -1480)'>
    <rect x={-300} y={-300} width={1680} height={2400} fill="#7a4e6e"/>
    {[...Array(14)].map((_,i)=><rect key={i} x={0} y={i*100} width={1080} height={50} fill="#704766"/>)}
    <rect x={-300} y={1480} width={1680} height={600} fill="#8b1e3f"/>
    {[...Array(6)].map((_,i)=><path key={i} d={`M${i*200} 1520 l100 60 l100 -60`} stroke="#c9a24a" strokeWidth={6} fill="none"/>)}
    {[200,880].map(x=><g key={x} transform={`translate(${x} 560)`}><rect x={-14} y={0} width={28} height={60} fill="#c9a24a"/><circle cy={80} r={46} fill="#ffe08a" opacity={.8}/></g>)}
    {/* Tür 512 */}
    <g transform="translate(330 1480)">
      <rect x={-200} y={-760} width={400} height={760} fill="#2a1a20" stroke={N} strokeWidth={10}/>
      {open>0&&<g><rect x={-190} y={-750} width={380} height={750} fill="#ffe7b0"/>{fig(0,-10,'wo_'+lang,WO,X.woman,1.25,{look:6})}</g>}
      <g transform={`translate(-200 0) scale(${1-open*.85} 1)`}><rect x={0} y={-760} width={400} height={760} fill="#c98b4a" stroke={N} strokeWidth={10}/><rect x={60} y={-680} width={280} height={260} rx={8} fill="none" stroke="#a86f35" strokeWidth={10}/><rect x={60} y={-360} width={280} height={260} rx={8} fill="none" stroke="#a86f35" strokeWidth={10}/><circle cx={340} cy={-380} r={20} fill={Y} stroke={N} strokeWidth={5}/><rect x={320} y={-330} width={40} height={70} rx={6} fill="#333" stroke={N} strokeWidth={4}/></g>
      <rect x={-90} y={-860} width={180} height={70} rx={12} fill="#c9a24a" stroke={N} strokeWidth={6}/><text y={-810} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={46} fill={N}>512</text>
    </g>
    {/* Aufzug */}
    <g transform="translate(960 1480)"><rect x={-110} y={-640} width={220} height={640} fill="#b8b8c8" stroke={N} strokeWidth={8}/><line x1={0} y1={-640} x2={0} y2={0} stroke={N} strokeWidth={6}/><text y={-680} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill="#fff">{X.lift}</text></g>
    {t>=s(3)&&t<s(15)+.2&&t<s(9)+1.8&&fig(mx,1500,'ma_'+lang,MA,X.man,1.35,{look:-6,arm:t>=s(3)&&t<s(4)?'up':'down'})}
    </g>{t>=s(9)&&t<s(10)+.3&&<g transform={`translate(540 640) scale(${PB(t,s(9),.3)})`}><rect x={-200} y={-50} width={400} height={100} rx={20} fill={R} stroke={N} strokeWidth={7}/><text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill="#fff">{X.arrest}</text></g>}
    </g>
    {(knocking||(replay&&Math.floor((t-s(16))*2.5)%2===0))&&<g transform={`translate(560 900) rotate(-8) scale(${knocking?1:1.2})`}><text textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill={Y} stroke={N} strokeWidth={8} paintOrder="stroke">{X.knock}</text></g>}
    {replay&&<g><rect x={40} y={560} width={320} height={70} rx={18} fill={R} stroke={N} strokeWidth={6}/><text x={200} y={608} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff">⏪ REPLAY</text></g>}
    {t>=s(18)&&t<e(18)+.3&&<g transform={`translate(700 1050) scale(${PB(t,s(18),.3)})`}><rect x={-120} y={-75} width={240} height={150} rx={18} fill="#3d7ea6" stroke={N} strokeWidth={8}/><rect x={-120} y={-35} width={240} height={30} fill="#1d2540"/><circle cx={70} cy={40} r={18} fill={Y}/></g>}
    {t>=s(5)&&t<e(6)+.4&&bubble(560,820,X.say,PB(t,s(5),.3),lang==='de'?48:50)}
    {t>=s(8)&&t<s(9)&&<g transform={`translate(330 900) scale(${PB(t,s(8),.3)})`}><circle r={70} fill={G} stroke={N} strokeWidth={7}/><path d="M-30 -10 q0 -30 30 -30 l10 18 l-14 12 q10 20 26 26 l12 -14 l18 10 q0 30 -30 30 q-52 -10 -52 -52Z" fill="#fff"/></g>}
    {t>=s(10)&&t<s(15)&&qb(t,620,780,1.2)}
    {vign}
    {cards(t,S,X.cards,[10])}
    {countdown(t,S,[12,13,14])}
    {stamp(t,sol,.8,X.sol)}
    {stamp(t,e(19)+.2,2.2,X.done,lang==='de'?980:1040,lang==='de'?66:58)}
    {flash(t,s(16))}
   </svg>
  </AbsoluteFill>;
};
export const KlopfDE:React.FC=()=><Klopf lang="de"/>;
export const KlopfEN:React.FC=()=><Klopf lang="en"/>;
