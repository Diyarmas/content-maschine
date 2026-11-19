// Hintergruende und Requisiten (Szenen 1000 x 620, Bodenlinie ~ y 470)
const SW=1000, SH=620;
function wallFloor(o){o=o||{};const fl=o.fl||470;let s=`<rect width="1000" height="620" fill="${o.wall||G1}"/>`;
  if(o.wallpaper)for(let i=0;i<26;i++)s+=`<line x1="${i*40}" y1="0" x2="${i*40}" y2="${fl}" stroke="${G2}" stroke-width="${o.wallpaper}" />`;
  s+=`<rect y="${fl}" width="1000" height="${620-fl}" fill="${o.floor||G2}"/>`+L(`M0 ${fl} H1000`,3.4);
  if(o.boards!==false)for(let i=0;i<14;i++)s+=L(`M${i*95-30} ${fl} L${i*95-130+ (i-7)*14} 620`,1.4,G3);
  if(o.tiles){for(let j=0;j<5;j++)s+=L(`M0 ${fl+j*34+10} H1000`,1.2,G3)}
  return s}
function win(x,y,w,h,o){o=o||{};let s=P(`M${x} ${y} h${w} v${h} h${-w}Z`,o.glass||'#E6F5FD',3.4);
  s+=hatch(x,y,w,h,.07);
  if(o.cross!==false)s+=L(`M${x+w/2} ${y} v${h} M${x} ${y+h/2} h${w}`,3);
  if(o.sill!==false)s+=P(`M${x-12} ${y+h} h${w+24} v14 h${-(w+24)}Z`,G3,3);
  if(o.curtain)s+=P(`M${x-6} ${y-4} q18 ${h/2} 0 ${h+4} h26 q-12 ${-h/2} 0 ${-h-4}Z`,G3,2.6)+P(`M${x+w+6} ${y-4} q-18 ${h/2} 0 ${h+4} h-26 q12 ${-h/2} 0 ${-h-4}Z`,G3,2.6);
  return s}
function cupboard(x,y,w,h,n){n=n||2;let s=P(`M${x} ${y} h${w} v${h} h${-w}Z`,G2,3.2);for(let i=1;i<n;i++)s+=L(`M${x+w/n*i} ${y} v${h}`,2.6);for(let i=0;i<n;i++)s+=`<circle cx="${x+w/n*(i+1)-10-(i%2?w/n-20:0)}" cy="${y+h/2}" r="4.4" fill="${INK}"/>`;return s}
function tableP(x,y,w,h,o){o=o||{};let s=P(`M${x} ${y} h${w} v14 h${-w}Z`,o.top||G3,3.4)+P(`M${x+14} ${y+14} h12 v${h-14} h-12Z M${x+w-26} ${y+14} h12 v${h-14} h-12Z`,G4,3);
  if(o.cloth)s+=P(`M${x-6} ${y} h${w+12} v24 q${-(w+12)/8} 10 ${-(w+12)/4} 0 t${-(w+12)/4} 0 t${-(w+12)/4} 0 t${-(w+12)/4} 0Z`,o.cloth,3);return s}
function counter(x,y,w,h,o){o=o||{};return P(`M${x} ${y} h${w} v${h} h${-w}Z`,o.c||G3,3.4)+P(`M${x-8} ${y-14} h${w+16} v16 h${-(w+16)}Z`,o.top||G1,3.4)+hatch(x,y,w,h,.08)}
function lamp(x,y,s2){s2=s2||1;return L(`M${x} 0 V${y}`,3)+P(`M${x-26*s2} ${y+30*s2} Q${x} ${y-8*s2} ${x+26*s2} ${y+30*s2}Z`,G3,3.2)}
function plant(x,y,sc){sc=sc||1;return `<g transform="translate(${x} ${y}) scale(${sc})">`+P('M-18 0 h36 l-6 -34 h-24Z',G4,3)+L('M0 -34 q-30 -30 -34 -62 M0 -34 q4 -40 -6 -76 M0 -34 q30 -26 36 -60',3)+P('M-34 -96 q-14 -14 2 -24 q16 6 6 22Z M-6 -110 q-12 -16 4 -26 q14 8 4 24Z M36 -94 q-8 -18 10 -24 q14 10 0 26Z',G3,2.8)+'</g>'}
function clockP(x,y,r,h,m,o){o=o||{};let s=C(x,y,r,'#fff',3.6);
  for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=L(`M${x+Math.sin(a)*(r-4)} ${y-Math.cos(a)*(r-4)} L${x+Math.sin(a)*(r-(i%3?10:16))} ${y-Math.cos(a)*(r-(i%3?10:16))}`,i%3?2:3.4)}
  if(o.nums!==false&&r>40)['12','3','6','9'].forEach((t,i)=>{const a=i*Math.PI/2;s+=`<text x="${x+Math.sin(a)*(r-28)}" y="${y-Math.cos(a)*(r-28)+7}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="${r*0.24}" fill="${INK}">${t}</text>`});
  const ha=((h%12)+m/60)*Math.PI/6, ma=m*Math.PI/30;
  s+=L(`M${x} ${y} L${x+Math.sin(ha)*r*0.5} ${y-Math.cos(ha)*r*0.5}`,Math.max(5,r*0.09))+L(`M${x} ${y} L${x+Math.sin(ma)*r*0.78} ${y-Math.cos(ma)*r*0.78}`,Math.max(3.4,r*0.06))+C(x,y,r*0.07,INK,0);return s}
