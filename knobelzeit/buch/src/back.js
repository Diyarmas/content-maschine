// Fall 68, Tipps, Loesungen, Ermittlerakte, Urkunde, Schluss
SC['68b']=()=>SVGS(bgDoener({name:' '})+bunting(46,14)+counter(160,350,680,120)+cakeP(500,336,1.9,{})+Array.from({length:14}).map((_,i)=>{const x=410+(i%7)*30,y=(i<7?290:268);return L(`M${x} ${y+22} v-20`,3)+`<circle cx="${x}" cy="${y-4}" r="6" fill="${YEL}" stroke="${INK}" stroke-width="2.4"/>`}).join('')+f('kemal',140,{y:565,mood:'laugh',items:[['ladle','R']]})+f('luigi',840,{y:565,mood:'happy'})+f('zeynep',300,{y:565,look:1})+f('mehmet',690,{y:565,look:-1}));
SC['68c0']=()=>{const coat=(x,c,w)=>P(`M${x} 160 l-14 20 h0 q-22 18 -26 70 v150 h80 v-150 q-4 -52 -26 -70 l-14 -20Z`,c,3.6);let s=`<rect width="1000" height="620" fill="${G2}"/>`+hatch(0,0,1000,620,.05)+`<rect y="470" width="1000" height="150" fill="${G3}"/>`+L('M0 470 H1000',3.4)+P('M80 130 h560 v16 h-560Z',G5,3.6);
  [150,250,350,450,560].forEach((x,i)=>{s+=L(`M${x} 130 v22`,5)+L(`M${x-34} 168 Q${x} 140 ${x+34} 168`,5)+(i===3?'':coat(x,[G4,G5,G3,G4,G5][i]))});
  s+=`<g>`+P('M450 160 l-14 20 q-26 18 -30 70 v150 h88 v-150 q-4 -52 -30 -70 l-14 -20Z','#e7e0cd',3.8)+L('M450 180 v200',2.6,G3)+`<path d="M470 260 h30 v40 h-30Z" fill="${G1}" stroke="${INK}" stroke-width="3"/><path d="M468 262 q16 14 34 0" fill="none" stroke="${INK}" stroke-width="2.6"/>`+`</g>`;
  s+=tableP(700,380,260,100,{})+R(740,350,40,30,'#fff',4,3)+`<g transform="rotate(-6 860 360)">`+R(820,340,100,60,'#fff',3,3.4)+L('M830 358 h78 M830 372 h58 M830 386 h70',2.6,G3)+`</g>`+f('can',820,{y:560,items:[['phone','R']],armR:'phone',look:-1,h:300});
  return SVGS(s)};
SC['68c']=()=>SC['68c0']().replace(/(<svg[^>]*>)/,'$1<g transform="translate(0 80)">').replace('</svg>','</g></svg>');
SC['68d']=()=>{const nm=[['Lars',1],['Heike',0],['Anna',0],['Luigi',0],['Oma Hilde',1],['Hans',0],['Ayşe',1],['Mia',0]];
  let s=`<rect width="1000" height="620" fill="${G1}"/>`+hatch(0,0,1000,620,.05)+P('M60 80 Q280 50 500 90 Q720 50 940 80 V560 Q720 530 500 570 Q280 530 60 560Z','#fff',5)+L('M500 90 V570',4);
  nm.forEach(([n,l],i)=>{const col=i%2,row=Math.floor(i/2);const x=110+col*440,y=210+row*92;s+=L(`M${x} ${y+16} h330`,2.4,G3)+`<text transform="translate(${x+14} ${y}) skewX(${l?18:-12})" font-family="Lora" font-style="italic" font-size="40" fill="${INK}">${n}</text>`});
  s+=T(280,150,'Gästebuch',{s:46,w:700,font:'Poppins'})+T(720,150,'zum 70. Geburtstag',{s:32,italic:1})+`<g transform="rotate(-24 930 520)"><rect x="880" y="490" width="140" height="14" rx="6" fill="${YEL}" stroke="${INK}" stroke-width="3"/></g>`;
  return SVGS(s)};
