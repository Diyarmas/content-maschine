// Figur mit Mimik: mood nervous|calm|neutral, talk (0/1), t (Zeit)
function mface(x,y,k,sc,t,o={}){
  const mood=o.mood||'neutral',H=PPL[k].h,hy=y-H+58,sk=PPL[k].skin;
  const bob=Math.sin(t*2.2+x)*3, jit=mood==='nervous'?Math.sin(t*38)*2.2:0;
  let s=person(0,0,k,{tag:false,arm:o.arm||'down',shifty:mood==='nervous'}).replace(/^/,'');
  // Overlay (lokale Koordinaten, Figur bei x=0,y=0)
  const hyL=-H+58; let ov='';
  const bl=(t%3.3)<0.13||(o.blink&&0);
  const calm=mood==='calm';
  if(bl||calm){ // Lider
    const lh=bl?13:7;
    [-18,18].forEach(dx=>{ov+=`<path d="M${dx-12} ${hyL-4-12} L${dx+12} ${hyL-4-12} L${dx+12} ${hyL-4-12+lh*2} Q${dx} ${hyL-4-12+lh*2+(bl?4:2)} ${dx-12} ${hyL-4-12+lh*2}Z" fill="${sk}" stroke="${N}" stroke-width="${bl?4:3}"/>`});
  }
  // Brauen neu
  ov+=`<ellipse cx="0" cy="${hyL-26}" rx="40" ry="8" fill="${sk}"/>`;
  if(mood==='nervous'){const w=Math.sin(t*9)*2;ov+=`<path d="M-32 ${hyL-24+w} L-8 ${hyL-34}" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M32 ${hyL-24-w} L8 ${hyL-34}" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/>`}
  else if(calm)ov+=`<path d="M-32 ${hyL-20} q12 -4 24 -2" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M8 ${hyL-22} q12 -2 24 2" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  else ov+=`<path d="M-30 ${hyL-24} q12 -6 24 0" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M6 ${hyL-24} q12 -6 24 0" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  // Mund neu (Altmund überdecken)
  ov+=`<ellipse cx="0" cy="${hyL+31}" rx="26" ry="12" fill="${sk}"/>`;
  const op=o.talk?(0.3+0.7*Math.abs(Math.sin(t*13))):0;
  if(op>0)ov+=`<ellipse cx="0" cy="${hyL+32}" rx="${11+op*5}" ry="${3+op*10}" fill="#7a1f1f" stroke="${N}" stroke-width="4"/>`;
  else if(mood==='nervous')ov+=`<path d="M-14 ${hyL+34} q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 6 0" stroke="${N}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  else if(calm)ov+=`<path d="M-17 ${hyL+30} Q0 ${hyL+44} 19 ${hyL+27}" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  else ov+=`<path d="M-14 ${hyL+32} q14 6 28 0" stroke="${N}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  // Schweiß
  if(mood==='nervous'){[[-62,0],[60,0.5]].forEach(([dx,ph])=>{const f=((t*0.9+ph)%1);ov+=`<path d="M${dx} ${hyL-40+f*70} q-9 16 0 24 q9 -8 0 -24Z" fill="#5aa0ff" stroke="${N}" stroke-width="2.5" opacity="${1-f*0.9}"/>`});
    ov+=`<path d="M-4 ${hyL-62} q-8 14 0 20 q8 -6 0 -20Z" fill="#5aa0ff" stroke="${N}" stroke-width="2.5"/>`}
  return `<g transform="translate(${x+jit} ${y+bob}) scale(${sc})">${s}<g>${ov}</g></g>`;
}
function kbg(){let s=`<rect width="1080" height="1920" fill="${CFG.bg||"#e9e2f2"}"/><rect y="1290" width="1080" height="630" fill="#cdbfa3"/><line x1="0" y1="1290" x2="1080" y2="1290" stroke="${N}" stroke-width="8"/>`;
  for(let i=0;i<9;i++)s+=`<line x1="${i*135}" y1="1290" x2="${i*135-120}" y2="1920" stroke="#b9aa8b" stroke-width="3"/>`;
  return s}
