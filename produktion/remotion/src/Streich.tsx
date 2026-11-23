import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,lerp,P,PB,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
import WDE from './words_streich_de.json';
import WEN from './words_streich_en.json';
type Wd={w:string;s:number;e:number};
function sentences(ws:Wd[]){const S:{a:number;b:number}[]=[];let cur:Wd[]=[];
  for(const x of ws){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}
  return S;}
const SD=sentences((WDE as any).words), SE=sentences((WEN as any).words);
const T={
 de:{cards:{0:['NUR 1','STREICHHOLZ'],1:['PAVELS','HÜTTE'],2:['KERZE · LAMPE','OFEN'],3:['ALLES','BEREIT'],4:['NUR EIN','STREICHHOLZ'],6:['FALSCH =','NICHTS GEHT'],7:['"DEN OFEN!"','SAGEN VIELE'],8:['NICHT DER','ERSTE SCHRITT'],9:['WAS ZÜNDEST','DU ZUERST AN?'],18:['DAS','STREICHHOLZ!'],19:['OHNE FLAMME','BRENNT NICHTS'],20:['ZUERST:','STREICHHOLZ'],21:['DANN DIE','KERZE'],22:['KERZE ZÜNDET','LAMPE + OFEN']} as Record<number,string[]>,
  sol:'LÖSUNG',done:'ZUERST DAS STREICHHOLZ!'},
 en:{cards:{0:['ONLY 1','MATCH'],1:['PAVEL\'S','CABIN'],2:['CANDLE · LAMP','STOVE'],3:['ALL READY','TO LIGHT'],4:['BUT ONLY','ONE MATCH'],6:['WRONG =','NOTHING WORKS'],7:['"THE STOVE!"','SAYS MOST'],8:['NOT THE','FIRST STEP'],9:['WHAT DO YOU','LIGHT FIRST?'],18:['THE','MATCH!'],19:['NO FLAME,','NO FIRE'],20:['FIRST:','THE MATCH'],21:['THEN THE','CANDLE'],22:['CANDLE LIGHTS','LAMP + STOVE']} as Record<number,string[]>,
  sol:'ANSWER',done:'MATCH FIRST!'}};
