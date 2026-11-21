import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
// eslint-disable-next-line
const {person, PPL} = require('./figs.js');
const N='#1d2540', Y='#ffc93c', R='#e4572e', G='#2a9d8f', C='#f3ead8', W='#ffffff';
const cl=(x:number)=>Math.max(0,Math.min(1,x));
const ease=(x:number)=>{x=cl(x);return 1-Math.pow(1-x,3)};
const eio=(x:number)=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const back=(x:number)=>{x=cl(x);const c=1.9;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const lerp=(a:number,b:number,u:number)=>a+(b-a)*u;
const P=(t:number,a:number,d:number)=>ease((t-a)/d);
const PB=(t:number,a:number,d:number)=>back((t-a)/d);
const WK=require('./warp_hut.json');
const warp=(x:number)=>{const a=WK.en,b=WK.de;if(x<=a[0])return b[0];for(let i=1;i<a.length;i++){if(x<=a[i]){const u=(x-a[i-1])/(a[i]-a[i-1]);return b[i-1]+u*(b[i]-b[i-1]);}}return b[b.length-1]+(x-a[a.length-1]);};
const FLOOR=1500, S=0.8;
const FONT='Fredoka, sans-serif';

// ---------- Personen ----------
type Pe={k:string;x:number;hat:string;look:number;num:number};
const PEOPLE:Pe[]=[
 {k:'hans',x:330,hat:'white',look:12,num:2},
 {k:'ali',x:560,hat:'black',look:12,num:1},
 {k:'dragan',x:790,hat:'white',look:12,num:0},
 {k:'igor',x:1420,hat:'black',look:-12,num:0},
];
const headOf=(p:Pe)=>({x:p.x,y:FLOOR+(-PPL[p.k].h+58)*S});

// ---------- Kamera ----------
const CAM=[
 [0,1000,1130,.64],[1.3,985,800,1.12],[3.3,985,800,1.12],[4.0,560,1160,.95],[5.7,560,1160,.95],[6.4,560,1130,1.75],[10.9,560,1130,1.75],
 [11.6,1000,1180,.66],[15.0,1000,1180,.72],[15.9,70,1220,.95],[20.8,70,1220,.95],[21.6,560,1190,.9],[24.0,560,1190,.9],[24.8,1170,1180,.82],[26.7,1170,1180,.82],
 [27.4,1000,1160,.64],[30.7,1000,1160,.64],[31.3,470,1170,1.05],[34.8,610,1170,1.05],[35.4,830,1180,.98],[37.2,830,1180,.98],[37.9,1250,1170,.98],[39.5,1250,1170,.98],
 [40.3,1000,1180,.64],[47.2,1000,1180,.64],[48.2,965,580,1.35],[50.6,965,580,1.35],[51.4,820,1170,.72],[57.0,820,1170,.72],
 [58.0,1000,1180,.64],[67.2,1000,1180,.64],[68.6,1060,1170,.72],[71.8,1060,1170,.72],[72.6,560,1160,.95],[74.0,420,1150,1.1],[76.0,420,1150,1.1],[80.5,445,1130,1.3],[83.0,445,1130,1.3],[83.8,560,1130,1.35],
 [89.0,560,1130,1.35],[89.9,1000,1180,.62],[96,1000,1170,.7]];
function cam(t:number){
  let i=0;while(i<CAM.length-2&&t>=CAM[i+1][0])i++;
  const a=CAM[i],b=CAM[Math.min(i+1,CAM.length-1)];
  const u=b[0]===a[0]?1:eio((t-a[0])/(b[0]-a[0]));
  return {x:lerp(a[1],b[1],u)+Math.sin(t*.7)*7,y:lerp(a[2],b[2],u)+Math.cos(t*.55)*5,z:lerp(a[3],b[3],u)*(1+Math.sin(t*.4)*.006)};
}

// ---------- Hilfen ----------
const hatIcon=(x:number,y:number,s:number,col:string)=>{const hc=col==='white'?'#fff':col==='black'?'#2a2a2a':'#ccd';
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="66" ry="14" fill="${hc}" stroke="${N}" stroke-width="7"/><path d="M-42 -2 L-38 -80 Q0 -94 38 -80 L42 -2Z" fill="${hc}" stroke="${N}" stroke-width="7" stroke-linejoin="round"/><rect x="-41" y="-36" width="82" height="16" fill="${col==='white'?R:Y}" stroke="${N}" stroke-width="4"/></g>`};
const sweat=(x:number,y:number,t:number,seed:number)=>{let s='';for(let i=0;i<2;i++){const ph=((t*.9+seed*.37+i*.5)%1);s+=`<path d="M${x+(i?52:-58)} ${y-20+ph*70} q-10 18 0 24 q10 -6 0 -24Z" fill="#9fd4ff" stroke="${N}" stroke-width="3" opacity="${1-ph*.8}"/>`}return s};
const bubble=(x:number,y:number,w:number,h:number,inner:string,p:number,tail:number)=>`<g transform="translate(${x} ${y}) scale(${p})" opacity="${cl(p*2)}"><circle cx="${tail}" cy="${h/2+54}" r="10" fill="${C}" stroke="${N}" stroke-width="5"/><circle cx="${tail*.9}" cy="${h/2+26}" r="16" fill="${C}" stroke="${N}" stroke-width="5"/><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="40" fill="${C}" stroke="${N}" stroke-width="7"/>${inner}</g>`;
const txt=(s:string,x:number,y:number,size:number,fill=N,extra='')=>`<text x="${x}" y="${y}" font-family="${FONT}" font-weight="700" font-size="${size}" fill="${fill}" text-anchor="middle" ${extra}>${s}</text>`;

function personSvg(p:Pe,t:number,i:number){
  const bob=Math.sin(t*1.8+i)*3;
  const hatBounce=(()=>{const a=27.2+i*.45;return t<a?0:-Math.max(0,Math.sin((t-a)*14)*40*Math.exp(-(t-a)*5))})();
  const nerv=(t>0.5&&t<27)||(t>39&&t<90);
  const g=person(0,0,p.k,{tag:false,hat:p.hat,look:p.look+(nerv?Math.sin(t*3+i*2)*1.5:0),hatY:hatBounce,shifty:false});
  return `<g transform="translate(${p.x} ${FLOOR+bob}) scale(${S}) translate(${-0} 0)">${g.replace(/<g transform="translate\(0 [^"]*\)">/,m=>m)}</g>`;
}

// ---------- Welt ----------
function sky(t:number){
  let s=`<defs><linearGradient id="sk" gradientUnits="userSpaceOnUse" x1="0" y1="-900" x2="0" y2="1500"><stop offset="0" stop-color="#0c1028"/><stop offset=".5" stop-color="#232a5e"/><stop offset=".78" stop-color="#7a3f66"/><stop offset=".92" stop-color="#d9684f"/><stop offset="1" stop-color="#f4a257"/></linearGradient></defs>`;
  s+=`<rect x="-3000" y="-3000" width="7000" height="4600" fill="url(#sk)"/>`;
  for(let i=0;i<60;i++){const x=((i*397)%3600)-900,y=-1400+((i*211)%2100);s+=`<circle cx="${x}" cy="${y}" r="${2+(i%3)}" fill="#fff" opacity="${.35+.35*Math.sin(t*2+i)}"/>`}
  s+=`<circle cx="520" cy="360" r="170" fill="#fff6d8" opacity=".14"/><circle cx="520" cy="360" r="105" fill="#fff6d8" opacity=".95"/><circle cx="486" cy="334" r="22" fill="#e9dcb8"/><circle cx="560" cy="396" r="14" fill="#e9dcb8"/>`;
  return s}
function far(t:number){
  let s='';
  // Wachturm + Zaun
  s+=`<path d="M1580 1500 L1600 760 L1880 760 L1900 1500Z" fill="#171c38"/><rect x="1560" y="640" width="360" height="130" rx="10" fill="#171c38"/><rect x="1600" y="672" width="280" height="62" fill="#ffd57a" opacity=".85"/>`;
  s+=`<path d="M-700 1500 L-700 1010 L100 1010 L100 1500Z M2100 1500 L2100 980 L2900 980 L2900 1500Z" fill="#1a1f3d"/>`;
  for(let i=0;i<30;i++){const x=-700+i*125;s+=`<rect x="${x}" y="1060" width="26" height="40" fill="#ffd57a" opacity="${.35+.25*Math.sin(t+i)}"/>`}
  // Zaun
  s+=`<path d="M-900 1330 H3000" stroke="#0f1330" stroke-width="10"/>`;
  for(let x=-900;x<3000;x+=46)s+=`<path d="M${x} 1330 V1500" stroke="#0f1330" stroke-width="4" opacity=".7"/>`;
  for(let x=-900;x<3000;x+=80)s+=`<path d="M${x} 1330 q20 -30 40 0 q20 -30 40 0" stroke="#0f1330" stroke-width="5" fill="none"/>`;
  return s}
function mid(){
  let s=`<rect x="-900" y="1160" width="4000" height="340" fill="#4a3236"/>`;
  for(let r=0;r<7;r++)for(let c=0;c<60;c++){const x=-900+c*66+(r%2)*33,y=1160+r*50;s+=`<rect x="${x}" y="${y}" width="64" height="48" fill="${(r+c)%5===0?'#573a3d':'#4d3438'}" stroke="#2c1e22" stroke-width="3"/>`}
  for(const x of [-300,100,1700,2100,2500]){s+=`<rect x="${x}" y="1210" width="110" height="150" rx="10" fill="#1c1a2d" stroke="#2c1e22" stroke-width="6"/><rect x="${x+10}" y="1220" width="90" height="130" fill="#ffc46b" opacity=".6"/>`;for(let b=1;b<4;b++)s+=`<rect x="${x+b*22}" y="1210" width="8" height="150" fill="#1c1a2d"/>`}
  return s}
function ground(){
  let s=`<rect x="-2000" y="1500" width="6000" height="1400" fill="#6d5b59"/><rect x="-2000" y="1500" width="6000" height="10" fill="#2c1e22"/>`;
  for(let r=0;r<12;r++){const y=1510+r*r*7+r*14;s+=`<path d="M-2000 ${y} H4000" stroke="#4e3f40" stroke-width="${3+r*.6}"/>`}
  for(let c=-40;c<50;c++)s+=`<path d="M${c*120} 1510 L${c*260-540} 2600" stroke="#4e3f40" stroke-width="4"/>`;
  return s}
function wall(t:number){
  let s=`<rect x="880" y="640" width="200" height="860" fill="#a35a46" stroke="${N}" stroke-width="8"/>`;
  for(let r=0;r<17;r++){const y=650+r*50;s+=`<path d="M880 ${y} H1080" stroke="#7d3f33" stroke-width="4"/>`;for(let c=0;c<3;c++)s+=`<path d="M${880+c*66+(r%2)*33} ${y} v50" stroke="#7d3f33" stroke-width="4"/>`}
  s+=`<rect x="866" y="618" width="228" height="34" rx="8" fill="#7d3f33" stroke="${N}" stroke-width="8"/>`;
  s+=`<path d="M866 604 q19 -26 38 0 q19 -26 38 0 q19 -26 38 0 q19 -26 38 0 q19 -26 38 0 q19 -26 38 0" stroke="#aeb6c8" stroke-width="5" fill="none"/>`;
  s+=`<rect x="1080" y="640" width="26" height="860" fill="${N}" opacity=".35"/>`;
  return s}
function clock(t:number,dim:number){
  const rem=t<47.8?600:Math.max(0,600-(t-47.8)*1.0);
  const m=Math.floor(rem/60),sec=Math.floor(rem%60);
  const lab=`${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  const flick=(t>47.8&&t<68&&Math.floor(t*2)%2===0)?1:.78;
  let s=`<path d="M960 520 V440" stroke="${N}" stroke-width="10"/><rect x="830" y="440" width="260" height="110" rx="14" fill="#14172c" stroke="${N}" stroke-width="8"/><rect x="842" y="452" width="236" height="86" rx="8" fill="#2a0d10"/>`;
  s+=`<text x="960" y="520" font-family="Oswald, Fredoka" font-weight="700" font-size="84" fill="#ff4b3a" text-anchor="middle" opacity="${flick}">${lab}</text><text x="960" y="520" font-family="Oswald, Fredoka" font-weight="700" font-size="84" fill="#ff8a7a" text-anchor="middle" opacity="${.18}" filter="url(#blur)">${lab}</text>`;
  return s}
function tableAnna(t:number){
  // Tisch mit vier Hüten
  let s=`<rect x="-320" y="1360" width="260" height="22" rx="6" fill="#8a5a33" stroke="${N}" stroke-width="7"/><rect x="-300" y="1380" width="18" height="120" fill="#6e4524" stroke="${N}" stroke-width="6"/><rect x="-98" y="1380" width="18" height="120" fill="#6e4524" stroke="${N}" stroke-width="6"/>`;
  const hs=['white','white','black','black'];hs.forEach((c,i)=>{s+=hatIcon(-285+i*62,1356,.42,c)});
  return s}
function annaSvg(t:number){
  const g=person(0,0,'anna',{tag:false,look:-6,grin:false});
  const bob=Math.sin(t*1.5)*3;
  let s=`<g transform="translate(80 ${FLOOR+bob}) scale(${S})">${g}</g>`;
  // Klemmbrett
  s+=`<g transform="translate(150 1260) rotate(-8)"><rect x="-34" y="-46" width="68" height="92" rx="8" fill="#e9d9b0" stroke="${N}" stroke-width="6"/><rect x="-14" y="-56" width="28" height="16" rx="5" fill="#9aa2b5" stroke="${N}" stroke-width="5"/><path d="M-20 -14 H20 M-20 4 H20 M-20 22 H8" stroke="${N}" stroke-width="4"/></g>`;
  return s}
function guard(t:number,focus:{x:number,a:number}|null){
  // Scheinwerferkegel vom Wachturm
  const ang=focus?0:Math.sin(t*.45)*500+900;
  const tx=focus?focus.x:ang;const a=focus?focus.a:.22;
  return `<defs><linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3b0" stop-opacity="${a*1.3}"/><stop offset="1" stop-color="#fff3b0" stop-opacity="${a*.35}"/></linearGradient></defs><path d="M1740 700 L${tx-150} 1500 L${tx+150} 1500Z" fill="url(#beam)"/><ellipse cx="${tx}" cy="1500" rx="190" ry="26" fill="#fff3b0" opacity="${a*.9}"/>`}

// ---------- Handlung ----------
const spotFocus=(t:number)=>{
  const hx=(i:number)=>PEOPLE[i].x;
  if(t>=3.8&&t<5.7)return {x:hx(1),a:.5};
  if(t>=11.5&&t<15.2){const i=Math.min(3,Math.floor((t-11.5)/.9));return {x:hx(i),a:.5}}
  if(t>=51&&t<57)return {x:hx(0),a:.5};
  if(t>=68.3&&t<70.1)return {x:hx(2),a:.5};
  if(t>=70.1&&t<71.9)return {x:hx(3),a:.5};
  if(t>=72&&t<73.1)return {x:hx(1),a:.5};
  if(t>=73.1&&t<74.1)return {x:hx(0),a:.5};
  return null;};
const eyePos=(i:number)=>{const h=headOf(PEOPLE[i]);return {x:h.x+PEOPLE[i].look*.9,y:h.y-3};};
const hatPos=(i:number)=>{const h=headOf(PEOPLE[i]);return {x:h.x,y:h.y-100*S};};
function line(a:{x:number,y:number},b:{x:number,y:number},p:number,t:number,col=Y){
  const x2=lerp(a.x,b.x,p),y2=lerp(a.y,b.y,p);
  return `<path d="M${a.x} ${a.y} L${x2} ${y2}" stroke="${N}" stroke-width="16" stroke-linecap="round" opacity=".55"/><path d="M${a.x} ${a.y} L${x2} ${y2}" stroke="${col}" stroke-width="8" stroke-linecap="round" stroke-dasharray="22 16" stroke-dashoffset="${-t*60}"/>`}
const qmark=(x:number,y:number,t:number,p:number)=>`<g transform="translate(${x} ${y+Math.sin(t*5)*8}) scale(${p})" opacity="${cl(p*2)}"><circle r="40" fill="${Y}" stroke="${N}" stroke-width="7"/>${txt('?',0,22,62)}</g>`;
const badge=(x:number,y:number,n:string,p:number,col=Y)=>`<g transform="translate(${x} ${y}) scale(${p})" opacity="${cl(p*2)}"><circle r="40" fill="${col}" stroke="${N}" stroke-width="7"/>${txt(n,0,20,56,col===Y?N:W)}</g>`;
const bigX=(x:number,y:number,p:number)=>`<g transform="translate(${x} ${y}) scale(${p})" opacity="${cl(p*2)}"><circle r="46" fill="${R}" stroke="${N}" stroke-width="7"/><path d="M-20 -20 L20 20 M20 -20 L-20 20" stroke="#fff" stroke-width="12" stroke-linecap="round"/></g>`;
const check=(x:number,y:number,p:number)=>`<g transform="translate(${x} ${y}) scale(${p})" opacity="${cl(p*2)}"><circle r="46" fill="${G}" stroke="${N}" stroke-width="7"/><path d="M-22 2 L-6 18 L24 -16" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const burst=(x:number,y:number,label:string,p:number)=>{let pts='';for(let i=0;i<16;i++){const a=i/16*Math.PI*2,r=i%2?120:170;pts+=`${(Math.cos(a)*r).toFixed(1)},${(Math.sin(a)*r*.7).toFixed(1)} `}return `<g transform="translate(${x} ${y}) rotate(-6) scale(${p})" opacity="${cl(p*2)}"><polygon points="${pts}" fill="${Y}" stroke="${N}" stroke-width="8" stroke-linejoin="round"/>${txt(label,0,18,50)}</g>`};

function worldOverlay(t:number){
  let s='';
  const hd=PEOPLE.map(headOf);
  const top=(i:number)=>({x:hd[i].x,y:hd[i].y-215*S});
  // Fragezeichen Hook
  if(t>=3.9&&t<5.7)s+=qmark(top(1).x,top(1).y,t,PB(t,3.9,.35));
  if(t>=6.6&&t<10.9)s+=qmark(top(1).x+20,top(1).y-20,t,PB(t,6.6,.4));
  if(t>=11.5&&t<15.2){const i=Math.min(3,Math.floor((t-11.5)/.9));s+=qmark(top(i).x,top(i).y,t,PB(t,11.5+i*.9,.3))}
  // Zahlen
  [[31.2,0,'2'],[33.5,1,'1'],[35.3,2,'0'],[37.5,3,'0']].forEach(([a,i,n]:any)=>{if(t>=a&&t<39.6)s+=badge(top(i).x,top(i).y,n,PB(t,a,.35))});
  // Blicklinien
  const L=(from:number,to:{x:number,y:number},a:number,b:number,col=Y)=>{if(t>=a&&t<b)s+=line(eyePos(from),to,P(t,a,.5),t,col)};
  L(0,hatPos(1),31.0,33.0);L(0,hatPos(2),31.4,33.0);L(1,hatPos(2),33.4,35.0);
  L(2,{x:880,y:hd[2].y},35.2,37.2);L(3,{x:1082,y:hd[3].y},37.4,39.6);
  L(0,hatPos(1),74.3,76.2);L(0,hatPos(2),74.5,76.2);
  // Rufen / Hinweise
  if(t>=41.4&&t<43.5){const p=PB(t,41.4,.35);s+=burst(hd[1].x,hd[1].y-250,'WHITE!',p)}
  // Lösung: X und Haken
  if(t>=68.3&&t<71.9){s+=bigX(top(2).x,top(2).y,PB(t,68.5,.35))+bigX(top(3).x,top(3).y,PB(t,69.8,.35))}
  if(t>=72.0&&t<74.2){s+=check(top(0).x,top(0).y,PB(t,72.1,.35))+check(top(1).x,top(1).y,PB(t,72.6,.35))}
  // Denkblase A: gleiche Hüte -> andere Farbe
  if(t>=76.3&&t<80.9){
    const p=PB(t,76.3,.4);const inner=hatIcon(-118,34,.5,'white')+hatIcon(-38,34,.5,'white')+txt('→',38,36,64)+hatIcon(118,34,.5,t>78.6?'black':'ghost')+(t>78.6?'':txt('?',118,16,60));
    s+=bubble(top(0).x+40,top(0).y-110,380,150,inner,p,-60);}
  if(t>=81.0&&t<83.4){const p=PB(t,81.0,.35);s+=bubble(top(0).x+40,top(0).y-110,260,130,txt('. . .',0,24,80),p,-50)}
  // Denkblase B
  if(t>=83.4&&t<89.2){
    const p=PB(t,83.4,.4);const own=t>85.8?'black':'ghost';
    const inner=hatIcon(-110,34,.5,'white')+txt('≠',-12,36,70)+hatIcon(100,34,.5,own)+(t>85.8?'':txt('?',100,14,60));
    s+=bubble(top(1).x+20,top(1).y-110,380,150,inner,p,-40);}
  if(t>=87.6&&t<89.3){s+=burst(hd[1].x+120,hd[1].y-380,'BLACK!',PB(t,87.6,.35))}
  // Alle frei: Hüte fliegen
  if(t>=89.2&&t<93){for(let i=0;i<4;i++){const e=t-89.2-i*.08;const x=hd[i].x+Math.sin(i*2)*60,y=hd[i].y-90*S-e*e*-0-Math.max(0,e)*420+Math.max(0,e)*Math.max(0,e)*400;s+=`<g transform="rotate(${e*220} ${x} ${y})">${hatIcon(x,y,.55,PEOPLE[i].hat)}</g>`}}
  return s}

// ---------- Karten (Bildschirm) ----------
type Card={a:number;b:number;lines:string[];y:number;bg?:string;fg?:string;size?:number;rot?:number};
const CARDS:Card[]=[
 {a:3.9,b:5.7,lines:['ONE MAN CAN','SAVE EVERYONE'],y:300},
 {a:7.3,b:10.9,lines:['HIS HAT','HE KNOWS'],y:300},
 {a:13.9,b:15.5,lines:['WHICH TWO?'],y:300,bg:Y},
 {a:19.1,b:21.4,lines:['2 WHITE','2 BLACK'],y:300},
 {a:24.3,b:26.9,lines:['THE FOURTH:','ALONE'],y:300},
 {a:39.96,b:41.2,lines:['NO','TALKING'],y:300,bg:R,fg:W,rot:-2},
 {a:41.4,b:43.55,lines:['ONLY ONCE','CALL A COLOR'],y:300},
 {a:43.6,b:45.45,lines:['RIGHT =','ALL FREE'],y:300,bg:G,fg:W,rot:2},
 {a:45.55,b:47.7,lines:['WRONG =','ALL DIE'],y:300,bg:R,fg:W,rot:-2},
 {a:51.0,b:52.0,lines:['WHO CAN','KNOW?'],y:300,bg:Y},
 {a:55.6,b:57.2,lines:['IS THAT TRUE?'],y:300,bg:Y},
 {a:57.4,b:61.1,lines:['ANSWER','IN THE','COMMENTS'],y:300},
 {a:68.3,b:71.9,lines:['NEVER SURE:','FRONT MAN','AND FOURTH'],y:300,bg:R,fg:W,rot:-1},
 {a:72.0,b:74.2,lines:['BUT THE','OTHER TWO'],y:300,bg:G,fg:W,rot:1},
 {a:76.3,b:80.9,lines:['IF THEY ARE','THE SAME:'],y:300},
 {a:81.0,b:83.4,lines:['HE STAYS SILENT'],y:300,bg:Y},
 {a:83.4,b:85.7,lines:['THE TWO AHEAD','ARE DIFFERENT'],y:300},
 {a:85.7,b:89.2,lines:['HE CALLS THE','OTHER COLOR'],y:300,bg:G,fg:W},
 {a:90.5,b:92.0,lines:['WOULD YOU','HAVE KNOWN?'],y:300,bg:Y},
 {a:92.1,b:95.5,lines:['FOLLOW','RIDDLE TIME'],y:300,bg:Y},
];
function cardSvg(t:number,c:Card){
  if(t<c.a||t>c.b+.05)return null;
  const size=c.size||86;const w=Math.max(...c.lines.map(l=>l.length))*size*.6+110;const h=c.lines.length*size*1.08+62;
  const p=PB(t,c.a,.4);const out=1-cl((t-(c.b-.25))/.25);
  return <g key={c.a} transform={`translate(540 ${c.y}) rotate(${(c.rot??(c.a%2?1.5:-1.5))}) scale(${p})`} opacity={out}>
    <rect x={-w/2+8} y={-h/2+10} width={w} height={h} rx={34} fill="#000" opacity={.28}/>
    <rect x={-w/2} y={-h/2} width={w} height={h} rx={34} fill={c.bg||C} stroke={N} strokeWidth={9}/>
    {c.lines.map((l,i)=><text key={i} x={0} y={-h/2+size*1.0+34+i*size*1.08-12} fontFamily={FONT} fontWeight={700} fontSize={size} fill={c.fg||N} textAnchor="middle">{l}</text>)}
  </g>}
const COUNT:[number,string][]=[[61.31,'5'],[62.35,'4'],[63.42,'3'],[64.76,'2'],[65.88,'1']];
function countdown(t:number){
  if(t<61.2||t>67.1)return null;
  let k=0;COUNT.forEach(([a],i)=>{if(t>=a)k=i});
  const a=COUNT[k][0],b=k<4?COUNT[k+1][0]:67.0;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);
  const circ=2*Math.PI*230;
  return <g transform={`translate(540 760) scale(${p*(1+.04*Math.sin(u*Math.PI))})`}>
    <circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/>
    <circle r={250} fill={C} stroke={N} strokeWidth={12}/>
    <circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/>
    <text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{COUNT[k][1]}</text>
  </g>}
function stamp(t:number){
  const arr:{a:number;b:number;label:string;col:string;y:number}[]=[{a:67.55,b:68.3,label:'SOLUTION',col:G,y:760},{a:89.25,b:90.45,label:'ALL FREE!',col:G,y:760}];
  return arr.map(s=>{if(t<s.a||t>s.b)return null;const p=PB(t,s.a,.35);const out=1-cl((t-(s.b-.2))/.2);
    return <g key={s.a} transform={`translate(540 ${s.y}) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={s.col} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={120} fill={s.col} textAnchor="middle">{s.label}</text></g>})}
