import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
import WDE from './words_zahl_de.json';
import WEN from './words_zahl_en.json';
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const T={
 de:{cards:{0:['VERLIERER','ZAHLT ALLES!'],1:['CAFÉ VON','MADAME DUBOIS'],2:['ZAHL AUF','DEM BODEN'],3:['YUSUF UNTEN','INGRID OBEN'],4:['"SECHS!" -','"NEUN!"'],6:['BEIDE SAGEN:','ICH HAB RECHT'],7:['EINER','IRRT SICH?'],8:['DAS STIMMT','NICHT'],9:['WER HAT','RECHT?'],18:['BEIDE HABEN','RECHT!'],19:['ZAHL LIEGT','ZWISCHEN IHNEN'],20:['YUSUF SIEHT','EINE SECHS'],21:['INGRID SIEHT','EINE NEUN'],22:['180 GRAD','DREHEN']} as Record<number,string[]>,
  sol:'LÖSUNG',done:'BEIDE HABEN RECHT!',deg:'180 GRAD',nm:['YUSUF','INGRID']},
 en:{cards:{0:['LOSER PAYS','THE BILL!'],1:['MADAME DUBOIS\'','CAFE'],2:['NUMBER ON','THE FLOOR'],3:['YUSUF BELOW','INGRID ABOVE'],4:['"SIX!" -','"NINE!"'],6:['BOTH SAY:','I\'M RIGHT'],7:['ONE MUST','BE WRONG?'],8:['THAT IS','NOT TRUE'],9:['WHO IS','RIGHT?'],18:['BOTH ARE','RIGHT!'],19:['NUMBER LIES','BETWEEN THEM'],20:['YUSUF SEES','A SIX'],21:['INGRID SEES','A NINE'],22:['TURN IT','180 DEGREES']} as Record<number,string[]>,
  sol:'ANSWER',done:'BOTH ARE RIGHT!',deg:'180°',nm:['YUSUF','INGRID']}};
