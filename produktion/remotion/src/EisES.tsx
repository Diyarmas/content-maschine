import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person,PPL,CAST} = require('./figs.js');
import WDE from './words_eises_de.json';
import WEN from './words_eises_de.json';
PPL.hiroshi={n:'JAVIER',c:'#c0392b',hair:'short',hc:'#1a1a1a',skin:'#e8c39e',h:500};
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const T={
 de:{cards:{0:['VASO LLENO,','HIELO ARRIBA'],1:['EL BAR DE','JAVIER'],2:['LLENO HASTA','EL BORDE'],3:['UN CUBO','DE HIELO'],5:['Y LO','LOCO'],6:['SE DERRITE','TODO'],7:['"¡SE','DESBORDA!"'],8:['MUCHO HIELO','BAJO EL AGUA'],9:['¿SE DESBORDA','EL VASO?'],18:['¡NO!','NI UNA GOTA'],19:['EL HIELO','DESPLAZA SU PESO'],20:['EL AGUA LLENA','ESE HUECO'],21:['EL NIVEL','NO CAMBIA'],22:['PESO,','NO TAMAÑO']} as Record<number,string[]>,
  sol:'SOLUCIÓN',done:'¡EL PESO MANDA!',no:['¡SE DESBORDA!'],rim:'HASTA EL BORDE',lvl:'IGUAL DE ALTO'},
 en:{cards:{0:['FULL GLASS,','ICE ON TOP'],1:['HIROSHI\'S BAR','IN TOKYO'],2:['FILLED TO','THE BRIM'],3:['ONE BIG','ICE CUBE'],5:['AND THE','CRAZY PART'],6:['IT MELTS','COMPLETELY'],7:['"IT WILL','OVERFLOW!"'],8:['MOST ICE IS','UNDER WATER'],9:['DOES THE GLASS','OVERFLOW?'],18:['NO!','NOT A DROP'],19:['ICE PUSHES ASIDE','ITS WEIGHT'],20:['MELTWATER FILLS','THAT SPACE'],21:['WATER LEVEL','STAYS THE SAME'],22:['WEIGHT,','NOT SIZE']} as Record<number,string[]>,
  sol:'ANSWER',done:'WEIGHT, NOT SIZE!',no:['IT OVERFLOWS!'],rim:'FILLED TO THE BRIM',lvl:'SAME LEVEL'}};
