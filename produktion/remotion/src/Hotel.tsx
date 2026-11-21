import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,W,cl,eio,lerp,P,PB,txt,FONT,cardSvg} from './Hut';
import type {Card} from './Hut';
// eslint-disable-next-line
const {person, PPL} = require('./figs.js');
const FLOOR=1500, S=0.8, RT=1030;           // Boden, Zimmerdecke
const X=(n:number)=>200+(n-1)*280;           // Zimmermitte
const KEYS=['hans','mia','luigi','zeynep','tom','greta','mehmet','jule','lars','mohammed','peter','lea','dragan','igor','ali','anna'];
const KENJI='kemal', NADIA='ayse';
const NR=18;

// ---------- Kamera ----------
const CAM:[number,number,number,number][]=[
 [0,900,1130,0.72],[2.2,700,1150,0.77],[5.2,560,1150,0.83],[5.9,-560,1130,0.95],[12.0,-560,1130,0.95],[12.5,300,1150,0.86],[17.0,300,1150,0.86],
 [17.9,500,1140,0.91],[22.4,1150,1140,0.91],[23.9,800,1150,0.83],[27.4,800,1150,0.83],
 [28.0,-640,1140,1.00],[36.0,-640,1140,1.00],[36.6,500,1150,0.83],[50.5,520,1150,0.83],
 [51.3,520,1150,0.88],[55.0,520,1150,0.91],[60.5,900,1150,0.88],[62.6,900,1150,0.88],[63.2,500,1190,1.10],[66.8,300,1140,1.05],[69.9,150,1150,1.30],
 [70.5,-400,1180,0.86],[75.9,-100,1150,0.83],[76.0,700,1150,0.83],[85.0,900,1150,0.80],[85.6,700,1150,0.83],[96,700,1150,0.83]];
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

// ---------- Hintergrund ----------
function bg(t:number){
  let s=`<defs><linearGradient id="sk" gradientUnits="userSpaceOnUse" x1="0" y1="-1200" x2="0" y2="1500"><stop offset="0" stop-color="#071a2b"/><stop offset=".55" stop-color="#0f3a4d"/><stop offset=".9" stop-color="#1c5a63"/><stop offset="1" stop-color="#2b7a78"/></linearGradient></defs>`;
  s+=`<rect x="-4000" y="-3000" width="12000" height="4600" fill="url(#sk)"/>`;
  for(let i=0;i<70;i++){const x=((i*397)%5000)-1500,y=-1500+((i*211)%2300);s+=`<circle cx="${x}" cy="${y}" r="${2+(i%3)}" fill="#fff" opacity="${.3+.3*Math.sin(t*2+i)}"/>`}
  return s;}
function ground(){
  let s=`<rect x="-4000" y="${FLOOR}" width="12000" height="1800" fill="#16232b"/><rect x="-4000" y="${FLOOR}" width="12000" height="14" fill="#2b4450"/>`;
  for(let i=-4;i<30;i++)s+=`<path d="M${i*280} ${FLOOR+40} L${i*280-110} ${FLOOR+700}" stroke="#223540" stroke-width="5"/>`;
  s+=`<rect x="-4000" y="${FLOOR+14}" width="12000" height="260" fill="#9be7ff" opacity=".05"/>`;
  return s;}