const CX=540, CY=1170;
// Draufsicht-Figur: Kopf (Haare), Schultern, Arme; dir=1 schaut nach unten, -1 nach oben
function top(x:number,y:number,dir:number,body:string,hair:string,skin:string,name:string){
  return <g transform={`translate(${x} ${y}) scale(1.6) translate(${-x} ${-y})`}>
    <ellipse cx={x} cy={y+8} rx={118} ry={60} fill="#000" opacity={.22}/>
    <ellipse cx={x} cy={y} rx={110} ry={56} fill={body} stroke={N} strokeWidth={8}/>
    <circle cx={x-100} cy={y+dir*30} r={22} fill={skin} stroke={N} strokeWidth={6}/><circle cx={x+100} cy={y+dir*30} r={22} fill={skin} stroke={N} strokeWidth={6}/>
    <circle cx={x} cy={y+dir*6} r={54} fill={skin} stroke={N} strokeWidth={8}/>
    <path d={`M${x-52} ${y+dir*(-10)} Q${x} ${y+dir*(-64)} ${x+52} ${y+dir*(-10)} Q${x} ${y+dir*(-30)} ${x-52} ${y+dir*(-10)}Z`} fill={hair} stroke={N} strokeWidth={6}/>
    <circle cx={x-20} cy={y+dir*30} r={8} fill={N}/><circle cx={x+20} cy={y+dir*30} r={8} fill={N}/>
    <path d={`M${x-12} ${y+dir*48} Q${x} ${y+dir*56} ${x+12} ${y+dir*48}`} stroke={N} strokeWidth={5} fill="none" strokeLinecap="round"/>
    <g transform={`translate(${x+(dir>0?-200:200)} ${y})`}><rect x={-100} y={-34} width={200} height={68} rx={20} fill="#fff" stroke={N} strokeWidth={6}/><text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={N}>{name}</text></g>
  </g>;
}
const Zahl:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=T[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const a0=(kk===18)?Math.max(s(18),s(17)+1.3):s(kk);const c:Card={a:a0,b:Math.max(e(kk)+.3,a0+1.4),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2; const doneA=e(22)+.35,doneB=doneA+2.4;
  const q=t>=s(9)&&t<s(18);
  const qb=(x:number,y:number)=><g transform={`translate(${x} ${y+Math.sin(t*4+x)*8})`}><circle r={46} fill={C} stroke={N} strokeWidth={7}/><text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={80} fill={N}>?</text></g>;
  const view=(x:number,y:number,d:string,p:number,col:string)=><g transform={`translate(${x} ${y}) scale(${p})`}><circle r={86} fill={C} stroke={col} strokeWidth={12}/><text y={44} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={130} fill={N}>{d}</text></g>;
  const rot=180*eio(cl((t-(s(22)+.3))/1.6)); // Zahl dreht sich
  const yVis=t>=s(4)&&t<s(9)||t>=s(18); const iVis=yVis;
  const yc=t>=s(20), ic=t>=s(21);
  const cone=(x:number,y:number,dir:number,col:string,a:number)=><path d={`M${x} ${y+dir*60} L${CX-170} ${CY-dir*260+ (dir>0?0:0)} L${CX+170} ${CY-dir*260} Z`} fill={col} opacity={a}/>;
  return <AbsoluteFill style={{background:'#1b2440'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <rect width={1080} height={1920} fill="#3b3254"/>
    {/* Café-Boden Schachbrett */}
    {Array.from({length:7}).map((_,r)=>Array.from({length:6}).map((_,c)=><rect key={r*10+c} x={c*180} y={560+r*190} width={180} height={190} fill={(r+c)%2?'#8a6a4a':'#a07e58'} stroke="#5b4630" strokeWidth={3}/>))}
    {/* Teppich */}
    <rect x={CX-340} y={CY-420} width={680} height={840} rx={36} fill="#7a2f2a" stroke={N} strokeWidth={10}/><rect x={CX-304} y={CY-384} width={608} height={768} rx={22} fill="none" stroke="#c9a24a" strokeWidth={7} strokeDasharray="26 16"/>
    {Array.from({length:15}).map((_,i)=><g key={i}><line x1={CX-340+i*46+10} y1={CY-420} x2={CX-340+i*46+10} y2={CY-450} stroke="#c9a24a" strokeWidth={6}/><line x1={CX-340+i*46+10} y1={CY+420} x2={CX-340+i*46+10} y2={CY+450} stroke="#c9a24a" strokeWidth={6}/></g>)}
    {/* Sichtkegel */}
    {yc&&<path d={`M${CX} ${CY+560} L${CX-220} ${CY+220} L${CX+220} ${CY+220} Z`} fill="#ffd23c" opacity={.28*P(t,s(20),.4)}/>}
    {ic&&<path d={`M${CX} ${CY-560} L${CX-220} ${CY-220} L${CX+220} ${CY-220} Z`} fill="#4cc9f0" opacity={.28*P(t,s(21),.4)}/>}
    {/* Zahl: liegt auf dem Teppich; Zahl sechs, aus Yusufs Sicht (unten) aufrecht */}
    <g transform={`translate(${CX} ${CY}) rotate(${rot})`}><text y={180} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={520} fill={Y} stroke={N} strokeWidth={16} paintOrder="stroke">6</text></g>
    {/* Figuren: Yusuf unten (schaut nach oben), Ingrid oben (schaut nach unten) */}
    {top(CX,CY+600,-1,'#2a9d8f','#1a1a1a','#d19a6f',X.nm[0])}
    {top(CX,CY-600,1,'#e4572e','#7a4a2a','#f1c7a3',X.nm[1])}
    {/* Ansichts-Blasen */}
    {yVis&&view(CX-350,CY+600,'6',PB(t,s(4)+.6,.35),'#ffd23c')}
    {iVis&&view(CX+350,CY-600,'9',PB(t,s(4)+1.8,.35),'#4cc9f0')}
    {q&&<g>{qb(CX-350,CY+600)}{qb(CX+350,CY-600)}</g>}
    {(t>=s(18)&&t<s(22)+.3)&&<g>{view(CX-350,CY+600,'6',1,'#ffd23c')}{view(CX+350,CY-600,'9',1,'#4cc9f0')}</g>}
    {t>=s(22)+.3&&t<s(22)+2.6&&<g transform={`translate(${CX} ${CY-310}) scale(${PB(t,s(22)+.3,.4)})`}><rect x={-170} y={-46} width={340} height={92} rx={30} fill={C} stroke={G} strokeWidth={10}/><text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill={G}>{X.deg}</text></g>}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-470} y={-100} width={940} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={34} fontFamily={FONT} fontWeight={700} fontSize={lang==='de'?78:86} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const ZahlDE:React.FC=()=><Zahl lang="de"/>;
export const ZahlEN:React.FC=()=><Zahl lang="en"/>;
