const N='#1d2540', Y='#ffc93c', R='#e4572e', T='#2a9d8f', C='#f3ead8', B='#7fb7e6', W='#ffffff';
const F=(s,x,y,o={})=>`<text x="${x}" y="${y}" font-family="Fredoka" font-weight="${o.w||700}" font-size="${o.s||60}" fill="${o.c||N}" text-anchor="${o.a||'middle'}" opacity="${o.o??1}">${s}</text>`;
// ---------- neue Figuren ----------
const PPL={A:{n:'ANNA',c:'#e4572e',hair:'long',hc:'#3b2a20',skin:'#f1c7a3',h:470},B:{n:'BEN',c:'#2a9d8f',hair:'short',hc:'#d9a441',skin:'#e0a77f',h:520},C:{n:'CARLA',c:'#8e6bbf',hair:'bun',hc:'#a0522d',skin:'#c68a64',h:490}};
// Neue Figuren v2: Outline-Arme mit Händen, Hals, Ohren, Augen mit Glanz, Brauen, Nase, Schuhe, Schattierung
function shade(c,f){const n=parseInt(c.slice(1),16);let r=(n>>16)&255,g=(n>>8)&255,b=n&255;r=Math.round(r*f);g=Math.round(g*f);b=Math.round(b*f);return '#'+((1<<24)+(Math.min(255,r)<<16)+(Math.min(255,g)<<8)+Math.min(255,b)).toString(16).slice(1)}
function limb(d,c,w){return `<path d="${d}" stroke="${N}" stroke-width="${w+12}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`}
function person(x,y,k,o={}){const p=PPL[k];const H=p.h;let s='';
  const top=y-H+120, hy=top-62, pants=p.pants||'#2b3150', shoe='#1d2540';
  // Beine + Schuhe
  s+=limb(`M${x-24} ${y-170} L${x-26} ${y-16}`,pants,30)+limb(`M${x+24} ${y-170} L${x+26} ${y-16}`,pants,30);
  s+=`<ellipse cx="${x-34}" cy="${y-6}" rx="30" ry="15" fill="${shoe}" stroke="${N}" stroke-width="5"/><ellipse cx="${x+34}" cy="${y-6}" rx="30" ry="15" fill="${shoe}" stroke="${N}" stroke-width="5"/>`;
  // Arme hinter dem Körper (hängend) bzw. erhoben
  const arm=o.arm||'down', sk=p.skin, dark=shade(p.c,0.8);
  const armL=`M${x-58} ${top+34} Q${x-86} ${top+100} ${x-78} ${top+168}`;
  s+=limb(armL,dark,26)+`<circle cx="${x-78}" cy="${top+176}" r="17" fill="${sk}" stroke="${N}" stroke-width="5"/>`;
  if(arm==='up'){s+=limb(`M${x+58} ${top+34} Q${x+92} ${top-10} ${x+96} ${top-70}`,dark,26)+`<circle cx="${x+97}" cy="${top-80}" r="17" fill="${sk}" stroke="${N}" stroke-width="5"/>`}
  else s+=limb(`M${x+58} ${top+34} Q${x+86} ${top+100} ${x+78} ${top+168}`,dark,26)+`<circle cx="${x+78}" cy="${top+176}" r="17" fill="${sk}" stroke="${N}" stroke-width="5"/>`;
  // Körper mit Schattenseite und Kragen
  const body=`M${x-64} ${y-150} Q${x-74} ${top+10} ${x-34} ${top} L${x+34} ${top} Q${x+74} ${top+10} ${x+64} ${y-150}Z`;
  s+=`<path d="${body}" fill="${p.c}" stroke="${N}" stroke-width="6" stroke-linejoin="round"/>`;
  s+=`<path d="M${x+18} ${top+4} L${x+34} ${top} Q${x+74} ${top+10} ${x+64} ${y-150} L${x+30} ${y-150}Z" fill="${N}" opacity=".13"/>`;
  s+=`<path d="M${x-26} ${top+2} L${x} ${top+30} L${x+26} ${top+2}" fill="${shade(p.c,1.18)}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>`;
  // Hals
  s+=`<rect x="${x-14}" y="${hy+40}" width="28" height="${top-hy-36}" fill="${sk}" stroke="${N}" stroke-width="5"/>`;
  // Haare hinten (lang)
  if(p.hair==='long') s+=`<path d="M${x-58} ${hy+92} Q${x-76} ${hy-66} ${x} ${hy-70} Q${x+76} ${hy-66} ${x+58} ${hy+92} Q${x} ${hy+70} ${x-58} ${hy+92}Z" fill="${p.hc}" stroke="${N}" stroke-width="6" stroke-linejoin="round"/>`;
  if(p.hair==='bun') s+=`<circle cx="${x}" cy="${hy-66}" r="26" fill="${p.hc}" stroke="${N}" stroke-width="6"/>`;
  if(p.hair==='ponytail') s+=`<path d="M${x+44} ${hy-30} Q${x+96} ${hy-10} ${x+80} ${hy+70} Q${x+66} ${hy+20} ${x+40} ${hy-6}Z" fill="${p.hc}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>`;
  if(p.hair==='curly') [[-46,-30],[-26,-54],[0,-62],[26,-54],[46,-30],[-54,-4],[54,-4]].forEach(([dx,dy])=>{s+=`<circle cx="${x+dx}" cy="${hy+dy}" r="22" fill="${p.hc}" stroke="${N}" stroke-width="5"/>`});
  // Ohren + Kopf
  s+=`<ellipse cx="${x-54}" cy="${hy+6}" rx="11" ry="15" fill="${sk}" stroke="${N}" stroke-width="5"/><ellipse cx="${x+54}" cy="${hy+6}" rx="11" ry="15" fill="${sk}" stroke="${N}" stroke-width="5"/>`;
  s+=`<ellipse cx="${x}" cy="${hy}" rx="54" ry="58" fill="${sk}" stroke="${N}" stroke-width="6"/>`;
  s+=`<ellipse cx="${x+20}" cy="${hy+8}" rx="34" ry="44" fill="${N}" opacity=".06"/>`;
  // Haare vorne
  if(p.hair==='short') s+=`<path d="M${x-56} ${hy-4} Q${x-58} ${hy-66} ${x} ${hy-64} Q${x+58} ${hy-66} ${x+56} ${hy-4} Q${x+44} ${hy-30} ${x+10} ${hy-30} Q${x-24} ${hy-36} ${x-34} ${hy-20} Q${x-44} ${hy-30} ${x-56} ${hy-4}Z" fill="${p.hc}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>`;
  if(p.hair==='long') s+=`<path d="M${x-54} ${hy-2} Q${x-52} ${hy-62} ${x} ${hy-62} Q${x+52} ${hy-62} ${x+54} ${hy-2} Q${x+30} ${hy-40} ${x-6} ${hy-36} Q${x-34} ${hy-30} ${x-54} ${hy-2}Z" fill="${p.hc}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>`;
  if(p.hair==='bun') s+=`<path d="M${x-54} ${hy-2} Q${x-50} ${hy-60} ${x} ${hy-60} Q${x+50} ${hy-60} ${x+54} ${hy-2} Q${x} ${hy-40} ${x-54} ${hy-2}Z" fill="${p.hc}" stroke="${N}" stroke-width="5"/>`;
  if(p.hair==='ponytail') s+=`<path d="M${x-54} ${hy-2} Q${x-52} ${hy-62} ${x} ${hy-62} Q${x+52} ${hy-62} ${x+54} ${hy-2} Q${x+20} ${hy-44} ${x-54} ${hy-2}Z" fill="${p.hc}" stroke="${N}" stroke-width="5"/>`;
  if(p.hair==='curly') [[-30,-44],[0,-50],[30,-44]].forEach(([dx,dy])=>{s+=`<circle cx="${x+dx}" cy="${hy+dy}" r="20" fill="${p.hc}"/>`});
  if(p.hair==='bald') s+=`<path d="M${x-56} ${hy+4} Q${x-60} ${hy-24} ${x-44} ${hy-30}" stroke="${p.hc}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M${x+56} ${hy+4} Q${x+60} ${hy-24} ${x+44} ${hy-30}" stroke="${p.hc}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  if(p.cap) s+=`<path d="M${x-56} ${hy-18} Q${x-54} ${hy-70} ${x} ${hy-70} Q${x+54} ${hy-70} ${x+56} ${hy-18}Z" fill="${p.cap}" stroke="${N}" stroke-width="5"/><path d="M${x+20} ${hy-20} L${x+92} ${hy-14}" stroke="${N}" stroke-width="16" stroke-linecap="round"/><path d="M${x+20} ${hy-20} L${x+90} ${hy-14}" stroke="${p.cap}" stroke-width="8" stroke-linecap="round"/>`;
  if(p.beard) s+=`<path d="M${x-48} ${hy+8} Q${x-46} ${hy+64} ${x} ${hy+66} Q${x+46} ${hy+64} ${x+48} ${hy+8} Q${x+30} ${hy+30} ${x} ${hy+26} Q${x-30} ${hy+30} ${x-48} ${hy+8}Z" fill="${p.beard}" stroke="${N}" stroke-width="5"/>`;
  if(p.stache) s+=`<path d="M${x-30} ${hy+16} Q${x-14} ${hy+4} ${x} ${hy+14} Q${x+14} ${hy+4} ${x+30} ${hy+16} Q${x+14} ${hy+24} ${x} ${hy+18} Q${x-14} ${hy+24} ${x-30} ${hy+16}Z" fill="${p.stache}" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>`;
  if(o.hat){const hc=o.hat==='white'?'#ffffff':'#2a2a2a';s+=`<g transform="translate(0 ${o.hatY||0})"><ellipse cx="${x}" cy="${hy-52}" rx="66" ry="14" fill="${hc}" stroke="${N}" stroke-width="6"/><path d="M${x-42} ${hy-54} L${x-38} ${hy-132} Q${x} ${hy-146} ${x+38} ${hy-132} L${x+42} ${hy-54}Z" fill="${hc}" stroke="${N}" stroke-width="6" stroke-linejoin="round"/><rect x="${x-41}" y="${hy-88}" width="82" height="16" fill="${o.hat==='white'?'#e4572e':'#ffc93c'}" stroke="${N}" stroke-width="4"/></g>`}
  // Gesicht
  const ex=(o.look!==undefined)?o.look:(o.shifty?7:0), sad=o.sad;
  s+=`<path d="M${x-30} ${hy-24} q12 ${o.shifty?4:-6} 24 0" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M${x+6} ${hy-24} q12 ${o.shifty?-2:-6} 24 0" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  [-18,18].forEach(dx=>{s+=`<ellipse cx="${x+dx}" cy="${hy-4}" rx="10" ry="12" fill="#fff" stroke="${N}" stroke-width="3"/><circle cx="${x+dx+ex}" cy="${hy-2}" r="6" fill="${N}"/><circle cx="${x+dx+ex+2}" cy="${hy-5}" r="2" fill="#fff"/>`});
  if(p.glasses) s+=`<circle cx="${x-18}" cy="${hy-4}" r="17" fill="none" stroke="${N}" stroke-width="5"/><circle cx="${x+18}" cy="${hy-4}" r="17" fill="none" stroke="${N}" stroke-width="5"/><line x1="${x-1}" y1="${hy-4}" x2="${x+1}" y2="${hy-4}" stroke="${N}" stroke-width="5"/>`;
  if(p.earring) s+=`<circle cx="${x-54}" cy="${hy+24}" r="6" fill="${Y}" stroke="${N}" stroke-width="3"/><circle cx="${x+54}" cy="${hy+24}" r="6" fill="${Y}" stroke="${N}" stroke-width="3"/>`;
  s+=`<path d="M${x-2} ${hy+6} q6 10 0 14" stroke="${shade(sk,0.7)}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  s+=`<circle cx="${x-32}" cy="${hy+18}" r="9" fill="#e4572e" opacity=".18"/><circle cx="${x+32}" cy="${hy+18}" r="9" fill="#e4572e" opacity=".18"/>`;
  if(!p.beard||o.grin) s+=o.grin?`<path d="M${x-20} ${hy+26} Q${x} ${hy+46} ${x+20} ${hy+26}" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/>`:o.shifty?`<path d="M${x-12} ${hy+32} q12 -6 24 2" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M${x-14} ${hy+30} q14 6 28 0" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if(o.crumbs){[[-26,36],[22,40],[4,46]].forEach(([dx,dy])=>s+=`<circle cx="${x+dx}" cy="${hy+dy}" r="5" fill="#8a4b2a"/>`)}
  if(o.tag!==false) s+=`<g transform="translate(${x} ${y+60})"><rect x="-90" y="-34" width="180" height="62" rx="16" fill="${W}" stroke="${N}" stroke-width="5"/>${F(p.n,0,12,{s:40})}</g>`;
  return s;}

