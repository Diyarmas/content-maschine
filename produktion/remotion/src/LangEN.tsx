import React from 'react';
import {useCurrentFrame, AbsoluteFill, Img, staticFile} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,FONT,person,PPL} from './kit';
import W0 from './lang_en/00_intro.json'; import W1 from './lang_en/01_piraten.json'; import W2 from './lang_en/02_wein.json';
import W3 from './lang_en/03_ameisen.json'; import W4 from './lang_en/04_gefangene.json'; import W5 from './lang_en/05_outro.json';
const GAP=1.0;
const SEGS=[W0,W1,W2,W3,W4,W5] as any[];
export const OFF:number[]=[];{let o=0.6;for(const w of SEGS){OFF.push(o);o+=w.duration+GAP;}}
export const LANG_DUR=OFF[5]+SEGS[5].duration+2.5;
const sents=(W:any)=>{const S:{a:number;b:number}[]=[];let cur:any[]=[];for(const x of W.words){cur.push(x);if(/[.?!:]$/.test(x.w)){S.push({a:cur[0].s,b:cur[cur.length-1].e});cur=[];}}return S;};
const SS=SEGS.map(sents);
const W=1920,H=1080;
// Karte oben
const card=(t:number,a:number,b:number,lines:string[],hi=false)=>{if(t<a||t>b)return null;const p=PB(t,a,.35);const out=1-cl((t-(b-.25))/.25);const w=Math.max(...lines.map(l=>l.length))*30+110,h=lines.length*62+40;
  return <g transform={`translate(${W/2} ${70+h/2}) scale(${p})`} opacity={out}><rect x={-w/2+8} y={-h/2+10} width={w} height={h} rx={26} fill="#000" opacity={.25}/><rect x={-w/2} y={-h/2} width={w} height={h} rx={26} fill={hi?Y:C} stroke={N} strokeWidth={7}/>{lines.map((l,i)=><text key={i} y={-h/2+64+i*62-6} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={52} fill={N}>{l}</text>)}</g>;};
const cards=(t:number,S:{a:number;b:number}[],m:Record<number,string[]>,hi:number[]=[])=>Object.entries(m).map(([k,l])=>{const kk=+k;const nx=S[kk+1]?S[kk+1].a:S[kk].b+2;return <g key={k}>{card(t,S[kk].a,Math.min(Math.max(S[kk].b+.4,S[kk].a+1.8),nx+.2),l,hi.includes(kk))}</g>;});
const countdown=(t:number,S:{a:number;b:number}[],ks:number[])=>{const i=ks.findIndex((k,j)=>t>=S[k].a&&t<(j<ks.length-1?S[ks[j+1]].a:S[k].b+.8));if(i<0)return null;const a=S[ks[i]].a,b=i<ks.length-1?S[ks[i+1]].a:S[ks[i]].b+.8;const u=cl((t-a)/(b-a));const circ=2*Math.PI*150;
  return <g transform={`translate(${W-230} ${H/2}) scale(${PB(t,a,.3)})`}><circle r={175} fill="#000" opacity={.3} cx={6} cy={10}/><circle r={165} fill={C} stroke={N} strokeWidth={10}/><circle r={140} fill="none" stroke={R} strokeWidth={18} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)"/><text y={75} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={210} fill={N}>{ks.length-i}</text></g>;};
