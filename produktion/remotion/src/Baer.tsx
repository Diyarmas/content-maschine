import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person,PPL} = require('./figs.js');
import WDE from './words_baer_de.json';
import WEN from './words_baer_en.json';
PPL.matti={n:'MATTI',c:'#2b6cb0',hair:'short',hc:'#6b4a2e',skin:'#e6b78f',h:515,beard:'#8a6a4a'};
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const T={
 de:{cards:{0:['JÄGER MATTI','+ EIN BÄR'],1:['1 KM','SÜDEN'],2:['1 KM','OSTEN'],3:['1 KM','NORDEN'],4:['WIEDER AM','START!'],6:['DER BÄR','WARTET DORT'],7:['AUF DER KARTE:','UNMÖGLICH'],8:['EIN ORT','GEHT DOCH'],9:['WELCHE FARBE','HAT DER BÄR?'],18:['MATTI AM','NORDPOL'],19:['JEDE RICHTUNG','IST SÜD'],21:['NUR','EISBÄREN']} as Record<number,string[]>,
  sol:'LÖSUNG',done:'WEISS!',S:'SÜDEN',E:'OSTEN',N:'NORDEN',gap:'?!',pole:'NORDPOL',start:'START'},
 en:{cards:{0:['HUNTER MATTI','+ A BEAR'],1:['1 KM','SOUTH'],2:['1 KM','EAST'],3:['1 KM','NORTH'],4:['BACK AT','THE START!'],6:['THE BEAR','WAITS THERE'],7:['ON A MAP:','IMPOSSIBLE'],8:['ONE PLACE','WORKS'],9:['WHAT COLOR','IS THE BEAR?'],18:['MATTI AT','THE NORTH POLE'],19:['EVERY WAY','IS SOUTH'],21:['ONLY','POLAR BEARS']} as Record<number,string[]>,
  sol:'ANSWER',done:'WHITE!',S:'SOUTH',E:'EAST',N:'NORTH',gap:'?!',pole:'NORTH POLE',start:'START'}};
