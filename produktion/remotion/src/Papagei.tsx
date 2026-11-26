import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person,PPL,CAST} = require('./figs.js');
import W from './words_papagei_es.json';
PPL.julia={...CAST.jule,n:'JULIA'};
PPL.kai={...CAST.ali,n:'KAI'};
PPL.luis={...CAST.lars,n:'LUIS'};
type Wd={w:string;s:number;e:number};
const S:{a:number;b:number}[]=[];{let cur:Wd[]=[];for(const x of (W as any).words){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}}
const cards:Record<number,string[]>={0:['UNO SE DELATA','CON 1 FRASE'],3:['UN LORO','HA DESAPARECIDO'],4:['SOLO 1','PREGUNTA'],5:['"¿QUÉ HICISTEIS','AYER?"'],17:['¿QUIÉN','SE DELATA?'],24:['¡EL NÚMERO 3!','LUIS'],25:['SOLO PREGUNTÓ','QUÉ HICIERON'],26:['NADIE DIJO','"PÁJARO"'],27:['¿CÓMO LO','SABE LUIS?'],28:['PORQUE ESTUVO','ALLÍ']};
const SAY:Record<number,[number,string[]]>={9:[0,['"DÍA LIBRE, CON','MI ABUELA"']],12:[1,['"CERRÉ LAS JAULAS','DE LOS MONOS"']],15:[2,['"ESTUVE EN EL','REPTILARIO"']],16:[2,['"EN LAS AVES','NI ESTUVE"']]};
const XS=[200,540,880];const KEY=['julia','kai','luis'];
const Papagei:React.FC=()=>{
  const f=useCurrentFrame(),t=f/30;const s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;
  const cardEls=Object.entries(cards).map(([k,l])=>{const kk=+k;const c:Card={a:s(kk),b:Math.max(e(kk)+.3,s(kk)+1.4),lines:l,y:300,bg:kk===17?Y:undefined};return cardSvg(t,c);});
  const cd=[19,20,21].findIndex(k=>t>=s(k)&&t<s(k)+(s(k+1)-s(k)));
  const sol=t>=s(23);const ex=t>=s(26);
  const bubble=(x:number,y:number,lines:string[],p:number,size=44)=>{const w=Math.max(...lines.map(l=>l.length))*size*.6+70,h=lines.length*size*1.1+40;
    return <g transform={`translate(${x} ${y}) scale(${p})`}><rect x={-w/2} y={-h/2} width={w} height={h} rx={30} fill={C} stroke={N} strokeWidth={7}/><path d={`M-20 ${h/2-2} L0 ${h/2+40} L20 ${h/2-2}Z`} fill={C} stroke={N} strokeWidth={7} strokeLinejoin="round"/><rect x={-18} y={h/2-8} width={36} height={12} fill={C}/>{lines.map((l,i)=><text key={i} y={-h/2+size*1.02+20+i*size*1.1-6} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={size} fill={N}>{l}</text>)}</g>;};
  const qb=(x:number,y:number)=><g transform={`translate(${x} ${y+Math.sin(t*4+x)*8})`}><circle r={46} fill={C} stroke={N} strokeWidth={7}/><text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={80} fill={N}>?</text></g>;
  const num=(x:number,y:number,n:number,hi:boolean)=><g transform={`translate(${x} ${y})`}><circle r={54} fill={hi?G:N} stroke={N} strokeWidth={6}/><text y={26} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={72} fill="#fff">{n}</text></g>;
  const nameT=(x:number,y:number,n:string)=><g transform={`translate(${x} ${y})`}><rect x={-100} y={-34} width={200} height={68} rx={20} fill="#fff" stroke={N} strokeWidth={6}/><text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill={N}>{n}</text></g>;
  const talk=Object.entries(SAY).find(([k])=>t>=s(+k)&&t<e(+k)+.5);
  const flap=Math.sin(t*14)*6;
  return <AbsoluteFill style={{background:'#14213d'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <rect width={1080} height={1920} fill="#1d3557"/>
    {[...Array(14)].map((_,i)=><circle key={i} cx={(i*173)%1080} cy={80+(i*97)%360} r={i%3?3:5} fill="#fff" opacity={.5+.4*Math.sin(t*2+i)}/>)}
    <circle cx={880} cy={190} r={90} fill="#fdf1b0" stroke={N} strokeWidth={6}/>
    <rect y={560} width={1080} height={900} fill="#2d6a4f" stroke={N} strokeWidth={6}/>
    {/* Vogelkäfig mit leerer Stange */}
    <g transform="translate(540 690) scale(1.3)">
      <rect x={-300} y={-140} width={600} height={400} rx={30} fill="#10231d" stroke={N} strokeWidth={8}/>
      {[...Array(11)].map((_,i)=><line key={i} x1={-270+i*54} y1={-140} x2={-270+i*54} y2={260} stroke="#c9a24a" strokeWidth={6}/>)}
      <line x1={-260} y1={90} x2={260} y2={90} stroke="#8a5a30" strokeWidth={14} strokeLinecap="round"/>
      {t<s(3)+.3?<g transform={`translate(0 ${30+flap})`}><ellipse cx={0} cy={20} rx={46} ry={60} fill={R} stroke={N} strokeWidth={6}/><circle cx={0} cy={-52} r={34} fill={R} stroke={N} strokeWidth={6}/><path d="M18 -54 L50 -44 L18 -38Z" fill={Y} stroke={N} strokeWidth={4}/><circle cx={-8} cy={-58} r={6} fill={N}/></g>:<text y={60} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill={Y} opacity={.9}>VACÍO</text>}
    </g>
    <rect y={1450} width={1080} height={470} fill="#3d2f22" stroke={N} strokeWidth={8}/>
    {KEY.map((k,i)=>{const bob=(talk&&talk[1][0]===i)?Math.sin(t*10)*6:0;const hi=sol&&i===2;
      return <g key={k} transform={`translate(${XS[i]} ${1690+bob}) scale(${hi?1.62:1.45})`} opacity={sol&&!hi?.55:1} dangerouslySetInnerHTML={{__html:person(0,0,k,{look:0})}}/>;})}
    {KEY.map((k,i)=>t>=s(7+i*3)&&<g key={'n'+i}>{num(XS[i],1400,i+1,sol&&i===2)}</g>)}
    {t>=s(17)&&t<s(23)&&<g>{qb(XS[0],930)}{qb(XS[1],930)}{qb(XS[2],930)}</g>}
    {talk&&bubble(Math.min(Math.max(XS[talk[1][0]],260),820),830,talk[1][1],PB(t,s(+talk[0]),.3),56)}
    {ex&&t<e(27)+.3&&<g transform={`translate(${XS[2]} 900)`}><circle r={60} fill={Y} stroke={N} strokeWidth={7}/><text y={26} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={70} fill={N}>!</text></g>}
    {cardEls}
    {cd>=0&&(()=>{const k=19+cd;const a=s(k);const b=s(k+1);const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{3-cd}</text></g>;})()}
    {t>=s(22)&&t<s(22)+1.3&&(()=>{const p=PB(t,s(22),.35);return <g transform={`translate(540 300) rotate(-8) scale(${p})`}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">SOLUCIÓN</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const PapageiES:React.FC=()=><Papagei/>;