const stamp=(t:number,a:number,txt:string,col=G)=>{if(t<a||t>a+1.2)return null;return <g transform={`translate(${W/2} ${H/2}) rotate(-6) scale(${PB(t,a,.3)})`} opacity={1-cl((t-a-1)/.2)}><rect x={-360} y={-90} width={720} height={180} rx={30} fill={C} stroke={col} strokeWidth={14}/><text y={36} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={100} fill={col}>{txt}</text></g>;};
const chapter=(t:number,n:string,title:string,col:string)=>t<2.4?<g opacity={1-cl((t-1.9)/.5)}><rect width={W} height={H} fill={col}/><text x={W/2} y={470} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={70} fill="#fff" opacity={.85}>{n}</text><text x={W/2} y={600} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={130} fill="#fff" transform={`translate(${W/2} 560) scale(${PB(t,.1,.4)}) translate(${-W/2} -560)`}>{title}</text></g>:null;
const fig=(x:number,y:number,key:string,base:any,sc=1,o:any={},op=1)=>{PPL[key]={...base,n:''};return <g transform={`translate(${x} ${y}) scale(${sc})`} opacity={op} dangerouslySetInnerHTML={{__html:person(0,0,key,{tag:false,...o})}}/>;};
const tagT=(x:number,y:number,s:string,bg='#fff',fg=N,size=40)=>{const w=s.length*size*.62+50;return <g transform={`translate(${x} ${y})`}><rect x={-w/2} y={-size*.85} width={w} height={size*1.7} rx={18} fill={bg} stroke={N} strokeWidth={6}/><text y={size*.36} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={size} fill={fg}>{s}</text></g>;};
const coin=(x:number,y:number,r=22)=><g transform={`translate(${x} ${y})`}><circle r={r} fill="#f2c14e" stroke={N} strokeWidth={4}/><circle r={r*.62} fill="none" stroke="#c99a1e" strokeWidth={3}/></g>;
// ---------- INTRO ----------
const Intro=({t}:{t:number})=>{const S=SS[0];const icons=['☠','🍷','🐜','💡'];const lab=['PIRATES','POISON WINE','ANTS','LIGHT BULB'];const ap=(i:number)=>S[2].a+i*(S[2].b-S[2].a)/4;
  return <g><rect width={W} height={H} fill="#1d3557"/>{[...Array(30)].map((_,i)=><circle key={i} cx={(i*263)%W} cy={(i*149)%H} r={i%3?3:6} fill="#fff" opacity={.25+.2*Math.sin(t*2+i)}/>)}
   <g transform={`translate(${W/2} 330) scale(${PB(t,.1,.5)})`}><rect x={-560} y={-120} width={1120} height={240} rx={34} fill={N} stroke={Y} strokeWidth={10}/><text y={-10} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={96} fill="#fff">RIDDLE TIME SPECIAL</text><text y={80} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill={Y}>4 RIDDLES · MOST PEOPLE FAIL</text></g>
   {[0,1,2,3].map(i=>t>=ap(i)&&<g key={i} transform={`translate(${360+i*400} 700) scale(${PB(t,ap(i),.35)})`}><circle r={130} fill={C} stroke={N} strokeWidth={8}/><text y={40} textAnchor="middle" fontSize={120}>{icons[i]}</text>{tagT(0,190,lab[i],Y,N,40)}</g>)}
   {t>=S[5].a&&<g transform={`translate(${W/2} 980) scale(${PB(t,S[5].a,.3)})`}><rect x={-330} y={-50} width={660} height={100} rx={24} fill={R} stroke={N} strokeWidth={6}/><text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={48} fill="#fff">⏸ PAUSING ALLOWED</text></g>}
  </g>;};
// ---------- PIRATEN ----------
const PIR=['#e63946','#2a9d8f','#e9c46a','#3d7ea6','#6a4c93'];const PN=['A','B','C','D','E'];
const pirate=(x:number,y:number,i:number,t:number,sc=1,op=1,cap=false)=>{const base={n:'',c:PIR[i],hair:'short',hc:'#3b2a20',skin:['#f1c7a3','#e0a77f','#d9a37a','#f6d2b5','#b5835a'][i],h:500,beard:i%2?'#3b2a20':undefined};
  return <g key={'p'+i} opacity={op}>{fig(x,y,'pir'+i,base,sc,{look:0})}<g transform={`translate(${x} ${y-(500-120+62+40)*sc}) scale(${sc})`}><path d="M-80 0 Q0 -70 80 0 Q0 -20 -80 0Z" fill="#1a1a1a" stroke={N} strokeWidth={5}/>{cap&&<text y={-18} textAnchor="middle" fontSize={34} fill="#fff">☠</text>}</g>{tagT(x,y+50,PN[i],PIR[i],'#fff',44)}</g>;};
