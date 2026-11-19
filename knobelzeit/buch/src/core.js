// Kern: Seitenverwaltung, Textsetzung, Falltemplate
const PAGES=[]; // {el, pn}
const REFS={};  // Seitenverweise (zweiter Durchlauf)
const ISSUES=[];
const BW=!!window.BW;
document.documentElement.style.setProperty('--yel',BW?'#C9C5BC':'#F6C431');
const H_PAGE=250.4, BOT=20;
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
const STAR='<svg class="ist" viewBox="0 0 24 24"><path d="M12 1.6l3.1 6.8 7.4.8-5.5 5 1.6 7.3L12 17.7l-6.6 3.8 1.6-7.3-5.5-5 7.4-.8Z" fill="currentColor"/></svg>';
const ARR='<svg class="ist" viewBox="0 0 24 24"><path d="M3 12h15M12 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function typo(s){return esc(s).replace(/&quot;/g,'"').replace(/"/g,'\u201C').replace(/'/g,'\u2019').replace(/ - /g,' \u2013 ').replace(/★/g,STAR).replace(/→/g,ARR)}
function newPage(cls,html){const pn=PAGES.length+1;const el=document.createElement('div');el.className='page '+(pn%2?'odd':'even')+(cls?' '+cls:'');el.dataset.pn=pn;el.innerHTML=html||'';document.getElementById('book').appendChild(el);PAGES.push({el,pn});return el}
function side(pn){return pn%2?'odd':'even'}
function pnoHtml(){return `<div class="pno"></div>`}
function setPno(el){const d=el.querySelector('.pno');if(d)d.textContent=el.dataset.pn}
const KEY={ayse:'ayse'};
function nameKey(n){let s=n.toLowerCase().replace(/\(.*\)/,'').trim().replace('oma ','').replace('herr ','').replace('mama ','').replace('ritter ','').replace('ş','s').replace('ı','i');
  if(s==='der moderator')s='moderator';return (typeof F!=='undefined'&&F[s])?s:null}
function dispName(n){return n.replace(/\s*\(.*\)/,'').trim().replace(/^Der Moderator$/,'Moderator')}
function stNote(n){const m=n.match(/\((.*)\)/);if(!m)return '';const x=m[1];return x==='mit nassen Haaren im Planschbecken'?'sitzt mit nassen Haaren im Planschbecken':x}
function dirHtml(nt){return nt?`<em class="dir">(${esc(nt)})</em> `:''}
function starsHtml(n){return '<span class="stars">'+[1,2,3].map(i=>`<i class="${i<=n?'sf':'se'}">${STAR}</i>`).join('')+'</span>'}
const CASE_BY={};
function renderBlocks(c,blocks){let h='';blocks.forEach(b=>{
  if(b.t==='p'){const t=b.text;
    if(/^[A-ZÄÖÜ0-9 ·]{8,}$/.test(t)&&/[A-ZÄÖÜ]{2,}|\d\d/.test(t)&&t===t.toUpperCase())h+=`<div class="cipher">${esc(t)}</div>`;
    else h+=`<p>${typo(t)}</p>`}
  else if(b.t==='stmts'){b.rows.forEach(r=>{const k=nameKey(r[0]),nm=dispName(r[0]),nt=stNote(r[0]);
    if(/^\d+$/.test(r[0]))h+=`<div class="st plain"><b class="code">${esc(r[0])}</b><span>${typo(r[1])}</span></div>`;
    else if(k)h+=`<div class="st"><div class="av">${avatar(k)}</div><b>${esc(nm)}</b><i>${dirHtml(nt)}${typo(r[1])}</i></div>`;
    else h+=`<div class="st"><b>${esc(nm)}</b><i>${dirHtml(nt)}${typo(r[1])}</i></div>`})}
  else if(b.t==='list'){h+=b.kind==='num'?`<ul class="nums">${b.items.map((x,i)=>`<li><span>${i+1}</span><div>${typo(x)}</div></li>`).join('')}</ul>`:`<ul class="buls">${b.items.map(x=>`<li>${typo(x)}</li>`).join('')}</ul>`}
  else if(b.t==='table'){h+=`<table class="tbl"><tr>${b.head.map(x=>`<th>${typo(x)}</th>`).join('')}</tr>${b.rows.map(r=>`<tr>${r.map(x=>`<td>${typo(x)}</td>`).join('')}</tr>`).join('')}</table>`}
  else if(b.t==='box'){h+=`<div class="paperbox">`+b.rows.map(r=>r[0]==='lead'?`<div class="r"><span>${typo(r[1])}</span><span class="d"></span><span>${typo(r[2])}</span></div>`:(r[1].startsWith('<b>')?`<div class="t">${esc(r[1].replace(/<\/?b>/g,''))}</div>`:`<div>${typo(r[1])}</div>`)).join('')+`</div>`}
  else if(b.t==='paper'){h+=b.kind==='einkauf'?`<div class="paperbox note"><div class="t">EINKAUFSZETTEL</div>${b.lines.map(l=>`<div class="hw">${typo(l)}</div>`).join('')}</div>`:`<div class="paperbox mono"><div class="t">SCANNER-PROTOKOLL</div>${b.lines.map(l=>`<div>${typo(l)}</div>`).join('')}</div>`}
  else if(b.t==='ill'&&b.kind==='ill'&&typeof DOC!=='undefined'&&DOC[c.n]&&b.useDoc!==false){h+=`<div class="inl" style="height:${DOC[c.n].h||26}mm">${DOC[c.n].svg()}</div>`}
 });return h}
function footHtml(c){return `<div class="foot">TIPPS · CODE <b>${c.tip1}</b> · CODE <b>${c.tip2}</b> &nbsp;|&nbsp; LÖSUNG S. <b class="ref" data-sol="${c.n}">?</b></div>`}
function labelRow(c){const isHint=c.hint;return `<div class="lblrow"><span class="lbl">FALL ${c.n}</span>${isHint?'<span class="hint">HINWEISBILD</span>':''}${c.classic?'<span class="hint ol">BRANDTS KLASSIKER</span>':''}<span class="meta"><span>${esc(c.cat)}</span><span class="dot">·</span>${starsHtml(c.stars)}<span class="dot">·</span><span>ca. ${c.min} Min.</span></span></div>`}
function fitPage(page,o){o=o||{};const img=page.querySelector('.img'),col=page.querySelector('.col');const sizes=o.sizes||[116,94,72];
  const set=h=>{if(img){img.style.height=h+'mm';col.style.top=(h+5)+'mm'}col.style.bottom=BOT+'mm'};
  const ok=()=>col.scrollHeight<=col.clientHeight+1;
  if(!img){set(0);if(ok())return {h:0,lv:''}}
  else for(const h of sizes){set(h);if(ok())return {h,lv:''}}
  ISSUES.push('OVERFLOW Seite '+page.dataset.pn+' '+(o.tag||''));return null}
// Einzelseiten-Fall
function casePage(c,o){o=o||{};const blocks=o.blocks||c.body.filter(b=>!(b.t==='ill'&&b.kind==='hint'));
  const sc=o.scene||SC[c.n];
  const el=newPage('case',`<div class="img">${sc()}</div><div class="col">${labelRow(c)}<h1>${typo(c.title)}</h1><div class="bet">BETEILIGTE: ${c.n==='68'?'HERR BRANDT UND ALLE':c.bet.map(esc).join(' · ')}</div>${renderBlocks(c,blocks)}${o.noTask?'':`<div class="task"><small>AUFGABE</small><div>${typo(c.task)}</div></div>`}</div>${o.noFoot?'':footHtml(c)}${pnoHtml()}`);
  setPno(el);const r=fitPage(el,Object.assign({tag:'Fall '+c.n,sizes:[116,96,76,66]},o.fitOpt||{}));el.dataset.fit=r?r.h+r.lv:'FAIL';if(!o.noFill)fillNotes(el);return el}
function notePage(txt){const el=newPage('notes',`<div class="col"><div class="h2">Deine Notizen</div><div class="sub">${esc(txt||'Hier ist Platz für Skizzen, Rechnungen und Verdächtige.')}</div><div class="dots" style="height:170mm;margin-top:4mm"></div></div>${pnoHtml()}`);setPno(el);return el}

function fillNotes(el){const col=el.querySelector('.col');const mmpx=96/25.4;
  const last=col.lastElementChild;const used=(last.offsetTop+last.offsetHeight)/mmpx;const avail=col.clientHeight/mmpx-used;
  if(avail>=25){const n=document.createElement('div');n.className='notes fillnotes';const h=avail-13;n.innerHTML=`<small>DEINE NOTIZEN</small><div class="dots" style="height:${h.toFixed(1)}mm;border:.3mm solid #cfcac0;border-radius:2mm"></div>`;col.appendChild(n);
    if(col.scrollHeight>col.clientHeight+1)col.removeChild(n)}}

function txtPage(c,blocks){const el=newPage('case txtp',`<div class="col" style="top:15mm;bottom:${BOT}mm"><div class="lblrow"><span class="lbl">FALL ${c.n}</span><span class="meta"><span>Fortsetzung</span></span></div>${renderBlocks(c,blocks)}<div class="task"><small>AUFGABE</small><div>${typo(c.task)}</div></div></div>${footHtml(c)}${pnoHtml()}`);setPno(el);
  const col=el.querySelector('.col');if(col.scrollHeight>col.clientHeight+1)ISSUES.push('OVERFLOW Textseite '+c.n);fillNotes(el);return el}
window.txtDouble=function(c){const all=c.body.filter(b=>!(b.t==='ill'&&b.kind==='hint'));
  const l=casePage(c,{blocks:all.slice(0,1),noTask:true,noFoot:true,noFill:true,fitOpt:{sizes:[126]}});txtPage(c,all.slice(1));return l};