function confetti(t:number){
  if(t<89.2||t>94)return null;const e=t-89.2;const cols=[Y,R,G,'#7fb7e6','#fff'];
  return <g>{Array.from({length:70}).map((_,i)=>{const x=((i*149)%1080);const y=-60+e*(380+(i%7)*70)-((i*53)%300);const r=e*(120+i%5*60)*(i%2?1:-1);
    return <rect key={i} x={x} y={y} width={20} height={32} fill={cols[i%5]} stroke={N} strokeWidth={3} transform={`rotate(${r} ${x} ${y})`}/>})}</g>}

// ---------- Hauptkomponente ----------
export const HutEN: React.FC = () => {
  const f=useCurrentFrame();const t=warp(f/30);
  const c=cam(t);
  const tr=(p:number)=>`translate(${540-c.x*c.z*p} ${960-c.y*c.z}) scale(${c.z})`;
  const focus=spotFocus(t);
  const redPulse=(t>47.8&&t<68)?.05+.05*Math.sin(t*6):0;
  const people=PEOPLE.map((p,i)=>personSvg(p,t,i)).join('');
  const flash=t>2.0&&t<2.6?.35*(1-(t-2.0)/.6):0;
  return <AbsoluteFill style={{background:N}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute',left:0,top:0}}>
      <defs><filter id="blur"><feGaussianBlur stdDeviation="9"/></filter>
        <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".62"/></radialGradient>
        <linearGradient id="vigv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".18" stop-color="#000" stop-opacity="0"/><stop offset=".82" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient></defs>
      <g transform={tr(.25)} dangerouslySetInnerHTML={{__html:sky(t)}}/>
      <g transform={tr(.5)} dangerouslySetInnerHTML={{__html:far(t)}}/>
      <g transform={tr(.8)} dangerouslySetInnerHTML={{__html:mid()}}/>
      <g transform={tr(1)}>
        <g dangerouslySetInnerHTML={{__html:ground()+guard(t,focus)+wall(t)+clock(t,0)+tableAnna(t)+people+annaSvg(t)+worldOverlay(t)}}/>
      </g>
      <rect width={1080} height={1920} fill="url(#vig)"/><rect width={1080} height={1920} fill="url(#vigv)"/>
      <rect width={1080} height={1920} fill="#ff2a1a" opacity={redPulse+flash}/>
      {CARDS.map(cd=>cardSvg(t,cd))}
      {countdown(t)}
      {stamp(t)}
      {confetti(t)}
    </svg>
  </AbsoluteFill>;
};