// Tisch VOR den Figuren: Platte y, Front bis y+210
function ktable(y,cake){let s=`<rect x="40" y="${y}" width="1000" height="42" rx="12" fill="#9a6e44" stroke="${N}" stroke-width="6"/><rect x="60" y="${y+42}" width="960" height="200" fill="#6b4a2f" stroke="${N}" stroke-width="6"/><rect x="60" y="${y+42}" width="960" height="30" fill="${N}" opacity=".2"/>`;
  s+=`<ellipse cx="540" cy="${y+8}" rx="150" ry="24" fill="${W}" stroke="${N}" stroke-width="5"/>`;
  if(cake)s+=`<rect x="450" y="${y-70}" width="180" height="70" rx="14" fill="#f4a8c2" stroke="${N}" stroke-width="5"/><rect x="450" y="${y-70}" width="180" height="22" rx="10" fill="#fff" stroke="${N}" stroke-width="5"/><circle cx="540" cy="${y-88}" r="14" fill="#d62828" stroke="${N}" stroke-width="4"/>`;
  else s+=`<g><circle cx="500" cy="${y-2}" r="6" fill="#f4a8c2"/><circle cx="565" cy="${y+2}" r="5" fill="#f4a8c2"/><circle cx="595" cy="${y-4}" r="4" fill="#f4a8c2"/></g>`;
  return s}

const CK=CFG.cast.map(k=>k);PPL.P0=CAST[CK[0]];PPL.P1=CAST[CK[1]];PPL.P2=CAST[CK[2]];
const WXS=[200,540,880],KEYS=['P0','P1','P2'];
function knames(y){let s='';WXS.forEach((x,j)=>{s+=`<g transform="translate(${x} ${y})"><rect x="-130" y="-34" width="260" height="68" rx="18" fill="${W}" stroke="${N}" stroke-width="5"/>${F(PPL[KEYS[j]].n,0,14,{s:PPL[KEYS[j]].n.length>7?34:42,c:N,st:0})}</g>`});return s}
function kfrage(t){return `<g transform="translate(540 150)"><rect x="-480" y="-62" width="960" height="124" rx="34" fill="${N}" stroke="${N}" stroke-width="6"/>${F(CFG.q,0,22,{s:CFG.q.length>28?50:58,c:Y})}</g>`}
function kcast(t,moods,talk,hl){let s='';KEYS.forEach((k,j)=>{s+=mface(WXS[j],1400,k,1.2*(hl===j?1.08:1),t,{mood:moods[j],talk:talk===j,arm:hl===j?'up':'down'})});return s}
function scene(t,moods,talk,hl){return kbg()+kcast(t,moods,talk,hl)+ktable(1180,false)+knames(1330)}
K.khook=(t,d,o)=>{let s=kbg()+kfrage(t);
  s+=`<g transform="translate(540 380) rotate(-2) scale(${PB(t,0,0.35)})">${F(CFG.hook[0],0,0,{s:CFG.hook[0].length>14?100:120,c:R,st:9})}${F(CFG.hook[1],0,115,{s:CFG.hook[1].length>16?72:84,c:R,st:8})}</g>`;
  s+=stamp(540,640,CFG.rule,PB(t,0.15,0.35),{w:860,bg:N,c:Y,s:CFG.rule.length>22?48:58,rot:2});
  s+=kcast(t,CFG.moods,-1,-1)+ktable(1180,false);
  WXS.forEach((x,j)=>{const kk=['n1','n2','n3'][j];s+=numc(x,1250,j+1,1+0.25*Math.max(0,1-Math.abs(t-ev(o,kk))*4))});
  return s+knames(1330)};
K.krehook=(t,d,o)=>{const z=1+0.04*t;let s=`<g transform="translate(540 1100) scale(${z}) translate(-540 -1100)">`+scene(t,CFG.moods,-1,-1)+`</g>`+kfrage(t);
  s+=`<g transform="translate(540 470) rotate(-3) scale(${PB(t,0,0.35)})">${F(CFG.re[0],0,0,{s:CFG.re[0].length>16?80:96,c:R,st:9})}${F(CFG.re[1],0,100,{s:CFG.re[1].length>18?70:84,c:R,st:8})}</g>`;
  return s};
K.kq=(t,d,o)=>{const i=(o.scene||{}).hl||0;const txt=CFG.says[i];const z=1+0.035*t;
  let s=`<g transform="translate(540 1100) scale(${z}) translate(-540 -1100)">`+scene(t,CFG.moods,t<2.6?i:-1,i)+`</g>`+kfrage(t);
  s+=numc(130,470,i+1,PB(t,0,0.3));
  {const sx=WXS[i],H=PPL[KEYS[i]].h,tipY=(-H-2)*1.296+1400-30;const w=Math.min(960,Math.max(600,txt.length*36));const cx=Math.max(40+w/2,Math.min(1040-w/2,sx)),by=Math.min(640,tipY-110);
   const p=PB(t,0.12,0.35),tx=Math.max(cx-w/2+60,Math.min(cx+w/2-60,sx));
   s+=`<g transform="translate(${sx} ${tipY}) scale(${p}) translate(${-sx} ${-tipY})"><path d="M${tx-34} ${by+60} L${sx} ${tipY} L${tx+34} ${by+60}Z" fill="${W}" stroke="${N}" stroke-width="6" stroke-linejoin="round"/><rect x="${cx-w/2}" y="${by-62}" width="${w}" height="124" rx="34" fill="${W}" stroke="${N}" stroke-width="6"/><rect x="${tx-30}" y="${by+50}" width="60" height="16" fill="${W}"/>${F(txt,cx,by+22,{s:txt.length>20?52:64})}</g>`}
  return s};
