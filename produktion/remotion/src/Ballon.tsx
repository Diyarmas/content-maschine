import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,CAST,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign,bubble} from './kit';
import WD from './w_ballon_de.json'; import WE from './w_ballon_en.json';
const L={
 de:{W:WD,guest:'GAST',host:'WIRT KLAUS',sol:'LÖSUNG',done:'SCHRECK STATT WASSER!',hick:'HICKS!',pop:'PENG!',water:['EIN GLAS','WASSER, BITTE'],thx:['DANKE!'],city:'HAMBURG',
  cards:{0:['RIESEN-SCHRECK…','UND ER SAGT DANKE'],1:['EINE KNEIPE','IN HAMBURG'],2:['EIN GLAS','WASSER, BITTE'],3:['KLAUS SAGT','KEIN WORT'],6:['KEIN','SCHLUCK!'],7:['WARUM?'],13:['ER HATTE','SCHLUCKAUF!'],14:['WASSER GEGEN','SCHLUCKAUF'],15:['KLAUS HÖRT ES:','SCHRECK!'],16:['SCHLUCKAUF','WEG!']}},
 en:{W:WE,guest:'GUEST',host:'TOM',sol:'ANSWER',done:'A SCARE, NOT WATER!',hick:'HIC!',pop:'POP!',water:['A GLASS OF','WATER, PLEASE'],thx:['THANK YOU!'],city:'LONDON',
  cards:{0:['THE FRIGHT OF','HIS LIFE… THEN THANKS'],1:['A PUB','IN LONDON'],2:['A GLASS OF','WATER, PLEASE'],3:['TOM SAYS','NOTHING'],6:['NOT ONE','SIP!'],7:['WHY?'],13:['HE HAD','HICCUPS!'],14:['WATER FOR','HICCUPS'],15:['TOM HEARD IT:','A SCARE!'],16:['HICCUPS','GONE!']}},
};
const GUEST={n:'',c:'#3d7ea6',hair:'curly',hc:'#3b2a20',skin:'#f1c7a3',h:510};
const HOST={n:'',c:'#2a9d8f',hair:'bald',hc:'#7a5a3a',skin:'#e8b48a',h:520,beard:'#7a5a3a'};
const Ballon:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(12),popT=e(4)-.15;
  const bal=t>=s(4)&&t<popT?eio(cl((t-s(4))/(popT-s(4)))):0;
  const jump=t>=popT&&t<popT+.6?Math.sin((t-popT)/.6*Math.PI)*60:0;
  const leave=t>=e(5)-.3?eio(cl((t-e(5)+.3)/1.4)):0;
  const gx=780+leave*600*(t<s(12)?1:0);
  const replay=t>=s(13)&&t<e(16)+.2;
  const hicks=(t>=s(13)&&t<s(15))?[0,1,2].map(i=>{const a=s(13)+.2+i*.7;return t>=a&&t<a+.6?<g key={i} transform={`translate(${820+i*50} ${1000-i*90}) scale(${PB(t,a,.2)})`}><text textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={70} fill={Y} stroke={N} strokeWidth={6} paintOrder="stroke">{X.hick}</text></g>:null;}):null;
  return <AbsoluteFill style={{background:'#2a1a10'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1200)}>
    <rect width={1080} height={1920} fill="#5a3a22"/>
    {[...Array(10)].map((_,i)=><rect key={i} x={i*110} y={0} width={8} height={1300} fill="#4a2e1a"/>)}
    {/* Regal */}
    {[820,1060].map((y,r)=><g key={y}><rect x={60} y={y} width={500} height={18} fill="#3a2414" stroke={N} strokeWidth={5}/>{[0,1,2,3,4,5].map(i=><rect key={i} x={80+i*80} y={y-150} width={56} height={150} rx={12} fill={['#2a9d8f','#c0392b','#e9c46a','#6a4c93','#3d7ea6','#8a5a32'][(i+r)%6]} stroke={N} strokeWidth={5}/>)}</g>)}
    <g transform="translate(830 420)"><rect x={-150} y={-90} width={300} height={180} rx={16} fill="#1d2540" stroke="#c9a24a" strokeWidth={8}/><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={54} fill={Y}>{lang==='de'?'KNEIPE':'THE PUB'}</text></g>
    {fig(290,1640,'host_'+lang,HOST,X.host,1.55,{look:6,arm:t>=s(4)&&t<popT+.3?'up':'down'})}
    {t>=s(4)&&t<popT+.05&&<g transform={`translate(${470+bal*120} ${880-bal*40})`}><line x1={0} y1={70*(.4+bal)} x2={-20} y2={200} stroke={N} strokeWidth={4}/><ellipse rx={50+bal*90} ry={60+bal*105} fill={R} stroke={N} strokeWidth={7}/><ellipse cx={-20-bal*30} cy={-25-bal*40} rx={14+bal*14} ry={20+bal*20} fill="#fff" opacity={.5}/></g>}
    {t>=popT&&t<popT+.5&&<g transform={`translate(600 840) scale(${PB(t,popT,.15)*1.3})`}>{[...Array(10)].map((_,i)=>{const a=i*36*Math.PI/180;return <line key={i} x1={Math.cos(a)*60} y1={Math.sin(a)*60} x2={Math.cos(a)*170} y2={Math.sin(a)*170} stroke={Y} strokeWidth={14} strokeLinecap="round"/>;})}<text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={110} fill="#fff" stroke={N} strokeWidth={8} paintOrder="stroke">{X.pop}</text></g>}
    {/* Theke */}
    <rect x={0} y={1420} width={1080} height={60} fill="#8a5a32" stroke={N} strokeWidth={8}/>
    <rect x={0} y={1480} width={1080} height={440} fill="#6d4223" stroke={N} strokeWidth={8}/>
    {[...Array(6)].map((_,i)=><rect key={i} x={30+i*180} y={1530} width={150} height={360} rx={12} fill="none" stroke="#5a3418" strokeWidth={8}/>)}
    {fig(gx,1930-jump,'guest_'+lang,GUEST,X.guest,1.6,{look:-6,arm:t>=popT&&t<popT+.6?'up':'down'})}
    {t>=s(2)+.6&&<g transform="translate(580 1420) scale(1.3)"><path d="M-40 -150 L-32 0 L32 0 L40 -150Z" fill="#dff3ff" stroke={N} strokeWidth={6} opacity={.9}/><rect x={-34} y={-100} width={68} height={96} fill="#9fd3f0" opacity={.8}/></g>}
    {t>=s(6)&&t<s(8)&&<g transform={`translate(580 1300) scale(${PB(t,s(6),.3)*1.3})`}><circle r={70} fill="none" stroke={R} strokeWidth={12}/><line x1={-50} y1={50} x2={50} y2={-50} stroke={R} strokeWidth={12}/></g>}
    </g>
    {t>=s(2)&&t<e(2)+.4&&bubble(760,860,X.water,PB(t,s(2),.3),56)}
    {t>=s(5)+.4&&t<e(5)+.2&&bubble(760,860,X.thx,PB(t,s(5)+.4,.3),56)}
    {t>=s(7)&&t<s(12)&&<g>{qb(t,290,700)}{qb(t,780,930)}</g>}
    {replay&&<g><rect x={740} y={560} width={300} height={70} rx={18} fill={R} stroke={N} strokeWidth={6}/><text x={890} y={608} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff">{lang==='de'?'⏪ ZURÜCK':'⏪ REPLAY'}</text></g>}
    {hicks}
    {vign}
    {cards(t,S,X.cards,[7])}
    {countdown(t,S,[9,10,11])}
    {stamp(t,sol,1.0,X.sol)}
    {stamp(t,e(16)+.2,2.4,X.done,960,76)}
    {flash(t,popT)}{flash(t,s(13))}
   </svg>
  </AbsoluteFill>;
};
export const BallonDE:React.FC=()=><Ballon lang="de"/>;
export const BallonEN:React.FC=()=><Ballon lang="en"/>;
