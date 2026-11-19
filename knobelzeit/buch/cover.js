const fs=require('fs');
const bw=process.argv[2]==='bw';
const pages=+process.argv[3]||116;
const spine=+(pages*0.0572).toFixed(2); // KDP weiss s/w
const W=170*2+spine+6.4,H=244+6.4;
const grey=t=>t.replace(/#([0-9a-fA-F]{6})\b|#([0-9a-fA-F]{3})\b/g,(m,a,b)=>{let h=a||b.split('').map(c=>c+c).join('');const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),bl=parseInt(h.slice(4,6),16);const y=Math.round(0.2126*r+0.7152*g+0.0722*bl).toString(16).padStart(2,'0');return '#'+y+y+y});
const S=n=>fs.readFileSync('/home/claude/bk/src/'+n,'utf8');
const fonts=['400:normal:Lora-400','500:normal:Lora-500','700:normal:Lora-700','400:italic:LoraI-400','500:italic:LoraI-500','700:italic:LoraI-700'].map(x=>{const [w,st,f]=x.split(':');return `@font-face{font-family:'Lora';font-weight:${w};font-style:${st};src:url('file:///home/claude/bk/fonts/${f}.ttf')}`}).join('');
let html=`<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
@page{size:${W}mm ${H}mm;margin:0}*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}mm;height:${H}mm}
#c{position:relative;width:${W}mm;height:${H}mm;background:#F6C431;overflow:hidden}
.back{background:repeating-conic-gradient(from 0deg at 50% 62%,#F6C431 0 7.5deg,#FBD65A 7.5deg 15deg);position:absolute;left:0;top:0;width:${170+3.2}mm;height:${H}mm;padding:${3.2+14}mm 15mm 0 ${3.2+15}mm}
.spine{position:absolute;left:${173.2}mm;top:0;width:${spine}mm;height:${H}mm;background:#1E1E1E}
.front{position:absolute;left:${173.2+spine}mm;top:0;width:${173.2}mm;height:${H}mm}
.front svg{width:100%;height:100%;display:block}
.sp{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(90deg);white-space:nowrap;font:700 ${Math.min(5.2,spine*0.62).toFixed(2)}mm Poppins;color:#fff;letter-spacing:.5mm}
.sp b{color:#F6C431;font-weight:700}
.back h2{font:700 8.6mm/1.12 Poppins;color:#1E1E1E;margin-bottom:5mm}
.back p{font:italic 500 4.9mm/1.42 Lora;color:#1E1E1E;margin-bottom:4mm}
.back ul{list-style:none;margin:6mm 0 0}
.back li{font:600 3.9mm/1.38 Poppins;color:#1E1E1E;padding-left:5.5mm;position:relative;margin-bottom:2.3mm}
.back li:before{content:'';position:absolute;left:0;top:1.1mm;width:2.4mm;height:2.4mm;background:#1E1E1E;border-radius:50%}
.age{position:absolute;left:${3.2+15}mm;bottom:${3.2+12}mm;font:600 3.2mm Poppins;color:#1E1E1E}
.bar{position:absolute;left:${173.2-15-50.8}mm;bottom:${3.2+15}mm;width:50.8mm;height:30.5mm;background:#fff}
</style></head><body><div id="c">
<div class="back"><h2>Wer hat den Döner nicht bezahlt?</h2>
<p>Herr Brandt, Kommissar im Ruhestand, hört genau zu. Meistens lügt einer. Manchmal stimmt ein Foto nicht. Und ab und zu steckt die Lösung in einer Torte, die in acht gleiche Stücke geteilt werden muss.</p>
<p>Spür mit ihm und seinen Freunden 67 Fälle auf, vom kleinen Kuchendieb bis zum großen Finale. Du brauchst nur einen Stift, ein bisschen Geduld und scharfe Augen.</p>
<ul><li>67 Krimi- und Logikrätsel plus ein großer letzter Fall</li><li>Drei Schwierigkeitsstufen von Aufwärmen bis Meisterdetektiv</li><li>Tipps für jeden Fall, damit du nie festhängst</li><li>Ermittlerakte, Beweismarken und eine Urkunde zum Schluss</li></ul></div>
<div class="age">Für die ganze Familie · ab 10 Jahren</div><div class="bar"></div>
<div class="spine"><div class="sp">KNOBEL<b>ZEIT</b> &nbsp;·&nbsp; 67 Krimi- und Logikrätsel</div></div>
<div class="front" id="front"></div></div>
<script>window.BW=${bw}</script><script>${S('figs2.js')}</script><script>${S('bg.js')}</script><script>${S('scenes.js')}</script>
<script>
const s='<svg viewBox="0 0 1000 1446" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="1000" height="1446" fill="#F6C431"/>'
+(()=>{let r='';const cx=460,cy=760;for(let i=0;i<24;i+=2){const a0=i*15*Math.PI/180,a1=(i+1)*15*Math.PI/180,R=1800;r+='<path d="M'+cx+' '+cy+' L'+(cx+R*Math.cos(a0)).toFixed(0)+' '+(cy+R*Math.sin(a0)).toFixed(0)+' L'+(cx+R*Math.cos(a1)).toFixed(0)+' '+(cy+R*Math.sin(a1)).toFixed(0)+'Z" fill="#FBD65A"/>'}return r})()
+(()=>{let d='';for(let y=0;y<9;y++)for(let x=0;x<16;x++){const rr=Math.max(0,7-y*0.85);if(rr>0.6)d+='<circle cx="'+(x*68+(y%2)*34-20)+'" cy="'+(1446-y*60-20)+'" r="'+rr.toFixed(1)+'" fill="#E5AE1A"/>'}return d})()
+T(460,120,'DAS RÄTSELBUCH ZUM KANAL KNOBELZEIT',{s:25,w:700,font:'Poppins',ls:4,c:'#1E1E1E'})
+'<g transform="rotate(-4 460 330)"><rect x="58" y="188" width="840" height="330" rx="14" fill="#B8860B" opacity=".55"/><rect x="40" y="170" width="840" height="330" rx="14" fill="#1E1E1E"/><rect x="52" y="182" width="816" height="306" rx="8" fill="none" stroke="#F6C431" stroke-width="3"/>'+T(460,330,'KNOBEL',{s:168,w:700,font:'Poppins',c:'#fff',ls:6})+T(460,478,'ZEIT',{s:168,w:700,font:'Poppins',c:'#F6C431',ls:30})+'</g>'
+T(70,610,'?',{s:120,font:'Poppins',w:700,c:'#E5AE1A'})+T(880,560,'?',{s:90,font:'Poppins',w:700,c:'#E5AE1A'})+T(900,760,'?',{s:70,font:'Poppins',w:700,c:'#E5AE1A'})
+T(460,640,'67 Krimi- und Logikrätsel',{s:54,font:'Lora',italic:1,w:500})+T(460,704,'für die ganze Familie',{s:54,font:'Lora',italic:1,w:500})
+T(460,766,'Mit Herrn Brandt auf Spurensuche · ab 10 Jahren',{s:25,font:'Poppins',w:500,c:'#1E1E1E'})
+'<circle cx="790" cy="905" r="80" fill="#fff" stroke="#1E1E1E" stroke-width="12"/><path d="M846 962 L920 1040" stroke="#1E1E1E" stroke-width="26" stroke-linecap="round"/>'+T(790,945,'?',{s:110,font:'Poppins',w:700})
+'<path d="M0 1365 H1000" stroke="#1E1E1E" stroke-width="4"/>'
+fig('ben',100,1365,{h:290})+fig('anna',215,1365,{h:282})+fig('luigi',330,1365,{h:380})+fig('brandt',490,1365,{h:520,look:0})+fig('hilde',665,1365,{h:320})+fig('kemal',810,1365,{h:380})+'</svg>';
document.getElementById('front').innerHTML=s;
</script></body></html>`;
if(bw)html=grey(html);
fs.writeFileSync('/home/claude/bk/out/cover'+(bw?'_bw':'')+'.html',html);
console.log('spine',spine,'W',W,'H',H);
