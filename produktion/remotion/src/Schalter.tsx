import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person,PPL,CAST} = require('./figs.js');
import WDE from './words_schalter_de.json';
import WEN from './words_schalter_en.json';
PPL.matteo={n:'MATTEO',c:'#2a9d8f',hair:'curly',hc:'#2b1d14',skin:'#d9a07a',h:500};
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const BL='#4aa3df';
const T={
 de:{cards:{0:['EIN VERSUCH,','SONST ALARM'],1:['SIGNORA','ROSSIS FLUR'],2:['3 SCHALTER,','3 LAMPEN'],3:['ALLE LAMPEN','SIND AUS'],4:['SCHALTEN','ERLAUBT'],6:['NUR EINMAL','HINEIN'],7:['"DAS GEHT','NICHT!"'],8:['EINE LAMPE','VERRÄT MEHR'],9:['WELCHER','SCHALTER?'],18:['SCHALTER 1:','10 MIN AN'],19:['AUS, DANN','SCHALTER 2 AN'],20:['JETZT','HINEIN'],21:['LEUCHTET = 2,','WARM = 1'],22:['KALT =','SCHALTER 3']} as Record<number,string[]>,
  sol:'LÖSUNG',done:'DIE WÄRME VERRÄT ES!',no:['UNMÖGLICH!'],room:'KAMMER',min:'10 MIN',warm:'WARM',lit:'AN',cold:'KALT'},
 en:{cards:{0:['ONE TRY,','OR ALARM'],1:['SIGNORA','ROSSI\'S HALL'],2:['3 SWITCHES,','3 LAMPS'],3:['ALL LAMPS','ARE OFF'],4:['FLIP THEM','FREELY'],6:['ENTER THE ROOM','ONLY ONCE'],7:['"IMPOSSIBLE!"','SAYS MOST'],8:['A LAMP SHOWS','MORE THAN LIGHT'],9:['WHICH','SWITCH?'],18:['SWITCH 1:','10 MIN ON'],19:['OFF, THEN','SWITCH 2 ON'],20:['NOW GO','IN'],21:['LIT = 2,','WARM = 1'],22:['COLD =','SWITCH 3']} as Record<number,string[]>,
  sol:'ANSWER',done:'HEAT GIVES IT AWAY!',no:['IMPOSSIBLE!'],room:'ROOM',min:'10 MIN',warm:'WARM',lit:'ON',cold:'COLD'}};
