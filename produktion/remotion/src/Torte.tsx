import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person,PPL,CAST} = require('./figs.js');
import WDE from './words_torte_de.json';
import WEN from './words_torte_en.json';
PPL.rosa={n:'ROSA',c:'#c0392b',hair:'bun',hc:'#cfcfcf',skin:'#e3b896',h:470};
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const T={
 de:{cards:{0:['8 ENKEL,','1 TORTE'],1:['NONNA ROSAS','KÜCHE'],2:['EINE RUNDE','TORTE'],3:['NUR 3','SCHNITTE'],4:['8 GLEICH','GROSSE STÜCKE'],6:['NICHT','VERSCHIEBEN'],7:['"DAS GEHT','NICHT!"'],8:['NUR FLACH','GEDACHT'],9:['WIE SCHNEIDET','SIE 8 STÜCKE?'],18:['2 SCHNITTE','= 4 STÜCKE'],19:['DER 3. SCHNITT','WAAGRECHT'],20:['AUS 4 WERDEN','8 STÜCKE'],21:['ALLE 8','GLEICH GROSS'],22:['DER TRICK','IST DIE HÖHE']} as Record<number,string[]>,
  sol:'LÖSUNG',done:'DIE HÖHE ZÄHLT!',no:['UNMÖGLICH!'],kids:'8 ENKEL',max:'MAX. 3 SCHNITTE'},
 en:{cards:{0:['8 GRANDKIDS,','1 CAKE'],1:['NONNA ROSA\'S','KITCHEN'],2:['ONE ROUND','CAKE'],3:['ONLY 3','CUTS'],4:['8 EQUAL','PIECES'],6:['NO MOVING','THE PIECES'],7:['"IMPOSSIBLE!"','SAYS MOST'],8:['THEY THINK','FLAT'],9:['HOW DOES SHE','CUT 8 PIECES?'],18:['2 CUTS =','4 PIECES'],19:['3RD CUT:','HORIZONTAL'],20:['4 BECOME','8 PIECES'],21:['ALL 8','EQUAL'],22:['THE TRICK IS','THE HEIGHT']} as Record<number,string[]>,
  sol:'ANSWER',done:'USE THE HEIGHT!',no:['IMPOSSIBLE!'],kids:'8 GRANDKIDS',max:'MAX. 3 CUTS'}};
