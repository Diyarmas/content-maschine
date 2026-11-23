import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person,PPL,CAST} = require('./figs.js');
import WDE from './words_tuer_de.json';
import WEN from './words_tuer_en.json';
PPL.dragan=CAST.dragan;
PPL.omar={n:'OMAR',c:'#6a4c93',hair:'short',hc:'#1a1a1a',skin:'#c68a64',h:505,beard:'#1a1a1a'};
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const T={
 de:{cards:{0:['FALSCHE TÜR =','LÖWE!'],1:['BURG VON','SULTAN KARIM'],2:['DRAGAN & OMAR','BEWACHEN'],3:['EINER LÜGT','EINER NICHT'],4:['WER IST','WER?'],6:['NUR 1','FRAGE!'],7:['"WELCHE TÜR','IST RICHTIG?"'],8:['DAS IST','DIE FALLE'],9:['WELCHE FRAGE','RETTET DICH?'],18:['"WAS SAGT DER','ANDERE?"'],19:['BEIDE ZEIGEN','DIE FALSCHE'],20:['EHRLICHER NENNT','LÜGNER-ANTWORT'],21:['LÜGNER LÜGT','ÜBER EHRLICHEN'],22:['NIMM DIE','ANDERE TÜR']} as Record<number,string[]>,
  sol:'LÖSUNG',done:'DIE ANDERE TÜR!',wahr:'WAHR',luege:'LÜGE',q7:['WELCHE TÜR','IST RICHTIG?'],q18:['WELCHE TÜR NENNT','DER ANDERE?'],a20:['LÜGNER ZEIGT','LINKS'],a21:['EHRLICHER ZEIGT','RECHTS - ICH','SAGE LINKS'],lion:'LÖWE',free:'FREI'},
 en:{cards:{0:['WRONG DOOR =','LION!'],1:['SULTAN KARIM\'S','CASTLE'],2:['DRAGAN & OMAR','GUARD'],3:['ONE LIES','ONE DOESN\'T'],4:['WHO IS','WHO?'],6:['ONLY 1','QUESTION!'],7:['"WHICH DOOR','IS RIGHT?"'],8:['THAT IS','THE TRAP'],9:['WHICH QUESTION','SAVES YOU?'],18:['"WHAT WOULD','THE OTHER SAY?"'],19:['BOTH POINT TO','THE WRONG DOOR'],20:['HONEST ONE','REPORTS LIAR'],21:['LIAR LIES ABOUT','THE HONEST ONE'],22:['TAKE THE','OTHER DOOR']} as Record<number,string[]>,
  sol:'ANSWER',done:'THE OTHER DOOR!',wahr:'TRUTH',luege:'LIE',q7:['WHICH DOOR','IS RIGHT?'],q18:['WHICH DOOR WOULD','THE OTHER NAME?'],a20:['LIAR WOULD','POINT LEFT'],a21:['HONEST ONE:','RIGHT - I SAY','LEFT'],lion:'LION',free:'FREE'}};
