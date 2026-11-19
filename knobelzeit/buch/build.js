const fs=require('fs');
const grey=t=>t.replace(/#([0-9a-fA-F]{6})\b|#([0-9a-fA-F]{3})\b/g,(m,a,b)=>{let h=a||b.split('').map(c=>c+c).join('');const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),bl=parseInt(h.slice(4,6),16);const y=Math.round(0.2126*r+0.7152*g+0.0722*bl);const x=y.toString(16).padStart(2,'0');return '#'+x+x+x});
const bw0=process.argv[2]==='bw';
const S=n=>{const t=fs.readFileSync('/home/claude/bk/src/'+n,'utf8');return bw0?grey(t):t};
const bw=process.argv[2]==='bw';const part=process.argv[3]||'all';
const data={cases:JSON.parse(fs.readFileSync('/home/claude/bk/data/cases_final.json','utf8')),sol:JSON.parse(fs.readFileSync('/home/claude/bk/data/sol_final.json','utf8')),tips:JSON.parse(fs.readFileSync('/home/claude/bk/data/tips.json','utf8'))};
const html=`<!doctype html><html lang="de"><head><meta charset="utf-8"><style>@font-face{font-family:'Lora';font-weight:400;font-style:normal;src:url('file:///home/claude/bk/fonts/Lora-400.ttf')}@font-face{font-family:'Lora';font-weight:500;font-style:normal;src:url('file:///home/claude/bk/fonts/Lora-500.ttf')}@font-face{font-family:'Lora';font-weight:700;font-style:normal;src:url('file:///home/claude/bk/fonts/Lora-700.ttf')}@font-face{font-family:'Lora';font-weight:400;font-style:italic;src:url('file:///home/claude/bk/fonts/LoraI-400.ttf')}@font-face{font-family:'Lora';font-weight:500;font-style:italic;src:url('file:///home/claude/bk/fonts/LoraI-500.ttf')}@font-face{font-family:'Lora';font-weight:700;font-style:italic;src:url('file:///home/claude/bk/fonts/LoraI-700.ttf')}${S('book.css')}</style></head><body><div id="book"></div>
<script>window.BW=${bw};window.PART=${JSON.stringify(part)};window.DATA=${JSON.stringify(data)};window.QR_SVG=${JSON.stringify(fs.readFileSync('/home/claude/bk/data/qr.svg','utf8').replace(/<\?xml[^>]*>/,''))};</script>
<script>${S('figs2.js')}</script><script>${S('bg.js')}</script><script>${S('scenes.js')}</script>
${['docs.js','ws.js','core.js','front.js','back.js','main.js'].filter(f=>fs.existsSync('/home/claude/bk/src/'+f)).map(f=>`<script>${S(f)}</script>`).join('\n')}
</body></html>`;
fs.writeFileSync('/home/claude/bk/out/book'+(bw?'_bw':'')+'.html',html);console.log('ok',html.length);