window.finalCase=function(c){const b=c.body;const P_=b.filter(x=>x.t==='p'),TB=b.filter(x=>x.t==='table');
  const mk=(sc,blocks,pos,extra,fitOpt)=>{const html=`<div class="img">${sc()}</div><div class="col">${extra.head||''}${renderBlocks(c,blocks)}${extra.tail||''}</div>${extra.foot||''}${pnoHtml()}`;const el=newPage('case',html);window.__last=el;setPno(el);const r=fitPage(el,fitOpt||{tag:'Fall 68'+pos});el.dataset.fit=r?r.h+r.lv:'FAIL';return el};
  const head1=labelRow(c)+`<h1>${typo(c.title)}</h1><div class="bet">BETEILIGTE: HERR BRANDT UND ALLE</div>`;
  const taskH=`<div class="task"><small>AUFGABE</small><div>${typo(c.task)}</div></div>`;
  mk(SC['68'],[P_[0],P_[1]],'A',{head:head1},{tag:'68A',sizes:[116,104,94,72]});
  const r2=mk(SC['68b'],[],'A2',{head:'<div style="height:1mm"></div>'},{tag:'68A2',sizes:[150]});fillNotes(r2);
  mk(SC['68c'],[P_[2],TB[0],P_[3]],'B',{head:labelRow(c)},{tag:'68B',sizes:[96,86,76,66,56]});fillNotes(window.__last);
  const r4=mk(SC['68d'],[P_[4]],'C',{head:'',tail:taskH,foot:footHtml(c)},{tag:'68C',sizes:[116,96,76,66]});fillNotes(r4);
};
// ---------- Flusssatz in zwei Spalten ----------
function flowPages(items,o){let el,box;let pages=[];
  const mk=first=>{el=newPage('flow '+(o.cls||''),`<div class="col flowcol">${first?o.head:''}<div class="runhead">LÖSUNGEN · FALL 00 BIS 00</div><div class="cols"></div></div>${pnoHtml()}`);setPno(el);box=el.querySelector('.cols');pages.push(el);return el};
  mk(true);
  items.forEach(it=>{const d=document.createElement('div');d.innerHTML=it.html;const node=d.firstElementChild;node.dataset.k=it.k;box.appendChild(node);
    const out=()=>{const br=box.getBoundingClientRect(),nr=node.getBoundingClientRect();return nr.right>br.right+1||nr.left>br.right-2||nr.bottom>br.bottom+2};
    if(out()){box.removeChild(node);mk(false);box.appendChild(node);if(out())ISSUES.push('FLOW zu gross '+it.k)}});
  pages.forEach(p=>{const ks=[...p.querySelectorAll('.cols>*')].map(n=>n.dataset.k);p.querySelector('.runhead').textContent=ks.length===1&&o.cls==='solpage'?'LÖSUNG · FALL '+ks[0]:o.run(ks);if(ks.length===1&&o.cls==='solpage')p.classList.add('one')});
  return pages}
function tipsBack(){const items=Object.keys(D().tips).map(Number).sort((a,b)=>a-b).map(k=>({k,html:`<div class="tip"><b>${k}</b>${typo(D().tips[k].text)}</div>`}));
  const pg=flowPages(items,{cls:'tippage',head:`<div class="h2">Tipps</div><div class="sub">Such den Code, der unter deinem Fall steht. Die Codes sind absichtlich durcheinander, damit du nicht aus Versehen andere Tipps liest.</div>`,run:ks=>'TIPPS · CODE '+ks[0]+' BIS '+ks[ks.length-1]});REFS.tipps=pg[0].dataset.pn;return pg}
function D(){return window.DATA}
function tb(x){return typo(x).replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/g,'<b>$1</b>')}
function solBack(){const S=D().sol;const items=Object.keys(S).sort().map(n=>{const s=S[n];const mark=s.mark?`<span class="mk">BEWEISMARKE <em>${esc(s.mark)}</em></span>`:'';
  return {k:n,html:`<div class="sol${n==='68'?' fin':''}"><div class="hd"><span>Fall ${n} · ${typo(s.title)}</span></div>${s.paras.map(p=>`<p>${tb(p)}</p>`).join('')}<p class="tr"><b>Die falsche Fährte:</b> ${tb(s.trail)}</p>${s.epilog?`<p class="ep"><b>Epilog:</b> ${typo(s.epilog)}</p>`:''}<div class="mkrow">${mark}</div></div>`}});
  const pg=flowPages(items,{cls:'solpage',head:`<div class="h2">Lösungen</div><div class="sub">Schau nach jedem Fall hier nach, auch wenn du dir sicher bist: Am Ende jeder Lösung wartet deine Beweismarke.</div>`,run:ks=>'LÖSUNGEN · FALL '+ks[0]+' BIS '+ks[ks.length-1]});
  pg.forEach(p=>p.querySelectorAll('.cols>*').forEach(n=>{REFS['sol'+n.dataset.k]=p.dataset.pn}));REFS.loes=pg[0].dataset.pn;return pg}
function cbs(vals){return vals.map(v=>`<span class="cb"><i>${v}</i></span>`).join('')}
function akteTable(a,b,pts){const row=n=>`<td><b>${n}</b></td><td class="pt">${cbs(pts)}</td><td><span class="mbox"></span></td>`;let h='<table class="tbl akte"><tr><th>Fall</th><th>Punkte</th><th>Marke</th><th>Fall</th><th>Punkte</th><th>Marke</th></tr>';
  const nums=[];for(let n=a;n<=b;n++)nums.push(String(n).padStart(2,'0'));const half=Math.ceil(nums.length/2);
  for(let i=0;i<half;i++){h+=`<tr>${row(nums[i])}${nums[i+half]?row(nums[i+half]):'<td></td><td></td><td></td>'}</tr>`}return h+'</table>'}
