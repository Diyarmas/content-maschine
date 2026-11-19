(async function(){
await Promise.all(['400 12px Lora','500 12px Lora','700 12px Lora','italic 400 12px Lora','italic 500 12px Lora','italic 700 12px Lora','700 12px Poppins','500 12px Poppins','400 12px Poppins'].map(f=>document.fonts.load(f)));await document.fonts.ready;
const D=window.DATA;const C={};D.cases.forEach(c=>C[c.n]=c);
const DBL=new Set(['51','55','58','59','67']);
function evenStart(){if(PAGES.length%2===0)return;notePage();}  // naechste Seite ist gerade, wenn Anzahl ungerade
function needEven(){if(PAGES.length%2===0){window.__fill=(window.__fill||0)+1;notePage()}}
titlePage();impressum();inhalt();vorab();how();wer();
function chap(k,from,to){divider(k);for(let n=from;n<=to;n++){const c=C[String(n).padStart(2,'0')];
  if(DBL.has(c.n)){needEven();if(window.doublePages)window.doublePages(c);else casePage(c)}else casePage(c)}}
needEven();chap(1,1,22);needEven();chap(2,23,47);needEven();chap(3,48,67);needEven();divider(4);needEven();
if(window.finalCase)window.finalCase(C['68']);
if(window.backMatter)window.backMatter();
if(PAGES.length%2===1)notePage('Platz für alles, was Herr Brandt übersehen hat.');
// Seitennummern, Verweise
PAGES.forEach(p=>setPno(p.el));
document.querySelectorAll('.ref[data-k]').forEach(e=>{e.textContent=REFS[e.dataset.k]||'?'});
document.querySelectorAll('.ref[data-sol]').forEach(e=>{e.textContent=(REFS['sol'+e.dataset.sol]||'?')});
window.__done={pages:PAGES.length,issues:ISSUES,fill:window.__fill||0,fits:PAGES.map(p=>p.el.dataset.fit||'')};
})();