function sign(x,y,w,h,txt,o){o=o||{};const fs=o.fs||22;const lines=txt.split('|');let s=P(`M${x} ${y} h${w} v${h} h${-w}Z`,o.bg||'#fff',3.4);
  lines.forEach((l,i)=>{s+=`<text x="${x+w/2}" y="${y+h/2+(i-(lines.length-1)/2)*fs*1.25+fs*0.35}" text-anchor="middle" font-family="${o.font||'Lora'}" ${o.italic?'font-style="italic"':''} font-weight="${o.bold?700:500}" font-size="${fs}" fill="${INK}">${l}</text>`});return s}
function bunting(y0,n,cols){let s=`<path d="M-20 ${y0} Q500 ${y0+60} 1020 ${y0}" fill="none" stroke="${G4}" stroke-width="3"/>`;
  for(let i=0;i<n;i++){const t=(i+0.5)/n,x=-20+1040*t,y=y0+60*2*t*(1-t)*0.5*2*0.5+ (y0*0);const yy=y0+ 60*(2*t*(1-t));s+=`<path d="M${x-22} ${yy-2} l22 40 l22 -40Z" fill="${(cols||[YEL,G4,G2])[i%3]}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`}return s}
function house(x,y,w,h,o){o=o||{};let s=P(`M${x} ${y} h${w} v${h} h${-w}Z`,o.c||G2,3.4)+hatch(x,y,w,h,.05);
  if(o.roof!==false)s+=P(`M${x-14} ${y} L${x+w/2} ${y-(o.rh||70)} L${x+w+14} ${y}Z`,'#C8593F',3.4);
  const rows=o.rows||2,cols=o.cols||3;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const ww=w/(cols*2),wx=x+ww*0.5+c*w/cols+ww*0.2;s+=P(`M${wx} ${y+18+r*(h-30)/rows} h${ww} v${(h-30)/rows-26} h${-ww}Z`,'#fff',2.8)+L(`M${wx+ww/2} ${y+18+r*(h-30)/rows} v${(h-30)/rows-26}`,2)}
  return s}
function tree(x,y,sc,o){o=o||{};sc=sc||1;return `<g transform="translate(${x} ${y}) scale(${sc})">`+P('M-10 0 h20 v-90 h-20Z',G4,3.2)+C(0,-130,62,o.c||'#7CC468',3.4)+C(-44,-100,40,o.c||'#6BB85A',3.2)+C(46,-104,42,o.c||'#8DD076',3.2)+'</g>'}
function bench(x,y,w){return P(`M${x} ${y} h${w} v14 h${-w}Z`,G4,3.2)+P(`M${x+10} ${y-40} h${w-20} v16 h${-(w-20)}Z`,G4,3.2)+L(`M${x+16} ${y+14} v34 M${x+w-16} ${y+14} v34`,6,G5)}
function cakeP(x,y,sc,o){o=o||{};sc=sc||1;let s=`<g transform="translate(${x} ${y}) scale(${sc})">`;
  s+=P('M-60 0 v-34 q60 -16 120 0 v34 q-60 12 -120 0Z',G5,3.2)+P('M-60 -34 q60 -16 120 0 q-60 16 -120 0Z',G4,3);
  if(o.piece)s+=P('M0 -34 L58 -26 L40 -10Z',G1,2.6);
  s+=L('M-34 -52 q-6 -14 4 -24 M-10 -54 q-6 -14 4 -24 M14 -54 q-6 -14 4 -24',2.4,G4)+'</g>';return s}