function boxes(n,per,a){let h='<div class="mgrid">';for(let i=0;i<n;i++)h+=`<span class="mbox"><i>${String(a+i).padStart(2,'0')}</i></span>`;return h+'</div>'}
function akte(){
  const a=newPage('akte',`<div class="col"><div class="h2">Deine Ermittlerakte</div><div class="sub">Kreuz bei jedem Fall deine Punkte an und trag die Beweismarke ein. Dreisternefälle zählen doppelt.</div><div class="kh">Kapitel 1 · höchstens 66 Punkte</div>${akteTable(1,22,[3,2,1,0])}<div class="kh">Kapitel 2 · höchstens 75 Punkte</div>${akteTable(23,47,[3,2,1,0])}</div>${pnoHtml()}`);setPno(a);REFS.akte=a.dataset.pn;
  const b=newPage('akte',`<div class="col"><div class="kh">Kapitel 3 · höchstens 120 Punkte</div>${akteTable(48,67,[6,4,2,0])}<div class="kh">Der letzte Fall · ohne Tipp 10 Punkte, mit Tipp 5 Punkte &nbsp; ${cbs([10,5,0])}</div><div class="kh">Deine Beweismarken der Reihe nach</div><div class="ms"><b>Kapitel 1 (Fall 01 bis 22)</b>${boxes(22,11,1)}</div><div class="ms"><b>Kapitel 2 (Fall 23 bis 47)</b>${boxes(25,11,23)}</div><div class="ms"><b>Kapitel 3 (Fall 48 bis 67)</b>${boxes(20,11,48)}</div><div class="kh">Dein Rang</div><table class="tbl rang"><tr><th>Punkte (höchstens 271)</th><th>Rang</th></tr><tr><td>0 bis 80</td><td>Spürnase</td></tr><tr><td>81 bis 160</td><td>Ermittlerprofi</td></tr><tr><td>161 bis 230</td><td>Meisterhirn</td></tr><tr><td>231 bis 271</td><td>Auf Augenhöhe mit Herrn Brandt</td></tr></table><p class="fill">Meine Punkte: ________ &nbsp;&nbsp; Mein Rang: ______________________</p></div>${pnoHtml()}`);setPno(b);
  [a,b].forEach(p=>{const col=p.querySelector('.col');if(col.scrollHeight>col.clientHeight+1)ISSUES.push('OVERFLOW Akte Seite '+p.dataset.pn)});return [a,b]}
function urkunde(){const s=`<svg viewBox="0 0 1000 420" xmlns="http://www.w3.org/2000/svg"><g transform="translate(500 400)">${fig('brandt',-160,0,{h:360,items:[],armR:'point',armL:'down',mood:'happy'})}</g><circle cx="720" cy="250" r="110" fill="#fff" stroke="${INK}" stroke-width="12"/><path d="M800 330 L900 420" stroke="${INK}" stroke-width="26" stroke-linecap="round"/>`+T(720,285,'?',{s:120,font:'Poppins',w:700})+`</svg>`;
  const el=newPage('urk',`<div class="frame"><div class="frame2"><div class="utitle">URKUNDE</div><div class="uart">${s}</div><p>Hiermit bestätige ich, dass</p><div class="uline"></div><p>alle Fälle aus meinem Notizbuch bearbeitet und den letzten Fall gelöst hat.</p><p>Ab heute trägt die Ermittlerin oder der Ermittler den Titel</p><div class="uline"></div><p class="two">Punkte: ______ &nbsp;&nbsp;&nbsp; Datum: _____________</p><div class="stamp">Platz für<br>einen Stempel</div><div class="sigline"></div><p class="sg">Herr Brandt, Kommissar im Ruhestand</p></div></div>${pnoHtml()}`);setPno(el);REFS.urk=el.dataset.pn;return el}
function endPage(){const el=newPage('endp',`<div class="col"><div class="h2">Zum Schluss</div><p>Danke, dass du mit Herrn Brandt auf Spurensuche gegangen bist. Wenn dir das Buch gefallen hat, hilft eine ehrliche Bewertung auf Amazon anderen Rätselfreunden, es zu finden. Und für Fragen, Lösungen und neue Fälle schau bei Knobelzeit vorbei: Jeden Tag ein neues Rätsel.</p><div class="qrbox">${window.QR_SVG||''}<div>Knobelzeit auf TikTok</div></div></div>${pnoHtml()}`);setPno(el);return el}
window.backMatter=function(){const e=PAGES.length%2?0:0;tipsBack();solBack();needEven();akte();urkunde();endPage()};
