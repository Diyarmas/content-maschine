import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person,PPL,CAST} = require('./figs.js');
import WDE from './words_tresor_de.json';
import WEN from './words_tresor_en.json';
PPL.ingrid={n:'INGRID',c:'#34495e',hair:'ponytail',hc:'#6b3e1f',skin:'#e8c39e',h:500};
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const T={
 de:{cards:{0:['EIN TRESOR,','EIN VERSUCH'],1:['KOMMISSARIN','INGRID BERG'],2:['KELLER','IN WIEN'],3:['FÜNF ZAHLEN','AUF DEM DISPLAY'],4:['DIE SECHSTE','ÖFFNET ALLES'],5:['UND DAS','VERRÜCKTE'],6:['FALSCH =','ALARM!'],7:['MAN SUCHT','EINE RECHNUNG'],8:['NICHT RECHNEN,','VORLESEN'],9:['WELCHE ZAHL','KOMMT NUN?'],19:['JEDE ZAHL','BESCHREIBT'],20:['DIE ZAHL','DAVOR'],21:['3 EINSEN,','2 ZWEIEN, 1 EINS'],22:['VORLESEN,','NICHT RECHNEN']} as Record<number,string[]>,
  sol:'LÖSUNG',done:'LIES ES LAUT!',alarm:'ALARM!',read:['EINMAL EINS','ZWEIMAL ZWEI','DREIMAL DREI']},
 en:{cards:{0:['ONE SAFE,','ONE TRY'],1:['INSPECTOR','INGRID BERG'],2:['BASEMENT','IN VIENNA'],3:['FIVE NUMBERS','ON THE DISPLAY'],4:['THE SIXTH','OPENS IT'],5:['AND THE','CRAZY PART'],6:['WRONG =','ALARM!'],7:['PEOPLE HUNT','FOR MATH'],8:['NO MATH,','READ IT ALOUD'],9:['WHAT NUMBER','IS NEXT?'],19:['EACH NUMBER','DESCRIBES'],20:['THE ONE','BEFORE IT'],21:['3 ONES,','2 TWOS, 1 ONE'],22:['READ IT,','DON\'T CALCULATE']} as Record<number,string[]>,
  sol:'ANSWER',done:'READ IT ALOUD!',alarm:'ALARM!',read:[]}};