const RX=90, RY=520, RW=900, RH=660;
const SWX=[370,640,910], SWC=[R,G,BL];
// Lampenpositionen: links kalt (3), Mitte warm (1), rechts leuchtet (2)
const LAMPS=[{x:270,sw:2},{x:540,sw:0},{x:810,sw:1}];
const Schalter:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=T[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const a0=(kk===18)?Math.max(s(18),s(17)+1.3):s(kk);const c:Card={a:a0,b:Math.max(e(kk)+.3,a0+1.4),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2; const doneA=e(22)+.35,doneB=doneA+2.4;
  const open=eio(cl((t-s(20)-.3)/.8));
  const bubble=(x:number,y:number,lines:string[],p:number,size=44,bg=C)=>{const w=Math.max(...lines.map(l=>l.length))*size*.6+70,h=lines.length*size*1.1+40;
    return <g transform={`translate(${x} ${y}) scale(${p})`}><rect x={-w/2} y={-h/2} width={w} height={h} rx={28} fill={bg} stroke={N} strokeWidth={7}/><path d={`M-20 ${h/2-2} L0 ${h/2+34} L20 ${h/2-2}Z`} fill={bg} stroke={N} strokeWidth={7} strokeLinejoin="round"/><rect x={-18} y={h/2-8} width={36} height={12} fill={bg}/>{lines.map((l,i)=><text key={i} y={-h/2+size*1.02+20+i*size*1.1-6} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={size} fill={N}>{l}</text>)}</g>;};
  // Schalterzustände (0..1)
  const st=[eio(cl((t-s(18))/.25))-eio(cl((t-s(19))/.25)), eio(cl((t-s(19))/.25)), 0];
  const sw=(i:number)=>{const cx=SWX[i], on=st[i]; const ky=lerp(1590,1480,on);
    return <g key={i}>
      <rect x={cx-100} y={1330} width={200} height={310} rx={28} fill="#e9e4d6" stroke={N} strokeWidth={8}/>
      <circle cx={cx} cy={1388} r={46} fill={SWC[i]} stroke={N} strokeWidth={6}/>
      <text x={cx} y={1410} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill="#fff">{i+1}</text>
      <rect x={cx-30} y={1450} width={60} height={170} rx={30} fill="#2a2f3f" stroke={N} strokeWidth={6}/>
      {on>.05&&<circle cx={cx} cy={ky} r={64} fill={Y} opacity={.55*on}/>}
      <circle cx={cx} cy={ky} r={42} fill={on>.5?G:'#c3c7cf'} stroke={N} strokeWidth={7}/>
    </g>;};
  const bulb=(x:number,swi:number)=>{
    const lit=swi===1, warm=swi===0;
    const pop=(a:number)=>PB(t,a,.35);
    const tagA=lit||warm?s(21):s(22);
    const tag=lit?X.lit:warm?X.warm:X.cold; const col=SWC[swi];
    const sh=t*6;
    return <g key={x}>
      <line x1={x} y1={RY} x2={x} y2={740} stroke={N} strokeWidth={8}/>
      {lit&&<circle cx={x} cy={820} r={160} fill={Y} opacity={.38}/>}
      <rect x={x-26} y={730} width={52} height={56} rx={8} fill="#6b6f7a" stroke={N} strokeWidth={6}/>
      <circle cx={x} cy={830} r={64} fill={lit?Y:'#8c95a3'} stroke={N} strokeWidth={8}/>
      <path d={`M${x-22} 850 Q${x} 800 ${x+22} 850`} stroke={N} strokeWidth={5} fill="none" opacity={.5}/>
      {warm&&[-34,0,34].map((dx,i)=><path key={i} d={Array.from({length:12}).map((_,j)=>`${j?'L':'M'}${x+dx+Math.sin(j*1.2+sh+i)*9} ${790-j*14}`).join(' ')} stroke={R} strokeWidth={7} fill="none" strokeLinecap="round" opacity={.75}/>)}
      {warm&&<circle cx={x} cy={830} r={78} fill="none" stroke={R} strokeWidth={8} opacity={.7}/>}
      {!lit&&!warm&&<circle cx={x} cy={830} r={78} fill="none" stroke={BL} strokeWidth={8} opacity={.7}/>}
      {t>=tagA&&<g transform={`translate(${x} 960) scale(${pop(tagA)})`}><rect x={-96} y={-34} width={192} height={68} rx={26} fill={col} stroke={N} strokeWidth={7}/><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={46} fill="#fff">{tag}</text></g>}
      {t>=tagA+.35&&<g transform={`translate(${x} 1070) scale(${pop(tagA+.35)})`}><circle r={52} fill={col} stroke={N} strokeWidth={7}/><text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={70} fill="#fff">{swi+1}</text></g>}
    </g>;};
  const alarmOn=t<s(3)+1;
  return <AbsoluteFill style={{background:'#1b2440'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <rect width={1080} height={1920} fill="#2e4a5a"/>
    <rect y={1700} width={1080} height={220} fill="#5a4332" stroke={N} strokeWidth={6}/>
    {Array.from({length:8}).map((_,i)=><line key={i} x1={i*135} y1={0} x2={i*135} y2={1700} stroke="#27414f" strokeWidth={4}/>)}
    {/* Alarmleuchte */}
    <g transform="translate(940 160)"><circle r={44} fill={R} stroke={N} strokeWidth={7} opacity={alarmOn?.5+.5*Math.abs(Math.sin(t*9)):.45}/>{alarmOn&&[0,1,2,3,4,5].map(i=><line key={i} x1={Math.cos(i*1.05)*58} y1={Math.sin(i*1.05)*58} x2={Math.cos(i*1.05)*80} y2={Math.sin(i*1.05)*80} stroke={R} strokeWidth={8} strokeLinecap="round" opacity={Math.abs(Math.sin(t*9))}/>)}</g>
    {/* Raum */}
    <rect x={RX-14} y={RY-14} width={RW+28} height={RH+28} rx={10} fill="#1c2230" stroke={N} strokeWidth={8}/>
    <rect x={RX} y={RY} width={RW} height={RH} fill="#2b3446"/>
    <rect x={RX} y={RY+RH-70} width={RW} height={70} fill="#3b2f26"/>
    {open>.02&&LAMPS.map(l=>bulb(l.x,l.sw))}
    {/* Tür */}
    {open<.995&&<g transform={`translate(${RX} 0) scale(${1-.92*open} 1) translate(${-RX} 0)`}>
      <rect x={RX} y={RY} width={RW} height={RH} fill="#8a5a36" stroke={N} strokeWidth={8}/>
      <rect x={RX+50} y={RY+50} width={RW-100} height={RH-100} rx={14} fill="none" stroke="#6b4527" strokeWidth={10}/>
      <rect x={RX+RW/2-150} y={RY+60} width={300} height={84} rx={16} fill={C} stroke={N} strokeWidth={7}/>
      <text x={RX+RW/2} y={RY+120} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill={N}>{X.room}</text>
      <rect x={RX+RW/2-170} y={RY+175} width={340} height={96} rx={18} fill="#3a2a1d" stroke={N} strokeWidth={6}/>{[-100,0,100].map(dx=><g key={dx}><rect x={RX+RW/2+dx-9} y={RY+190} width={18} height={14} fill="#777"/><circle cx={RX+RW/2+dx} cy={RY+232} r={26} fill="#8c95a3" stroke={N} strokeWidth={5}/></g>)}
      <circle cx={RX+RW-80} cy={RY+RH/2+40} r={26} fill={Y} stroke={N} strokeWidth={6}/>
      {t>=s(9)&&t<s(20)&&<text x={RX+RW/2} y={RY+RH/2+175} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={250} fill={Y} stroke={N} strokeWidth={10} paintOrder="stroke" transform={`rotate(${Math.sin(t*3)*3} ${RX+RW/2} ${RY+RH/2})`}>?</text>}
    </g>}
    {/* Schalterleiste */}
    <rect x={230} y={1296} width={810} height={380} rx={34} fill="#3a4a5c" stroke={N} strokeWidth={8}/>
    {[0,1,2].map(sw)}
    {t>=s(18)&&t<s(19)+.2&&<g transform={`translate(${SWX[0]} 1252) scale(${PB(t,s(18),.3)})`}><rect x={-110} y={-36} width={220} height={72} rx={28} fill={Y} stroke={N} strokeWidth={7}/><circle cx={-62} cy={0} r={22} fill="#fff" stroke={N} strokeWidth={5}/><line x1={-62} y1={0} x2={-62+Math.cos(t*5)*14} y2={Math.sin(t*5)*14} stroke={N} strokeWidth={5} strokeLinecap="round"/><text x={22} y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={42} fill={N}>{X.min}</text></g>}
    {/* Matteo */}
    <g transform="translate(112 1860) scale(1.2)" dangerouslySetInnerHTML={{__html:person(0,0,'matteo',{tag:false,look:6})}}/>
    <g transform="translate(125 1892)"><rect x={-95} y={-26} width={190} height={52} rx={18} fill="#fff" stroke={N} strokeWidth={6}/><text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={N}>MATTEO</text></g>
    {t>=s(7)&&t<e(7)+.4&&bubble(180,1243,X.no,PB(t,s(7),.35),40)}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-490} y={-100} width={980} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={30} fontFamily={FONT} fontWeight={700} fontSize={lang==='de'?64:62} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const SchalterDE:React.FC=()=><Schalter lang="de"/>;
export const SchalterEN:React.FC=()=><Schalter lang="en"/>;