function building(t:number,lit:(n:number)=>number){
  let s=`<rect x="-1100" y="${RT-90}" width="9000" height="${FLOOR-RT+90}" fill="#13303e" stroke="${N}" stroke-width="8"/>`;
  s+=`<rect x="-1100" y="${RT-90}" width="9000" height="70" fill="#0d2230"/>`;
  // Rezeption
  s+=`<rect x="-1000" y="${RT}" width="1060" height="${FLOOR-RT}" fill="#3a2f2a"/><rect x="-1000" y="${RT}" width="1060" height="${FLOOR-RT}" fill="#ffb55e" opacity=".16"/>`;
  s+=`<rect x="-1000" y="${FLOOR-70}" width="1060" height="70" fill="#5a3a2a"/>`;
  // Eingang
  s+=`<rect x="-1010" y="${RT+40}" width="40" height="${FLOOR-RT-40}" fill="#9be7ff" opacity=".25" stroke="${N}" stroke-width="6"/>`;
  // Schild
  const glow=.75+.25*Math.sin(t*9)*(Math.sin(t*.7)>.8?1:.2);
  s+=`<g transform="translate(-540 ${RT-52})"><rect x="-290" y="-44" width="580" height="88" rx="22" fill="${N}" stroke="#ff7ab8" stroke-width="7" opacity="${glow}"/>${txt('HOTEL AURORA',0,22,62,'#ffd1ea')}</g>`;
  // Rezeptionstisch
  s+=`<rect x="-650" y="${FLOOR-170}" width="340" height="170" rx="10" fill="#6b4b36" stroke="${N}" stroke-width="7"/><rect x="-660" y="${FLOOR-190}" width="360" height="30" rx="8" fill="#8d6447" stroke="${N}" stroke-width="7"/>`;
  s+=`<g transform="translate(-380 ${FLOOR-260})"><rect width="64" height="64" rx="10" fill="#e8f7ff" stroke="${N}" stroke-width="6"/><path d="M14 40 l12 12 l24 -30" stroke="${G}" stroke-width="8" fill="none"/></g>`;
  // Zimmer
  for(let n=1;n<=NR;n++){
    const x0=X(n)-140, l=lit(n);
    s+=`<rect x="${x0}" y="${RT}" width="280" height="${FLOOR-RT}" fill="${n%2?'#3d3550':'#32475c'}" stroke="${N}" stroke-width="6"/>`;
    s+=`<rect x="${x0}" y="${RT}" width="280" height="${FLOOR-RT}" fill="${l>0?'#58ff9a':'#ffc66e'}" opacity="${.14+.16*Math.abs(l)}"/>`;
    s+=`<rect x="${x0+170}" y="${FLOOR-130}" width="104" height="130" rx="8" fill="#e3e8f0" stroke="${N}" stroke-width="6"/><rect x="${x0+170}" y="${FLOOR-130}" width="104" height="52" rx="8" fill="#7ba7d9" stroke="${N}" stroke-width="6"/>`;
    s+=`<rect x="${x0+22}" y="${RT+70}" width="90" height="100" rx="8" fill="#0e2a3c" stroke="${N}" stroke-width="6"/><circle cx="${x0+50}" cy="${RT+100}" r="4" fill="#fff" opacity=".6"/>`;
    s+=`<g transform="translate(${X(n)} ${RT+34})"><rect x="-44" y="-26" width="88" height="52" rx="12" fill="${C}" stroke="${N}" stroke-width="6"/>${txt(String(n),0,15,44)}</g>`;
  }
  // Unendlich-Verlauf rechts
  s+=`<linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#0f3a4d" stop-opacity="0"/><stop offset="1" stop-color="#0f3a4d" stop-opacity="1"/></linearGradient>`;
  s+=`<rect x="${X(NR)-400}" y="${RT-100}" width="900" height="${FLOOR-RT+100}" fill="url(#fade)"/>`;
  s+=`<g transform="translate(${X(NR)+360} ${RT+230})">${txt('∞',0,0,300,'#ffd1ea')}</g>`;
  return s;}
function rain(t:number){
  let s='';for(let i=0;i<46;i++){const x=-1100+((i*173)%1200),y=((i*97+t*900*(1+i%3*.2))%1500)+100;s+=`<path d="M${x} ${y} l-18 60" stroke="#bfe9ff" stroke-width="4" opacity=".4"/>`}
  return s;}

// ---------- Figuren-Bewegung ----------
const s1=(g:number)=>g===1?55.5:g===2?57.9:g===3?59.2:60.5+(g-4)*.12;
const D1=.9;
function guestPos(g:number,t:number){ // Gast g wohnt in Zimmer g, dann g+1, dann 2(g+1)
  let x=X(g)-30,y=0,lk=0;
  const a=cl((t-s1(g))/D1), ea=eio(a);
  x+= (X(g+1)-X(g))*ea; if(a>0&&a<1)y-=Math.abs(Math.sin(a*Math.PI*3))*14;
  const s2=77.0+(g-1)*.28, b=cl((t-s2)/1.3), eb=eio(b);
  x+= (X(2*(g+1))-X(g+1))*eb; y-=Math.sin(b*Math.PI)*170;
  return {x,y,moving:(a>0&&a<1)||(b>0&&b<1)};
}
function kenjiPos(t:number){
  let x=-760,y=0;
  const a=cl((t-66.9)/1.7);x+=(X(1)-30+760)*eio(a);if(a>0&&a<1)y-=Math.abs(Math.sin(a*Math.PI*5))*12;
  const b=cl((t-77.0)/1.3);x+=(X(2)-X(1))*eio(b);y-=Math.sin(b*Math.PI)*170;
  return {x,y};
}
function people(t:number){
  let s='';
  const gcount=16;
  for(let g=gcount;g>=1;g--){const p=guestPos(g,t);s+=fig(p.x,FLOOR+p.y,KEYS[(g-1)%KEYS.length],t,g,{look:g%2?5:-5,sad:false})}
  const k=kenjiPos(t);const wet=t<66.9;
  s+=fig(k.x,FLOOR+k.y,KENJI,t,40,{look:6,sad:wet});
  s+=fig(-470,FLOOR-34,NADIA,t,41,{look:-6,grin:t>9&&t<12});
  // Busgäste (ungerade Zimmer)
  for(let i=0;i<4;i++){const a=83.3+i*.35;if(t>=a){const e=PB(t,a,.4);const sc=Math.max(0,e);s+=`<g transform="translate(${X(2*i+1)-30} ${FLOOR}) scale(${sc})" transform-origin="0 0">${fig(0,0,KEYS[(i*3+5)%KEYS.length],t,50+i,{look:4})}</g>`}}
  return s;}