const PX=220; const P0={x:380,y:820};
function bear(col:string,q:boolean,sc=1){
  return <g transform={`scale(${sc})`}>
    <ellipse cx={0} cy={-80} rx={120} ry={72} fill={col} stroke={N} strokeWidth={7}/>
    {[-70,-20,50,95].map((x,i)=><rect key={i} x={x-16} y={-30} width={32} height={50} rx={12} fill={col} stroke={N} strokeWidth={7}/>)}
    <circle cx={-125} cy={-110} r={52} fill={col} stroke={N} strokeWidth={7}/>
    <circle cx={-148} cy={-158} r={16} fill={col} stroke={N} strokeWidth={6}/><circle cx={-102} cy={-158} r={16} fill={col} stroke={N} strokeWidth={6}/>
    <ellipse cx={-160} cy={-96} rx={26} ry={20} fill={q?'#9aa0ab':'#f2f2f2'} stroke={N} strokeWidth={5}/>
    <circle cx={-168} cy={-100} r={8} fill={N}/><circle cx={-122} cy={-124} r={6} fill={N}/>
    {q&&<text x={0} y={-60} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={110} fill="#fff" stroke={N} strokeWidth={5}>?</text>}
  </g>;
}
function polar(d:number,Cc:{x:number;y:number}){
  const r=150; const E={x:Cc.x+r*Math.sin(1),y:Cc.y+r*Math.cos(1)};
  if(d<r)return {x:Cc.x,y:Cc.y+d};
  if(d<2*r){const f=(d-r)/r;return {x:Cc.x+r*Math.sin(f),y:Cc.y+r*Math.cos(f)};}
  const e=Math.min(1,(d-2*r)/r);return {x:lerp(E.x,Cc.x,e),y:lerp(E.y,Cc.y,e)};
}
const Baer:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=T[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  const seg=(k:number)=>cl((t-(s(k)+.2))/(s(k+1)-s(k)-.5));
  const p1=seg(1),p2=seg(2),p3=seg(3);
  const A=P0, B={x:P0.x,y:P0.y+PX}, Cc2={x:P0.x+PX,y:P0.y+PX}, D={x:P0.x+PX,y:P0.y};
  let tok=A; if(p1<1)tok={x:A.x,y:lerp(A.y,B.y,p1)}; else if(p2<1)tok={x:lerp(B.x,Cc2.x,p2),y:B.y}; else tok={x:Cc2.x,y:lerp(Cc2.y,D.y,p3)};
  const flat=t<s(8)+.3?1:Math.max(0,1-(t-(s(8)+.3))/.5);
  const globe=t>=s(8)+.3&&t<s(18)?Math.min(1,(t-(s(8)+.3))/.5):(t>=s(18)&&t<s(18)+.5?1-(t-s(18))/.5:0);
  const polarOn=t>=s(18)?Math.min(1,(t-s(18))/.5):0;
  const Cc={x:540,y:1060};
  const q=cl((t-(s(19)+.3))/(s(20)-s(19)-.6)); const dist=q*450;
  const pts:string[]=[];for(let d=0;d<=dist;d+=8){const p=polar(d,Cc);pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);} const pp=polar(dist,Cc);pts.push(`${pp.x.toFixed(1)},${pp.y.toFixed(1)}`);
  const white=t>=s(22);
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const c:Card={a:s(kk),b:Math.max(e(kk)+.3,s(kk)+1.4),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2; const doneA=s(22),doneB=doneA+2.4;
  const gapOn=t>s(4)+.5&&t<s(8)+.8?P(t,s(4)+.5,.4):0;
  return <AbsoluteFill style={{background:'#5b8db8'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3d6fb0"/><stop offset="1" stopColor="#cfe6f5"/></linearGradient></defs>
    <rect width={1080} height={1920} fill="url(#sk)"/>
    {[0,1,2].map(i=><ellipse key={i} cx={((t*12+i*430)%1500)-200} cy={520+i*60} rx={140} ry={30} fill="#fff" opacity={.5}/>)}
    <rect y={1560} width={1080} height={360} fill="#f4f8fb" stroke={N} strokeWidth={8}/>
    {[[80,1640],[170,1700],[960,1660],[1010,1730],[40,1780]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}><rect x={-7} y={-4} width={14} height={30} fill="#5a3f2e" stroke={N} strokeWidth={4}/><polygon points="0,-110 -42,0 42,0" fill="#2f7d4a" stroke={N} strokeWidth={5} strokeLinejoin="round"/></g>)}
    {/* Kartenfläche */}
    <rect x={90} y={620} width={900} height={880} rx={40} fill="#efe3c3" stroke={N} strokeWidth={9}/>
    {flat>0&&<g opacity={flat}>
      {Array.from({length:9}).map((_,i)=><line key={'v'+i} x1={130+i*100} y1={650} x2={130+i*100} y2={1470} stroke="#d4c49a" strokeWidth={3}/>)}
      {Array.from({length:9}).map((_,i)=><line key={'h'+i} x1={110} y1={680+i*100} x2={970} y2={680+i*100} stroke="#d4c49a" strokeWidth={3}/>)}
      <polyline fill="none" stroke={R} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" points={`${A.x},${A.y} ${p1>0?`${A.x},${lerp(A.y,B.y,p1)}`:`${A.x},${A.y}`} ${p2>0?`${lerp(B.x,Cc2.x,p2)},${B.y}`:''} ${p3>0?`${Cc2.x},${lerp(Cc2.y,D.y,p3)}`:''}`}/>
      <circle cx={A.x} cy={A.y} r={22} fill={G} stroke={N} strokeWidth={6}/>
      <text x={A.x-40} y={A.y-36} textAnchor="end" fontFamily={FONT} fontWeight={700} fontSize={44} fill={N}>{X.start}</text>
      {p1>0&&<text x={A.x-30} y={lerp(A.y,B.y,.5)+14} textAnchor="end" fontFamily={FONT} fontWeight={700} fontSize={46} fill={N}>{X.S}</text>}
      {p2>0&&<text x={lerp(B.x,Cc2.x,.5)} y={B.y+70} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={46} fill={N}>{X.E}</text>}
      {p3>0&&<text x={Cc2.x+30} y={lerp(Cc2.y,D.y,.5)+14} fontFamily={FONT} fontWeight={700} fontSize={46} fill={N}>{X.N}</text>}
      <circle cx={tok.x} cy={tok.y} r={24} fill={Y} stroke={N} strokeWidth={7}/>
      {gapOn>0&&<g opacity={gapOn}><line x1={D.x} y1={D.y} x2={A.x+26} y2={A.y} stroke={R} strokeWidth={10} strokeDasharray="22 16"/><text x={(A.x+D.x)/2} y={A.y-30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill={R}>{X.gap}</text></g>}
    </g>}
    {globe>0&&<g opacity={globe}>
      <circle cx={Cc.x} cy={Cc.y} r={300} fill="#2a6fa8" stroke={N} strokeWidth={10}/>
      {[0,1,2,3,4,5].map(i=>{const a=t*.7+i*Math.PI/6;return <ellipse key={i} cx={Cc.x} cy={Cc.y} rx={Math.abs(Math.cos(a))*300} ry={300} fill="none" stroke="#fff" strokeWidth={4} opacity={.55}/>;})}
      {[-200,-100,0,100,200].map((y,i)=>{const w=Math.sqrt(300*300-y*y);return <line key={i} x1={Cc.x-w} y1={Cc.y+y} x2={Cc.x+w} y2={Cc.y+y} stroke="#fff" strokeWidth={4} opacity={.55}/>;})}
      <circle cx={Cc.x} cy={Cc.y} r={300} fill="none" stroke={N} strokeWidth={10}/>
      <text x={Cc.x} y={Cc.y+60} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={200} fill="#fff" stroke={N} strokeWidth={8}>?</text>
    </g>}
    {polarOn>0&&<g opacity={polarOn}>
      <circle cx={Cc.x} cy={Cc.y} r={400} fill="#e3f3fc" stroke={N} strokeWidth={9}/>
      {[130,260,390].map(r=><circle key={r} cx={Cc.x} cy={Cc.y} r={r} fill="none" stroke="#9cc3dc" strokeWidth={4}/>)}
      {Array.from({length:12}).map((_,i)=>{const a=i*Math.PI/6;return <line key={i} x1={Cc.x} y1={Cc.y} x2={Cc.x+400*Math.sin(a)} y2={Cc.y+400*Math.cos(a)} stroke="#9cc3dc" strokeWidth={3}/>;})}
      <polyline fill="none" stroke={R} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" points={pts.join(' ')}/>
      <circle cx={Cc.x} cy={Cc.y} r={20} fill={G} stroke={N} strokeWidth={6}/>
      <text x={Cc.x+36} y={Cc.y-26} fontFamily={FONT} fontWeight={700} fontSize={44} fill={N}>{X.pole}</text>
      {q>0&&<circle cx={pp.x} cy={pp.y} r={24} fill={Y} stroke={N} strokeWidth={7}/>}
    </g>}
    {/* Figuren am Boden */}
    <g transform="translate(250 1850)" dangerouslySetInnerHTML={{__html:person(0,0,'matti',{tag:false,look:6,grin:false})}} style={{}}/>
    <g transform="translate(760 1850)">{bear(white?'#ffffff':'#7b808c',!white,1.25)}</g>
    {white&&t<doneB+2&&<g transform="translate(760 1710)" opacity={P(t,doneA,.3)}><circle r={190} fill="none" stroke={G} strokeWidth={10} strokeDasharray="14 12"/></g>}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-380} y={-100} width={760} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const BaerDE:React.FC=()=><Baer lang="de"/>;
export const BaerEN:React.FC=()=><Baer lang="en"/>;