function pizzaP(x,y,r,slices,o){o=o||{};let s=C(x,y,r,G2,3.6)+C(x,y,r*0.84,G1,2);const n=slices||8;
  for(let i=0;i<n;i++){const a=i*2*Math.PI/n;s+=L(`M${x} ${y} L${x+Math.cos(a)*r} ${y+Math.sin(a)*r}`,2.4)}
  [[0.4,0.3],[-0.3,0.5],[0.1,-0.5],[-0.5,-0.2],[0.55,-0.2]].forEach(([a,b])=>s+=C(x+a*r,y+b*r,r*0.09,G4,2));return s}
function doener(x,y,sc){return `<g transform="translate(${x} ${y}) scale(${sc||1})">`+P('M-30 0 q30 -10 60 0 l-8 -40 h-44Z',G2,3)+P('M-36 -42 q36 -26 72 0 q-36 8 -72 0Z',G4,3)+L('M-20 -34 l6 10 M0 -36 l4 12 M16 -34 l-2 10',2.4,G3)+'</g>'}
function grill(x,y,sc){return `<g transform="translate(${x} ${y}) scale(${sc||1})">`+P('M-70 0 h140 v-60 h-140Z',G4,3.4)+P('M-50 -60 h100 v-20 h-100Z',G2,3)+L('M-40 -80 v-34 M0 -80 v-30 M40 -80 v-34',6,G5)+hatch(-70,-60,140,60,.12)+'</g>'}
function ovenP(x,y,sc){return `<g transform="translate(${x} ${y}) scale(${sc||1})">`+P('M-80 0 h160 v-150 h-160Z',G3,3.4)+P('M-60 -120 h120 v70 h-120Z',G1,3)+C(0,-85,24,G4,3)+C(-52,-138,6,INK,0)+C(-30,-138,6,INK,0)+C(30,-138,6,INK,0)+C(52,-138,6,INK,0)+'</g>'}
function keypad(x,y,sc,o){o=o||{};let s=`<g transform="translate(${x} ${y}) scale(${sc||1})">`+R(-30,-44,60,96,G5,8,3.4)+R(-22,-36,44,18,G2,3,2.4);
  for(let i=0;i<9;i++)s+=C(-16+(i%3)*16,-4+Math.floor(i/3)*16,5.4,G1,2);return s+'</g>'}
function moon(x,y,r){return C(x,y,r,'#fff',3.4)+`<path d="M${x+r*0.3} ${y-r} a${r} ${r} 0 1 0 0 ${2*r} a${r*0.7} ${r} 0 1 1 0 ${-2*r}Z" fill="${G2}" opacity=".0"/>`}
function stars(n,seed){let s='',r=seed||7;for(let i=0;i<n;i++){r=(r*9301+49297)%233280;const x=r/233280*1000;r=(r*9301+49297)%233280;const y=r/233280*300;s+=`<path d="M${x} ${y-6} l2 4 l4 .6 l-3 3 l.8 4.4 l-3.8 -2 l-3.8 2 l.8 -4.4 l-3 -3 l4 -.6Z" fill="#fff" opacity=".8"/>`}return s}
function bag(x,y,sc,txt){return `<g transform="translate(${x} ${y}) scale(${sc||1})">`+P('M-26 0 h52 l-6 -56 h-40Z',G2,3)+L('M-16 -56 q16 -22 32 0',3)+'</g>'}
function bottle(x,y,sc){return `<g transform="translate(${x} ${y}) scale(${sc||1})">`+P('M-14 0 h28 v-60 q0 -10 -8 -14 v-18 h-12 v18 q-8 4 -8 14Z','#fff',3)+`<rect x="-14" y="-40" width="28" height="30" fill="${G2}" opacity=".7"/>`+P('M-8 -92 h16 v-8 h-16Z',G4,2.6)+'</g>'}
function bubbleTxt(x,y,txt,o){o=o||{};const w=o.w||200,h=o.h||60;return P(`M${x} ${y} h${w} v${h} h${-w}Z`,'#fff',3.2)+`<text x="${x+w/2}" y="${y+h/2+8}" text-anchor="middle" font-family="Lora" font-size="${o.fs||22}" fill="${INK}">${txt}</text>`}