function busSvg(t:number){
  if(t<70.4||t>85.4)return '';
  const arrive=eio((t-70.5)/3.4), leave=eio((t-84.2)/1.2);
  const x=-2300+arrive*1500-leave*1800;
  let s=`<g transform="translate(${x} ${FLOOR+110})"><rect x="-480" y="-330" width="960" height="270" rx="48" fill="${Y}" stroke="${N}" stroke-width="9"/>`;
  for(let i=0;i<7;i++)s+=`<rect x="${-440+i*128}" y="-290" width="104" height="104" rx="16" fill="#d7f2ff" stroke="${N}" stroke-width="6"/><circle cx="${-388+i*128}" cy="-244" r="26" fill="${i%2?'#e8b48a':'#c98d68'}" stroke="${N}" stroke-width="5"/>`;
  s+=`<rect x="-480" y="-150" width="960" height="22" fill="${N}" opacity=".25"/><g transform="translate(0 -92)">${txt('∞ GÄSTE',0,22,66)}</g>`;
  for(const wx of [-320,320])s+=`<circle cx="${wx}" cy="-40" r="64" fill="#222" stroke="${N}" stroke-width="8"/><circle cx="${wx}" cy="-40" r="26" fill="#aaa"/>`;
  s+=`<circle cx="470" cy="-200" r="22" fill="#fff6b0"/></g>`;
  return s;}