const ROWS:[number,(number|null)[]][]=[[25,[null,null,null,100,0]],[29,[null,null,99,0,1]],[34,[null,99,0,1,0]],[35,[98,0,1,0,1]]];
const Piraten=({t}:{t:number})=>{const S=SS[1];const s=(k:number)=>S[k].a;const sol=t>=s(22);const tbl=t>=s(24);
  const over=t>=s(8)&&t<s(9)+.2;const dropA=over?eio(cl((t-s(8)-1.2)/1.5)):0;
  return <g><rect width={W} height={H} fill="#7fc8f8"/><rect y={780} width={W} height={300} fill="#1d6fa3"/>{[...Array(10)].map((_,i)=><path key={i} d={`M${(i*230+t*30)%2200-200} ${830+(i%3)*70} q40 -18 80 0 q40 18 80 0`} stroke="#9fd3f0" strokeWidth={6} fill="none"/>)}
   {/* Schiffsdeck */}<path d="M80 760 L1840 760 L1740 900 L180 900Z" fill="#8a5a32" stroke={N} strokeWidth={8}/>{[...Array(12)].map((_,i)=><line key={i} x1={180+i*140} y1={760} x2={200+i*130} y2={900} stroke="#6d4223" strokeWidth={5}/>)}
   <rect x={1640} y={120} width={22} height={640} fill="#6d4223" stroke={N} strokeWidth={5}/><path d="M1662 160 L1662 520 L1880 480 Q1820 340 1880 200Z" fill="#f4efe6" stroke={N} strokeWidth={6}/>
   {!tbl&&[0,1,2,3,4].map(i=>pirate(300+i*280,760+(i===0?dropA*300:0)-(i===0&&over?Math.sin(dropA*Math.PI)*60:0),i,t,.95,1,i===0))}
   {!tbl&&t>=s(1)&&<g transform={`translate(1560 700) scale(${PB(t,s(1),.4)})`}><path d="M-120 60 L120 60 L100 -20 L-100 -20Z" fill="#8a5a32" stroke={N} strokeWidth={6}/>{[...Array(12)].map((_,k)=><g key={k}>{coin(-80+(k%6)*32,-30-Math.floor(k/6)*26,20)}</g>)}{tagT(0,110,'100',Y,N,40)}</g>}
   {!tbl&&t>=s(6)&&t<s(8)&&[0,1,2,3,4].map(i=><g key={'v'+i} transform={`translate(${300+i*280} 200) scale(${PB(t,s(6)+i*.15,.3)})`}><circle r={46} fill={i<3?G:R} stroke={N} strokeWidth={6}/><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={50} fill="#fff">{i<3?'✓':'✗'}</text></g>)}
   {!tbl&&t>=s(12)&&t<s(22)&&<g transform={`translate(300 250) scale(${PB(t,s(12),.3)})`}><circle r={70} fill={C} stroke={N} strokeWidth={7}/><text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill={N}>?</text></g>}
   {!tbl&&t>=s(14)&&t<s(16)&&[0,1,2,3,4].map(i=><g key={'f'+i}>{tagT(300+i*280,250,'20',Y,N,44)}</g>)}
   {tbl&&<g><rect x={160} y={220} width={1600} height={780} rx={30} fill={C} stroke={N} strokeWidth={8}/>
     {PN.map((p,j)=><g key={p}>{tagT(560+j*260,300,p,PIR[j],'#fff',52)}</g>)}
     <text x={260} y={315} fontFamily={FONT} fontWeight={700} fontSize={36} fill={N}>WHO'S LEFT</text>
     {ROWS.map(([k,v],r)=>t>=s(k)&&<g key={r} transform={`translate(0 ${430+r*150})`} opacity={PB(t,s(k),.3)}>
        <text x={260} y={18} fontFamily={FONT} fontWeight={700} fontSize={40} fill={N}>{['D, E','C – E','B – E','A – E'][r]}</text>
        {v.map((n,j)=>n===null?<g key={j}><text x={560+j*260} y={18} textAnchor="middle" fontFamily={FONT} fontSize={44} fill="#aaa">–</text></g>:<g key={j}><rect x={560+j*260-80} y={-42} width={160} height={84} rx={18} fill={r===3&&j===0?G:n>0?'#fff3c4':'#eee'} stroke={N} strokeWidth={5}/><text x={560+j*260} y={18} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={50} fill={N}>{n}</text></g>)}</g>)}
     {t>=s(24)&&t<s(25)&&<text x={W/2} y={620} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill={N}>⟲ THINK BACKWARDS</text>}
   </g>}
   {cards(t,S,{2:['5 PIRATES','100 COINS'],4:['THE RULE'],7:['AT LEAST HALF','= ACCEPTED'],8:['OTHERWISE: CAPTAIN','OVERBOARD'],9:['CLEVER &','GREEDY'],12:['HOW MANY COINS','DOES A KEEP?'],14:['"FAIR: 20','EACH"'],23:['A KEEPS','98 COINS!'],24:['THINK','BACKWARDS'],39:['NOT FAIR –','JUST SMART']},[12])}
   {countdown(t,S,[17,18,19,20,21])}{stamp(t,s(22),'ANSWER')}
   {chapter(t,'RIDDLE 1','THE PIRATES','#c0392b')}
  </g>;};
