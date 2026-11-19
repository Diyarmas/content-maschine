// Rechen-Split: links/rechts abwechselnd, CFG.L/CFG.R = [[label,key],...]
const SLX=290,SRX=790,STOPY=560,SRH=118;
function sbg(){return `<rect width="1080" height="1920" fill="#f3ead8"/><line x1="540" y1="430" x2="540" y2="1330" stroke="${N}" stroke-width="8" stroke-dasharray="26 18"/>`}
function sbar(t){return `<g transform="translate(540 150)"><rect x="-470" y="-62" width="940" height="124" rx="34" fill="${N}"/>${F(CFG.bar,0,22,{s:62,c:Y})}</g>`}
function shead(){return `<g transform="translate(${SLX} 470)"><rect x="-200" y="-44" width="400" height="88" rx="22" fill="#2a78d6" stroke="${N}" stroke-width="6"/>${F(CFG.lab[0],0,18,{s:52,c:W})}</g><g transform="translate(${SRX} 470)"><rect x="-200" y="-44" width="400" height="88" rx="22" fill="#eb6834" stroke="${N}" stroke-width="6"/>${F(CFG.lab[1],0,18,{s:52,c:W})}</g>`}
function scol(t,o,list,x,all){let s='';list.forEach(([lab,key],i)=>{const a=all?1:on(o,key,t);if(!a)return;const y=STOPY+60+i*SRH;const isMinus=lab[0]==='−';const fresh=all?0:Math.max(0,1-(t-ev(o,key))*2.5);const sc=Math.min(1,a)*(1+0.35*fresh);
  s+=`<g transform="translate(${x} ${y}) scale(${sc})"><rect x="-170" y="-50" width="340" height="100" rx="24" fill="${W}" stroke="${N}" stroke-width="6"/>${F(lab,0,30,{s:84,c:isMinus&&CFG.hiMinus?R:N})}</g>`});return s}
K.mhook=(t,d,o)=>{let s=sbg()+sbar(t)+shead();
  s+=`<rect x="90" y="640" width="900" height="580" rx="40" fill="#f3ead8" stroke="${N}" stroke-width="6" opacity="${Math.min(1,PB(t,0,0.3))}"/>`;
  s+=`<g transform="translate(540 820) rotate(-3) scale(${PB(t,0,0.35)})">${F(CFG.hook[0],0,0,{s:96,c:R,st:9})}${F(CFG.hook[1],0,105,{s:80,c:R,st:8})}</g>`;
  s+=stamp(540,1120,CFG.rule,PB(t,0.2,0.35),{w:860,bg:N,c:Y,s:56,rot:2});
  s+=`<g transform="translate(540 1890) scale(0.6)">${man(0,0,{look:Math.sin(t*2)*6})}</g>`;return s};
K.mseq=(t,d,o)=>{let s=sbg()+sbar(t)+shead();s+=scol(t,o,CFG.L,SLX,false)+scol(t,o,CFG.R,SRX,false);
  s+=`<g transform="translate(540 1890) scale(0.6)">${man(0,0,{look:Math.sin(t*2)*6})}</g>`;return s};
K.mre=(t,d,o)=>{let s=sbg()+sbar(t)+shead();s+=scol(t,o,CFG.L,SLX,true)+scol(t,o,CFG.R,SRX,true);
  const p=PB(t,0,0.35);s+=`<rect x="0" y="1060" width="1080" height="260" fill="${Y}" opacity="${0.92*Math.min(1,p)}"/>`+`<g transform="translate(540 1160) rotate(-2) scale(${p})">${F(CFG.re[0],0,0,{s:84,c:R,st:8})}${F(CFG.re[1],0,96,{s:Math.min(72,Math.floor(1500/CFG.re[1].length)),c:R,st:7})}</g>`;
  s+=`<g transform="translate(540 1890) scale(0.6)">${man(0,0,{look:Math.sin(t*2)*6})}</g>`;return s};
K.mask=(t,d,o)=>{let s=`<rect width="1080" height="1920" fill="${Y}"/>`;
  s+=`<g transform="translate(540 330) scale(${PB(t,0,0.35)})">${F(CFG.ask[0],0,-30,{s:100,c:R,st:8})}${F(CFG.ask[1],0,90,{s:100,c:R,st:8})}</g>`;
  let cur=null;['3','2','1'].forEach(k=>{if(t>=ev(o,k)-0.05)cur=k});
  if(cur){const p=PB(t,ev(o,cur)-0.05,0.3);s+=`<g transform="translate(540 760) scale(${p})"><circle r="150" fill="${N}"/>${F(cur,0,80,{s:220,c:Y})}</g>`}
  else{const w=on(o,'schreib',t);if(w)s+=stamp(540,760,CFG.write,w,{w:900,bg:N,c:Y,s:60})}
  s+=`<g transform="translate(540 1890) scale(0.6)">${man(0,0,{look:Math.sin(t*2)*6})}</g>`;return s};
K.msol=(t,d,o)=>{let s=sbg()+shead();s+=stamp(540,200,CFG.solTitle,PB(t,0,0.35),{w:560,bg:T,rot:-2});
  s+=scol(t,o,CFG.L,SLX,true)+scol(t,o,CFG.R,SRX,true);
  const pl=on(o,'lsum',t),pr=on(o,'rsum',t),pp=on(o,'prod',t),pw=on(o,'wrong',t);
  if(pl)s+=stamp(SLX,1150,'= '+CFG.ls,pl,{w:300,bg:'#2a78d6',c:W,s:80,rot:-2});
  if(pr)s+=stamp(SRX,1150,'= '+CFG.rs,pr,{w:300,bg:'#eb6834',c:W,s:80,rot:2});
  if(pp)s+=stamp(540,1335,CFG.prodTxt,pp,{w:760,bg:N,c:Y,s:90,rot:-2});
  if(pw)s+=stamp(540,1690,CFG.wrongTxt,pw,{w:860,bg:R,c:W,s:48,rot:2});
  return s};

K.cta8=(t,d,o)=>{let s=`<rect width="1080" height="1920" fill="${T}"/>`;const p=PB(t,0,0.4);const en=CFG.lang==='en';
  s+=`<g transform="translate(540 380) scale(${p})">${F(en?'DID YOU':'JEDEN TAG',0,0,{s:110,c:W})}${F(en?'GET IT RIGHT?':'EIN RÄTSEL',0,130,{s:110,c:Y})}</g>`;
  s+=`<g transform="translate(540 880) scale(0.75)">${man(0,0,{look:Math.sin(t*2)*6})}</g>`;
  const q=PB(t,0.15,0.35);s+=`<g transform="translate(540 1090) scale(${q})"><rect x="-430" y="-110" width="860" height="200" rx="40" fill="${W}" stroke="${N}" stroke-width="8"/>${F(en?'FOR MORE RIDDLES':'FÜR MEHR RÄTSEL',0,-20,{s:60})}${F(en?'FOLLOW ✓':'FOLGEN ✓',0,60,{s:66,c:R})}</g>`;
  return s};