const GX0=330,GX1=750,GT=840,GB=1480,WL=874;
const Eis:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=T[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const a0=(kk===18)?Math.max(s(18),s(17)+1.3):s(kk);const c:Card={a:a0,b:Math.max(e(kk)+.3,a0+1.4),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2; const doneA=e(22)+.35,doneB=doneA+2.4;
  const bubble=(x:number,y:number,lines:string[],p:number,size=44,bg=C)=>{const w=Math.max(...lines.map(l=>l.length))*size*.6+70,h=lines.length*size*1.1+40;
    return <g transform={`translate(${x} ${y}) scale(${p})`}><rect x={-w/2} y={-h/2} width={w} height={h} rx={28} fill={bg} stroke={N} strokeWidth={7}/><path d={`M-20 ${h/2-2} L0 ${h/2+34} L20 ${h/2-2}Z`} fill={bg} stroke={N} strokeWidth={7} strokeLinejoin="round"/><rect x={-18} y={h/2-8} width={36} height={12} fill={bg}/>{lines.map((l,i)=><text key={i} y={-h/2+size*1.02+20+i*size*1.1-6} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={size} fill={N}>{l}</text>)}</g>;};
  const drop=eio(cl((t-.2)/.6));
  const shrink=eio(cl((t-s(20)-.2)/2.6));
  const bob=Math.sin(t*2.2)*5*(1-shrink);
  const cs=1-shrink; // Würfelgröße
  const CXc=540, CW=230, CH=250, CTOP=WL-52+bob; // 52px ragen heraus
  const showCube=t>=s(3)&&cs>0.02;
  const subA=t>=s(19)&&t<s(21)+.2; // verdrängtes Wasser markieren
  const z0=1+.04*eio(cl(t/Math.max(.1,s(9)))), zp=.05*eio(cl((t-s(19))/1.0))*(1-eio(cl((t-s(22))/1.2)));const zoom=z0+zp;
  return <AbsoluteFill style={{background:'#1b2440'}}><div style={{position:'absolute',inset:0,transform:`scale(${zoom})`,transformOrigin:'540px 1150px'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <defs><clipPath id="gl"><path d={`M${GX0} ${GT} L${GX0+22} ${GB} L${GX1-22} ${GB} L${GX1} ${GT}Z`}/></clipPath></defs>
    <rect width={1080} height={1920} fill="#3a2a22"/>
    {[0,1,2,3,4,5].map(i=><rect key={i} x={40+i*170} y={140+(i%2)*40} width={110} height={400} rx={10} fill={i%2?'#c0392b':'#e8b04a'} stroke={N} strokeWidth={6} opacity={.55}/>)}
    <rect y={1280} width={1080} height={80} fill="#9a6a3a" stroke={N} strokeWidth={8}/>
    <rect y={1480} width={1080} height={440} fill="#7a4f2a" stroke={N} strokeWidth={8}/>
    <rect y={1480} width={1080} height={44} fill="#b88a5c" stroke={N} strokeWidth={8}/>
    <rect y={1360} width={1080} height={120} fill="#5a3a22"/>
    {t>=0&&<g transform={`translate(0 ${(1-drop)*-600})`}>
     <path d={`M${GX0} ${GT} L${GX0+22} ${GB} L${GX1-22} ${GB} L${GX1} ${GT}Z`} fill="#cfe9f7" opacity={.35}/>
     <g clipPath="url(#gl)">
      <rect x={GX0} y={WL} width={GX1-GX0} height={GB-WL} fill="#4aa3df" opacity={.85}/>
      <path d={`M${GX0} ${WL} Q${GX0+100} ${WL-8+Math.sin(t*3)*5} ${540} ${WL} T${GX1} ${WL}`} stroke="#bfe3f7" strokeWidth={8} fill="none"/>
      {subA&&<rect x={CXc-CW/2-6} y={WL} width={CW+12} height={CH-52} rx={26} fill="none" stroke={Y} strokeWidth={9} strokeDasharray="22 14"/>}
     </g>
     {showCube&&<g transform={`translate(${CXc} ${WL+60}) scale(${cs}) translate(${-CXc} ${-(WL+60)})`}>
        <rect x={CXc-CW/2} y={CTOP} width={CW} height={CH} rx={26} fill="#e8f6ff" stroke={N} strokeWidth={8} opacity={.92}/>
        <rect x={CXc-CW/2+22} y={CTOP+WL-CTOP+20} width={50} height={14} rx={7} fill="#fff" opacity={.7}/>
      </g>}
     <path d={`M${GX0} ${GT} L${GX0+22} ${GB} L${GX1-22} ${GB} L${GX1} ${GT}`} fill="none" stroke={N} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round"/>
     <path d={`M${GX0-14} ${GT} L${GX1+14} ${GT}`} stroke={N} strokeWidth={10} strokeLinecap="round"/>
     {/* Randlinie / Wasserstand-Marker */}
     {t>=s(19)&&<g><line x1={GX1+30} y1={WL} x2={GX1+150} y2={WL} stroke={R} strokeWidth={9} strokeLinecap="round" strokeDasharray="18 12"/><path d={`M${GX1+30} ${WL} l22 -14 v28Z`} fill={R}/>{t>=s(21)&&<g transform={`translate(${GX1+30} ${WL+90}) scale(${PB(t,s(21),.3)})`}><rect x={0} y={-40} width={250} height={80} rx={24} fill={R} stroke={N} strokeWidth={6}/><text x={125} y={14} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff">{X.lvl}</text></g>}</g>}
    </g>}
    {t>=s(2)&&t<s(18)&&<g transform={`translate(540 1560) scale(${PB(t,s(2)+.5,.3)})`}><rect x={-230} y={-38} width={460} height={76} rx={28} fill={Y} stroke={N} strokeWidth={7}/><text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={42} fill={N}>{X.rim}</text></g>}
    {t>=s(9)&&t<s(18)&&<text x={CXc} y={1230} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={220} fill={Y} stroke={N} strokeWidth={10} paintOrder="stroke" transform={`rotate(${Math.sin(t*3)*4} ${CXc} 1150)`}>?</text>}
    {/* Tropfen-Geister bei der falschen Annahme */}
    {t>=s(7)&&t<e(7)+.6&&[0,1,2].map(i=>{const u=cl((t-s(7)-i*.35)/1.0);return <path key={i} transform={`translate(${GX0-12+ i*0} ${GT+20+u*160})`} d="M0 -22 Q16 6 0 18 Q-16 6 0 -22Z" fill="#4aa3df" stroke={N} strokeWidth={4} opacity={1-u}/>;})}
    {/* Hiroshi */}
    <g transform="translate(125 1860) scale(1.2)" dangerouslySetInnerHTML={{__html:person(0,0,'hiroshi',{tag:false,look:6})}}/>
    <g transform="translate(175 1892)"><rect x={-120} y={-26} width={240} height={52} rx={18} fill="#fff" stroke={N} strokeWidth={6}/><text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={N}>JAVIER</text></g>
    {t>=s(7)&&t<e(7)+.4&&bubble(820,700,X.no,PB(t,s(7),.35),48)}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-490} y={-100} width={980} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={30} fontFamily={FONT} fontWeight={700} fontSize={80} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </div></AbsoluteFill>;
};
export const EisESDE:React.FC=()=><Eis lang="de"/>;

