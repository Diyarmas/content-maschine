// Knobelzeit Buch – Figuren v2 (Mix aus Video-Look und Buch-Look)
// Grosse Koepfe, weisse Augen mit Glanzpunkt, Wangen, runde Koerper, Tusche-Linie, Graustufen + Gelb als Akzent
var INK='#1E1E1E', YEL=(typeof window!=='undefined'&&window.BW)?'#C9C5BC':'#F6C431';
var G0='#fbfaf7',G1='#f2f0eb',G2='#dcd8d0',G3='#b9b4aa',G4='#8a857c',G5='#5c5852',G6='#3a3833';
if(!window.BW){G0='#FFFDF7';G1='#FBF0D4';G2='#D4E6F1';G3='#EAB873';G4='#BD8A5E';G5='#7C5A44';G6='#3B3330'}
var DBOT=window.BW?G6:'#3A4766',DSHOE=window.BW?G6:'#4A3426';
var SKN={a:'#f7eadf',b:'#ecd6c2',c:'#d6b89e',d:'#b8957c',e:'#97745e'};
function L(d,w,c){return `<path d="${d}" fill="none" stroke="${c||INK}" stroke-width="${w||3.2}" stroke-linecap="round" stroke-linejoin="round"/>`}
function P(d,f,w){return `<path d="${d}" fill="${f}" stroke="${INK}" stroke-width="${w||3.2}" stroke-linejoin="round"/>`}
function E(cx,cy,rx,ry,f,w){return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" stroke="${INK}" stroke-width="${w||3.2}"/>`}
function C(cx,cy,r,f,w){return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${w===0?'':`stroke="${INK}" stroke-width="${w||3.2}"`}/>`}
function R(x,y,w,h,f,r,sw){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r||0}" fill="${f}" stroke="${INK}" stroke-width="${sw||3}"/>`}
function limb(d,c,w){return `<path d="${d}" stroke="${INK}" stroke-width="${w+6}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`}
function hatch(x,y,w,h,op){let s=`<g opacity="${op||.15}">`;for(let i=-h;i<w;i+=7)s+=`<line x1="${x+i}" y1="${y+h}" x2="${x+i+h}" y2="${y}" stroke="${INK}" stroke-width="1.2"/>`;return s+'</g>'}

// ---------- Person ----------
function person(o){
  const x=o.x||0,y=o.y||0,H=o.h||300,sc=H/300, kid=!!o.kid;
  const hr=o.headR||(kid?48:40), w=o.wide||(kid?34:40), bf=o.belly||1;
  const hy=-300+hr+4, sh=hy+hr+6, hip=o.hip||(kid?-92:-112), ww=w*bf;
  const sk=SKN[o.skin||'a']||o.skin, top=o.top||G2, bot=o.bottom||DBOT, shoe=o.shoe||DSHOE;
  const look=o.look||0, mood=o.mood||'happy';
  let s=`<g transform="translate(${x} ${y}) ${o.tilt?`rotate(${o.tilt})`:''} scale(${o.flip?-sc:sc} ${sc})">`;
  // Bewegungslinien
  if(o.rush)s+=L(`M${-ww-50} ${sh+20} h-34 M${-ww-56} ${sh+50} h-44 M${-ww-50} ${sh+80} h-34`,4,G4);
  // Beine
  const lw=kid?22:26, st=o.stride||0;
  const lx=ww*0.42;
  s+=limb(`M${-lx} ${hip} L${-lx-st} -14`,bot,lw)+limb(`M${lx} ${hip} L${lx+st} -14`,bot,lw);
  const bf2=o.bigfoot?1.5:1;
  s+=`<g transform="translate(${-lx-st-6} 0) scale(${bf2} 1)"><path d="M-14 -4 q0 -14 16 -16 q16 0 22 12 q2 8 -4 10 h-34Z" fill="${shoe}" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/></g>`;
  s+=`<g transform="translate(${lx+st+6} 0) scale(${bf2} 1)"><path d="M-14 -4 q0 -14 16 -16 q16 0 22 12 q2 8 -4 10 h-34Z" fill="${shoe}" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/></g>`;
  
  // Arme: Hilfsfunktion fuer Handpunkte
  const A={}; const aw=kid?15:17;
  const pose=(side,p)=>{const sx=side*(ww-4), sy=sh+10; let el,hd;
    switch(p){
      case 'hold': el=[side*(ww+8),sh+50]; hd=[side*14,sh+66]; break;
      case 'write': el=[side*(ww+4),sh+56]; hd=[side*6,sh+78]; break;
      case 'point': el=[side*(ww+38),sh+14]; hd=[side*(ww+86),sh+2]; break;
      case 'up': el=[side*(ww+30),sh-6]; hd=[side*(ww+30),sh-58]; break;
      case 'hips': el=[side*(ww+30),sh+52]; hd=[side*(ww+2),hip-4]; break;
      case 'shrug': el=[side*(ww+26),sh+40]; hd=[side*(ww+52),sh+16]; break;
      case 'chin': el=[side*(ww+4),sh+44]; hd=[side*12,sh-6]; break;
      case 'phone': el=[side*(ww+10),sh+30]; hd=[side*(ww-2),hy+hr*0.5]; break;
      case 'cross': el=[side*(ww-2),sh+54]; hd=[-side*(ww-6),sh+40]; break;
      case 'out': el=[side*(ww+24),sh+46]; hd=[side*(ww+44),sh+86]; break;
      case 'back': el=[side*(ww+4),sh+44]; hd=[side*(ww-14),hip-10]; break;
      default: el=[side*(ww+8),sh+54]; hd=[side*(ww+6),hip+6];
    }
    return {sx,sy,el,hd};};
  const aL=pose(-1,o.armL||'down'), aR=pose(1,o.armR||'down');
  A.L=aL;A.R=aR;
  const sleeve=o.coat||o.sleeve||top;
  const drawArm=(a)=>limb(`M${a.sx} ${a.sy} Q${a.el[0]} ${a.el[1]} ${a.hd[0]} ${a.hd[1]}`,sleeve,aw);
  const drawHand=(a)=>C(a.hd[0],a.hd[1],kid?9:10,sk,3);
  // Rucksack / Tasche hinten
  if(o.backpack)s+=R(-ww-14,sh+4,ww*2+28,hip-sh-6,G4,14,3.2);
  // hinterer Arm (der, der hinter dem Koerper liegt: L)
  s+=drawArm(aL);
  // Koerper
  const hemY=o.coat?hip+58:hip+6, fl=o.coat?14:4;
  const body=`M${-ww} ${sh+2} Q${-ww-8} ${sh+34} ${-ww-fl} ${hemY} L${ww+fl} ${hemY} Q${ww+8} ${sh+34} ${ww} ${sh+2} Q0 ${sh-12} ${-ww} ${sh+2}Z`;
  s+=P(body,o.coat||top,3.4);
  s+=`<path d="M${ww*0.35} ${sh} Q${ww+8} ${sh+34} ${ww+fl} ${hemY} L${ww*0.5} ${hemY} Z" fill="${INK}" opacity=".10"/>`;
  s+=L(`M${-ww*0.28} ${sh+1} L0 ${sh+20} L${ww*0.28} ${sh+1}`,3,INK); // V-Kragen
  if(o.coat){s+=L(`M0 ${sh+20} L0 ${hemY}`,2.4)+L(`M${-ww-6} ${hip-6} Q0 ${hip+4} ${ww+6} ${hip-6}`,3)+`<circle cx="-6" cy="${hip+20}" r="2.6" fill="${INK}"/><circle cx="6" cy="${hip+20}" r="2.6" fill="${INK}"/>`;
     if(o.top&&o.coat!==top)s+=P(`M${-ww*0.28} ${sh+1} L0 ${sh+24} L${ww*0.28} ${sh+1} L${ww*0.2} ${sh+14} L0 ${sh+34} L${-ww*0.2} ${sh+14}Z`,top,2.4);}
  if(o.overall){s+=P(`M${-ww*0.62} ${sh+30} h${ww*1.24} v${hip-sh-24} h${-ww*1.24}Z`,o.overall,3)+L(`M${-ww*0.62} ${sh+30} L${-ww*0.46} ${sh+4} M${ww*0.62} ${sh+30} L${ww*0.46} ${sh+4}`,3)+R(-10,sh+44,20,16,o.overall,3,2.4)}
  if(o.apron)s+=P(`M${-ww*0.55} ${sh+22} Q${-ww*0.3} ${sh+16} 0 ${sh+16} Q${ww*0.3} ${sh+16} ${ww*0.55} ${sh+22} L${ww*0.8} ${hip+6} Q0 ${hip+16} ${-ww*0.8} ${hip+6}Z`,o.apronc||'#ffffff',3)+L(`M${-ww*0.55} ${sh+22} L${-ww*0.42} ${sh+2} M${ww*0.55} ${sh+22} L${ww*0.42} ${sh+2}`,2.6)+L(`M${-ww*0.8} ${hip-16} h${ww*1.6}`,2)+(o.flour?`<circle cx="-14" cy="${sh+50}" r="4" fill="${G2}"/><circle cx="10" cy="${sh+64}" r="5" fill="${G2}"/><circle cx="-4" cy="${sh+78}" r="3" fill="${G2}"/><circle cx="18" cy="${sh+44}" r="3" fill="${G2}"/>`:'');
  if(o.cardigan){s+=P(`M${-ww} ${sh+4} Q${-ww-8} ${sh+34} ${-ww-4} ${hip+8} L-7 ${hip+8} L-7 ${sh+6}Z`,o.cardigan,3)+P(`M${ww} ${sh+4} Q${ww+8} ${sh+34} ${ww+4} ${hip+8} L7 ${hip+8} L7 ${sh+6}Z`,o.cardigan,3);s+=`<circle cx="-12" cy="${sh+24}" r="2.4" fill="${INK}"/><circle cx="-12" cy="${sh+40}" r="2.4" fill="${INK}"/>`}
  if(o.vest)s+=P(`M${-ww+2} ${sh+6} L-5 ${sh+52} L-5 ${hip+6} L${-ww-1} ${hip+6}Z`,o.vest,3)+P(`M${ww-2} ${sh+6} L5 ${sh+52} L5 ${hip+6} L${ww+1} ${hip+6}Z`,o.vest,3);
  if(o.jersey)s+=`<text x="0" y="${sh+58}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" fill="${INK}">${o.jersey}</text>`;
  if(o.zip)s+=L(`M0 ${sh+10} L0 ${hip+6}`,3)+L(`M${-ww+6} ${sh+22} l-2 ${hip-sh-16} M${ww-6} ${sh+22} l2 ${hip-sh-16}`,5,G0);
  if(o.stripe)s+=L(`M${-ww*0.9} ${sh+36} h${ww*1.8}`,8,G0);
  if(o.brooch)s+=`<circle cx="${-ww*0.5}" cy="${sh+26}" r="7" fill="${YEL}" stroke="${INK}" stroke-width="2.6"/><circle cx="${-ww*0.5}" cy="${sh+26}" r="2" fill="${INK}"/>`;
  if(o.belt)s+=R(-ww-2,hip-14,ww*2+4,12,G5,3,2.6)+(o.keys?`<circle cx="${ww-4}" cy="${hip+10}" r="10" fill="none" stroke="${INK}" stroke-width="3"/><path d="M${ww-4} ${hip+20} v14" stroke="${INK}" stroke-width="4"/><path d="M${ww-14} ${hip+8} l-18 22 M${ww+6} ${hip+8} l14 24" stroke="${INK}" stroke-width="3"/>`:'');
  if(o.tools)s+=P(`M${-ww+6} ${hip-2} h16 v26 h-16Z`,G3,2.6)+L(`M${-ww+10} ${hip+6} v10`,2);
  if(o.pouch)s+=P(`M${ww-20} ${hip-4} h34 v32 q-17 10 -34 0Z`,G4,2.8)+L(`M${ww-20} ${hip+6} h34`,2);
  if(o.beltbag)s+=P(`M-30 ${hip-4} h60 v26 q-30 12 -60 0Z`,G4,3)+L(`M-30 ${hip+8} h60`,2.4)+`<circle cx="0" cy="${hip+14}" r="4" fill="${YEL}" stroke="${INK}" stroke-width="2"/>`;
  if(o.camera)s+=L(`M${-ww*0.5} ${sh+4} Q-14 ${sh+40} -12 ${sh+52} M${ww*0.5} ${sh+4} Q14 ${sh+40} 12 ${sh+52}`,3)+R(-20,sh+48,40,28,G3,5,3)+C(0,sh+62,9,G1,2.8)+C(0,sh+62,4,INK,0);
  if(o.scarf)s+=P(`M${-ww*0.6} ${sh-6} Q0 ${sh+14} ${ww*0.6} ${sh-6} l4 22 q-30 14 -62 0Z`,o.scarf,3);
  if(o.headphonesNeck)s+=L(`M${-ww*0.5} ${sh-2} Q0 ${sh+26} ${ww*0.5} ${sh-2}`,6,G6);
  if(o.tie)s+=P(`M0 ${sh+12} l-7 8 l7 40 l7 -40Z`,o.tie,2.6);
  if(o.bow)s+=P(`M0 ${sh+6} l-14 -8 v16Z M0 ${sh+6} l14 -8 v16Z`,o.bow,2.4)+C(0,sh+6,3.6,INK,0);
  if(o.nametag)s+=R(-ww*0.7,sh+26,22,12,'#fff',2,2);
  // Hals + Hand hinten
  s+=P(`M-10 ${hy+hr-8} h20 v16 h-20Z`,sk,3);
  // Haare hinten
  const hc=o.hc||G5, hs=o.hair;
  if(hs==='long'||hs==='longbrown')s+=P(`M${-hr-6} ${hy+10} Q${-hr-14} ${hy-hr-10} 0 ${hy-hr-8} Q${hr+14} ${hy-hr-10} ${hr+6} ${hy+10} Q${hr+8} ${hy+hr+30} ${hr-4} ${hy+hr+36} L${-hr+4} ${hy+hr+36} Q${-hr-8} ${hy+hr+30} ${-hr-6} ${hy+10}Z`,hc,3.2);
  if(hs==='pony'||hs==='ponysq')s+=P(`M${hr-6} ${hy-14} Q${hr+44} ${hy-8} ${hr+34} ${hy+52} Q${hr+14} ${hy+18} ${hr-8} ${hy+4}Z`,hc,3);
  if(hs==='braids')s+=P(`M${-hr-4} ${hy-4} q-22 20 -10 62 q8 -24 18 -34Z`,hc,3)+P(`M${hr+4} ${hy-4} q22 20 10 62 q-8 -24 -18 -34Z`,hc,3)+C(-hr-12,hy+60,7,YEL,2.6)+C(hr+12,hy+60,7,YEL,2.6);
  if(hs==='bun'){s+=C(0,hy-hr-10,17,hc,3.2)}
  if(hs==='bunhi'){s+=C(0,hy-hr-12,19,hc,3.2)}
  // Ohren + Kopf
  s+=E(-hr+1,hy+6,7,10,sk,2.8)+E(hr-1,hy+6,7,10,sk,2.8)+E(0,hy,hr,hr+2,sk,3.4);
  s+=`<path d="M${hr*0.3} ${hy-hr*0.8} Q${hr*1.05} ${hy-hr*0.1} ${hr*0.55} ${hy+hr*0.85}" fill="none" stroke="${INK}" stroke-width="12" opacity=".06"/>`;
  // Haare vorne
  const lk=look*3;
  if(hs==='short')s+=P(`M${-hr-1} ${hy-2} Q${-hr-2} ${hy-hr-8} 0 ${hy-hr-6} Q${hr+2} ${hy-hr-8} ${hr+1} ${hy-2} Q${hr*0.55} ${hy-hr*0.55} ${hr*0.05} ${hy-hr*0.58} Q${-hr*0.5} ${hy-hr*0.52} ${-hr-1} ${hy-2}Z`,hc,3);
  if(hs==='side')s+=P(`M${-hr-1} ${hy-2} Q${-hr-2} ${hy-hr-8} 0 ${hy-hr-6} Q${hr+2} ${hy-hr-8} ${hr+1} ${hy-2} Q${hr*0.2} ${hy-hr*0.7} ${-hr*0.6} ${hy-hr*0.42} Q${-hr*0.9} ${hy-hr*0.3} ${-hr-1} ${hy-2}Z`,hc,3);
  if(hs==='curly'||hs==='curlyred')[[-34,-14],[-24,-36],[-6,-46],[16,-44],[32,-30],[40,-8],[-40,6],[0,-34]].forEach(([dx,dy])=>{s+=C(dx*hr/40,hy+dy*hr/40,15,hc,2.8)});
  if(hs==='locks')[[-36,-18],[-26,-40],[-8,-50],[14,-48],[32,-36],[42,-14],[-42,2],[-6,-38],[22,-30]].forEach(([dx,dy])=>{s+=C(dx,hy+dy,16,hc,2.8)});
  if(hs==='locks'&&o.band)s+=L(`M${-hr+2} ${hy-hr*0.5} Q0 ${hy-hr*0.78} ${hr-2} ${hy-hr*0.5}`,8,YEL)+L(`M${-hr+2} ${hy-hr*0.5} Q0 ${hy-hr*0.78} ${hr-2} ${hy-hr*0.5}`,1.2);
  if(hs==='long'||hs==='longbrown')s+=P(`M${-hr} ${hy-2} Q${-hr+2} ${hy-hr-8} 0 ${hy-hr-8} Q${hr-2} ${hy-hr-8} ${hr} ${hy-2} Q${hr*0.5} ${hy-hr*0.6} ${-hr*0.1} ${hy-hr*0.5} Q${-hr*0.7} ${hy-hr*0.4} ${-hr} ${hy-2}Z`,hc,3);
  if(hs==='pony'||hs==='ponysq'||hs==='braids'||hs==='bun'||hs==='bunhi')s+=P(`M${-hr} ${hy-2} Q${-hr+2} ${hy-hr-8} 0 ${hy-hr-8} Q${hr-2} ${hy-hr-8} ${hr} ${hy-2} Q${hr*0.3} ${hy-hr*0.62} ${-hr*0.2} ${hy-hr*0.52} Q${-hr*0.7} ${hy-hr*0.46} ${-hr} ${hy-2}Z`,hc,3);
  if(hs==='bald')s+=L(`M${-hr+1} ${hy+4} Q${-hr-5} ${hy-16} ${-hr*0.62} ${hy-26} M${hr-1} ${hy+4} Q${hr+5} ${hy-16} ${hr*0.62} ${hy-26}`,9,hc);
  if(hs==='hood')s+=P(`M${-hr-12} ${hy+34} Q${-hr-20} ${hy-hr-18} 0 ${hy-hr-16} Q${hr+20} ${hy-hr-18} ${hr+12} ${hy+34} Q${hr+4} ${hy+10} ${hr-2} ${hy-hr*0.3} Q0 ${hy-hr*0.95} ${-hr+2} ${hy-hr*0.3} Q${-hr-4} ${hy+10} ${-hr-12} ${hy+34}Z`,o.hoodc||top,3.2);
  if(hs==='hood'&&o.hc)s+=P(`M${-hr*0.7} ${hy-hr*0.5} Q0 ${hy-hr*0.9} ${hr*0.7} ${hy-hr*0.5} Q${hr*0.2} ${hy-hr*0.35} ${-hr*0.7} ${hy-hr*0.5}Z`,hc,2.6);
  if(hs==='hijab')s+=P(`M${-hr-12} ${hy+hr+16} Q${-hr-22} ${hy-hr-12} 0 ${hy-hr-14} Q${hr+22} ${hy-hr-12} ${hr+12} ${hy+hr+16} Q${hr-6} ${hy+hr-2} ${hr-4} ${hy+8} Q${hr-8} ${hy-hr*0.6} 0 ${hy-hr*0.62} Q${-hr+8} ${hy-hr*0.6} ${-hr+4} ${hy+8} Q${-hr+6} ${hy+hr-2} ${-hr-12} ${hy+hr+16}Z`,hc,3.2);
  // Gesicht
  const ey=hy-2, ex=hr*0.37, er=kid?10.5:9.5;
  const pdx=look*3.2;
  const eye=(dx)=>{ if(mood==='sleep')return L(`M${dx-8} ${ey} q8 6 16 0`,2.6);
    return C(dx,ey,er,'#fff',2.6)+C(dx+pdx,ey+(mood==='think'?-1:0.5),er*0.5,INK,0)+C(dx+pdx+2.2,ey-2.4,2,'#fff',0)};
  s+=eye(-ex+lk*0.6)+eye(ex+lk*0.6);
  // Wangen
  s+=`<circle cx="${-ex-8+lk}" cy="${ey+17}" r="8" fill="${INK}" opacity=".08"/><circle cx="${ex+8+lk}" cy="${ey+17}" r="8" fill="${INK}" opacity=".08"/>`;
  // Brauen
  if(mood==='think')s+=L(`M${-ex-8+lk} ${ey-19} l15 -4 M${ex-7+lk} ${ey-22} l15 4`,3);
  else if(mood==='worried')s+=L(`M${-ex-8+lk} ${ey-15} l15 -7 M${ex-7+lk} ${ey-22} l15 7`,3);
  else if(mood==='grumpy')s+=L(`M${-ex-8+lk} ${ey-23} l15 7 M${ex-7+lk} ${ey-16} l15 -7`,3.6);
  else if(mood==='sleep'){}
  else s+=L(`M${-ex-8+lk} ${ey-19} q8 -6 16 0 M${ex-8+lk} ${ey-19} q8 -6 16 0`,2.8);
  // Nase
  s+=L(`M${lk*1.4} ${ey+4} q${5+lk} 9 ${-2+lk*0.5} 12`,2.6,G5);
  // Mund
  if(!o.beard){
    if(mood==='caught'||mood==='surprised')s+=E(lk,ey+27,6,8,'#fff',2.6);
    else if(mood==='worried')s+=L(`M${-9+lk} ${ey+30} q9 -7 18 0`,2.8);
    else if(mood==='grumpy')s+=L(`M${-9+lk} ${ey+29} h18`,3);
    else if(mood==='sleep')s+=E(lk,ey+28,4,5,G2,2.4);
    else if(o.chew)s+=L(`M${-12+lk} ${ey+26} q6 5 12 0 q6 -5 12 0`,2.8);
    else if(mood==='laugh')s+=P(`M${-13+lk} ${ey+23} q13 18 26 0Z`,'#fff',2.8);
    else s+=L(`M${-12+lk} ${ey+25} Q${lk} ${ey+35} ${12+lk} ${ey+25}`,3);
  }
  if(o.gap)s+=`<rect x="${-3+lk}" y="${ey+26}" width="6" height="6" fill="#fff"/>`;
  if(o.stache)s+=P(`M${-20+lk} ${ey+22} q10 -9 20 -2 q10 -7 20 2 q-10 7 -20 2 q-10 5 -20 -2Z`,o.stachec||G3,2.6);
  if(o.beard)s+=P(`M${-hr+3} ${hy+2} Q${-hr} ${hy+hr+16} 0 ${hy+hr+16} Q${hr} ${hy+hr+16} ${hr-3} ${hy+2} Q${hr*0.55} ${hy+20} 0 ${hy+16} Q${-hr*0.55} ${hy+20} ${-hr+3} ${hy+2}Z`,o.beard,2.8)+(mood==='laugh'?P(`M${-12+lk} ${ey+26} q12 16 24 0Z`,'#fff',2.4):L(`M${-9+lk} ${ey+28} q9 6 18 0`,2.6,'#fff'));
  if(o.freckles)[[-ex-4,ey+10],[-ex+5,ey+13],[-ex-9,ey+15],[ex-5,ey+12],[ex+4,ey+10],[ex+8,ey+15]].forEach(([a,b])=>s+=`<circle cx="${a+lk}" cy="${b}" r="1.7" fill="${G5}"/>`);
  if(o.age)s+=L(`M${-ex-14} ${ey+10} q-4 8 0 16 M${ex+14} ${ey+10} q4 8 0 16`,1.8,G4);
  if(o.glasses)s+=C(-ex+lk*0.6,ey,er+4.5,'none',2.8)+C(ex+lk*0.6,ey,er+4.5,'none',2.8)+L(`M${-ex+er+4.5+lk*0.6} ${ey} h${2*ex-2*er-9}`,2.6)+L(`M${-ex-er-4.5+lk*0.6} ${ey} L${-hr+2} ${ey-2} M${ex+er+4.5+lk*0.6} ${ey} L${hr-2} ${ey-2}`,2.4);
  if(o.loupe)s+=C(ex+lk*0.6,ey,er+7,'rgba(255,255,255,.35)',3.4)+L(`M${ex+er+5+lk*0.6} ${ey+4} q14 -4 22 -30`,2.6);
  if(o.sun)s+=R(-ex-14+lk*0.6,ey-9,2*ex+28,18,G6,8,2.6);
  if(o.headphones)s+=L(`M${-hr-3} ${hy+4} Q${-hr-4} ${hy-hr-12} 0 ${hy-hr-12} Q${hr+4} ${hy-hr-12} ${hr+3} ${hy+4}`,7,G6)+R(-hr-12,hy-6,14,24,G6,6,2.6)+R(hr-2,hy-6,14,24,G6,6,2.6);
  // Huete
  const hat=o.hat;
  if(hat==='fedora')s+=P(`M${-hr-26} ${hy-hr*0.5} Q0 ${hy-hr*0.2} ${hr+26} ${hy-hr*0.5} Q${hr+8} ${hy-hr*0.78} ${hr-6} ${hy-hr*0.78} L${hr-10} ${hy-hr-28} Q0 ${hy-hr-16} ${-hr+10} ${hy-hr-28} L${-hr+6} ${hy-hr*0.78} Q${-hr-8} ${hy-hr*0.78} ${-hr-26} ${hy-hr*0.5}Z`,o.hatc||'#8f7a62',3.2)+`<path d="M${-hr+6} ${hy-hr*0.96} Q0 ${hy-hr*0.76} ${hr-6} ${hy-hr*0.96} v12 Q0 ${hy-hr*0.62} ${-hr+6} ${hy-hr*0.84}Z" fill="${INK}"/>`;
  if(hat==='cap')s+=P(`M${-hr-1} ${hy-hr*0.45} Q${-hr-2} ${hy-hr-14} 0 ${hy-hr-14} Q${hr+2} ${hy-hr-14} ${hr+1} ${hy-hr*0.45}Z`,o.hatc||G4,3)+P(`M${hr*0.1} ${hy-hr*0.5} L${hr+30} ${hy-hr*0.4} L${hr+24} ${hy-hr*0.62}Z`,o.hatc||G4,2.8);
  if(hat==='capback')s+=P(`M${-hr-1} ${hy-hr*0.4} Q${-hr-2} ${hy-hr-14} 0 ${hy-hr-14} Q${hr+2} ${hy-hr-14} ${hr+1} ${hy-hr*0.4}Z`,o.hatc||G6,3)+P(`M${-hr*0.1} ${hy-hr*0.5} L${-hr-34} ${hy-hr*0.5} L${-hr-26} ${hy-hr*0.3}Z`,o.hatc||G6,2.8);
  if(hat==='flatcap')s+=P(`M${-hr-3} ${hy-hr*0.4} Q${-hr} ${hy-hr-10} ${hr*0.2} ${hy-hr-14} Q${hr+8} ${hy-hr-8} ${hr+6} ${hy-hr*0.4} Q0 ${hy-hr*0.28} ${-hr-3} ${hy-hr*0.4}Z`,o.hatc||G5,3)+P(`M${hr*0.2} ${hy-hr*0.38} q${hr*0.6} -4 ${hr*0.95} 4 q-${hr*0.5} 10 -${hr*0.95} -4Z`,o.hatc||G5,2.4);
  if(hat==='baker')s+=P(`M${-hr+2} ${hy-hr*0.55} Q${-hr-10} ${hy-hr-30} ${-hr*0.5} ${hy-hr-40} Q0 ${hy-hr-58} ${hr*0.5} ${hy-hr-40} Q${hr+10} ${hy-hr-30} ${hr-2} ${hy-hr*0.55}Z`,'#fff',3);
  if(hat==='chef')s+=P(`M${-hr+4} ${hy-hr*0.55} L${-hr+2} ${hy-hr-12} Q${-hr-14} ${hy-hr-34} ${-hr*0.5} ${hy-hr-52} Q0 ${hy-hr-68} ${hr*0.5} ${hy-hr-52} Q${hr+14} ${hy-hr-34} ${hr-2} ${hy-hr-12} L${hr-4} ${hy-hr*0.55}Z`,'#fff',3);
  if(hat==='straw')s+=P(`M${-hr-34} ${hy-hr*0.42} Q0 ${hy-hr*0.1} ${hr+34} ${hy-hr*0.42} Q${hr+8} ${hy-hr*0.8} ${hr-8} ${hy-hr*0.8} Q0 ${hy-hr-22} ${-hr+8} ${hy-hr*0.8} Q${-hr-8} ${hy-hr*0.8} ${-hr-34} ${hy-hr*0.42}Z`,'#d9cdb0',3.2)+L(`M${-hr+6} ${hy-hr*0.72} Q0 ${hy-hr*0.55} ${hr-6} ${hy-hr*0.72}`,7,G5);
  if(hat==='beanie')s+=P(`M${-hr-1} ${hy-hr*0.3} Q${-hr-4} ${hy-hr-16} 0 ${hy-hr-16} Q${hr+4} ${hy-hr-16} ${hr+1} ${hy-hr*0.3}Z`,o.hatc||G5,3)+R(-hr-3,hy-hr*0.45,2*hr+6,14,G4,5,2.8)+C(0,hy-hr-20,8,G4,2.6);
  if(hat==='helm')s+=P(`M${-hr-4} ${hy+4} Q${-hr-6} ${hy-hr-16} 0 ${hy-hr-16} Q${hr+6} ${hy-hr-16} ${hr+4} ${hy+4} L${hr+4} ${hy-hr*0.3} L${-hr-4} ${hy-hr*0.3}Z`,o.helmc||G3,3.2)+L(`M${-hr-4} ${hy-hr*0.3} h${2*hr+8}`,3)+P(`M-4 ${hy-hr-14} q4 -${o.plume||26} ${14+(o.plume||0)/4} -${(o.plume||26)+10} q-2 20 -10 ${(o.plume||26)+10}Z`,o.plumec||G6,2.6);
  if(o.pencilEar)s+=L(`M${hr-8} ${hy-12} L${hr+14} ${hy+14}`,6,YEL)+L(`M${hr-8} ${hy-12} L${hr+14} ${hy+14}`,1.4);
  // Hand-Items
  const itemAt=(a,t,side)=>{let [hx,hy2]=a.hd,r='';
    switch(t){
      case 'notebook': r=`<rect x="${hx-13}" y="${hy2-22}" width="26" height="34" rx="3" fill="${INK}" stroke="${INK}" stroke-width="2"/><rect x="${hx-13}" y="${hy2-12}" width="26" height="5" fill="${YEL}"/>`;break;
      case 'heft': r=`<g transform="rotate(${side*-8} ${hx} ${hy2})"><rect x="${hx-16}" y="${hy2-20}" width="32" height="26" rx="2" fill="#fff" stroke="${INK}" stroke-width="2.4"/>${L(`M${hx-10} ${hy2-12} h20 M${hx-10} ${hy2-5} h14`,1.4,G4)}</g>`;break;
      case 'sketch': r=`<g transform="rotate(${side*8} ${hx} ${hy2})"><rect x="${hx-20}" y="${hy2-26}" width="40" height="32" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.6"/>${L(`M${hx-12} ${hy2-6} q8 -12 14 -2 t12 -8`,1.6,G4)}</g>`;break;
      case 'pencil': r=L(`M${hx} ${hy2} l${side*16} -26`,5,YEL)+L(`M${hx} ${hy2} l${side*16} -26`,1.2)+L(`M${hx} ${hy2} l${side*-2} 5`,3);break;
      case 'phone': r=`<rect x="${hx-8}" y="${hy2-20}" width="16" height="28" rx="3" fill="${G6}" stroke="${INK}" stroke-width="2.4"/><rect x="${hx-5}" y="${hy2-17}" width="10" height="18" fill="${G2}"/>`;break;
      case 'pretzel': r=`<path d="M${hx-14} ${hy2-6} q-8 -22 14 -22 q22 0 14 22 q-14 -16 -28 0 M${hx-8} ${hy2-14} q8 10 16 0" fill="none" stroke="${G4}" stroke-width="6" stroke-linecap="round"/>`;break;
      case 'card': r=`<g transform="rotate(${side*-10} ${hx} ${hy2})"><rect x="${hx-6}" y="${hy2-26}" width="42" height="28" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.4"/></g>`;break;
      case 'cane': r=L(`M${hx} ${hy2+6} L${hx+side*4} -6`,5,G5)+L(`M${hx} ${hy2+6} q${side*-2} -14 ${side*-14} -12`,5,G5);break;
      case 'ruler': r=R(hx-4,hy2-40,10,50,'#fff',1,2.2);break;
      case 'bag': r=`<path d="M${hx-18} ${hy2} h36 l-4 40 h-28Z" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`+L(`M${hx-12} ${hy2} q12 -10 24 0`,2.4);break;
      case 'mic': r=`<rect x="${hx-4}" y="${hy2-30}" width="9" height="30" rx="4" fill="${G6}" stroke="${INK}" stroke-width="2"/><circle cx="${hx}" cy="${hy2-34}" r="8" fill="${G4}" stroke="${INK}" stroke-width="2.4"/>`;break;
      case 'broom': r=L(`M${hx} ${hy2-110} L${hx+side*6} -6`,5,G5)+P(`M${hx+side*6-22} -8 l22 -4 l22 4 l-6 26 h-32Z`,G3,2.6);break;
      case 'torch': r=P(`M${hx-5} ${hy2-12} h10 l3 28 h-16Z`,G6,2.4)+`<path d="M${hx-4} ${hy2-12} L${hx+side*70} ${hy2-52} L${hx+side*70} ${hy2+22} L${hx+4} ${hy2-12}Z" fill="#fff" opacity=".5"/>`;break;
      case 'scanner': r=R(hx-9,hy2-26,18,32,G6,3,2.4)+`<rect x="${hx-6}" y="${hy2-22}" width="12" height="9" fill="${G2}"/>`;break;
      case 'ice': r=R(hx-16,hy2-26,32,26,'#fff',3,2.6)+`<rect x="${hx-16}" y="${hy2-18}" width="32" height="7" fill="${G2}"/>`;break;
      case 'knife': r=L(`M${hx} ${hy2} l${side*10} -30`,3.4)+L(`M${hx} ${hy2} l${side*-2} 6`,5,G6);break;
      case 'ladle': r=L(`M${hx} ${hy2} l${side*8} -34`,3.6)+E(hx+side*10,hy2-38,8,6,G4,2.4);break;
      case 'cup': r=`<path d="M${hx-14} ${hy2-26} h28 l-4 30 h-20Z" fill="#fff" stroke="${INK}" stroke-width="2.6"/><path d="M${hx+14} ${hy2-20} q14 2 10 12 q-4 6 -12 4" fill="none" stroke="${INK}" stroke-width="2.6"/><ellipse cx="${hx}" cy="${hy2-27}" rx="14" ry="5" fill="#F4E6CC" stroke="${INK}" stroke-width="2.4"/>`;break;
      case 'cake': r=`<path d="M${hx-30} ${hy2-10} h60 v-22 h-60Z" fill="${G3}" stroke="${INK}" stroke-width="2.6"/>`;break;
    }
    return r;};
  const items=o.items||[];
  // vorderer Arm (R) + Haende
  s+=drawArm(aR);
  s+=drawHand(aL)+drawHand(aR);
  items.forEach(([t,hand])=>{const a=hand==='L'?aL:aR;s+=itemAt(a,t,hand==='L'?-1:1)});
  s+='';
  return s+'</g>'}

// Hund (Dackel / Bello)
function dog(x,y,sc,o){o=o||{};let s=`<g transform="translate(${x} ${y}) scale(${(o.flip?-1:1)*sc} ${sc})">`;
  const c=o.c||G4;
  if(o.kind==='bello'){ // zottelig
    s+=P(`M-70 -30 Q-76 -78 -30 -80 L40 -80 Q74 -78 72 -44 L68 -22 Q20 -14 -52 -22Z`,c,3)+hatch(-60,-76,120,50,.12)+P(`M-56 -26 v28 h18 v-26 M40 -22 v26 h18 v-28`,c,3);
    s+=C(76,-86,26,c,3)+P(`M62 -100 q-14 20 -4 40 q14 -8 12 -36Z`,G5,2.6)+`<circle cx="84" cy="-92" r="3.4" fill="${INK}"/><circle cx="96" cy="-82" r="5" fill="${INK}"/>`;
    s+=L(`M-70 -52 q-22 -14 -26 -36`,6,c);
    for(let i=0;i<6;i++)s+=L(`M${-50+i*20} -24 l-3 10 M${-56+i*22} -76 l2 -10`,2,G5);
  } else { // Dackel
    s+=P(`M-70 -38 Q-76 -66 -30 -66 L36 -66 Q56 -64 54 -44 L50 -28 Q10 -22 -52 -28Z`,c,3)+P(`M-54 -30 v22 h14 v-20 M30 -26 v20 h14 v-22`,c,3);
    s+=E(66,-70,22,18,c,3)+P(`M58 -78 q-12 22 -4 34 q10 -4 12 -30Z`,G5,2.6)+`<circle cx="72" cy="-76" r="3" fill="${INK}"/><circle cx="86" cy="-68" r="4" fill="${INK}"/>`;
    s+=L(`M-70 -46 q-18 -16 -22 -32`,5,c);}
  if(o.collar)s+=L(`M52 -60 q12 10 26 2`,6,YEL)+L(`M52 -60 q12 10 26 2`,1.4);
  if(o.sleep)s+=`<text x="90" y="-110" font-family="Poppins" font-weight="700" font-size="22" fill="${G4}">z z</text>`;
  return s+'</g>'}

// Vorlagen der Figuren
var F={
 brandt:{h:335,wide:38,hat:'fedora',coat:'#e7e0cd',top:G1,stache:1,stachec:G3,hair:'short',hc:G3,mood:'think',pencilEar:1,age:1,items:[['notebook','R']],armR:'hold',armL:'down',skin:'a',av:[-72,-352,144,144]},
 anna:{kid:1,h:226,hair:'locks',hc:G6,overall:G3,top:G1,items:[['sketch','L'],['pencil','R']],armL:'hold',armR:'write',skin:'d',band:1,av:[-64,-308,128,128]},
 ben:{kid:1,h:232,hair:'hood',hc:G3,top:G3,hoodc:G3,freckles:1,beltbag:1,chew:1,skin:'a',wide:38,av:[-64,-308,128,128]},
 carla:{kid:1,h:214,hair:'ponysq',hc:G5,glasses:1,top:G1,bottom:G4,sneaker:1,shoe:'#fff',skin:'b',av:[-64,-308,128,128]},
 hilde:{h:250,wide:36,belly:1.3,hair:'bunhi',hc:'#fff',cardigan:YEL,top:G1,bottom:G4,brooch:1,items:[['heft','L']],armL:'write',armR:'hold',skin:'a',mood:'happy',lefty:1,av:[-64,-300,128,128]},
 kemal:{h:315,wide:40,belly:1.3,hair:'short',hc:G6,beard:G6,apron:1,top:G4,mood:'laugh',armR:'hips',skin:'c',av:[-64,-308,128,128]},
 can:{h:310,wide:32,hair:'short',hc:G6,hat:'capback',hatc:G5,top:G3,items:[['phone','R']],armR:'phone',skin:'b',av:[-64,-308,128,128]},
 luigi:{h:290,wide:38,belly:1.35,hat:'chef',hair:'short',hc:G6,stache:1,stachec:G6,apron:1,flour:1,top:G2,skin:'b',mood:'worried',armR:'hips',av:[-66,-338,132,132]},
 zeynep:{h:300,wide:36,hat:'straw',hair:'long',hc:G6,apron:1,apronc:G3,top:G1,pouch:1,mood:'laugh',skin:'c',armR:'hips',av:[-70,-322,140,140]},
 mehmet:{h:310,wide:38,belly:1.1,hat:'baker',glasses:1,hair:'short',hc:G5,top:G1,items:[['pretzel','R']],armR:'hold',skin:'c',av:[-66,-346,132,132]},
 greta:{h:335,wide:32,hair:'bun',hc:G1,cardigan:G4,top:G2,bottom:G5,glasses:1,items:[['cane','R']],armR:'hold',skin:'a',age:1,av:[-64,-308,128,128]},
 lars:{h:318,wide:38,hat:'cap',hatc:G6,top:G5,bottom:G6,hair:'short',hc:G6,items:[['pencil','L']],skin:'b',lefty:1,av:[-64,-312,128,128]},
 hans:{h:312,wide:42,hair:'bald',hc:G2,beard:G2,top:G4,belt:1,keys:1,tools:1,mood:'grumpy',skin:'b',av:[-64,-308,128,128]},
 peter:{h:372,wide:36,hair:'short',hc:G5,top:G6,bottom:G5,bigfoot:1,zip:1,skin:'a',mood:'happy',av:[-64,-308,128,128]},
 mia:{h:278,wide:32,hair:'short',hc:G6,top:G3,bottom:G5,skin:'e',zip:0,av:[-64,-308,128,128]},
 ayse:{h:305,wide:36,hair:'pony',hc:G5,top:G3,zip:1,stripe:1,bottom:G6,items:[['pencil','L']],skin:'b',lefty:1,av:[-64,-308,128,128]},
 defne:{kid:1,h:262,wide:30,hair:'long',hc:G5,headphones:1,top:G2,bottom:G5,skin:'b',av:[-70,-322,140,140]},
 emre:{h:315,wide:38,hat:'cap',hatc:G4,backpack:1,camera:1,top:G3,bottom:G5,hair:'short',hc:G6,skin:'b',av:[-64,-312,128,128]},
 igor:{h:312,wide:40,hat:'flatcap',hatc:G5,top:G4,hair:'short',hc:G3,mood:'happy',skin:'a',av:[-70,-318,140,140]},
 dragan:{h:305,wide:36,vest:G5,top:G1,hair:'short',hc:G5,loupe:1,skin:'c',av:[-66,-312,132,132]},
 elif:{h:290,wide:34,hair:'long',hc:G5,top:G2,cardigan:G3,skin:'b',av:[-64,-308,128,128]},
 lea:{kid:1,h:236,hair:'braids',hc:G6,top:G2,overall:G4,skin:'b',av:[-72,-308,144,144]},
 tom:{kid:1,h:240,hair:'short',hc:G3,top:G5,jersey:'7',shoe:G5,skin:'a',av:[-64,-308,128,128]},
 max:{kid:1,h:196,hair:'curly',hc:G6,top:G3,gap:1,mood:'laugh',skin:'b',av:[-64,-308,128,128]},
 ali:{h:312,wide:38,hat:'beanie',hatc:G6,stache:1,stachec:G6,top:G4,skin:'c',av:[-64,-312,128,128]},
 frank:{h:318,wide:40,hair:'curly',hc:G4,glasses:1,vest:G3,top:G1,skin:'a',av:[-64,-312,128,128]},
 jonas:{kid:1,h:276,hair:'side',hc:G5,hood:0,top:G6,zip:1,skin:'b',av:[-64,-308,128,128]},
 sommer:{h:312,wide:36,hat:'flatcap',hatc:G3,bow:G6,top:G1,vest:G4,hair:'short',hc:G1,age:1,skin:'a',av:[-70,-318,140,140]},
 moderator:{h:320,wide:36,coat:G3,top:G0,bow:G6,hair:'side',hc:G6,items:[['mic','R']],armR:'hold',mood:'laugh',skin:'a',av:[-64,-308,128,128]},
 kassierer:{h:300,wide:34,vest:G4,top:G1,hair:'short',hc:G5,nametag:1,skin:'b',av:[-64,-308,128,128]},
 kuno:{h:320,wide:40,hat:'helm',plumec:G2,top:G4,coat:G4,hair:'short',hc:G5,mood:'grumpy',skin:'b',av:[-64,-322,128,128]},
 bodo:{h:300,wide:44,belly:1.2,hat:'helm',plumec:G6,plume:40,top:G3,coat:G3,hair:'short',hc:G4,stache:1,stachec:G5,skin:'a',av:[-64,-322,128,128]},
 gero:{h:332,wide:34,hat:'helm',plumec:G4,plume:14,top:G5,coat:G5,hair:'short',hc:G4,glasses:1,skin:'c',av:[-64,-322,128,128]}
};

F.dieter=F.kemal;F.jan=F.can;F.heike=F.zeynep;
// Farbpalette (nur Farbfassung)
if(!window.BW){const W='#F6F0E0',K='#2A2420',CC={
 brandt:{coat:'#D7C39A',top:W,hatc:'#7A5A3A',hc:'#C9C9C9',stachec:'#C9C9C9'},
 anna:{hc:'#2A1F1A',overall:'#E4573D',top:'#7CC4E8'},
 ben:{hc:'#8B5A2B',top:'#5DB75D',hoodc:'#5DB75D'},
 carla:{hc:'#E8A33D',top:'#F08CAE',bottom:'#4A6FA5',shoe:'#ffffff'},
 hilde:{cardigan:'#A58BD9',top:W,bottom:'#6B6B8E'},
 kemal:{hc:K,beard:K,top:'#C8472E'},
 can:{hc:K,hatc:'#3F8EDB',top:'#2FA39A'},
 luigi:{hc:K,stachec:K,top:'#E4573D'},
 zeynep:{hc:'#4A2C1A',apronc:'#1FA89A',top:W},
 mehmet:{hc:'#6B4A2D',top:'#E9E2CF'},
 greta:{hc:'#E6E6E6',cardigan:'#D6618A',top:W,bottom:'#5B6B8C'},
 lars:{hc:K,hatc:'#D44A3A',top:'#3F8EDB',bottom:'#2D3E5F'},
 hans:{hc:'#B0B0B0',beard:'#B0B0B0',top:'#6E8B3D'},
 peter:{hc:'#8B5A2B',top:'#F29A3A',bottom:'#2D4F8E'},
 mia:{hc:K,top:'#8C6FD6',bottom:'#3A3A55'},
 ayse:{hc:'#2A1F1A',top:'#1FA89A',bottom:'#33415C'},
 defne:{hc:'#5A3622',top:'#F08CAE',bottom:'#4A6FA5'},
 emre:{hatc:'#2D4F8E',hc:K,top:'#F29A3A',bottom:'#8B8260'},
 igor:{hatc:'#7A5A3A',top:'#5E8C5A',hc:'#BDB09A'},
 dragan:{vest:'#7A3B3B',top:W,hc:'#3B2A22'},
 elif:{hc:'#3B2A22',top:'#F2E6C9',cardigan:'#C95F8E'},
 lea:{hc:'#2A1F1A',top:'#F29A3A',overall:'#3F8EDB'},
 tom:{hc:'#C98A3D',top:'#E4573D',shoe:'#3A3A3A'},
 max:{hc:'#B5532A',top:'#3F8EDB'},
 ali:{hatc:'#E4573D',stachec:K,top:'#3A7D5C'},
 frank:{hc:'#8A6A4A',vest:'#9C6B3A',top:W},
 jonas:{hc:'#6B4A2D',top:'#2D4F8E'},
 sommer:{hatc:'#7A5A3A',bow:'#E4573D',vest:'#5B7A5B',top:W,hc:'#E6E6E6'},
 moderator:{coat:'#2D4F8E',bow:'#E4573D',top:'#ffffff',hc:'#3B2A22'},
 kassierer:{vest:'#E4573D',top:W,hc:'#4A3426'},
 kuno:{plumec:'#E4573D',top:'#8B97A8',coat:'#8B97A8',hc:'#6B4A2D',helmc:'#B9C3CF'},
 bodo:{plumec:'#3F8EDB',top:'#B5651D',coat:'#B5651D',hc:'#6B4A2D',stachec:'#6B4A2D',helmc:'#B9C3CF'},
 gero:{plumec:'#F6C431',top:'#5B6C8F',coat:'#5B6C8F',hc:'#3B2A22',helmc:'#B9C3CF'}};
 Object.keys(CC).forEach(k=>{if(F[k])Object.assign(F[k],CC[k])})}
function fig(k,x,y,extra){return person(Object.assign({},F[k],{x:x,y:y},extra||{}))}
function avatar(k){const o=F[k];const v=o.av||[-64,-308,128,128];
  return `<svg viewBox="${v.join(' ')}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">${person(Object.assign({},o,{x:0,y:0,h:300,armL:'down',armR:'down',items:[],look:0,tilt:0,mood:o.mood==='laugh'?'laugh':(o.mood==='grumpy'?'grumpy':'happy')}))}</svg>`}
