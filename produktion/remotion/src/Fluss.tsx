import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,W,cl,eio,lerp,P,PB,txt,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person, PPL} = require('./figs.js');
const TOP=1400, S=0.8;
const CAM:[number,number,number,number][]=[
 [0,-250,1250,.8],[3.4,300,1200,.75],[4,500,1250,.7],[5.7,900,1250,.62],[6.8,520,1120,.9],[11.1,520,1120,.9],[11.7,380,1180,1.3],[14.6,380,1180,1.3],
 [15.3,700,1250,.62],[16.4,380,1220,1.25],[18.3,380,1220,1.25],[18.4,1500,1150,.95],[20.9,1500,1150,.95],[21.0,1000,1560,.62],[24.9,1000,1560,.62],
 [25.0,300,1250,.8],[27.8,300,1250,.8],[27.9,380,1180,1.5],[33.2,380,1180,1.5],[33.8,150,1230,1.2],[39.6,150,1230,1.2],[40.2,800,1250,.62],[57.4,800,1250,.62],
 [58.3,800,1250,.56],[89.5,800,1250,.56],[89.9,1000,1250,.55],[93,1000,1250,.58],[100,1000,1250,.6]];
function cam(t:number){
  let i=0;while(i<CAM.length-2&&t>=CAM[i+1][0])i++;
  const a=CAM[i],b=CAM[Math.min(i+1,CAM.length-1)];
  const u=b[0]===a[0]?1:eio((t-a[0])/(b[0]-a[0]));
  return {x:lerp(a[1],b[1],u)+Math.sin(t*.6)*6,y:lerp(a[2],b[2],u)+Math.cos(t*.5)*5,z:lerp(a[3],b[3],u)*(1+Math.sin(t*.4)*.006)};
}
const fig=(x:number,y:number,k:string,t:number,i:number,o:any={})=>{
  const bob=Math.sin(t*1.7+i)*2.5;
  const g=person(0,0,k,{tag:false,look:o.look??0,...o});
  return `<g transform="translate(${x} ${y+bob}) scale(${S})">${g}</g>`;};
function sky(t:number){
  let s=`<defs><linearGradient id="sk" gradientUnits="userSpaceOnUse" x1="0" y1="-1200" x2="0" y2="1700"><stop offset="0" stop-color="#4fa6f2"/><stop offset=".6" stop-color="#9ad3ff"/><stop offset="1" stop-color="#e8f6ff"/></linearGradient><radialGradient id="sun"><stop offset="0" stop-color="#fff7c2" stop-opacity="1"/><stop offset="1" stop-color="#fff7c2" stop-opacity="0"/></radialGradient></defs>`;
  s+=`<rect x="-4000" y="-3000" width="12000" height="5200" fill="url(#sk)"/><circle cx="1700" cy="200" r="420" fill="url(#sun)"/><circle cx="1700" cy="200" r="96" fill="#fff6b0"/>`;
  for(let i=0;i<7;i++){const x=((i*620+t*18)%4200)-900,y=-200+(i*137%500);s+=`<g opacity=".92"><ellipse cx="${x}" cy="${y}" rx="190" ry="52" fill="#fff"/><ellipse cx="${x+90}" cy="${y-34}" rx="120" ry="48" fill="#fff"/><ellipse cx="${x-90}" cy="${y-20}" rx="100" ry="40" fill="#fff"/></g>`}
  return s;}
function far(){
  let s=`<path d="M-1500 1250 L-900 760 L-500 1050 L-100 640 L400 1100 L900 780 L1400 1120 L1900 700 L2500 1150 L3200 820 L3600 1250 Z" fill="#8fb4d6"/>`;
  s+=`<path d="M-1500 1300 L-1000 1000 L-600 1200 L-200 960 L300 1230 L800 1000 L1300 1240 L1800 980 L2400 1250 L3100 1010 L3600 1300 Z" fill="#6f9fc2"/>`;
  return s;}