// ---------- komplette Raeume ----------
function bgKitchen(o){o=o||{};let s=wallFloor({wall:G1,floor:G2,tiles:1});
  s+=win(600,60,300,230,{curtain:1,sill:0});
  s+=P('M570 290 h360 v18 h-360Z',G3,3.4);
  s+=cupboard(40,80,240,150,2)+cupboard(30,340,310,130,3)+P('M16 326 h338 v18 h-338Z',G1,3.4);
  s+=clockP(470,120,44,3,12);
  s+=P('M380 470 h180 v14 h-180Z',G4,3);
  return s}
function bgLiving(o){let s=wallFloor({wall:G1,floor:G2,wallpaper:1.2});
  s+=win(60,70,230,240,{curtain:1})+P('M560 300 h330 v170 h-330Z',G3,3.4)+hatch(560,300,330,170,.1)+P('M545 290 h360 v22 h-360Z',G4,3.4);
  s+=P('M590 120 h260 v120 h-260Z','#fff',3.4)+L('M600 220 l50 -60 l36 36 l30 -40 l70 64',3,G4)+P('M370 80 q28 -12 56 0 v60 h-56Z',G2,3);
  s+=clockP(420,110,40,2,20)+'</g>'+plant(930,470,1.2);
  return s}
function bgDoener(o){let s=wallFloor({wall:G1,floor:G2,tiles:1});
  s+=P('M0 142 h1000 v52 h-1000Z',G6,0)+`<text x="500" y="180" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" fill="#fff" letter-spacing="8">${(o&&o.name)||'DIETERS DÖNER'}</text>`;
  s+=grill(180,400,1.6)+counter(430,340,450,130)+P('M470 300 h130 v40 h-130Z',G5,3.2)+R(640,296,70,44,G4,5,3.2);
  s+=tableP(60,400,200,90,{cloth:G1});
  return s}
function bgStreet(o){o=o||{};let s=`<rect width="1000" height="620" fill="${o.sky||'#DDF1FB'}"/>`;
  s+=house(20,130,300,340,{rows:3,cols:3,c:'#F2B8A0'})+house(340,170,280,300,{rows:3,cols:3,c:'#F6D77A'})+house(640,110,340,360,{rows:3,cols:3,c:'#A9D0E8'});
  s+=`<rect y="470" width="1000" height="150" fill="#B3BCC6"/>`+L('M0 470 H1000',3.4)+`<rect y="470" width="1000" height="26" fill="#DDD2BC"/>`+L('M0 496 H1000',2.6);
  for(let i=0;i<10;i++)s+=L(`M${i*120+20} 560 h70`,4,G0);
  return s}
function bgTrain(o){let s=`<rect width="1000" height="620" fill="${G3}"/>`;
  s+=P('M0 0 h1000 v90 h-1000Z',G2,0)+`<rect y="470" width="1000" height="150" fill="${G4}"/>`+L('M0 470 H1000',3.4);
  s+=P('M300 80 h400 v250 h-400Z',(o&&o.tunnel)?G6:'#fff',4)+(o&&o.tunnel?`<circle cx="360" cy="140" r="4" fill="#fff"/><circle cx="600" cy="230" r="3" fill="#fff"/><circle cx="470" cy="180" r="3" fill="#fff"/>`:L('M320 280 q60 -100 130 -40 t140 -30 t90 -30',4,G3))+L('M500 80 v250',4);
  s+=P('M60 330 h180 v100 h-180Z',G4,3.4)+P('M760 330 h180 v100 h-180Z',G4,3.4)+P('M300 400 h400 v20 h-400Z',G2,3.4)+P('M310 420 h380 v50 h-380Z',G4,3);
  return s}