const NUMS=['1','11','21','1211','111221'];
const ANS='312211';
const Tresor:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=T[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const a0=s(kk);const nxt=S[kk+1]?S[kk+1].a-.05:1e9;const c:Card={a:a0,b:Math.min(Math.max(e(kk)+.3,a0+1.4),Math.max(nxt,a0+1.0)),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2; const doneA=e(22)+.35,doneB=doneA+2.4;
  // Zahlen nacheinander während Satz 3
  const a3=s(3),b3=e(3); const per=(b3-a3-1)/5;
  const shown=NUMS.map((_,i)=>t>=a3+.6+i*per);
  const W=((lang==='de'?WDE:WEN) as any).words as Wd[];let cnt=0,k18=0;const tw:number[]=[];for(const x of W){cnt++;if(/[.?!:]$/.test(x.w)){if(k18===18){const seg=W.slice(cnt-0,cnt);}k18++;}}
  // Wörter von Satz 18: letzte 6 Wörter = die Ziffern
  const w18:Wd[]=[];{let c2:Wd[]=[],k=0;for(const x of W){c2.push(x);if(/[.?!:]$/.test(x.w)){if(k===18){w18.push(...c2);}c2=[];k++;}}}
  const dig=w18.slice(-6).map(x=>x.s);
  const typed=dig.filter(d=>t>=d).length;
  const alarmOn=t>=s(6)&&t<e(6)+.5&&Math.floor(t*6)%2===0;
  const hi=t>=s(19)&&t<s(22); // Erklärung
  const SX=190,SY=620,SW=700,SH=900;
  const rowY=(i:number)=>SY+215+i*100;
  return <AbsoluteFill style={{background:'#10151c'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <rect width={1080} height={1920} fill="#2b2f36"/>
    {[0,1,2,3,4,5,6].map(i=><rect key={i} x={0} y={40+i*70} width={1080} height={60} fill={i%2?'#33383f':'#2f343b'}/>)}
    <rect y={1540} width={1080} height={380} fill="#3d3a36" stroke={N} strokeWidth={8}/>
    {alarmOn&&<rect width={1080} height={1920} fill={R} opacity={.28}/>}
    <rect x={910} y={150} width={90} height={90} rx={45} fill={alarmOn?R:'#7a2a24'} stroke={N} strokeWidth={7}/>
    {/* Tresor */}
    <rect x={SX} y={SY} width={SW} height={SH} rx={28} fill="#6c7683" stroke={N} strokeWidth={12}/>
    <rect x={SX+30} y={SY+30} width={SW-60} height={SH-60} rx={18} fill="none" stroke="#9aa5b3" strokeWidth={8}/>
    <rect x={SX+70} y={SY+70} width={SW-140} height={720} rx={18} fill="#0b2a1a" stroke={N} strokeWidth={10}/>
    {t<a3+.6&&<text x={SX+SW/2} y={SY+SH/2} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={110} fill="#4dff9a" opacity={Math.floor(t*1.6)%2?1:.25}>{lang==='de'?'CODE_':'CODE_'}</text>}
    {NUMS.map((n,i)=>shown[i]&&<text key={i} x={SX+SW/2} y={rowY(i)} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={92} fill={hi&&i!==4?'#6a8f7a':'#4dff9a'}>{n}</text>)}
    {t>=s(3)+.6+4*per&&t<s(17)&&<text x={SX+SW/2} y={rowY(5)} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={110} fill={Y}>{t<s(9)?'?':(Math.floor(t*2)%2?'?':'')}</text>}
    {typed>0&&<text x={SX+SW/2} y={rowY(5)} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={110} fill={hi?Y:'#4dff9a'}>{ANS.slice(0,typed)}</text>}
    {/* Erklärung: Gruppen unter der Lösung */}
    {t>=s(20)&&t<s(22)+1&&<g>{[['3','1'],['2','2'],['1','1']].map((g,i)=>{const x=SX+SW/2-250+i*215;return <g key={i} transform={`translate(${x} ${SY+SH+80}) scale(${PB(t,s(20)+.3+i*.9,.3)})`}><rect x={-100} y={-45} width={200} height={90} rx={22} fill={C} stroke={N} strokeWidth={6}/><text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={54} fill={N}>{g[0]}×{g[1]}</text></g>;})}</g>}
    <circle cx={SX+SW/2} cy={SY+SH-60} r={0} fill="none"/>
    {t>=s(4)&&t<s(17)&&<g transform={`translate(${SX+SW/2} ${SY+SH+80}) scale(${PB(t,s(4),.3)})`}><rect x={-250} y={-38} width={500} height={76} rx={28} fill={Y} stroke={N} strokeWidth={7}/><text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={N}>{lang==='de'?'EIN VERSUCH':'ONE TRY'}</text></g>}
    <g transform="translate(940 1860) scale(1.15)" dangerouslySetInnerHTML={{__html:person(0,0,'ingrid',{tag:false,look:6})}}/>
    <g transform="translate(880 1895)"><rect x={-120} y={-26} width={240} height={52} rx={18} fill="#fff" stroke={N} strokeWidth={6}/><text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={N}>INGRID</text></g>
    {t>=s(6)&&t<e(6)+.5&&<g transform={`translate(300 520) scale(${PB(t,s(6),.3)})`}><rect x={-170} y={-50} width={340} height={100} rx={26} fill={R} stroke={N} strokeWidth={7}/><text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill="#fff">{X.alarm}</text></g>}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-490} y={-100} width={980} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={30} fontFamily={FONT} fontWeight={700} fontSize={80} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const TresorDE:React.FC=()=><Tresor lang="de"/>;
export const TresorEN:React.FC=()=><Tresor lang="en"/>;