function mid(){
  let s=`<path d="M-1500 1400 Q-600 1150 200 1350 T1900 1330 T3600 1380 V1700 H-1500Z" fill="#4f9a6a"/>`;
  for(let i=0;i<26;i++){const x=-1400+i*190,h=120+(i*53%90);s+=`<g transform="translate(${x} 1360)"><path d="M0 0 L-46 0 L0 ${-h} L46 0Z" fill="#2f7a52"/></g>`}
  return s;}
function world(t:number,bridgeP:number){
  let s='';
  // Wasser tief unten
  s+=`<rect x="440" y="2150" width="1140" height="1000" fill="#2b86c9"/>`;
  for(let i=0;i<14;i++){const y=2200+i*46;s+=`<path d="M440 ${y} q40 -16 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0" transform="translate(${(t*(60+i*8))%160-160} 0)" stroke="#d7f1ff" stroke-width="5" fill="none" opacity=".55"/>`}
  // linke Klippe
  s+=`<path d="M-2200 ${TOP} H500 Q520 ${TOP+40} 480 ${TOP+120} L540 ${TOP+420} L470 ${TOP+800} L520 ${TOP+1200} V3200 H-2200Z" fill="#8a6a4a" stroke="${N}" stroke-width="8"/>`;
  s+=`<path d="M-2200 ${TOP} H505 q8 20 4 44 H-2200Z" fill="#6fb35a" stroke="${N}" stroke-width="8"/>`;
  for(let i=0;i<10;i++)s+=`<path d="M${-60+i*-190} ${TOP+190+(i%3)*160} h120" stroke="#6b4f36" stroke-width="10" stroke-linecap="round"/>`;
  // rechte Klippe
  s+=`<path d="M1500 ${TOP-24} H3400 V3200 H1480 L1540 ${TOP+1200} L1470 ${TOP+800} L1530 ${TOP+420} L1480 ${TOP+120} Q1470 ${TOP+40} 1500 ${TOP-24}Z" fill="#8a6a4a" stroke="${N}" stroke-width="8"/>`;
  s+=`<path d="M1494 ${TOP-24} H3400 v-30 H1494Z" fill="#6fb35a" stroke="${N}" stroke-width="8"/>`;
  for(let i=0;i<10;i++)s+=`<path d="M${1700+i*190} ${TOP+190+(i%3)*160} h120" stroke="#6b4f36" stroke-width="10" stroke-linecap="round"/>`;
  // Dorf
  for(let k=0;k<4;k++){const x=-1500+k*330;const c=['#e4572e','#2a9d8f','#d89a3a','#b05a8c'][k];
    s+=`<g transform="translate(${x} ${TOP})"><rect x="-110" y="-170" width="220" height="170" fill="#f3ead8" stroke="${N}" stroke-width="7"/><path d="M-135 -170 L0 -290 L135 -170Z" fill="${c}" stroke="${N}" stroke-width="7"/><rect x="-24" y="-96" width="48" height="96" fill="#7a5238" stroke="${N}" stroke-width="5"/><rect x="50" y="-130" width="40" height="40" fill="#bfe6ff" stroke="${N}" stroke-width="5"/></g>`}
  s+=`<g transform="translate(-100 ${TOP})"><rect x="-8" y="-200" width="16" height="200" fill="#6b4f36" stroke="${N}" stroke-width="5"/><rect x="-100" y="-260" width="200" height="70" rx="10" fill="#d89a3a" stroke="${N}" stroke-width="6"/>${txt('DORF',0,-208,48)}</g>`;
  // Brückenstummel
  s+=`<path d="M500 ${TOP+14} h110 M1390 ${TOP-10} h110" stroke="#6b4f36" stroke-width="18" stroke-linecap="round"/>`;
  s+=`<path d="M600 ${TOP+14} l12 90 M1400 ${TOP-10} l-10 80" stroke="#6b4f36" stroke-width="8"/>`;
  // Brücke (Ende)
  if(bridgeP>0){const x2=lerp(500,1500,bridgeP);s+=`<path d="M500 ${TOP+10} L${x2} ${TOP-8}" stroke="${N}" stroke-width="34" stroke-linecap="round"/><path d="M500 ${TOP+10} L${x2} ${TOP-8}" stroke="#c98d4a" stroke-width="22" stroke-linecap="round"/>`;
    for(let i=0;i<=Math.floor(bridgeP*20);i++){const x=500+i*50;s+=`<path d="M${x} ${TOP-8} v-4" stroke="${N}" stroke-width="3"/><path d="M${x} ${TOP+14} v34" stroke="${N}" stroke-width="5"/>`}
    s+=`<path d="M500 ${TOP-70} L${x2} ${TOP-80}" stroke="${N}" stroke-width="10" stroke-linecap="round"/>`}
  // Baum
  s+=`<g transform="translate(1590 ${TOP-24})"><rect x="-24" y="-260" width="48" height="260" fill="#7a5238" stroke="${N}" stroke-width="7"/>`;
  [[0,-330,150],[-100,-280,110],[100,-290,115],[-40,-420,100],[60,-400,95]].forEach(([x,y,r]:any,i)=>{s+=`<circle cx="${x+Math.sin(t*1.2+i)*3}" cy="${y}" r="${r}" fill="${i%2?'#3a9a5b':'#2f8a50'}" stroke="${N}" stroke-width="7"/>`});
  s+=`</g>`;
  return s;}
