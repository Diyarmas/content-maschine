// Knobelzeit Buch: Figuren in Tusche/Graustufen mit gelbem Akzent
const INK='#1E1E1E', YEL='#F6C431', G1='#f2f0eb', G2='#dcd8d0', G3='#b9b4aa', G4='#8a857c', G5='#5c5852';
const SK=[ '#f3e6da','#e6d2c0','#cfb49c','#a98a72']; // Hauttoene als Grauwerte (dezent)
function L(d,w=3.2,c=INK){return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`}
function P(d,f,w=3.2){return `<path d="${d}" fill="${f}" stroke="${INK}" stroke-width="${w}" stroke-linejoin="round"/>`}
function E(cx,cy,rx,ry,f,w=3.2){return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" stroke="${INK}" stroke-width="${w}"/>`}
function hatch(x,y,w,h,op=.18){let s=`<g opacity="${op}">`;for(let i=-h;i<w;i+=7)s+=`<line x1="${x+i}" y1="${y+h}" x2="${x+i+h}" y2="${y}" stroke="${INK}" stroke-width="1.2"/>`;return s+'</g>'}
// person(o): x,y = Fusspunkt; h = Hoehe; kid; skin; hair; top; bottom; extras
function person(o){
  const x=o.x,y=o.y,H=o.h||300,sc=H/300; let s=`<g transform="translate(${x} ${y}) scale(${o.flip?-sc:sc} ${sc})">`;
  const kid=o.kid, headR=kid?44:36, hy=-H/sc+headR+4; // Kopfmitte (lokal)
  const sh=hy+headR+8, hip=kid?-120:-135, w=o.wide||(kid?40:44);
  const top=o.top||G2, bot=o.bottom||G4, sk=o.skin||SK[0];
  // Beine
  const lg=o.legs||'stand';
  s+=P(`M${-w*0.5} ${hip} L${-w*0.55} -8 L${-w*0.1} -8 L${-4} ${hip+10}Z`,bot)+P(`M${w*0.5} ${hip} L${w*0.55} -8 L${w*0.1} -8 L4 ${hip+10}Z`,bot);
  s+=P(`M${-w*0.62} -10 q-2 10 ${-14} 12 h${w*0.62} q4 -8 -2 -12Z`,o.shoe||G5)+P(`M${w*0.62} -10 q2 10 14 12 h${-w*0.62} q-4 -8 2 -12Z`,o.shoe||G5);
  // Mantel/Koerper
  if(o.coat){s+=P(`M${-w-6} ${sh+6} Q${-w-14} ${hip+10} ${-w-10} ${hip+60} L${w+10} ${hip+60} Q${w+14} ${hip+10} ${w+6} ${sh+6} Q0 ${sh-6} ${-w-6} ${sh+6}Z`,o.coat);s+=L(`M0 ${sh+4} L0 ${hip+58}`,2.2)+L(`M${-w-8} ${hip+5} L${w+8} ${hip+5}`,2.6)}
  else s+=P(`M${-w} ${sh+6} Q${-w-6} ${hip} ${-w+2} ${hip+8} L${w-2} ${hip+8} Q${w+6} ${hip} ${w} ${sh+6} Q0 ${sh-6} ${-w} ${sh+6}Z`,top);
  if(o.overall)s+=P(`M${-w*0.6} ${sh+30} h${w*1.2} v${hip-sh-14} h${-w*1.2}Z`,o.overall)+L(`M${-w*0.6} ${sh+30} L${-w*0.5} ${sh+4} M${w*0.6} ${sh+30} L${w*0.5} ${sh+4}`,2.4);
  if(o.apron)s+=P(`M${-w*0.7} ${sh+20} h${w*1.4} v${hip-sh+30} h${-w*1.4}Z`,'#ffffff')+L(`M${-w*0.7} ${sh+20} L${-w*0.4} ${sh+2} M${w*0.7} ${sh+20} L${w*0.4} ${sh+2}`,2.2);
  if(o.cardigan){s+=P(`M${-w} ${sh+6} Q${-w-6} ${hip} ${-w+2} ${hip+8} L-6 ${hip+8} L-6 ${sh+2}Z`,o.cardigan,2.6)+P(`M${w} ${sh+6} Q${w+6} ${hip} ${w-2} ${hip+8} L6 ${hip+8} L6 ${sh+2}Z`,o.cardigan,2.6)}
  if(o.brooch)s+=`<circle cx="${-w*0.45}" cy="${sh+24}" r="6" fill="${YEL}" stroke="${INK}" stroke-width="2"/>`;
  if(o.beltbag)s+=P(`M${-24} ${hip+2} h48 v20 q-24 8 -48 0Z`,G3);
  if(o.camera)s+=`<rect x="-16" y="${sh+30}" width="32" height="22" rx="4" fill="${G4}" stroke="${INK}" stroke-width="2.6"/><circle cx="0" cy="${sh+41}" r="7" fill="${G2}" stroke="${INK}" stroke-width="2"/>`+L(`M-16 ${sh+34} L${-w*0.5} ${sh+6} M16 ${sh+34} L${w*0.5} ${sh+6}`,1.6);
  if(o.vest)s+=P(`M${-w+2} ${sh+8} L-4 ${sh+50} L-4 ${hip+6} L${-w+4} ${hip+6}Z`,G4,2.6)+P(`M${w-2} ${sh+8} L4 ${sh+50} L4 ${hip+6} L${w-4} ${hip+6}Z`,G4,2.6);
  // Arme
  const arm=(side,pose)=>{const sx=side*(w+(o.coat?6:0));let d;
    if(pose==='write')d=`M${sx} ${sh+10} Q${sx+side*14} ${sh+60} ${side*12} ${sh+70}`;
    else if(pose==='hold')d=`M${sx} ${sh+10} Q${sx+side*16} ${sh+56} ${side*18} ${sh+60}`;
    else if(pose==='up')d=`M${sx} ${sh+10} Q${sx+side*30} ${sh-20} ${sx+side*26} ${sh-56}`;
    else if(pose==='point')d=`M${sx} ${sh+10} Q${sx+side*40} ${sh+20} ${sx+side*66} ${sh+6}`;
    else d=`M${sx} ${sh+10} Q${sx+side*10} ${sh+50} ${sx+side*4} ${hip+20}`;
    const end=d.split(' ').slice(-2).map(Number);
    return L(d,o.coat?16:13,INK)+L(d,o.coat?10:7,o.coat||top)+`<circle cx="${end[0]}" cy="${end[1]}" r="8.5" fill="${sk}" stroke="${INK}" stroke-width="2.6"/>`};
  s+=arm(-1,o.armL||'down')+arm(1,o.armR||'down');
  // gehaltene Objekte
  if(o.notebook){const nx=o.notebook==='L'?-12:12;s+=`<rect x="${nx-14}" y="${sh+52}" width="28" height="34" rx="3" fill="#1E1E1E" stroke="${INK}" stroke-width="2"/><rect x="${nx-14}" y="${sh+62}" width="28" height="4" fill="${YEL}"/>`}
  if(o.heft){const hx=o.heft==='L'?-10:10, side=o.heft==='L'?-1:1;s+=`<rect x="${-22}" y="${sh+56}" width="34" height="26" rx="2" fill="#fff" stroke="${INK}" stroke-width="2.2" transform="rotate(-6 0 ${sh+68})"/>`+L(`M-16 ${sh+64} h20 M-16 ${sh+70} h16`,1.2)+L(`M${side*12} ${sh+70} L${side*2} ${sh+60}`,2.6)}
  if(o.sketch)s+=`<rect x="-26" y="${sh+50}" width="40" height="30" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.4" transform="rotate(8 0 ${sh+64})"/>`;
  if(o.pretzel)s+=`<path d="M${w+18} ${sh+50} q-14 -16 0 -20 q14 4 0 20 q-14 -4 0 -20" fill="none" stroke="${G4}" stroke-width="5"/>`;
  if(o.card)s+=`<rect x="${w-6}" y="${sh+30}" width="44" height="30" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.4" transform="rotate(-10 ${w+16} ${sh+45})"/>`;
  if(o.cane)s+=L(`M${w+18} ${sh+58} L${w+22} -6`,4)+L(`M${w+18} ${sh+58} q-2 -12 -12 -10`,4);
  // Hals + Kopf
  s+=P(`M-9 ${hy+headR-6} h18 v14 h-18Z`,sk,2.6);
  if(o.hair==='long'||o.hair==='locks')s+=P(`M${-headR-4} ${hy+20} Q${-headR-12} ${hy-headR-6} 0 ${hy-headR-6} Q${headR+12} ${hy-headR-6} ${headR+4} ${hy+20} Q${headR} ${hy+52} ${headR-6} ${hy+56} L${-headR+6} ${hy+56} Q${-headR} ${hy+52} ${-headR-4} ${hy+20}Z`,o.hc||G5);
  if(o.hair==='bun')s+=E(0,hy-headR-6,16,13,o.hc||'#fff');
  s+=E(-headR+1,hy+4,7,10,sk,2.4)+E(headR-1,hy+4,7,10,sk,2.4)+E(0,hy,headR,headR+2,sk);
  s+=`<path d="M${headR*0.25} ${hy-headR*0.8} Q${headR*1.05} ${hy-headR*0.2} ${headR*0.55} ${hy+headR*0.85}" fill="none" stroke="${INK}" stroke-width="10" opacity=".07"/>`;
  // Haare vorne
  const hc=o.hc||G5;
  if(o.hair==='short')s+=P(`M${-headR-1} ${hy-4} Q${-headR} ${hy-headR-8} 0 ${hy-headR-6} Q${headR} ${hy-headR-8} ${headR+1} ${hy-4} Q${headR*0.6} ${hy-headR*0.55} ${headR*0.1} ${hy-headR*0.6} Q${-headR*0.5} ${hy-headR*0.5} ${-headR-1} ${hy-4}Z`,hc,2.6);
  if(o.hair==='locks'){[[-30,-30],[-14,-42],[4,-44],[22,-38],[34,-22],[-36,-12]].forEach(([dx,dy])=>s+=`<circle cx="${dx}" cy="${hy+dy}" r="12" fill="${hc}" stroke="${INK}" stroke-width="2.2"/>`);if(o.band)s+=L(`M${-headR+2} ${hy-24} Q0 ${hy-44} ${headR-2} ${hy-24}`,6,o.band)}
  if(o.hair==='long')s+=P(`M${-headR} ${hy-2} Q${-headR+2} ${hy-headR-6} 0 ${hy-headR-6} Q${headR-2} ${hy-headR-6} ${headR} ${hy-2} Q${headR*0.4} ${hy-headR*0.6} ${-headR} ${hy-2}Z`,hc,2.6);
  if(o.hair==='pony'){s+=P(`M${-headR} ${hy-2} Q${-headR+2} ${hy-headR-6} 0 ${hy-headR-6} Q${headR-2} ${hy-headR-6} ${headR} ${hy-2} Q0 ${hy-headR*0.55} ${-headR} ${hy-2}Z`,hc,2.6)+P(`M${headR-4} ${hy-20} q26 6 20 48 q-10 -22 -22 -30Z`,hc,2.4)}
  if(o.hair==='bun')s+=P(`M${-headR} ${hy-4} Q${-headR+2} ${hy-headR-4} 0 ${hy-headR-4} Q${headR-2} ${hy-headR-4} ${headR} ${hy-4} Q0 ${hy-headR*0.5} ${-headR} ${hy-4}Z`,o.hc||'#fff',2.6);
  if(o.hair==='hood')s+=P(`M${-headR-8} ${hy+30} Q${-headR-14} ${hy-headR-14} 0 ${hy-headR-12} Q${headR+14} ${hy-headR-14} ${headR+8} ${hy+30}`,'none',3)+P(`M${-headR} ${hy-6} Q0 ${hy-headR-14} ${headR} ${hy-6} Q${headR*0.3} ${hy-headR*0.6} ${-headR} ${hy-6}Z`,hc,2.6);
  if(o.hair==='bald')s+=L(`M${-headR+2} ${hy+6} Q${-headR-2} ${hy-18} ${-headR*0.6} ${hy-26} M${headR-2} ${hy+6} Q${headR+2} ${hy-18} ${headR*0.6} ${hy-26}`,6,hc);
  // Gesicht
  const ey=hy-2, ex=headR*0.38, mood=o.mood||'happy';
  if(o.glasses)s+=`<circle cx="${-ex}" cy="${ey}" r="11" fill="none" stroke="${INK}" stroke-width="2.6"/><circle cx="${ex}" cy="${ey}" r="11" fill="none" stroke="${INK}" stroke-width="2.6"/>`+L(`M${-ex+11} ${ey} h${2*ex-22}`,2.4);
  [-ex,ex].forEach(dx=>{s+=`<circle cx="${dx+(mood==='side'?3:0)}" cy="${ey}" r="3.6" fill="${INK}"/>`});
  if(mood==='think')s+=L(`M${-ex-8} ${ey-14} l14 -3 M${ex-6} ${ey-16} l14 3`,2.6);else s+=L(`M${-ex-8} ${ey-13} q8 -5 16 0 M${ex-8} ${ey-13} q8 -5 16 0`,2.4);
  s+=L(`M0 ${ey+4} q4 8 -2 11`,2.2,G5);
  if(o.stache)s+=P(`M-18 ${ey+20} q9 -8 18 -2 q9 -6 18 2 q-9 6 -18 1 q-9 5 -18 -1Z`,o.stache,2);
  if(o.beard)s+=P(`M${-headR+4} ${hy+4} Q${-headR+2} ${hy+headR+10} 0 ${hy+headR+12} Q${headR-2} ${hy+headR+10} ${headR-4} ${hy+4} Q${headR*0.5} ${hy+18} 0 ${hy+16} Q${-headR*0.5} ${hy+18} ${-headR+4} ${hy+4}Z`,o.beard,2.4);
  if(!o.beard){ if(mood==='caught')s+=E(0,ey+24,6,7,'#fff',2.4); else if(o.chew)s+=L(`M-10 ${ey+24} q5 4 10 0 q5 -4 10 0`,2.4); else s+=L(`M-12 ${ey+22} Q0 ${ey+31} 12 ${ey+22}`,2.6)}
  if(o.freckles)[[-ex-4,ey+12],[-ex+4,ey+14],[ex-4,ey+13],[ex+4,ey+11]].forEach(([a,b])=>s+=`<circle cx="${a}" cy="${b}" r="1.6" fill="${G4}"/>`);
  // Huete
  if(o.hat==='fedora')s+=P(`M${-headR-22} ${hy-headR*0.55} Q0 ${hy-headR*0.35} ${headR+22} ${hy-headR*0.55} Q${headR+6} ${hy-headR*0.75} ${headR-6} ${hy-headR*0.75} L${headR-10} ${hy-headR-26} Q0 ${hy-headR-16} ${-headR+10} ${hy-headR-26} L${-headR+6} ${hy-headR*0.75} Q${-headR-6} ${hy-headR*0.75} ${-headR-22} ${hy-headR*0.55}Z`,'#8f7a62',2.8)+`<rect x="${-headR+8}" y="${hy-headR*0.92}" width="${2*headR-16}" height="8" fill="${INK}"/>`;
  if(o.hat==='cap')s+=P(`M${-headR} ${hy-headR*0.5} Q${-headR} ${hy-headR-12} 0 ${hy-headR-12} Q${headR} ${hy-headR-12} ${headR} ${hy-headR*0.5}Z`,o.capc||G4,2.6)+P(`M${headR*0.2} ${hy-headR*0.55} L${headR+26} ${hy-headR*0.45} L${headR+20} ${hy-headR*0.62}Z`,o.capc||G4,2.4);
  if(o.hat==='baker')s+=P(`M${-headR+2} ${hy-headR*0.6} L${-headR+6} ${hy-headR-30} Q0 ${hy-headR-44} ${headR-6} ${hy-headR-30} L${headR-2} ${hy-headR*0.6}Z`,'#fff',2.6);
  if(o.pencilEar)s+=L(`M${headR-6} ${hy-14} L${headR+16} ${hy+10}`,5,YEL)+L(`M${headR-6} ${hy-14} L${headR+16} ${hy+10}`,1.2);
  if(o.loupe)s+=`<rect x="${ex-9}" y="${ey-11}" width="22" height="20" rx="3" fill="${G4}" stroke="${INK}" stroke-width="2.4"/><circle cx="${ex+2}" cy="${ey-1}" r="7" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="${ex}" cy="${ey-3}" r="2" fill="${G3}"/>`;
  return s+'</g>'}
// Hund
function dog(x,y,sc,o={}){let s=`<g transform="translate(${x} ${y}) scale(${sc})">`;
  s+=P(`M-60 -30 Q-62 -60 -20 -60 L40 -60 Q60 -60 60 -40 L58 -26 Q20 -20 -40 -26Z`,o.c||G4)+P(`M-50 -28 v26 h12 v-24 M40 -26 v24 h12 v-26`,o.c||G4);
  s+=E(64,-70,22,18,o.c||G4)+P(`M54 -78 q-10 22 -2 34 q10 -6 10 -30Z`,G5,2.2)+`<circle cx="70" cy="-74" r="3" fill="${INK}"/><circle cx="86" cy="-66" r="4" fill="${INK}"/>`;
  s+=L(`M-60 -40 q-18 -14 -24 -30`,4)+(o.collar?L(`M50 -58 q12 10 26 2`,6,YEL)+L(`M50 -58 q12 10 26 2`,1.4):'');return s+'</g>'}