function bgGarden(o){o=o||{};let s=`<rect width="1000" height="620" fill="#DDF1FB"/>`;
  s+=`<circle cx="840" cy="100" r="52" fill="#FFD84D"/>`+Array.from({length:12}).map((_,i)=>L(`M${840+Math.cos(i*Math.PI/6)*66} ${100+Math.sin(i*Math.PI/6)*66} l${Math.cos(i*Math.PI/6)*24} ${Math.sin(i*Math.PI/6)*24}`,4,'#F2A93B')).join('');
  s+=`<rect y="420" width="1000" height="200" fill="#9ED37A"/>`+L('M0 420 H1000',3.4);
  s+=P('M0 300 h1000 v120 h-1000Z','#6FB35A',0)+Array.from({length:28}).map((_,i)=>P(`M${i*38} 310 h28 v110 h-28Z`,G1,2.6)).join('');
  s+=tree(120,430,1.2)+tree(880,430,1.1)+bunting(70,12);
  return s}
function bgBath(o){let s=wallFloor({wall:G1,floor:G2,tiles:1});
  for(let i=0;i<25;i++)for(let j=0;j<7;j++)s+=`<rect x="${i*40}" y="${j*40+120}" width="40" height="40" fill="none" stroke="${G2}" stroke-width="1.4"/>`;
  s+=P('M400 120 h200 v250 h-200Z','#fff',4)+P('M410 130 h180 v230 h-180Z',G2,2)+hatch(410,130,180,230,.12)+P('M380 370 h240 v34 q-120 16 -240 0Z',G1,3.4);
  s+=P('M60 400 h180 v70 h-180Z',G1,3.4)+P('M120 320 h60 v80 h-60Z',G3,3.2);
  return s}
function bgLibrary(o){let s=wallFloor({wall:G1,floor:G3,boards:false});
  for(let k=0;k<4;k++){const x=20+k*250;s+=P(`M${x} 60 h220 v410 h-220Z`,G4,3.4);for(let r=0;r<5;r++){s+=L(`M${x} ${130+r*68} h220`,3);for(let b=0;b<9;b++)s+=`<rect x="${x+8+b*23+(r%2)*4}" y="${70+r*68+(b%3)*5}" width="${14+(b%3)*3}" height="${56-(b%3)*5}" fill="${[G1,G2,G3,G5][(b+r)%4]}" stroke="${INK}" stroke-width="1.8"/>`}}
  s+=win(780,110,170,200,{sill:0});
  return s}
function bgPizzeria(o){let s=wallFloor({wall:G1,floor:G2,tiles:1});
  s+=P('M0 142 h1000 v58 h-1000Z',G5,0)+`<text x="500" y="181" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="30" fill="#fff" letter-spacing="8">PIZZERIA LUIGI</text>`;
  s+=ovenP(150,410,1.3)+counter(400,360,350,110)+tableP(780,400,200,90,{cloth:G1})+win(420,212,220,140,{sill:0,curtain:1});
  return s}
function bgBakery(o){let s=wallFloor({wall:G1,floor:G2,tiles:1});
  s+=P('M0 142 h1000 v58 h-1000Z',G5,0)+`<text x="500" y="181" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="30" fill="#fff" letter-spacing="8">BÄCKEREI</text>`;
  s+='<g transform="translate(0 110)">';for(let k=0;k<3;k++){s+=P(`M${40+k*140} 100 h120 v200 h-120Z`,G3,3.2)+L(`M${40+k*140} 170 h120 M${40+k*140} 240 h120`,3);for(let r=0;r<3;r++)for(let b=0;b<3;b++)s+=E(`${62+k*140+b*34}`,`${156+r*70}`,15,10,G1,2.4)}
  s+=counter(540,350,420,120)+P('M560 290 h140 v60 h-140Z','#fff',3)+hatch(560,290,140,60,.08);
  return s}
function bgMarket(o){let s=`<rect width="1000" height="620" fill="#DDF1FB"/>`;
  s+=P('M200 140 h300 v330 h-300Z',G2,3.4)+P('M180 140 L350 50 L520 140Z',G4,3.4)+clockP(350,200,46,(o&&o.h)||4,(o&&o.m!=null)?o.m:15)+P('M320 380 h60 v90 h-60Z',G4,3.2);
  for(let r=0;r<2;r++)for(let c=0;c<4;c++)s+=P(`M${224+c*66} ${270+r*70} h40 v50 h-40Z`,'#fff',2.8);
  s+=`<rect y="470" width="1000" height="150" fill="#D9CDB8"/>`+L('M0 470 H1000',3.4);
  s+=house(600,190,380,280,{rows:3,cols:4,c:'#F2B8A0',rh:60})+tree(90,470,1.1);
  if(!o||o.stalls!==false){for(let k=0;k<2;k++){const x=520+k*200;}}
  return s}