function people(t:number){
  let s='';
  const nerv=t>33.8&&t<40;
  s+=fig(380,TOP,'zeynep',t,1,{look:12});
  s+=fig(110+(nerv?Math.sin(t*9)*3:0),TOP,'dragan',t,2,{look:10,shifty:nerv,sad:nerv});
  return s;}
const qm=(x:number,y:number,t:number,p:number)=>`<g transform="translate(${x} ${y+Math.sin(t*5)*8}) scale(${p})" opacity="${cl(p*2)}"><circle r="44" fill="${Y}" stroke="${N}" stroke-width="7"/>${txt('?',0,24,66)}</g>`;
function worldOverlay(t:number){
  let s='';
  if(t>=13.4&&t<14.7)s+=qm(380,TOP-440,t,PB(t,13.4,.3));
  if(t>=27.9&&t<33.3){const p=PB(t,27.9,.4);s+=`<g transform="translate(470 ${TOP-190}) rotate(${Math.sin(t*2)*6}) scale(${p})"><rect x="-44" y="-44" width="88" height="88" fill="#f3ead8" stroke="${N}" stroke-width="7"/><path d="M-44 -44 L44 44" stroke="${N}" stroke-width="3" stroke-dasharray="8 8" opacity=".5"/></g>`}
  if(t>=40.2&&t<45)s+=qm(380,TOP-440,t,PB(t,40.2,.3));
  return s;}
