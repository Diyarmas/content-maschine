// Szenen (SVG viewBox 1000 x 640)
function kitchen(){let s=`<rect width="1000" height="640" fill="${G1}"/>`;
  // Wand-Fliesen + Boden
  for(let i=0;i<20;i++)for(let j=0;j<5;j++)s+=`<rect x="${i*52}" y="${300+j*0}" width="0" height="0"/>`;
  s+=`<rect y="470" width="1000" height="170" fill="${G2}"/>`+L('M0 470 H1000',3);
  for(let i=0;i<12;i++)s+=L(`M${i*95} 470 L${i*95-60} 640`,1.4,G3);
  // Fenster mit Fensterbank und Kuchen
  s+=P('M600 70 h300 v230 h-300Z','#ffffff')+L('M750 70 v230 M600 185 h300',3)+hatch(600,70,300,230,.06);
  s+=P('M585 300 h330 v18 h-330Z',G3);
  s+=P('M700 268 q50 -26 100 0 v26 q-50 14 -100 0Z',G5)+P('M700 268 q50 -26 100 0 q-50 18 -100 0Z',G4,2.6);
  s+=P('M752 256 L800 268 L770 283Z',G2,2.2); // fehlendes Stueck (Anschnitt)
  s+=L('M720 250 q-6 -14 4 -24 M745 246 q-6 -14 4 -24',2,G4);
  // Kuechenschrank links
  s+=P('M40 120 h230 v130 h-230Z',G2)+L('M155 120 v130',2.6)+`<circle cx="140" cy="185" r="5" fill="${INK}"/><circle cx="170" cy="185" r="5" fill="${INK}"/>`;
  s+=P('M20 360 h300 v110 h-300Z',G3)+P('M10 345 h320 v18 h-320Z',G2);
  return s}