// ---------- WEIN ----------
const BIN=(613).toString(2).padStart(10,'0').split('');
const Wein=({t}:{t:number})=>{const S=SS[2];const s=(k:number)=>S[k].a;const sol=t>=s(18);
  const bottle=(x:number,y:number,sc=1,col='#7b1e3a',k=0)=><g key={k} transform={`translate(${x} ${y}) scale(${sc})`}><rect x={-8} y={-70} width={16} height={26} fill="#2b2b2b"/><path d="M-8 -44 Q-24 -30 -24 -10 L-24 40 L24 40 L24 -10 Q24 -30 8 -44Z" fill={col} stroke={N} strokeWidth={4}/><rect x={-18} y={0} width={36} height={22} fill="#f4efe6"/></g>;
  const testers=t>=s(5);const sick=(i:number)=>t>=s(25)&&BIN[i]==='1';
  return <g><rect width={W} height={H} fill="#3d2b3d"/>{[...Array(9)].map((_,i)=><path key={i} d={`M${i*240} 0 L${i*240+120} 120 L${i*240+240} 0`} fill="#4a344a" stroke="#2a1a2a" strokeWidth={4}/>)}
   {!sol&&<g>{[...Array(5)].map((_,r)=>[...Array(20)].map((_,c)=>t>=s(2)+(r*20+c)*.01&&bottle(200+c*80,360+r*95,.8,'#7b1e3a',r*20+c)))}{t>=s(2)&&!testers&&tagT(W/2,900,'1000 BOTTLES – ONE IS POISONED',Y,N,40)}</g>}
   {!sol&&t>=s(1)&&t<s(2)&&<text x={W/2} y={560} textAnchor="middle" fontSize={260}>👑</text>}
   {testers&&!sol&&<g>{[...Array(10)].map((_,i)=><g key={i}>{fig(170+i*175,1080,'wt'+i,{n:'',c:['#e76f51','#2a9d8f','#3d7ea6','#6a4c93','#e9c46a'][i%5],hair:['short','long','curly','bald','ponytail'][i%5],hc:'#3b2a20',skin:['#f1c7a3','#e0a77f','#b5835a'][i%3],h:470},.48,{look:0})}</g>)}</g>}
   {!sol&&t>=s(9)&&t<s(12)&&<g><rect x={360} y={300} width={1200} height={300} rx={30} fill={C} stroke={N} strokeWidth={8}/><text x={W/2} y={420} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill={N}>10 × 100 BOTTLES?</text><text x={W/2} y={530} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill={R}>→ only the group is known ✗</text></g>}
   {sol&&<g>
     {t>=s(20)&&<g>{bottle(260,460,2.2,R)}{tagT(260,640,'NO. 613',Y,N,46)}</g>}
     {t>=s(21)&&<g transform="translate(560 380)">{BIN.map((b,i)=><g key={i} transform={`translate(${i*120} 0) scale(${PB(t,s(21)+i*.15,.25)})`}><rect x={-50} y={-60} width={100} height={120} rx={16} fill={b==='1'?Y:'#fff'} stroke={N} strokeWidth={6}/><text y={28} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={80} fill={N}>{b}</text></g>)}</g>}
     {t>=s(22)&&[...Array(10)].map((_,i)=><g key={'s'+i}>{fig(560+i*120,1010,'ws'+i,{n:'',c:sick(i)?'#52b788':'#3d7ea6',hair:'short',hc:'#3b2a20',skin:sick(i)?'#a7d68a':'#f1c7a3',h:470},.62,{look:0})}<text x={560+i*120} y={560} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill="#fff">P{i+1}</text></g>)}
     {t>=s(23)&&t<s(24)&&<text x={W/2} y={1050} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff">Tester 1 drinks from every bottle with a 1 in digit 1 …</text>}
     {t>=s(25)&&tagT(1170,250,'SICK = 1 · HEALTHY = 0',G,'#fff',44)}
     {t>=s(26)&&<g transform={`translate(260 860) scale(${PB(t,s(26),.3)})`}><rect x={-200} y={-60} width={400} height={120} rx={22} fill={G} stroke={N} strokeWidth={7}/><text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill="#fff">= 613 ✓</text></g>}
   </g>}
   {cards(t,S,{2:['1000 BOTTLES','1 POISONED'],3:['TAKES','24 HOURS'],4:['ONLY 1','TEST ROUND'],5:['10','TESTERS'],8:['WHICH BOTTLE','IS IT?'],19:['USE','BINARY'],21:['10 DIGITS =','1024 OPTIONS'],22:['1 TESTER =','1 DIGIT'],27:['10 PEOPLE,','1 TEST']},[8])}
   {countdown(t,S,[13,14,15,16,17])}{stamp(t,s(18),'ANSWER')}
   {chapter(t,'RIDDLE 2','THE POISONED WINE','#7b1e3a')}
  </g>;};
// ---------- AMEISEN ----------
const NA=25;const rnd=(i:number)=>{const x=Math.sin(i*12.9898)*43758.5453;return x-Math.floor(x);};
const A0=[...Array(NA)].map((_,i)=>({p:2+rnd(i)*96,d:rnd(i+99)>.5?1:-1})).sort((a,b)=>a.p-b.p);
const ghosts=(T:number)=>A0.map(a=>a.p+a.d*T);
const antsAt=(T:number)=>{const g=ghosts(T).map((p,i)=>({p,d:A0[i].d})).sort((a,b)=>a.p-b.p);return g;}; // geordnet = echte Ameisen
const SX=260,SL=1400,SY=620;
const ant=(x:number,dir:number,col='#3b2a20',k=0,op=1)=><g key={k} transform={`translate(${x} ${SY-22}) scale(${dir} 1)`} opacity={op}><ellipse cx={-16} rx={14} ry={11} fill={col}/><ellipse cx={4} rx={10} ry={9} fill={col}/><circle cx={20} r={10} fill={col}/>{[-12,0,10].map(lx=><path key={lx} d={`M${lx} 4 l-6 16 M${lx} 4 l6 16`} stroke={col} strokeWidth={3}/>)}</g>;
const Ameisen=({t}:{t:number})=>{const S=SS[3];const s=(k:number)=>S[k].a;
  const simT=t>=s(3)&&t<s(16)?((t-s(3))*6)%60:t>=s(16)&&t<s(19)?100:0;
  const gT=t>=s(21)?Math.min(100,(t-s(21))*9):0;const ghostMode=t>=s(19);
  const cols=['#e63946','#2a9d8f','#e9c46a','#3d7ea6','#6a4c93'];
  const T=ghostMode?gT:simT;
  return <g><rect width={W} height={H} fill="#cfe8a9"/>{[...Array(14)].map((_,i)=><path key={i} d={`M${i*150} 1080 q20 -80 40 0`} fill="#7fae3a"/>)}
   <rect x={SX-20} y={SY} width={SL+40} height={40} rx={12} fill="#a86f35" stroke={N} strokeWidth={6}/>
   {[0,25,50,75,100].map(c=><g key={c}><line x1={SX+c/100*SL} y1={SY+40} x2={SX+c/100*SL} y2={SY+70} stroke={N} strokeWidth={4}/><text x={SX+c/100*SL} y={SY+110} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={32} fill={N}>{c} cm</text></g>)}
   {!ghostMode&&antsAt(T).map((a,i)=>a.p>0&&a.p<100?ant(SX+a.p/100*SL,a.d,'#3b2a20',i):null)}
   {ghostMode&&ghosts(T).map((p,i)=>p>0&&p<100?ant(SX+p/100*SL,A0[i].d,cols[i%5],i):null)}
   {ghostMode&&t>=s(20)&&t<s(21)&&<g><text x={W/2} y={420} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill={N}>BOUNCING = PASSING THROUGH</text></g>}
   {((t>=s(3)&&t<s(7))||t>=s(16))&&<g transform={`translate(${W/2} 860)`}><rect x={-230} y={-60} width={460} height={120} rx={24} fill={T>=99.5?G:'#fff'} stroke={N} strokeWidth={7}/><text y={24} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill={N}>⏱ {Math.round(T)} s</text></g>}
   {cards(t,S,{1:['1 METER STICK','25 ANTS'],2:['RANDOM','LEFT / RIGHT'],3:['1 CM','PER SECOND'],4:['COLLISION','= TURN AROUND'],5:['AT THE END:','FALL OFF'],7:['HOW LONG','AT MOST?'],17:['AT MOST','100 SECONDS!'],20:['ALL ANTS','LOOK THE SAME'],21:['EACH ONE','WALKS STRAIGHT ON'],23:['THE CHAOS','IS AN ILLUSION']},[7])}
   {countdown(t,S,[11,12,13,14,15])}{stamp(t,s(16),'ANSWER')}
   {chapter(t,'RIDDLE 3','THE ANTS','#2a9d8f')}
  </g>;};
// ---------- GEFANGENE ----------
const Gefangene=({t}:{t:number})=>{const S=SS[4];const s=(k:number)=>S[k].a;
  const days=t>=s(2)&&t<s(11)?Math.floor((t-s(2))*1.2):0;const solPh=t>=s(23);
  // Simulation im Lösungsteil: Tage im Zeitraffer
  const simDay=solPh?Math.floor((t-s(23))*3):0;
  let bulb=false,count=0,on=new Set<number>(),visitor=-1;
  for(let d=0;d<=simDay;d++){const v=Math.floor(rnd(d+7)*100);visitor=v;if(v===0){if(bulb){bulb=false;count++;}}else if(!bulb&&!on.has(v)){bulb=true;on.add(v);}}
  if(t>=s(30))count=99;
  const bulbOn=solPh?bulb||t>=s(31):t>=s(3)&&t<s(10)?Math.floor((t-s(3))*1.3)%2===0:false;
  return <g><rect width={W} height={H} fill="#4a4e69"/>{[...Array(12)].map((_,i)=><rect key={i} x={i*170} y={0} width={20} height={H} fill="#3a3d55"/>)}
   <g transform="translate(960 330)"><line x1={0} y1={-330} x2={0} y2={-120} stroke={N} strokeWidth={6}/>{bulbOn&&<circle r={170} fill="#ffe680" opacity={.3}/>}<circle r={80} fill={bulbOn?'#ffe680':'#ddd'} stroke={N} strokeWidth={7}/><rect x={-34} y={-130} width={68} height={50} fill="#888" stroke={N} strokeWidth={5}/></g>
   <g transform="translate(1260 600)"><rect x={-50} y={-80} width={100} height={160} rx={14} fill="#fff" stroke={N} strokeWidth={6}/><rect x={-20} y={bulbOn?-50:0} width={40} height={50} rx={8} fill={bulbOn?G:'#aaa'} stroke={N} strokeWidth={4}/></g>
   {!solPh&&t>=s(1)&&[...Array(20)].map((_,i)=><g key={i}>{fig(100+(i%10)*75,700+Math.floor(i/10)*200,'gf'+i,{n:'',c:'#f4a261',hair:['short','bald','curly'][i%3],hc:'#3b2a20',skin:['#f1c7a3','#e0a77f','#b5835a'][i%3],h:460},.38,{look:0})}</g>)}
   {!solPh&&t>=s(1)&&tagT(470,960,'× 100 PRISONERS',Y,N,40)}
   {!solPh&&days>0&&tagT(1500,250,'DAY '+days,'#fff',N,44)}
   {solPh&&<g>{fig(400,950,'zaehler',{n:'',c:'#e63946',hair:'short',hc:'#3b2a20',skin:'#f1c7a3',h:500,glasses:1},.9,{look:6})}{tagT(400,1010,'COUNTER','#e63946','#fff',40)}
     <g transform="translate(1500 760)"><rect x={-230} y={-120} width={460} height={240} rx={28} fill={C} stroke={N} strokeWidth={8}/><text y={-30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill={N}>COUNTED</text><text y={70} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={100} fill={count>=99?G:N}>{count} / 99</text></g>
     {t>=s(24)&&t<s(30)&&tagT(960,960,'DAY '+(simDay+1)+' · VISITOR: '+(visitor===0?'COUNTER':'#'+visitor),'#fff',N,38)}</g>}
   {cards(t,S,{1:['100 PRISONERS'],2:['1 ROOM,','1 LIGHT BULB'],4:['RANDOM','ORDER'],6:['"WE HAVE ALL','BEEN HERE!"'],7:['RIGHT =','ALL FREE'],8:['WRONG =','LOCKED FOREVER'],12:['WHICH','STRATEGY?'],22:['ONE PRISONER','IS THE COUNTER'],24:['SWITCH ON ONLY','ONCE EACH'],26:['ONLY THE COUNTER','SWITCHES OFF'],28:['EVERY LIGHT =','1 NEW VISITOR'],30:['AT 99:','EVERYONE WAS HERE!'],33:['1 BULB =','100 MEMORIES']},[12])}
   {countdown(t,S,[16,17,18,19,20])}{stamp(t,s(21),'ANSWER')}
   {chapter(t,'RIDDLE 4 · FINALE','100 PRISONERS','#22223b')}
  </g>;};
// ---------- OUTRO ----------
const Outro=({t}:{t:number})=>{const S=SS[5];const s=(k:number)=>S[k].a;
  return <g><rect width={W} height={H} fill="#f6c90e"/>{[...Array(16)].map((_,i)=><path key={i} d={`M960 540 L${960+Math.cos(i/16*Math.PI*2+t*.1)*1400} ${540+Math.sin(i/16*Math.PI*2+t*.1)*1400} L${960+Math.cos((i+.5)/16*Math.PI*2+t*.1)*1400} ${540+Math.sin((i+.5)/16*Math.PI*2+t*.1)*1400}Z`} fill="#ffd93d" opacity={.6}/>)}
   {t<s(4)&&<g transform={`translate(${W/2} 540) scale(${PB(t,0,.4)})`}><text y={-40} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={110} fill={N}>HOW MANY DID YOU GET?</text><text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill={N}>0 · 1 · 2 · 3 · 4 👇</text></g>}
   {t>=s(4)&&<g transform={`translate(${W/2} 470) scale(${PB(t,s(4),.4)})`}><rect x={-560} y={-150} width={1120} height={300} rx={40} fill={C} stroke={N} strokeWidth={10}/><text y={-20} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill={N}>A NEW RIDDLE</text><text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill={R}>EVERY DAY</text></g>}
   {t>=s(5)&&<g transform={`translate(960 860) scale(${PB(t,s(5),.3)*(1+.04*Math.sin(t*6))})`}><rect x={-260} y={-70} width={520} height={140} rx={30} fill="#e00" stroke={N} strokeWidth={8}/><text y={26} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={72} fill="#fff">SUBSCRIBE</text></g>}
  </g>;};
export const LangEN:React.FC=()=>{const f=useCurrentFrame();const T=f/30;
  let k=0;for(let i=0;i<6;i++)if(T>=OFF[i]-GAP/2)k=i;const t=T-OFF[k];
  const P=[Intro,Piraten,Wein,Ameisen,Gefangene,Outro][k];
  return <AbsoluteFill style={{background:'#000'}}><svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position:'absolute'}}><P t={t}/>
   <g transform="translate(40 1030)" opacity={.85}><rect width={250} height={36} rx={10} fill={N}/><text x={125} y={26} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={24} fill={Y}>RIDDLE TIME</text></g></svg></AbsoluteFill>;};