// Feste Besetzung Knobelzeit (18 Figuren). Verwendung: PPL.A=CAST.lea usw.
const CAST={
 lea:{n:'LEA',c:'#e4572e',hair:'long',hc:'#7a4a2a',skin:'#f1c7a3',h:480,earring:1,info:'Studentin, neugierig, redet viel'},
 tom:{n:'TOM',c:'#2a9d8f',hair:'short',hc:'#d9a441',skin:'#f1c7a3',h:515,info:'Schüler, verplappert sich gern'},
 mehmet:{n:'MEHMET',c:'#f2a541',hair:'curly',hc:'#3b2a20',skin:'#e0a77f',h:505,info:'Bäcker, gutmütig'},
 jule:{n:'JULE',c:'#6b8e23',hair:'ponytail',hc:'#b5651d',skin:'#f6d2b5',h:485,info:'Sportlerin, schnell, ehrgeizig'},
 dragan:{n:'DRAGAN',c:'#c27c2c',hair:'short',hc:'#1a1a1a',skin:'#c68a64',h:520,info:'Tierpfleger, ruhig'},
 lars:{n:'LARS',c:'#3d7ea6',hair:'short',hc:'#e8c25a',skin:'#f1c7a3',h:505,cap:'#1d2540',info:'Kumpeltyp, immer eine Ausrede'},
 anna:{n:'ANNA',c:'#8e6bbf',hair:'bun',hc:'#2b1d14',skin:'#f1c7a3',h:490,glasses:1,info:'Lehrerin, genau, besserwisserisch'},
 peter:{n:'PETER',c:'#5c7cfa',hair:'short',hc:'#7a4a2a',skin:'#f6d2b5',h:530,glasses:1,info:'Nerd, liest ständig'},
 mia:{n:'MIA',c:'#ff7aa2',hair:'curly',hc:'#1a1a1a',skin:'#8d5a3b',h:480,earring:1,info:'Influencerin, filmt alles'},
 igor:{n:'IGOR',c:'#4caf50',hair:'curly',hc:'#c0392b',skin:'#f6d2b5',h:495,info:'Gärtner, verträumt'},
 zeynep:{n:'ZEYNEP',c:'#1d3557',hair:'long',hc:'#1a1a1a',skin:'#e0a77f',h:500,info:'Ärztin, sachlich'},
 ali:{n:'ALI',c:'#e76f51',hair:'short',hc:'#1a1a1a',skin:'#c68a64',h:525,beard:'#1a1a1a',info:'Taxifahrer, kennt jeden'},
 greta:{n:'GRETA',c:'#a8577e',hair:'bun',hc:'#d9d9d9',skin:'#f1c7a3',h:460,glasses:1,info:'Rentnerin, sieht alles vom Fenster aus'},
 hans:{n:'HANS',c:'#6d6875',hair:'bald',hc:'#bfbfbf',skin:'#f1c7a3',h:510,beard:'#d9d9d9',info:'Hausmeister, mürrisch'},
 mohammed:{n:'MOHAMMED',c:'#7209b7',hair:'short',hc:'#1a1a1a',skin:'#d19a6f',h:510,beard:'#1a1a1a',info:'Elektriker, hilfsbereit'},
 kemal:{n:'KEMAL',c:'#d62828',hair:'short',hc:'#1a1a1a',skin:'#d19a6f',h:515,cap:'#f5f5f5',stache:'#1a1a1a',info:'Dönerladen-Besitzer, kennt alle Stammkunden'},
 luigi:{n:'LUIGI',c:'#2d936c',hair:'short',hc:'#3b2a20',skin:'#e0a77f',h:500,stache:'#3b2a20',info:'Pizzabäcker, redet mit den Händen'},
 ayse:{n:'AYŞE',c:'#00b4d8',hair:'ponytail',hc:'#e8c25a',skin:'#f6d2b5',h:490,info:'Köchin, laut und herzlich'}
};


Object.assign(PPL,CAST);
module.exports={person,PPL,CAST,shade};