// ---------- Karte (Bildschirm) ----------
const ease2=(a:number,b:number,t:number)=>eio((t-a)/(b-a));
function mapPanel(t:number){
  if(t<58.2||t>89.7)return null;
  const p=PB(t,58.2,.5), out=1-cl((t-89.3)/.4);
  const w=300, PX=60, farY=-150, nearY=150;
  // Z-Position
  let zx=-300, ph=1;
  if(t<66.4){zx=lerp(-300,PX,ease2(58.4,66.2,t))}
  else if(t<72.4){zx=PX}
  else {zx=PX+300*ease2(72.5,78.1,t)}
  const dd=zx-PX; const tx=PX, ty=farY-40;
  const toT={x:tx-zx,y:farY-nearY};
  const L=Math.hypot(toT.x,toT.y); const ang=Math.round(Math.atan2(w,Math.abs(dd))*180/Math.PI);
  const aligned1=t>=63.9&&t<67.2, aligned3=t>=78.0;
  let g='';
  g+=`<rect x="-470" y="-560" width="940" height="1120" rx="40" fill="#f3ead8" stroke="${N}" stroke-width="10"/>`;
  g+=`<g clip-path="url(#pc)">`;
  g+=`<rect x="-470" y="-560" width="940" height="410" fill="#9bd18a"/><rect x="-470" y="${farY}" width="940" height="300" fill="#6bb7e8"/><rect x="-470" y="${nearY}" width="940" height="410" fill="#9bd18a"/>`;
  for(let i=0;i<8;i++)g+=`<path d="M-470 ${farY+20+i*36} q50 -14 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0" transform="translate(${(t*(40+i*6))%200-200} 0)" stroke="#e9f7ff" stroke-width="4" fill="none" opacity=".7"/>`;
  g+=`<path d="M-470 ${farY} H470 M-470 ${nearY} H470" stroke="${N}" stroke-width="7"/>`;
  // Baum
  g+=`<g transform="translate(${tx} ${farY-46})"><circle r="52" fill="#2f8a50" stroke="${N}" stroke-width="7"/><circle r="22" cx="-10" cy="-8" fill="#3fae68"/></g>`;
  // Dreieck (Phase 4)
  if(t>=78.85){const a=cl((t-78.85)/.6);g+=`<path d="M${PX} ${nearY} L${PX+300} ${nearY} L${PX} ${farY}Z" fill="${Y}" opacity="${.45*a}"/>`}
  // Blicklinie
  g+=`<path d="M${zx} ${nearY} L${tx} ${farY-10}" stroke="${N}" stroke-width="12" stroke-linecap="round" opacity=".5"/><path d="M${zx} ${nearY} L${tx} ${farY-10}" stroke="${aligned3||aligned1?G:R}" stroke-width="7" stroke-linecap="round" stroke-dasharray="20 14" stroke-dashoffset="${-t*40}"/>`;
  // Schritte
  if(t>=72.5){const n=Math.floor((zx-PX)/30);for(let i=1;i<=n;i++)g+=`<ellipse cx="${PX+i*30}" cy="${nearY+34}" rx="9" ry="5" fill="${N}" opacity=".5"/>`}
  // Tuch-Ecke (Phase 1)
  if(t>=58.4&&t<67.2){g+=`<path d="M${zx+90} ${nearY} H${zx} V${nearY-90}" stroke="${N}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${zx+90} ${nearY} H${zx} V${nearY-90}" stroke="${aligned1?G:Y}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    if(aligned1)g+=`<rect x="${zx}" y="${nearY-34}" width="34" height="34" fill="none" stroke="${G}" stroke-width="7"/>`}
  // Tuch falten (Phase 2)
  if(t>=67&&t<72.5){const f=ease2(67.1,70,t);const cx=-300,cy=330;
    g+=`<g transform="translate(${cx} ${cy})"><rect x="-70" y="-70" width="140" height="140" fill="#f3ead8" stroke="${N}" stroke-width="7" opacity="${1-f}"/><path d="M-70 -70 H${lerp(70,-70,f)} L${lerp(70,-70,f)} ${lerp(70,-70,f)} L-70 70Z" fill="${Y}" stroke="${N}" stroke-width="7"/>`;
    g+=`<path d="M-70 70 H70 L-70 -70Z" fill="${Y}" stroke="${N}" stroke-width="7" opacity="${f}"/>${f>.6?txt('45°',-20,46,50):''}</g>`}
  // Winkelbogen Phase 3
  if(t>=72.4&&dd>6){const r=90;const a2=Math.atan2(farY-nearY,tx-zx);const x1=zx-r,y1=nearY;const x2=zx+Math.cos(a2)*r,y2=nearY+Math.sin(a2)*r;
    g+=`<path d="M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}" fill="none" stroke="${N}" stroke-width="10"/><path d="M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}" fill="none" stroke="${aligned3?G:Y}" stroke-width="6"/>`;
    g+=`<g transform="translate(${zx-135} ${nearY-70})"><rect x="-64" y="-34" width="128" height="62" rx="14" fill="${aligned3?G:C}" stroke="${N}" stroke-width="6"/>${txt(ang+'°',0,16,48,aligned3?W:N)}</g>`}
  // Beine & Marken (Phase 4)
  if(t>=78.85){const a=cl((t-79.4)/.4);
    g+=`<rect x="${PX}" y="${nearY-34}" width="34" height="34" fill="none" stroke="${N}" stroke-width="6" opacity="${a}"/>`;
    if(t>=83.63){const b=PB(t,83.63,.4);const pulse=t>=85.64?1+.06*Math.sin((t-85.64)*8):1;
      for(let k=0;k<2;k++){g+=`<path d="M${PX-14+k*10} ${(nearY+farY)/2-18} v36" stroke="${R}" stroke-width="8" stroke-linecap="round" opacity="${cl(b)}"/><path d="M${PX+150-8+k*10} ${nearY+20} v-0" stroke="none"/>`;
        g+=`<path d="M${PX+150-5+k*12} ${nearY-38} v36" stroke="${R}" stroke-width="8" stroke-linecap="round" opacity="${cl(b)}"/>`}}
    if(t>=85.64){const b=PB(t,85.64,.4);g+=`<g transform="translate(${PX-110} ${(nearY+farY)/2}) scale(${b})"><rect x="-90" y="-34" width="180" height="64" rx="14" fill="${G}" stroke="${N}" stroke-width="6"/>${txt('BREITE',0,16,44,W)}</g><g transform="translate(${PX+150} ${nearY+88}) scale(${b})"><rect x="-80" y="-34" width="160" height="64" rx="14" fill="${G}" stroke="${N}" stroke-width="6"/>${txt('WEG',0,16,44,W)}</g>`}}
  // Zeynep-Punkt
  g+=`<g transform="translate(${zx} ${nearY})"><circle r="26" fill="${Y}" stroke="${N}" stroke-width="7"/>${txt('Z',0,10,30)}</g>`;
  g+=`</g>`;
  return {p,out,svg:g};}
const CARDS:Card[]=[
 {a:.0,b:.8,lines:['2 TAGE','NOCH'],y:300,bg:R,fg:W,rot:-2},
 {a:.89,b:3.45,lines:['DORF FÜR IMMER','ABGESCHNITTEN'],y:300,size:70},
 {a:4.0,b:5.7,lines:['NUR EINE','BRÜCKE'],y:300},
 {a:5.72,b:6.75,lines:['DAS VERRÜCKTE:'],y:300,bg:Y,size:72},
 {a:6.83,b:11.2,lines:['BREITE KENNEN,','OHNE HINÜBER'],y:300,size:68},
 {a:11.72,b:13.35,lines:['KEIN','MESSGERÄT'],y:300,bg:R,fg:W,rot:-2},
 {a:13.43,b:14.7,lines:['WIE?'],y:300,bg:Y},
 {a:16.47,b:18.3,lines:['ZEYNEP','AN DER KLIPPE'],y:300,size:72},
 {a:18.42,b:20.95,lines:['EIN BAUM','DRÜBEN'],y:300},
 {a:21.06,b:24.9,lines:['ZU BREIT ZUM','DURCHWATEN'],y:300,size:72},
 {a:25.03,b:27.8,lines:['UFER:','GERADE WEG'],y:300},
 {a:27.93,b:31.6,lines:['1 TUCH','+ SCHRITTE'],y:300},
 {a:31.68,b:33.3,lines:['MEHR NICHT'],y:300,bg:R,fg:W,rot:2},
 {a:33.82,b:35.4,lines:['BÜRGERMEISTER','NERVÖS'],y:300,size:66},
 {a:35.55,b:37.6,lines:['OHNE BREITE','KEINE BRÜCKE'],y:300,bg:R,fg:W,size:70},
 {a:37.73,b:39.7,lines:['DIE ZEIT','LÄUFT'],y:300},
 {a:40.22,b:41.3,lines:['WIE BREIT?'],y:300,bg:Y},
 {a:41.4,b:44.75,lines:['"GEHT NICHT!"'],y:300},
 {a:45.3,b:51.1,lines:['ANTWORT IN','DIE KOMMENTARE'],y:300,size:72},
 {a:58.17,b:63.9,lines:['ECKE ANS UFER'],y:300,size:66},
 {a:63.98,b:66.5,lines:['PUNKT DIREKT','GEGENÜBER'],y:300,size:70,bg:G,fg:W},
 {a:67.02,b:69.1,lines:['TUCH FALTEN'],y:300},
 {a:69.16,b:72.3,lines:['45°'],y:300,bg:Y,size:110},
 {a:72.41,b:78.3,lines:['ENTLANG GEHEN','BAUM PEILEN'],y:300,size:70},
 {a:78.85,b:83.6,lines:['RECHTER WINKEL','+ 45°'],y:300,size:70},
 {a:83.63,b:85.55,lines:['2 SEITEN','GLEICH LANG'],y:300,bg:G,fg:W},
 {a:85.64,b:89.55,lines:['WEG = BREITE'],y:300,bg:G,fg:W,size:80},
 {a:89.67,b:93.0,lines:['BRÜCKE KANN','GEBAUT WERDEN'],y:300,bg:G,fg:W,size:70},
 {a:93.45,b:94.35,lines:['WUSSTEST','DU ES?'],y:300,bg:Y},
 {a:94.45,b:100,lines:['FOLGE','KNOBELZEIT'],y:300,bg:Y},
];
const CD:[number,string][]=[[51.52,'5'],[52.3,'4'],[53.32,'3'],[54.37,'2'],[55.31,'1']];
function countdown(t:number){
  if(t<51.4||t>56.9)return null;
  let k=0;CD.forEach(([a],i)=>{if(t>=a)k=i});
  const a=CD[k][0],b=k<4?CD[k+1][0]:56.8;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
  return <g transform={`translate(540 760) scale(${p*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{CD[k][1]}</text></g>}
function stamp(t:number){
  const a=57.47,b=58.17;if(t<a||t>b)return null;const p=PB(t,a,.35);const out=1-cl((t-(b-.2))/.2);
  return <g transform={`translate(540 760) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={120} fill={G} textAnchor="middle">{'LÖSUNG'}</text></g>}

export const Fluss: React.FC = () => {
  const f=useCurrentFrame();const t=f/30;const c=cam(t);
  const tr=(p:number)=>`translate(${540-c.x*c.z*p} ${960-c.y*c.z}) scale(${c.z})`;
  const bridgeP=cl((t-89.8)/2.4);
  const mp:any=mapPanel(t);
  return <AbsoluteFill style={{background:N}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute',left:0,top:0}}>
      <defs><radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".6" stopColor="#000" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".45"/></radialGradient><clipPath id="pc"><rect x="-470" y="-560" width="940" height="1120" rx="40"/></clipPath></defs>
      <g transform={tr(.25)} dangerouslySetInnerHTML={{__html:sky(t)}}/>
      <g transform={tr(.5)} dangerouslySetInnerHTML={{__html:far()}}/>
      <g transform={tr(.8)} dangerouslySetInnerHTML={{__html:mid()}}/>
      <g transform={tr(1)}><g dangerouslySetInnerHTML={{__html:world(t,bridgeP)+people(t)+worldOverlay(t)}}/></g>
      <rect width={1080} height={1920} fill="url(#vig)"/>
      {mp&&<g transform={`translate(540 1130) scale(${mp.p*.92})`} opacity={mp.out} dangerouslySetInnerHTML={{__html:mp.svg}}/>}
      {CARDS.map(cd=>cardSvg(t,cd))}
      {countdown(t)}{stamp(t)}
    </svg>
  </AbsoluteFill>;
};