const CX=540, RX=330, RY=125, YT=1020, YM=1110, YB=1200, LIFT=240;
const KID=[['#f1c7a3','#3b2a20'],['#e0a77f','#d9a441'],['#c68a64','#1a1a1a'],['#f1c7a3','#a0522d'],['#e3b896','#2b1d14'],['#d9a07a','#7a4a2a'],['#f1c7a3','#d9a441'],['#c68a64','#3b2a20']];
const Torte:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=T[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const a0=(kk===18)?Math.max(s(18),s(17)+1.3):s(kk);const c:Card={a:a0,b:Math.max(e(kk)+.3,a0+1.4),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2; const doneA=e(22)+.35,doneB=doneA+2.4;
  const a18=Math.max(s(18),s(17)+1.3);
  const bubble=(x:number,y:number,lines:string[],p:number,size=44,bg=C)=>{const w=Math.max(...lines.map(l=>l.length))*size*.6+70,h=lines.length*size*1.1+40;
    return <g transform={`translate(${x} ${y}) scale(${p})`}><rect x={-w/2} y={-h/2} width={w} height={h} rx={28} fill={bg} stroke={N} strokeWidth={7}/><path d={`M-20 ${h/2-2} L0 ${h/2+34} L20 ${h/2-2}Z`} fill={bg} stroke={N} strokeWidth={7} strokeLinejoin="round"/><rect x={-18} y={h/2-8} width={36} height={12} fill={bg}/>{lines.map((l,i)=><text key={i} y={-h/2+size*1.02+20+i*size*1.1-6} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={size} fill={N}>{l}</text>)}</g>;};
  const drop=eio(cl((t-s(2))/.6));
  const lift=eio(cl((t-s(20))/1.0))*LIFT;
  const p1=eio(cl((t-a18)/.6)), p2=eio(cl((t-a18-.5)/.6)), p3=eio(cl((t-s(19)-.2)/1.3));
  const cross=(cy:number,k:number)=><g>
    <line x1={CX-RX*p1} y1={cy} x2={CX+RX*p1} y2={cy} stroke={R} strokeWidth={9} strokeLinecap="round"/>
    <line x1={CX} y1={cy-RY*p2} x2={CX} y2={cy+RY*p2} stroke={R} strokeWidth={9} strokeLinecap="round"/></g>;
  const topEll=(cy:number,fill:string)=><ellipse cx={CX} cy={cy} rx={RX} ry={RY} fill={fill} stroke={N} strokeWidth={8}/>;
  const side=(y0:number,y1:number,fill:string)=><path d={`M${CX-RX} ${y0} L${CX-RX} ${y1} A${RX} ${RY} 0 0 0 ${CX+RX} ${y1} L${CX+RX} ${y0}Z`} fill={fill} stroke={N} strokeWidth={8} strokeLinejoin="round"/>;
  const num=(x:number,y:number,n:number,a:number)=>t>=a?<g key={n} transform={`translate(${x} ${y}) scale(${PB(t,a,.3)})`}><circle r={36} fill={Y} stroke={N} strokeWidth={6}/><text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={48} fill={N}>{n}</text></g>:null;
  const cyU=YT-lift, cyL=YM;
  const pos=[[-165,-62],[165,-62],[-165,62],[165,62]];
  const kid=(i:number)=>{const x=108+i*118,y=510,[sk,hc]=KID[i];const a=s(0)+.15*i;const sc=PB(t,a,.3);const bob=Math.sin(t*6+i)*4;
    return <g key={i} transform={`translate(${x} ${y+bob}) scale(${sc})`}><circle r={46} fill={sk} stroke={N} strokeWidth={6}/><path d="M-46 -8 Q-44 -52 0 -50 Q44 -52 46 -8 Q20 -30 -20 -26 Q-40 -22 -46 -8Z" fill={hc} stroke={N} strokeWidth={5}/><circle cx={-16} cy={0} r={8} fill="#fff" stroke={N} strokeWidth={3}/><circle cx={16} cy={0} r={8} fill="#fff" stroke={N} strokeWidth={3}/><circle cx={-16} cy={2} r={4} fill={N}/><circle cx={16} cy={2} r={4} fill={N}/><ellipse cx={0} cy={26} rx={13} ry={10} fill="#7a1f1f" stroke={N} strokeWidth={4}/></g>;};
  // Messer entlang des dritten Schnitts
  const kx=CX-RX*Math.cos(Math.PI*p3), ky=YM+RY*Math.sin(Math.PI*p3);
  return <AbsoluteFill style={{background:'#1b2440'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <rect width={1080} height={1920} fill="#d9c7a3"/>
    {Array.from({length:9}).map((_,i)=><line key={i} x1={i*135} y1={0} x2={i*135} y2={1100} stroke="#c8b48c" strokeWidth={4}/>)}
    {Array.from({length:9}).map((_,i)=><line key={i} x1={0} y1={i*140} x2={1080} y2={i*140} stroke="#c8b48c" strokeWidth={4}/>)}
    <rect y={1100} width={1080} height={200} fill="#b88a5c" stroke={N} strokeWidth={8}/>
    <rect y={1300} width={1080} height={400} fill="#8a5f3a" stroke={N} strokeWidth={8}/>
    {Array.from({length:4}).map((_,i)=><rect key={i} x={40+i*260} y={1340} width={220} height={320} rx={14} fill="none" stroke="#6b4527" strokeWidth={8}/>)}
    <rect y={1700} width={1080} height={220} fill="#5a4332" stroke={N} strokeWidth={6}/>
    {/* Kinder */}
    {t>=s(0)&&<>{[0,1,2,3,4,5,6,7].map(kid)}
      <g transform={`translate(540 602) scale(${PB(t,s(0)+.9,.3)})`}><rect x={lang==='de'?-130:-200} y={-34} width={lang==='de'?260:400} height={68} rx={26} fill={Y} stroke={N} strokeWidth={7}/><text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill={N}>{X.kids}</text></g></>}
    {/* Teller + Torte */}
    {t>=s(2)&&<g transform={`translate(0 ${(1-drop)*-500})`}>
      <ellipse cx={CX} cy={YB+14} rx={400} ry={150} fill="#000" opacity={.18}/>
      <ellipse cx={CX} cy={YB+8} rx={390} ry={142} fill="#ffffff" stroke={N} strokeWidth={8}/>
      {/* untere Hälfte */}
      {side(YM,YB,'#e0a860')}
      {lift>1&&topEll(cyL,'#f7e7c0')}
      {lift>1&&cross(cyL,0)}
      {/* obere Hälfte */}
      <g transform={`translate(0 ${-lift})`}>
        {side(YT,YM,'#e0a860')}
        <path d={`M${CX-RX} ${YM} A${RX} ${RY} 0 0 0 ${CX+RX} ${YM}`} fill="none" stroke="#f7e7c0" strokeWidth={12}/>
        {topEll(YT,'#f4a6b8')}
        <circle cx={CX} cy={YT-8} r={26} fill={R} stroke={N} strokeWidth={6}/><path d={`M${CX} ${YT-34} q10 -30 30 -36`} stroke="#2a6e3f" strokeWidth={7} fill="none" strokeLinecap="round"/>
      </g>
      {t<s(20)&&p1>0&&cross(YT,1)}
      {lift>1&&cross(cyU,2)}
    </g>}
    {t>=s(9)&&t<a18&&<text x={CX} y={YT+90} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={240} fill={Y} stroke={N} strokeWidth={10} paintOrder="stroke" transform={`rotate(${Math.sin(t*3)*4} ${CX} ${YT})`}>?</text>}
    {t>=s(3)&&t<a18&&<g transform={`translate(540 850) scale(${PB(t,s(3),.3)})`}><rect x={-210} y={-38} width={420} height={76} rx={28} fill={R} stroke={N} strokeWidth={7}/><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={46} fill="#fff">{X.max}</text></g>}
    {/* dritter Schnitt: waagrechte Linie am Rand */}
    {t>=s(19)&&lift<2&&p3>0&&<><path d={`M${CX-RX} ${YM} A${RX} ${RY} 0 0 0 ${CX+RX} ${YM}`} fill="none" stroke={R} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${p3} 1`}/>
      {p3<1&&<g transform={`translate(${kx} ${ky}) rotate(-12)`}><rect x={-170} y={-16} width={170} height={32} rx={8} fill="#cfd6df" stroke={N} strokeWidth={6}/><rect x={0} y={-20} width={90} height={40} rx={12} fill="#6b4527" stroke={N} strokeWidth={6}/></g>}</>}
    {/* Nummern */}
    {pos.map(([dx,dy],i)=>num(CX+dx,cyU+dy,i+1,s(21)+i*.35))}
    {pos.map(([dx,dy],i)=>num(CX+dx,cyL+dy,i+5,s(21)+(i+4)*.35))}
    {/* Rosa */}
    <g transform="translate(125 1860) scale(1.2)" dangerouslySetInnerHTML={{__html:person(0,0,'rosa',{tag:false,look:6})}}/>
    <g transform="translate(165 1892)"><rect x={-115} y={-26} width={230} height={52} rx={18} fill="#fff" stroke={N} strokeWidth={6}/><text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={N}>NONNA ROSA</text></g>
    {t>=s(7)&&t<e(7)+.4&&bubble(800,770,X.no,PB(t,s(7),.35),48)}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-490} y={-100} width={980} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={30} fontFamily={FONT} fontWeight={700} fontSize={80} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const TorteDE:React.FC=()=><Torte lang="de"/>;
export const TorteEN:React.FC=()=><Torte lang="en"/>;
