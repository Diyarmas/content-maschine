import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,W,cl,eio,lerp,cardSvg} from './Hut';
void cardSvg;
const FONT='Fredoka, sans-serif';
const COLS=8, ROWS=11, CW=100, CH=116, X0=140, Y0=480, SC=0.62;
const ODD={c:2,r:8}; // C-9
const SHIRT=['#e4572e','#2a9d8f','#ffc93c','#4a6fa5','#9b5de5','#f28482','#5fa86b','#f4a259'];
const SKIN=['#f1c9a5','#d9a679','#a8744f','#7a4e32','#f6d9bf'];
const HAIR=['#2b2118','#5a3a22','#c58b3a','#111','#8a8a8a'];
const rnd=(n:number)=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)};
const RING=['#2a9d8f','#e4572e','#4a6fa5','#9b5de5','#f4a259','#5fa86b'];
function Fig({c,r,t,reveal}:{c:number;r:number;t:number;reveal:number}){
  const id=c*10+r;
  const odd=c===ODD.c&&r===ODD.r;
  const col=RING[Math.floor(rnd(id+1)*RING.length)];
  const sp=.16+rnd(id+4)*.07, ph=rnd(id+5)*6.28, ph2=rnd(id+6)*6.28;
  const d=odd?-1:1;
  const am=ph+d*t*sp*6.28;            // Minutenzeiger
  const ah=ph2+d*t*sp*6.28/12;        // Stundenzeiger
  const cx=X0+c*CW+CW/2, cy=Y0+r*CH+CH/2;
  const R0=38;
  const s=0.5+0.5*cl(reveal);
  const ticks=[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>{const q=i*Math.PI/6;return <line key={i} x1={cx+Math.sin(q)*(R0-6)} y1={cy-Math.cos(q)*(R0-6)} x2={cx+Math.sin(q)*(R0-2)} y2={cy-Math.cos(q)*(R0-2)} stroke={N} strokeWidth={2} opacity={.6}/>});
  return <g transform={`translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`} opacity={cl(reveal*1.6)}>
    <circle cx={cx} cy={cy} r={R0} fill={W} stroke={col} strokeWidth={5}/>
    {ticks}
    <line x1={cx} y1={cy} x2={cx+Math.sin(ah)*20} y2={cy-Math.cos(ah)*20} stroke={N} strokeWidth={5} strokeLinecap="round"/>
    <line x1={cx} y1={cy} x2={cx+Math.sin(am)*31} y2={cy-Math.cos(am)*31} stroke={N} strokeWidth={3} strokeLinecap="round"/>
    <circle cx={cx} cy={cy} r={3.5} fill={N}/>
  </g>;
}
type SP={lang:'de'|'en';endSearch:number;solAt:number};
const TX={de:{l1:'ALLE UHREN LAUFEN VORWÄRTS.',l2:'EINE NICHT.',l3:'Finde sie. Level 1',cta:'Koordinate in die Kommentare!',sol:'C-9 läuft rückwärts',fol:'Folge Knobelzeit'},
          en:{l1:'ALL CLOCKS RUN FORWARD.',l2:'ONE DOESN\'T.',l3:'Find it. Level 1',cta:'Coordinate in the comments!',sol:'C-9 runs backwards',fol:'Follow Riddle Time'}};
export const SucheView:React.FC<SP>=({lang,endSearch,solAt})=>{
  const f=useCurrentFrame(), t=f/30, X=TX[lang];
  const sol=cl((t-solAt)/.8);
  const cells:React.ReactNode[]=[];
  for(let c=0;c<COLS;c++)for(let r=0;r<ROWS;r++){
    const rv=eio((t-(0.3+(c+r)*0.05))/0.6);
    const odd=c===ODD.c&&r===ODD.r;
    cells.push(<g key={c+'-'+r} opacity={odd?1:1-0.78*sol}><Fig c={c} r={r} t={t} reveal={rv}/></g>);
  }
  const L='ABCDEFGH';
  const left=1-cl((t-2)/(endSearch-2));
  const urgent=t>endSearch-5&&t<endSearch;
  const pulse=1+Math.sin(t*9)*.05;
  const ocx=X0+ODD.c*CW+CW/2, ocy=Y0+ODD.r*CH+CH/2;
  const cta=t>endSearch-9&&t<solAt-0.2?cl((t-(endSearch-9))/.5):0;
  return <AbsoluteFill style={{background:C}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
      <rect width={1080} height={1920} fill={C}/>
      <rect x={0} y={0} width={1080} height={380} fill={N}/>
      <text x={540} y={150} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={58} fill={W}>{X.l1}</text>
      <text x={540} y={260} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={96} fill={Y}>{X.l2}</text>
      <text x={540} y={340} textAnchor="middle" fontFamily={FONT} fontWeight={500} fontSize={42} fill={W} opacity={.85}>{X.l3}</text>
      {Array.from({length:COLS}).map((_,c)=><text key={'c'+c} x={X0+c*CW+CW/2} y={470} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={N}>{L[c]}</text>)}
      {Array.from({length:ROWS}).map((_,r)=><text key={'r'+r} x={96} y={Y0+r*CH+CH/2+10} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={N}>{r+1}</text>)}
      {cells}
      {sol>0&&<g>
        <circle cx={ocx} cy={ocy-6} r={52*pulse*(1.6-.6*sol)} fill="none" stroke={R} strokeWidth={9} opacity={sol}/>
        <rect x={110} y={1760} width={860} height={110} rx={30} fill={N} opacity={sol}/>
        <text x={540} y={1832} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={62} fill={Y} opacity={sol}>{X.sol}</text>
      </g>}
      {t<solAt&&<g>
        <rect x={140} y={1790} width={800} height={34} rx={17} fill="#00000022"/>
        <rect x={140} y={1790} width={800*Math.max(0,left)} height={34} rx={17} fill={urgent?R:G}/>
        {cta>0&&<g opacity={cta}><rect x={90} y={1700} width={900} height={70} rx={30} fill={N}/>
        <text x={540} y={1750} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill={W}>{X.cta}</text></g>}
      </g>}
    </svg>
  </AbsoluteFill>;
};
export const SucheDE:React.FC=()=><SucheView lang="de" endSearch={44.2} solAt={44.7}/>;
export const SucheEN:React.FC=()=><SucheView lang="en" endSearch={44.2} solAt={44.8}/>;