// ---------- Overlays (Welt) ----------
const arrow=(x1:number,x2:number,y:number,p:number,col=Y,lbl='')=>{const x=lerp(x1,x2,p);return `<path d="M${x1} ${y} H${x}" stroke="${N}" stroke-width="22" stroke-linecap="round"/><path d="M${x1} ${y} H${x}" stroke="${col}" stroke-width="12" stroke-linecap="round"/><path d="M${x-28} ${y-26} L${x+6} ${y} L${x-28} ${y+26}" stroke="${N}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x-28} ${y-26} L${x+6} ${y} L${x-28} ${y+26}" stroke="${col}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${lbl?txt(lbl,(x1+x2)/2,y-34,46,'#fff'):''}`};
const vollSign=(n:number,p:number)=>`<g transform="translate(${X(n)} ${RT+130}) scale(${p}) rotate(${n%2?-4:4})" opacity="${cl(p*2)}"><rect x="-76" y="-34" width="152" height="68" rx="14" fill="${R}" stroke="${N}" stroke-width="7"/>${txt('VOLL',0,18,52,W)}</g>`;
function worldOverlay(t:number){
  let s='';
  // VOLL-Schilder
  if(t>=24.0&&t<28)for(let n=1;n<=NR;n++){const a=24.0+Math.min(n,8)*.14;if(t>=a)s+=vollSign(n,PB(t,a,.3))}
  if(t>=38.1&&t<42)for(let n=1;n<=9;n++)s+=vollSign(n,PB(t,38.1,.3));
  // Fragezeichen über Kenji
  if(t>=36.6&&t<42.5)s+=`<g transform="translate(-760 ${FLOOR-420+Math.sin(t*5)*8}) scale(${PB(t,36.6,.3)})"><circle r="44" fill="${Y}" stroke="${N}" stroke-width="7"/>${txt('?',0,24,66)}</g>`;
  // Durchsage Lautsprecher
  if(t>=51.6&&t<55.2){const p=PB(t,51.6,.4);s+=`<g transform="translate(-380 ${RT+150}) scale(${p})"><path d="M-30 -30 L30 -60 V60 L-30 30 Z" fill="${Y}" stroke="${N}" stroke-width="7"/>${[1,2,3].map(i=>`<path d="M${50+i*30} ${-i*22} q${24} ${i*22} 0 ${i*44}" stroke="${Y}" stroke-width="8" fill="none" opacity="${.9-i*.2}"/>`).join('')}</g>`}
  // Pfeile +1
  const arr=[[55.5,1],[57.9,2],[59.2,3]];
  arr.forEach(([a,n]:any)=>{if(t>=a&&t<63)s+=arrow(X(n)-30,X(n+1)-30,RT-40+ (n%2)*-0,P(t,a,.5),Y,'')});
  if(t>=60.5&&t<63)for(let n=4;n<=9;n++){const a=60.5+(n-4)*.12;if(t>=a)s+=arrow(X(n)-30,X(n+1)-30,RT-40,P(t,a,.4),Y,'')}
  if(t>=60.5&&t<63)s+=`<g transform="translate(${X(11)} ${RT-120})">${txt('+1 · +1 · +1 …',0,0,70,'#fff')}</g>`;
  // Zimmer 1 frei
  if(t>=56.5&&t<66.9){const p=PB(t,56.5,.4);s+=`<g transform="translate(${X(1)} ${RT-140}) scale(${p})"><rect x="-120" y="-44" width="240" height="88" rx="20" fill="${G}" stroke="${N}" stroke-width="8"/>${txt('FREI!',0,24,66,W)}</g>`}
  // Kenji schläft
  if(t>=68.8&&t<77){for(let i=0;i<3;i++){const e=(t-68.8-i*.5)%1.5;s+=`<g transform="translate(${X(1)+30+e*40} ${FLOOR-380-e*80}) scale(${.6+i*.2})" opacity="${cl(1-e/1.5)}">${txt('Z',0,0,70,'#fff')}</g>`}}
  // Verdopplungs-Bögen
  if(t>=77&&t<83.3){for(let n=1;n<=4;n++){const a=77.0+(n-1)*.28;if(t>=a){const x1=X(n+1)-30,x2=X(2*(n+1))-30,xm=(x1+x2)/2,p=P(t,a,.5);s+=`<path d="M${x1} ${RT-50} Q${xm} ${RT-380} ${x2} ${RT-50}" stroke="${N}" stroke-width="16" fill="none" opacity="${.5*p}" stroke-dasharray="${900*p} 900"/><path d="M${x1} ${RT-50} Q${xm} ${RT-380} ${x2} ${RT-50}" stroke="${Y}" stroke-width="8" fill="none" stroke-dasharray="${900*p} 900"/>`}}}
  if(t>=81.25&&t<84){for(let n=1;n<=15;n+=2)s+=`<g transform="translate(${X(n)} ${RT+130})" opacity="${cl((t-81.25)*2)}"><circle r="30" fill="${G}" stroke="${N}" stroke-width="6"/><path d="M-12 2 L-3 12 L14 -10" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`}
  return s;}

