import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person,PPL,CAST} = require('./figs.js');
import WDE from './words_muenze_de.json';
import WEN from './words_muenze_en.json';
PPL.zeynep=CAST.zeynep; PPL.kemal=CAST.kemal;
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const T={
 de:{cards:{0:['WETTE UM','EINEN DÖNER'],1:['KEMALS','IMBISS'],2:['ZUSAMMEN','30 CENT'],3:['EINE IST KEINE','10-CENT-MÜNZE'],4:['NUR','ANSEHEN'],6:['GANZ NORMALE','EURO-MÜNZEN'],7:['"DAS GEHT','NICHT!"'],8:['EIN WORT','ÜBERHÖRT'],9:['WELCHE','MÜNZEN?'],18:['20 CENT +','10 CENT'],19:['DIE 20ER IST','KEINE 10'],20:['STIMMT, SIE','IST EINE 20'],21:['DIE ANDERE','IST EINE 10'],22:['"EINE" HEISST','NICHT "BEIDE"']} as Record<number,string[]>,
  sol:'LÖSUNG',done:'EINE HEISST NICHT BEIDE!',sum:'30 CENT',no:['UNMÖGLICH!'],eine:['"EINE" ≠'.replace(' ≠',''),'NICHT "BEIDE"'],not10:'KEINE 10',nm:['ZEYNEP','KEMAL']},
 en:{cards:{0:['BET:','A KEBAB'],1:['KEMAL\'S','SNACK BAR'],2:['TOGETHER','30 CENTS'],3:['ONE IS NOT','A 10-CENT COIN'],4:['LOOK,','DON\'T TOUCH'],6:['TWO NORMAL','EURO COINS'],7:['"IMPOSSIBLE!"','SAYS MOST'],8:['YOU MISSED','ONE WORD'],9:['WHICH','COINS?'],18:['20 CENTS +','10 CENTS'],19:['THE 20 IS NOT','A 10-CENT COIN'],20:['TRUE, IT','IS A 20'],21:['THE OTHER','IS A 10'],22:['"ONE" MEANS','NOT "BOTH"']} as Record<number,string[]>,
  sol:'ANSWER',done:'ONE DOES NOT MEAN BOTH!',sum:'30 CENTS',no:['IMPOSSIBLE!'],eine:['"ONE" MEANS','NOT "BOTH"'],not10:'NOT A 10',nm:['ZEYNEP','KEMAL']}};