function flame(x:number,y:number,sc:number,t:number,k:number){
  const fl=1+.08*Math.sin(t*17+k)+.05*Math.sin(t*29+k*2);
  return <g transform={`translate(${x} ${y}) scale(${sc*fl} ${sc*(1+(fl-1)*2)})`}>
    <circle r={150} cy={-20} fill="#ffb84a" opacity={.22}/><circle r={90} cy={-20} fill="#ffd27a" opacity={.3}/>
    <path d="M0 0 C-34 -4 -40 -52 0 -112 C40 -52 34 -4 0 0Z" fill="#ff7a1a" stroke={N} strokeWidth={4}/>
    <path d="M0 -4 C-16 -6 -20 -32 0 -62 C20 -32 16 -6 0 -4Z" fill="#ffe27a"/>
  </g>;
}
const CANDLE={x:250,y:1250}, LAMP={x:560,y:1250}, STOVE={x:860,y:1250};
const Streich:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(), t=f/30, S=lang==='de'?SD:SE, X=T[lang];
  const s=(k:number)=>S[k].a, e=(k:number)=>S[k].b;
  const matchLit=P(t,s(18),.4); 
  const mv=eio(cl((t-(s(21)-.2))/1.2));
  const mx=lerp(540,CANDLE.x+10,mv), my=lerp(590,CANDLE.y-288+6,mv);
  const candleLit=t>s(21)+1.0?P(t,s(21)+1.0,.4):0;
  const lampLit=t>s(22)+.3?P(t,s(22)+.3,.4):0;
  const stoveLit=t>s(22)+.9?P(t,s(22)+.9,.4):0;
  const lights=Math.max(0,.38-.08*matchLit-.1*candleLit-.1*lampLit-.1*stoveLit);
  const cardEls=Object.entries(X.cards).map(([k,l])=>{const kk=+k;const c:Card={a:s(kk),b:Math.max(e(kk)+.3,s(kk)+1.4),lines:l,y:300,bg:(kk===9)?Y:undefined};return cardSvg(t,c);});
  const cd=[12,13,14,15,16].findIndex(k=>t>=s(k)&&t<s(k)+(k<16?(s(k+1)-s(k)):1.0));
  const stA=s(17),stB=stA+1.2; const doneA=e(22)+.35,doneB=doneA+2.4;
  const q=t>=s(9)&&t<s(18);
  const qb=(x:number,y:number)=><g transform={`translate(${x} ${y+Math.sin(t*4+x)*8})`}><circle r={46} fill={C} stroke={N} strokeWidth={7}/><text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={80} fill={N}>?</text></g>;
  return <AbsoluteFill style={{background:'#1b2440'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <rect width={1080} height={1920} fill="#2a3358"/>
    {/* Balkenwand */}
    {Array.from({length:12}).map((_,i)=><rect key={i} x={0} y={560+i*100} width={1080} height={100} fill={i%2?'#6b4a32':'#76533a'} stroke="#3b2818" strokeWidth={4}/>)}
    {/* Fenster mit Mond */}
    <rect x={110} y={650} width={230} height={290} fill="#0f1a3a" stroke={N} strokeWidth={10}/><circle cx={225} cy={740} r={42} fill="#f3efd2"/><line x1={225} y1={650} x2={225} y2={940} stroke={N} strokeWidth={8}/><line x1={110} y1={795} x2={340} y2={795} stroke={N} strokeWidth={8}/>
    {/* Boden + Tisch */}
    <rect y={1480} width={1080} height={440} fill="#4a3322" stroke={N} strokeWidth={8}/><rect x={180} y={1600} width={720} height={200} rx={30} fill="#7a2f2a" stroke={N} strokeWidth={7}/><rect x={220} y={1630} width={640} height={140} rx={20} fill="none" stroke="#c9a24a" strokeWidth={6} strokeDasharray="22 14"/>
    <rect x={90} y={1250} width={900} height={40} rx={8} fill="#a77b4f" stroke={N} strokeWidth={8}/>
    <rect x={130} y={1290} width={40} height={200} fill="#8a6038" stroke={N} strokeWidth={6}/><rect x={910} y={1290} width={40} height={200} fill="#8a6038" stroke={N} strokeWidth={6}/>
    {/* Kerze */}
    <g transform={`translate(${CANDLE.x} ${CANDLE.y}) scale(1.5)`}><rect x={-24} y={-170} width={48} height={170} fill="#f1e7c8" stroke={N} strokeWidth={6}/><line x1={0} y1={-170} x2={0} y2={-192} stroke={N} strokeWidth={5}/><rect x={-48} y={-10} width={96} height={14} rx={6} fill="#c9a24a" stroke={N} strokeWidth={5}/></g>
    {/* Öllampe */}
    <g transform={`translate(${LAMP.x} ${LAMP.y}) scale(1.6)`}><ellipse cy={-12} rx={76} ry={20} fill="#c9a24a" stroke={N} strokeWidth={6}/><path d="M-60 -20 Q-90 -110 -40 -180 L40 -180 Q90 -110 60 -20Z" fill="#cfe8f5" opacity={.85} stroke={N} strokeWidth={6}/><rect x={-34} y={-196} width={68} height={24} fill="#c9a24a" stroke={N} strokeWidth={5}/></g>
    {/* Ofen */}
    <g transform={`translate(${STOVE.x} ${STOVE.y}) scale(1.35)`}><rect x={-90} y={-250} width={180} height={250} rx={10} fill="#3a3f48" stroke={N} strokeWidth={8}/><rect x={-60} y={-190} width={120} height={110} rx={8} fill="#15181d" stroke={N} strokeWidth={6}/><rect x={-20} y={-420} width={40} height={170} fill="#4a505a" stroke={N} strokeWidth={6}/></g>
    {/* Dunkelheit */}
    <rect width={1080} height={1920} fill="#050914" opacity={lights}/>
    {/* Flammen */}
    {candleLit>0&&<g opacity={candleLit}>{flame(CANDLE.x,CANDLE.y-288,.7,t,1)}</g>}
    {lampLit>0&&<g opacity={lampLit}>{flame(LAMP.x,LAMP.y-314,.85,t,2)}</g>}
    {stoveLit>0&&<g opacity={stoveLit}><rect x={-81+STOVE.x} y={STOVE.y-256} width={162} height={148} rx={10} fill="#ff8a1f" opacity={.9}/>{flame(STOVE.x,STOVE.y-130,1.3,t,3)}</g>}
    {/* Streichholz */}
    <g opacity={1-cl((t-(s(21)+1.3))/.4)} transform={`translate(${mx} ${my}) rotate(${lerp(0,-14,mv)}) scale(1.4)`}>
      <rect x={-9} y={0} width={18} height={240} rx={6} fill="#d9b77a" stroke={N} strokeWidth={6}/>
      <ellipse cx={0} cy={0} rx={19} ry={26} fill="#d62828" stroke={N} strokeWidth={6}/>
      {matchLit>0&&<g opacity={matchLit}>{flame(0,-20,.7,t,0)}</g>}
    </g>
    {q&&<g>{qb(CANDLE.x,930)}{qb(LAMP.x,790)}{qb(STOVE.x,680)}</g>}
    {cardEls}
    {cd>=0&&(()=>{const k=12+cd;const a=s(k);const b=k<16?s(k+1):a+1.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
      return <g transform={`translate(540 300) scale(${p*.62*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{5-cd}</text></g>;})()}
    {t>stA&&t<stB&&(()=>{const p=PB(t,stA,.35);const out=1-cl((t-(stB-.2))/.2);return <g transform={`translate(540 300) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={110} fill={G} textAnchor="middle">{X.sol}</text></g>;})()}
    {t>doneA&&t<doneB&&(()=>{const p=PB(t,doneA,.35);const out=1-cl((t-(doneB-.25))/.25);return <g transform={`translate(540 300) rotate(-6) scale(${p})`} opacity={out}><rect x={-470} y={-100} width={940} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={34} fontFamily={FONT} fontWeight={700} fontSize={lang==='de'?72:90} fill={G} textAnchor="middle">{X.done}</text></g>;})()}
   </svg>
  </AbsoluteFill>;
};
export const StreichDE:React.FC=()=><Streich lang="de"/>;
export const StreichEN:React.FC=()=><Streich lang="en"/>;