K.kask=(t,d,o)=>{let s=`<rect width="1080" height="1920" fill="${Y}"/>`;
  s+=`<g transform="translate(540 330) scale(${PB(t,0,0.35)})">${F(CFG.ask[0],0,-30,{s:100,c:R,st:8})}${F(CFG.ask[1],0,90,{s:CFG.ask[1].length>15?80:90,c:R,st:8})}</g>`;
  KEYS.forEach((k,j)=>{s+=mface(WXS[j],1285,k,0.95,t,{mood:CFG.moods[j]})+numc(WXS[j],1375,j+1,1)});
  let cur=null;['3','2','1'].forEach(k=>{if(t>=ev(o,k)-0.05)cur=k});
  if(cur){const p=PB(t,ev(o,cur)-0.05,0.3);s+=`<g transform="translate(540 640) scale(${p})"><circle r="120" fill="${N}"/>${F(cur,0,64,{s:180,c:Y})}</g>`}
  else{const w=on(o,'schreib',t);if(w)s+=stamp(540,640,CFG.write,w,{w:900,bg:N,c:Y,s:60})}
  return s};
function dmk(x,y,txt,p,bg,w){return p<=0?'':stamp(x,y,txt,p,{w:w||Math.max(260,txt.length*26),bg:bg||R,c:W,s:40,rot:-3})}
const COL={R:R,T:T,N:N};
K.ksol=(t,d,o)=>{let s=kbg();
  s+=stamp(540,300,CFG.solTitle,PB(t,0,0.35),{w:560,bg:T,rot:-2});
  const steps=CFG.sol;let cur=-1;steps.forEach((st,k)=>{if(t>=ev(o,st.ev)-0.05)cur=k});
  const moods=(cur>=0&&steps[cur].moods)||CFG.moods;
  KEYS.forEach((k,j)=>{s+=mface(WXS[j],1400,k,1.2,t,{mood:moods[j]})});s+=ktable(1180,false);WXS.forEach((x,j)=>{s+=numc(x,1250,j+1,1)});s+=knames(1330);
  let m='';
  if(cur<0){const p=on(o,'ans',t);if(p)m+=`<circle cx="${WXS[CFG.ans]}" cy="1000" r="250" fill="none" stroke="${R}" stroke-width="14" stroke-dasharray="30 16" opacity="${cl(p)}"/>`+dmk(540,520,CFG.ansText,p,R)}
  else{const st=steps[cur],p=PB(t,ev(o,st.ev),0.3);(st.marks||[]).forEach(([x,y,tx,c],q)=>{m+=dmk(x,y,tx,PB(t,ev(o,st.ev)+q*0.35,0.3),COL[c])});if(st.stamp)m+=stamp(540,420,st.stamp,p,{w:Math.max(360,st.stamp.length*34),bg:N,c:Y,s:60,rot:2})}
  return s+m};
K.cta8=(t,d,o)=>{let s=`<rect width="1080" height="1920" fill="${T}"/>`;const p=PB(t,0,0.4);const en=CFG.lang==='en';
  s+=`<g transform="translate(540 380) scale(${p})">${F(en?'DID YOU':'JEDEN TAG',0,0,{s:110,c:W})}${F(en?'GET IT RIGHT?':'EIN RÄTSEL',0,130,{s:110,c:Y})}</g>`;
  s+=`<g transform="translate(540 880) scale(0.75)">${man(0,0,{look:Math.sin(t*2)*6})}</g>`;
  const q=PB(t,0.15,0.35);s+=`<g transform="translate(540 1090) scale(${q})"><rect x="-430" y="-110" width="860" height="200" rx="40" fill="${W}" stroke="${N}" stroke-width="8"/>${F(en?'FOR MORE RIDDLES':'FÜR MEHR RÄTSEL',0,-20,{s:60})}${F(en?'FOLLOW ✓':'FOLGEN ✓',0,60,{s:66,c:R})}</g>`;
  return s};