const CL=340, CR=740, CYc=1430;
const Muenze:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=T[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const a0=(kk===18)?Math.max(s(18),s(17)+1.3):s(kk);const c:Card={a:a0,b:Math.max(e(kk)+.3,a0+1.4),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2; const doneA=e(22)+.35,doneB=doneA+2.4;
  const q=t>=s(9)&&t<s(18);
  const bubble=(x:number,y:number,lines:string[],p:number,size=44,bg=C)=>{const w=Math.max(...lines.map(l=>l.length))*size*.6+70,h=lines.length*size*1.1+40;
    return <g transform={`translate(${x} ${y}) scale(${p})`}><rect x={-w/2} y={-h/2} width={w} height={h} rx={28} fill={bg} stroke={N} strokeWidth={7}/><path d={`M-20 ${h/2-2} L0 ${h/2+34} L20 ${h/2-2}Z`} fill={bg} stroke={N} strokeWidth={7} strokeLinejoin="round"/><rect x={-18} y={h/2-8} width={36} height={12} fill={bg}/>{lines.map((l,i)=><text key={i} y={-h/2+size*1.02+20+i*size*1.1-6} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={size} fill={N}>{l}</text>)}</g>;};
  const flip=eio(cl((t-s(18))/.7));
  const coin=(x:number,k:number,val:string,drop:number)=>{
    const y=CYc-(1-drop)*500; const showVal=flip>.5; const sc=Math.abs(1-2*Math.min(flip,1))*(flip<1?1:0)||1;
    const sy=flip<1&&flip>0?Math.abs(Math.cos(flip*Math.PI)):1;
    return <g transform={`translate(${x} ${y}) scale(1 ${sy})`}>
     <ellipse cx={8} cy={24} rx={150} ry={92} fill="#000" opacity={.3}/>
     <ellipse rx={150} ry={92} fill={k?'#f2c94c':'#e0b13c'} stroke={N} strokeWidth={9}/>
     <ellipse rx={118} ry={70} fill="none" stroke={N} strokeWidth={5} opacity={.45}/>
     <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={showVal?100:96} fill={N}>{showVal?val:'?'}</text>
    </g>;};
  const drop=(a:number)=>eio(cl((t-a)/.5));
  const check=(x:number,y:number,a:number)=><g transform={`translate(${x} ${y}) scale(${PB(t,a,.35)})`}><circle r={52} fill={G} stroke={N} strokeWidth={7}/><path d="M-26 2 L-8 24 L28 -22" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round"/></g>;
  return <AbsoluteFill style={{background:'#1b2440'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <rect width={1080} height={1920} fill="#3b3254"/>
    {/* Wand + Menütafel */}
    <rect y={540} width={1080} height={760} fill="#c9a77a" stroke={N} strokeWidth={6}/>
    {Array.from({length:8}).map((_,i)=><line key={i} x1={i*135} y1={540} x2={i*135} y2={1300} stroke="#b08e60" strokeWidth={4}/>)}
    <rect x={300} y={600} width={480} height={170} rx={16} fill="#1d2540" stroke={N} strokeWidth={8}/><text x={540} y={715} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={84} fill={Y}>{lang==='de'?'DÖNER 5,00':'KEBAB 5.00'}</text>
    {/* Dönerspieß */}
    <g transform="translate(540 1030)"><rect x={-6} y={-250} width={12} height={430} fill="#555" stroke={N} strokeWidth={4}/>{[0,1,2,3,4].map(i=><ellipse key={i} cy={-190+i*70} rx={62-i*3} ry={40} fill={i%2?'#9b5a34':'#b36a3c'} stroke={N} strokeWidth={5}/>)}</g>
    {/* Figuren hinter dem Tresen */}
    <g transform="translate(190 1500) scale(1.4)" dangerouslySetInnerHTML={{__html:person(0,0,'zeynep',{tag:false,look:5})}}/>
    <g transform="translate(890 1500) scale(1.4)" dangerouslySetInnerHTML={{__html:person(0,0,'kemal',{tag:false,look:-5})}}/>
    {/* Tresen */}
    <path d="M0 1330 L1080 1330 L1080 1520 L0 1520Z" fill="#a77b4f" stroke={N} strokeWidth={8}/>
    <rect y={1520} width={1080} height={400} fill="#6b4a32" stroke={N} strokeWidth={8}/>
    {Array.from({length:6}).map((_,i)=><line key={i} x1={i*216} y1={1520} x2={i*216} y2={1920} stroke="#4a3322" strokeWidth={6}/>)}
    <g transform="translate(190 1620)"><rect x={-130} y={-34} width={260} height={68} rx={20} fill="#fff" stroke={N} strokeWidth={6}/><text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={42} fill={N}>{X.nm[0]}</text></g>
    <g transform="translate(890 1620)"><rect x={-130} y={-34} width={260} height={68} rx={20} fill="#fff" stroke={N} strokeWidth={6}/><text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={42} fill={N}>{X.nm[1]}</text></g>
    {/* Münzen */}
    {t>=s(1)&&<>{coin(CL,0,'20',drop(s(1)+.2))}{coin(CR,1,'10',drop(s(1)+.55))}</>}
    {t>=s(2)&&t<s(18)&&<g transform={`translate(540 1255) scale(${PB(t,s(2),.35)})`}><rect x={-140} y={-42} width={280} height={84} rx={26} fill={Y} stroke={N} strokeWidth={8}/><text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={50} fill={N}>{X.sum}</text></g>}
    {t>=s(7)&&t<e(7)+.4&&bubble(870,700,X.no,PB(t,s(7),.35),48)}
    {t>=s(8)&&t<e(8)+.5&&bubble(210,700,X.eine,PB(t,s(8),.35),44,Y)}
    {q&&<g/>}
    {t>=s(19)&&<g transform={`translate(${CL} 1272) scale(${PB(t,s(19),.35)})`}><rect x={-120} y={-38} width={240} height={76} rx={24} fill={R} stroke={N} strokeWidth={8}/><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill="#fff">{X.not10}</text></g>}
    {t>=s(20)&&check(CL+150,CYc-55,s(20))}
    {t>=s(21)&&check(CR+150,CYc-55,s(21))}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-490} y={-100} width={980} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={30} fontFamily={FONT} fontWeight={700} fontSize={lang==='de'?64:62} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const MuenzeDE:React.FC=()=><Muenze lang="de"/>;
export const MuenzeEN:React.FC=()=><Muenze lang="en"/>;