function flame(x:number,y:number,sc:number,t:number,k:number){
  const fl=1+.08*Math.sin(t*17+k)+.05*Math.sin(t*29+k*2);
  return <g transform={`translate(${x} ${y}) scale(${sc*fl} ${sc*(1+(fl-1)*2)})`}>
    <circle r={110} cy={-20} fill="#ffb84a" opacity={.2}/>
    <path d="M0 0 C-34 -4 -40 -52 0 -112 C40 -52 34 -4 0 0Z" fill="#ff7a1a" stroke={N} strokeWidth={4}/>
    <path d="M0 -4 C-16 -6 -20 -32 0 -62 C20 -32 16 -6 0 -4Z" fill="#ffe27a"/>
  </g>;
}
const DL=110, DR=630, DW=340, DB=1450, DT=700; // Türen
const doorPath=(x:number)=>`M${x} ${DB} V${DT+170} A170 170 0 0 1 ${x+DW} ${DT+170} V${DB} Z`;
const Tuer:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=T[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const a0=(kk===18)?Math.max(s(18),s(17)+1.3):s(kk);const c:Card={a:a0,b:Math.max(e(kk)+.3,a0+1.4),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2; const doneA=e(22)+.35,doneB=doneA+2.4;
  const q=t>=s(9)&&t<s(18);
  const qb=(x:number,y:number)=><g transform={`translate(${x} ${y+Math.sin(t*4+x)*8})`}><circle r={46} fill={C} stroke={N} strokeWidth={7}/><text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={80} fill={N}>?</text></g>;
  const bubble=(x:number,y:number,lines:string[],p:number,size=46,bg=C,tailX=0)=>{const w=Math.max(...lines.map(l=>l.length))*size*.6+70,h=lines.length*size*1.1+40;
    return <g transform={`translate(${x} ${y}) scale(${p})`}><rect x={-w/2} y={-h/2} width={w} height={h} rx={30} fill={bg} stroke={N} strokeWidth={7}/><path d={`M${tailX-20} ${h/2-2} L${tailX} ${h/2+36} L${tailX+20} ${h/2-2}Z`} fill={bg} stroke={N} strokeWidth={7} strokeLinejoin="round"/><rect x={tailX-18} y={h/2-8} width={36} height={12} fill={bg}/>{lines.map((l,i)=><text key={i} y={-h/2+size*1.02+20+i*size*1.1-6} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={size} fill={N}>{l}</text>)}</g>;};
  const tag=(x:number,y:number,txt:string,col:string,p:number)=><g transform={`translate(${x} ${y}) scale(${p})`}><rect x={-120} y={-44} width={240} height={88} rx={24} fill={col} stroke={N} strokeWidth={7}/><text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill="#fff">{txt}</text></g>;
  // Zustände
  const labels=t>=s(3)&&t<s(4); const unk=t>=s(4)&&t<s(18);
  const open=eio(cl((t-(s(22)+.2))/1.4)); // rechte Tür öffnet
  const lionShow=t>s(22)+.6?P(t,s(22)+.6,.5):0;
  const eyes=(x:number,on:boolean)=>on?<g><circle cx={x-18} cy={890} r={9} fill="#ffd23c"/><circle cx={x+18} cy={890} r={9} fill="#ffd23c"/></g>:null;
  const ey1=t<s(3)&&Math.floor(t*2.2)%2===0, ey2=t<s(3)&&Math.floor(t*2.2)%2===1;
  const arrow=(d:string,a:number)=>{const L=900;return <g opacity={cl((t-a)/.2)}><path d={d} stroke={N} strokeWidth={30} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L*(1-eio(cl((t-a)/.8)))}/><path d={d} stroke={R} strokeWidth={18} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L*(1-eio(cl((t-a)/.8)))}/></g>;};
  const doorSvg=(x:number,sx:number,hingeX:number,k:number)=><g transform={`translate(${hingeX} 0) scale(${sx} 1) translate(${-hingeX} 0)`}>
    <path d={doorPath(x)} fill="#8a5a30" stroke={N} strokeWidth={10}/>
    {[1,2].map(i=><line key={i} x1={x+i*DW/3} y1={DT+60} x2={x+i*DW/3} y2={DB} stroke="#5d3a1c" strokeWidth={6}/>)}
    <rect x={x+DW/2-70} y={800} width={140} height={150} rx={14} fill="#0c1020" stroke={N} strokeWidth={8}/>
    {[-35,0,35].map(d=><line key={d} x1={x+DW/2+d} y1={800} x2={x+DW/2+d} y2={950} stroke="#3a3a44" strokeWidth={8}/>)}
    <circle cx={x+(k?40:DW-40)} cy={1180} r={16} fill="#c9a24a" stroke={N} strokeWidth={5}/>
  </g>;
  return <AbsoluteFill style={{background:'#1b2440'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <rect width={1080} height={1920} fill="#3b3254"/>
    {/* Mauer */}
    <rect y={540} width={1080} height={940} fill="#7c6a56" stroke={N} strokeWidth={6}/>
    {Array.from({length:9}).map((_,i)=><g key={i}><line x1={0} y1={600+i*100} x2={1080} y2={600+i*100} stroke="#5b4c3c" strokeWidth={5}/>{Array.from({length:6}).map((_,j)=><line key={j} x1={(i%2?90:0)+j*180} y1={600+i*100} x2={(i%2?90:0)+j*180} y2={700+i*100} stroke="#5b4c3c" strokeWidth={5}/>)}</g>)}
    {/* Boden */}
    <rect y={1450} width={1080} height={470} fill="#4a3a2a" stroke={N} strokeWidth={8}/>
    <rect x={60} y={1590} width={960} height={240} rx={30} fill="#7a2f2a" stroke={N} strokeWidth={7}/><rect x={100} y={1620} width={880} height={180} rx={20} fill="none" stroke="#c9a24a" strokeWidth={6} strokeDasharray="22 14"/>
    {/* Fackeln */}
    <g><rect x={528} y={860} width={24} height={110} fill="#3a2a1a" stroke={N} strokeWidth={5}/>{flame(540,860,.8,t,7)}</g>
    {/* Dahinter-Licht rechts */}
    <path d={doorPath(DR)} fill="#fff1b0" stroke={N} strokeWidth={10}/>
    {open>0&&<g opacity={open}><text x={DR+DW/2-40} y={1160} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={84} fill={G}>{X.free}</text></g>}
    {doorSvg(DL,1,DL,0)}
    {doorSvg(DR,1-.8*open,DR+DW,1)}
    {/* Augen / Löwe im Fenster links */}
    {eyes(DL+DW/2,ey1)}{eyes(DR+DW/2,ey2)}
    {lionShow>0&&<g opacity={lionShow} transform={`translate(${DL+DW/2} 878)`}><circle r={62} fill="#c27c2c" stroke={N} strokeWidth={5}/><circle r={42} fill="#efc27a"/><circle cx={-16} cy={-8} r={7} fill={N}/><circle cx={16} cy={-8} r={7} fill={N}/><path d="M-10 12 L10 12 L0 24Z" fill="#6b3a2a"/><path d="M-18 34 Q0 46 18 34" stroke={N} strokeWidth={5} fill="none"/></g>}
    {/* Wächter */}
    <g transform="translate(290 1770) scale(1.1)" dangerouslySetInnerHTML={{__html:person(0,0,'dragan',{look:4})}}/>
    <g transform="translate(790 1770) scale(1.1)" dangerouslySetInnerHTML={{__html:person(0,0,'omar',{look:-4})}}/>
    {/* Labels */}
    {labels&&<g>{tag(290,1160,X.wahr,'#2f9e44',PB(t,s(3),.35))}{tag(790,1150,X.luege,R,PB(t,s(3)+.5,.35))}</g>}
    {unk&&<g>{qb(290,1150)}{qb(790,1150)}</g>}
    {/* "?" Türen */}
    {q&&<g>{qb(DL+DW/2,640)}{qb(DR+DW/2,640)}</g>}
    {/* Fragen-Blasen */}
    {t>=s(7)&&t<e(8)+.3&&bubble(540,1000,X.q7,PB(t,s(7),.35),58)}
    {t>=s(8)&&t<e(8)+.3&&<g transform={`translate(540 1000) scale(${PB(t,s(8),.3)}) rotate(-8)`}><line x1={-170} y1={-90} x2={170} y2={90} stroke={R} strokeWidth={22} strokeLinecap="round"/><line x1={170} y1={-90} x2={-170} y2={90} stroke={R} strokeWidth={22} strokeLinecap="round"/></g>}
    {t>=s(18)&&t<e(18)+.5&&bubble(290,1000,X.q18,PB(t,s(18),.35),46,Y,0)}
    {t>=s(19)&&<g>{arrow(`M205 1240 L205 1130`,s(19)+.1)}{arrow(`M715 1240 Q620 1100 460 1100`,s(19)+.2)}<g opacity={cl((t-(s(19)+.8))/.2)}><g transform="translate(205 1112) rotate(0)"><path d="M0 -34 L28 18 L-28 18Z" fill={R} stroke={N} strokeWidth={6} strokeLinejoin="round"/></g><g transform="translate(446 1100) rotate(-90)"><path d="M0 -34 L28 18 L-28 18Z" fill={R} stroke={N} strokeWidth={6} strokeLinejoin="round"/></g></g></g>}
    {t>=s(20)&&t<e(20)+.4&&bubble(290,1000,X.a20,PB(t,s(20),.35),46,C,0)}
    {t>=s(21)&&t<e(21)+.4&&bubble(790,990,X.a21,PB(t,s(21),.35),42,C,0)}
    {t>=s(20)&&t<e(20)+.4&&tag(290,1160,X.wahr,'#2f9e44',PB(t,s(20),.3))}
    {t>=s(21)&&t<e(21)+.4&&tag(790,1150,X.luege,R,PB(t,s(21),.3))}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-470} y={-100} width={940} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={34} fontFamily={FONT} fontWeight={700} fontSize={lang==='de'?84:86} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const TuerDE:React.FC=()=><Tuer lang="de"/>;
export const TuerEN:React.FC=()=><Tuer lang="en"/>;