function bgSchool(o){let s=wallFloor({wall:G1,floor:G3,boards:false});
  s+=P('M60 60 h880 v60 h-880Z',G4,0)+`<text x="500" y="104" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" fill="#fff" letter-spacing="6">${(o&&o.t)||'SCHULE'}</text>`;
  s+=P('M120 180 h240 v290 h-240Z',G4,3.4)+P('M640 180 h240 v290 h-240Z',G4,3.4)+L('M240 180 v290 M760 180 v290',3);
  return s}
function bgCinema(o){let s=`<rect width="1000" height="620" fill="#5A2330"/>`;
  s+=P('M0 138 h1000 v84 h-1000Z',G6,0)+`<text x="500" y="196" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="40" fill="#fff" letter-spacing="14">KINO</text>`;
  s+=`<rect y="470" width="1000" height="150" fill="${G4}"/>`+L('M0 470 H1000',3.4);
  s+=P('M100 240 h330 v230 h-330Z',G2,3.4)+P('M570 240 h330 v230 h-330Z',G2,3.4);
  return s}
function bgNight(o){let s=`<rect width="1000" height="620" fill="#1F2A4D"/>`+stars(40,11)+moon(850,90,42);
  s+=`<rect y="470" width="1000" height="150" fill="#34426B"/>`+L('M0 470 H1000',3.4,'#5A6A99');return s}
function bgBurg(o){let s=`<rect width="1000" height="620" fill="${G4}"/>`;
  for(let j=0;j<8;j++)for(let i=0;i<12;i++)s+=`<rect x="${i*90-(j%2)*45}" y="${j*60}" width="90" height="60" fill="none" stroke="${G5}" stroke-width="2.6"/>`;
  s+=`<rect y="470" width="1000" height="150" fill="${G5}"/>`+L('M0 470 H1000',3.4);
  return s}
function bgClass(o){let s=wallFloor({wall:G1,floor:G3,boards:false});
  s+=P('M120 80 h400 v210 h-400Z',G5,4)+P('M120 290 h400 v14 h-400Z',G3,3)+win(680,90,240,200,{sill:0})+clockP(580,70,0.1,1,1,{nums:false});
  s+=tableP(80,420,300,80)+tableP(560,430,300,80);return s}
function bgBasement(o){let s=`<rect width="1000" height="620" fill="${G4}"/>`;
  for(let j=0;j<9;j++)for(let i=0;i<13;i++)s+=`<rect x="${i*80-(j%2)*40}" y="${j*55}" width="80" height="55" fill="none" stroke="${G5}" stroke-width="2.4"/>`;
  s+=`<rect y="470" width="1000" height="150" fill="${G3}"/>`+L('M0 470 H1000',3.4);return s}
function bgMountain(o){let s=`<rect width="1000" height="620" fill="#CFE9F8"/>`;
  s+=P('M-20 470 L220 160 L340 300 L470 90 L720 420 L820 280 L1020 470Z','#8FA3B8',3.6)+P('M470 90 L400 190 L450 175 L480 215 L520 170 L560 200 Z','#fff',3);
  s+=`<rect y="470" width="1000" height="150" fill="#9ED37A"/>`+L('M0 470 H1000',3.4);return s}
function bgHall(o){let s=wallFloor({wall:G1,floor:G3,boards:false});
  s+=bunting(60,14)+win(60,100,160,230,{sill:0})+win(780,100,160,230,{sill:0});
  s+=tableP(300,380,400,90,{cloth:G1});return s}
function bgStage(o){let s=`<rect width="1000" height="620" fill="#3C2A55"/>`;
  s+=P('M0 0 q80 200 70 470 h-70Z','#C8344A',3.4)+P('M1000 0 q-80 200 -70 470 h70Z','#C8344A',3.4)+`<rect y="470" width="1000" height="150" fill="${G4}"/>`+L('M0 470 H1000',3.4)+bunting(30,0);
  s+=P('M380 140 h240 v330 h-240Z',G2,3.4)+`<path d="M380 140 q120 -40 240 0" fill="${G3}" stroke="${INK}" stroke-width="3"/>`;return s}
function bgDark(o){return wallFloor({wall:G3,floor:G4})}