// ---------- Karten ----------
const CARDS:Card[]=[
 {a:.05,b:2.15,lines:['UNENDLICH VIELE','ZIMMER'],y:300,size:76},
 {a:2.28,b:5.3,lines:['ALLE','BELEGT'],y:300,bg:R,fg:W,rot:-2},
 {a:8.95,b:11.8,lines:['ICH FINDE DIR','EIN ZIMMER'],y:300,size:72},
 {a:12.34,b:15.3,lines:['KEIN GAST','FLIEGT RAUS'],y:300,bg:Y},
 {a:15.37,b:16.6,lines:['WIE GEHT','DAS?'],y:300,bg:Y},
 {a:17.96,b:22.45,lines:['ZIMMER 1, 2, 3 …'],y:300,size:70},
 {a:22.57,b:23.9,lines:['OHNE ENDE'],y:300},
 {a:23.95,b:27.5,lines:['JEDES ZIMMER','BESETZT'],y:300,bg:R,fg:W,rot:-1},
 {a:27.99,b:31.7,lines:['KENJI','KEIN BETT'],y:300},
 {a:31.78,b:34.3,lines:['KEIN','RAUSWURF'],y:300,bg:R,fg:W,rot:-2},
 {a:34.34,b:36.5,lines:['KEIN ZIMMER','TEILEN'],y:300,bg:R,fg:W,rot:2},
 {a:36.61,b:37.9,lines:['WO SCHLÄFT','KENJI?'],y:300,bg:Y},
 {a:38.07,b:42.0,lines:['"UNMÖGLICH!"'],y:300},
 {a:42.61,b:45.9,lines:['ANTWORT IN','DIE KOMMENTARE'],y:300,size:72},
 {a:51.64,b:53.3,lines:['DURCHSAGE:'],y:300,bg:Y},
 {a:53.38,b:55.2,lines:['ALLE 1 ZIMMER','WEITER'],y:300,size:76},
 {a:60.48,b:63.1,lines:['BIS INS','UNENDLICHE'],y:300},
 {a:63.25,b:66.8,lines:['JEDE ZAHL HAT','EINE NÄCHSTE'],y:300,bg:G,fg:W},
 {a:66.9,b:69.9,lines:['ZIMMER 1','IST FREI'],y:300,bg:G,fg:W,rot:2},
 {a:70.59,b:73.5,lines:['DER BUS:','∞ GÄSTE'],y:300,bg:Y},
 {a:73.63,b:75.9,lines:['AUCH DAFÜR','GIBT ES EINE LÖSUNG'],y:300,size:64},
 {a:75.96,b:79.0,lines:['ZIMMER n','→ ZIMMER 2n'],y:300},
 {a:79.02,b:81.2,lines:['ALLE ALTEN:','GERADE ZAHLEN'],y:300,size:70},
 {a:81.25,b:83.2,lines:['UNGERADE','= FREI'],y:300,bg:G,fg:W},
 {a:83.27,b:85.0,lines:['PLATZ FÜR','∞ GÄSTE'],y:300,bg:G,fg:W},
 {a:85.58,b:86.55,lines:['WUSSTEST','DU ES?'],y:300,bg:Y},
 {a:86.62,b:96,lines:['FOLGE','KNOBELZEIT'],y:300,bg:Y},
];
const CD:[number,string][]=[[46.07,'5'],[47.05,'4'],[47.95,'3'],[48.93,'2'],[49.6,'1']];
function countdown(t:number){
  if(t<46.0||t>50.6)return null;
  let k=0;CD.forEach(([a],i)=>{if(t>=a)k=i});
  const a=CD[k][0],b=k<4?CD[k+1][0]:50.5;const u=cl((t-a)/(b-a));const p=PB(t,a,.3);const circ=2*Math.PI*230;
  return <g transform={`translate(540 760) scale(${p*(1+.04*Math.sin(u*Math.PI))})`}><circle r={262} fill="#000" opacity={.3} cx={8} cy={12}/><circle r={250} fill={C} stroke={N} strokeWidth={12}/><circle r={218} fill="none" stroke={R} strokeWidth={22} strokeDasharray={`${circ*(1-u)} ${circ}`} transform="rotate(-90)" strokeLinecap="round"/><text y={116} fontFamily={FONT} fontWeight={700} fontSize={330} fill={N} textAnchor="middle">{CD[k][1]}</text></g>}
function stamp(t:number){
  const a=50.87,b=51.6;if(t<a||t>b)return null;const p=PB(t,a,.35);const out=1-cl((t-(b-.2))/.2);
  return <g transform={`translate(540 760) rotate(-8) scale(${p})`} opacity={out}><rect x={-330} y={-100} width={660} height={200} rx={26} fill={C} stroke={G} strokeWidth={16}/><text y={40} fontFamily={FONT} fontWeight={700} fontSize={120} fill={G} textAnchor="middle">LÖSUNG</text></g>}

export const Hotel: React.FC = () => {
  const f=useCurrentFrame();const t=f/30;const c=cam(t);
  const tr=(p:number)=>`translate(${540-c.x*c.z*p} ${960-c.y*c.z}) scale(${c.z})`;
  const lit=(n:number)=>{ // Zimmer-Glühen
    if(t>=56.5&&t<66.9&&n===1)return 1; if(t>=81.25&&t<86&&n%2===1)return 1; return 0;};
  return <AbsoluteFill style={{background:N}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute',left:0,top:0}}>
      <defs><radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".55" stopColor="#000" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".6"/></radialGradient></defs>
      <g transform={tr(.3)} dangerouslySetInnerHTML={{__html:bg(t)}}/>
      <g transform={tr(1)}>
        <g dangerouslySetInnerHTML={{__html:ground()+building(t,lit)+people(t)+busSvg(t)+rain(t)+worldOverlay(t)}}/>
      </g>
      <rect width={1080} height={1920} fill="url(#vig)"/>
      {CARDS.map(cd=>cardSvg(t,cd))}
      {countdown(t)}{stamp(t)}
    </svg>
  </AbsoluteFill>;
};
