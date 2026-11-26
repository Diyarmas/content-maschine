// Arbeitsseiten (rechte Seite der Doppelseiten) und Finale
const WS={};
function wsv(w,h,inner){return `<svg class="wsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${inner}</svg>`}
function notesBox(hmm,lbl){return `<div class="notes"><small>${lbl||'DEINE NOTIZEN'}</small><div class="dots" style="height:${hmm}mm;border:.3mm solid #cfcac0;border-radius:2mm"></div></div>`}
function chair(x,y,n){return `<g transform="translate(${x} ${y})">`+P('M-60 0 h120 v-130 q0 -30 -30 -30 h-60 q-30 0 -30 30Z',G5,4)+P('M-70 0 h18 v-70 h-18Z M52 0 h18 v-70 h-18Z',G4,3.4)+P('M-52 0 h104 v-36 h-104Z',G4,3.4)+T(0,-86,String(n),{s:44,w:700,font:'Poppins',c:'#fff'})+'</g>'}
WS['51']=()=>{let s=`<rect width="1000" height="560" fill="${G1}"/>`+hatch(0,0,1000,560,.04)+R(110,34,780,92,'#fff',8,4)+L('M110 126 H890',8,G3)+T(500,98,'LEINWAND',{s:44,w:700,font:'Poppins',c:INK,ls:8});
  for(let i=0;i<6;i++){const x=110+i*156;s+=chair(x,330,i+1)+`<rect x="${x-62}" y="352" width="124" height="46" rx="6" fill="#fff" stroke="${INK}" stroke-width="3"/>`+L(`M${x-48} 384 h96`,2.6,G3)+T(x,440,'Platz '+(i+1),{s:19,font:'Poppins',w:700,c:G5})}
  s+=T(500,520,'Du siehst die Sessel von hinten. Platz 1 ist links.',{s:23,italic:1,c:G5});
  return `<div class="h2 sm">Dein Platzplan</div>`+wsv(1000,560,s)+`<div class="sub">Trag unter jedem Sessel den Namen ein.</div>`+notesBox(78)};
WS['55']=()=>{const N={k:[170,150,'Kiosk'],m:[830,150,'Markt'],b:[420,360,'Bäckerei'],h:[760,520,'Bahnhof']};
  const E2=[['k','m','10'],['k','b','4'],['k','h','12'],['m','b','8'],['b','h','9'],['m','h','15']];
  let s=`<rect width="1000" height="640" fill="${G1}"/>`+hatch(0,0,1000,640,.04);
  E2.forEach(([a,b,m])=>{const A=N[a],B=N[b];s+=(a==='k'&&b==='h')?L(`M${A[0]} ${A[1]} Q150 640 ${B[0]} ${B[1]}`,6,G3):L(`M${A[0]} ${A[1]} L${B[0]} ${B[1]}`,6,G3)});
  E2.forEach(([a,b,m])=>{const A=N[a],B=N[b],x=(a==='k'&&b==='h')?255:(A[0]+B[0])/2,y=(a==='k'&&b==='h')?446:(A[1]+B[1])/2;s+=`<rect x="${x-52}" y="${y-22}" width="104" height="44" rx="10" fill="#fff" stroke="${INK}" stroke-width="3"/>`+T(x,y+9,m+' Min.',{s:23,w:700,font:'Poppins'})});
  Object.values(N).forEach(([x,y,t])=>{s+=`<g transform="translate(${x} ${y})"><circle r="54" fill="${YEL}" stroke="${INK}" stroke-width="4"/>`+T(0,10,{Kiosk:'K',Markt:'M','Bäckerei':'Bä',Bahnhof:'Bf'}[t],{s:30,w:700,font:'Poppins'})+`</g>`+T(x,y+88,t,{s:26,w:700,font:'Poppins'})});
  let tl='';const x0=260,x1=950,rows=['Heike','Luigi','Dieter','Anna'];
  for(let m=0;m<=30;m++){const x=x0+(x1-x0)*m/30;tl+=L(`M${x} 66 v${m%5?10:22}`,m%5?1.8:3)+(m%5===0?T(x,50,'9:45 9:50 9:55 10:00 10:05 10:10 10:15'.split(' ')[m/5],{s:17,w:700,font:'Poppins'}):'')}
  rows.forEach((r,i)=>{const y=110+i*66;tl+=T(x0-20,y+22,r,{s:24,w:700,font:'Poppins',a:'end'})+`<rect x="${x0}" y="${y}" width="${x1-x0}" height="44" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`});
  const xk=x0+(x1-x0)*15/30;tl+=L(`M${xk} 70 V378`,4,INK)+`<rect x="${xk-78}" y="382" width="156" height="34" rx="8" fill="${INK}"/>`+T(xk,406,'10:00 Kiosk',{s:20,w:700,font:'Poppins',c:'#fff'});
  return `<div class="h2 sm">Stadtplan und Zeitleiste</div><div style="width:78%;margin:0 auto">${wsv(1000,640,s)}</div><div class="sub">Trag ein, wo wer wann sein kann.</div><div style="width:80%;margin:0 auto">${wsv(1000,430,tl)}</div>`};
WS['58']=()=>{let s='';for(let i=0;i<3;i++){const y=30+i*210;s+=`<rect x="10" y="${y}" width="980" height="190" rx="14" fill="#fff" stroke="${INK}" stroke-width="3.4"/>`+T(60,y+52,'Wiegung '+(i+1),{s:30,w:700,font:'Poppins',a:'start'})+scaleP(210,y+170,.36,{tilt:0})
   +T(420,y+66,'Links:',{s:24,font:'Poppins',w:700,a:'start'})+L(`M520 ${y+66} h240`,2.6,G3)+T(790,y+66,'Kugeln',{s:20,c:G5,a:'start'})
   +T(420,y+112,'Rechts:',{s:24,font:'Poppins',w:700,a:'start'})+L(`M540 ${y+112} h220`,2.6,G3)+T(790,y+112,'Kugeln',{s:20,c:G5,a:'start'})
   +['links schwerer','rechts schwerer','gleich schwer'].map((t,j)=>`<rect x="${420+j*185}" y="${y+138}" width="22" height="22" fill="#fff" stroke="${INK}" stroke-width="3"/>`+T(448+j*185,y+156,t,{s:19,a:'start'})).join('')}
  let balls='';for(let i=0;i<12;i++)balls+=C(80+i*76,60,28,G2,3.6)+T(80+i*76,70,String(i+1),{s:24,w:700,font:'Poppins'});
  return `<div class="h2 sm">Dein Wiegeprotokoll</div><div class="sub">Drei Wiegungen, dann musst du es wissen.</div>`+wsv(1000,120,balls)+wsv(1000,650,s)+notesBox(48,'WAS FOLGT DARAUS?')};
WS['59']=()=>{const names=['Herr Sommer','Oma Greta','Heike','Dragan'],stands=['Stand 1','Stand 2','Stand 3','Stand 4'],waren=['Uhr','Lampe','Teddy','Platten'],preise=['5 €','10 €','15 €','20 €'];
  let s='';[0,1,2,3].forEach(i=>{const x=30+i*240;s+=stall(x+110,330,1.18,{c:[G3,G5,G4,G2][i]})+`<rect x="${x+20}" y="120" width="180" height="70" rx="6" fill="#fff" stroke="${INK}" stroke-width="3.2"/>`+L(`M${x+36} 146 h148 M${x+36} 168 h148`,2.4,G3)+T(x+110,60,'Stand '+(i+1),{s:28,w:700,font:'Poppins'})});
  const cols=[].concat(stands,waren,preise);const groups=[[names,0],[stands,4],[waren,8]];
  let t=`<table class="lg2"><tr><th class="e"></th>${cols.map((c,i)=>`<th class="cv${i===3||i===7?' gr':''}"><div>${c}</div></th>`).join('')}</tr>`;
  groups.forEach(([rows,from],gi)=>{rows.forEach((r,ri)=>{t+=`<tr class="${ri===0?'g0':''}"><th class="rh">${r}</th>`+cols.map((c,i)=>i<from?'<td class="x"></td>':`<td${i===3||i===7?' class="gr"':''}></td>`).join('')+'</tr>'})});
  t+='</table>';
  return `<div class="h2 sm">Dein Flohmarkt</div><div style="width:84%;margin:0 auto">${wsv(1000,350,`<rect width="1000" height="350" fill="${G1}"/>`+s)}</div><div class="sub">Logikgitter: Trag ein X für „stimmt nicht“ und einen Haken für „stimmt“.</div>${t}`};
WS['67']=()=>{let h=`<rect width="1000" height="540" fill="${G0}"/>`;
  const st=Array.from({length:8}).map((_,i)=>P(`M${340+i*14} ${330-i*15} h14 v15 h-14Z`,G3,2.6)).join('');
  h+=P('M50 90 L320 10 L590 90Z',G4,4)+P('M60 90 h520 v120 h-520Z',G2,4)+P('M60 210 h520 v120 h-520Z',G1,4)+L('M320 90 V210',4)
   +T(72,118,'Schlafzimmer',{s:19,font:'Poppins',w:700,a:'start'})+T(332,118,'Bad',{s:19,font:'Poppins',w:700,a:'start'})+T(72,238,'Wohnzimmer',{s:19,font:'Poppins',w:700,a:'start'})+T(490,238,'Esszimmer',{s:19,font:'Poppins',w:700,a:'start'})
   +P('M90 172 h86 v38 h-86Z',G3,3.4)+T(133,196,'Kommode',{s:13,font:'Poppins',w:700})+st+L('M340 330 L452 210',3.4,G4)+T(398,356,'Treppe',{s:17,font:'Poppins',w:700,c:G5})
   +P('M236 330 q0 -52 28 -52 h18 q22 0 22 40 v12Z',G4,3.4)+T(270,356,'Sessel',{s:17,font:'Poppins',w:700,c:G5})
   +L('M0 330 H1000',4)+P('M600 330 h400 v22 h-400Z',G2,3)+P('M690 330 h96 v-54 h-96Z',G5,3.4)+T(738,312,'Grill',{s:18,font:'Poppins',w:700,c:'#fff'})+T(738,382,'Garten',{s:19,font:'Poppins',w:700,c:G5})
   +L('M930 330 v-70 M974 330 v-70',7,G5)+T(952,382,'Gartentor',{s:16,font:'Poppins',w:700,c:G5})
   +car(330,500,.78,{c:G3})+T(330,528,'Auto (vor dem Haus)',{s:17,font:'Poppins',w:700,c:G5});
  const ph=(x,y,t,cap,inner)=>`<g transform="translate(${x} ${y}) rotate(${(x%3)-1.2})"><rect x="6" y="8" width="190" height="220" fill="${INK}" opacity=".15"/><rect width="190" height="220" fill="#fff" stroke="${INK}" stroke-width="3.2"/><rect x="12" y="12" width="166" height="150" fill="${G1}" stroke="${INK}" stroke-width="2.4"/>${inner}`+T(95,196,t,{s:26,w:700,font:'Poppins'})+T(95,216,cap,{s:12,c:G5,font:'Poppins',w:700})+`</g>`;
  const ph1=ph(30,20,'15:10','Emre · Torte',`<g transform="translate(95 130)">${cakeP(0,0,.9,{})}</g>`);
  const ph2=ph(260,20,'15:25','Emre · Garten',`<g transform="translate(60 150)"><g transform="scale(.3)">${grill(60,0,1)}</g></g>`+`<g transform="translate(120 160) scale(.2)">${fig('luigi',0,0,{h:300})}</g>`);
  const ph3=ph(490,20,'15:35','Emre · Gartentor',`<g transform="translate(95 160) scale(.2)">${fig('kemal',0,0,{h:320})}</g>`+`<g transform="translate(40 160)">${bag(0,0,.8)}</g>`);
  const ph4=ph(720,20,'15:50','Emre · Garten',`<g transform="translate(55 160) scale(.15)">${fig('kemal',0,0,{h:320})}</g><g transform="translate(90 160) scale(.15)">${fig('luigi',0,0,{h:320})}</g><g transform="translate(125 160) scale(.15)">${fig('zeynep',0,0,{h:320})}</g>`);
  let tl='';const x0=240,x1=960;for(let m=0;m<=60;m+=5){const x=x0+(x1-x0)*m/60;tl+=L(`M${x} 70 v14`,2.6)+T(x,52,m===60?'16:00':'15:'+String(m).padStart(2,'0'),{s:15,w:700,font:'Poppins'})}
  ['Dieter','Luigi','Heike','Emre'].forEach((r,i)=>{const y=100+i*58;tl+=T(x0-16,y+30,r,{s:23,w:700,font:'Poppins',a:'end'})+`<rect x="${x0}" y="${y}" width="${x1-x0}" height="40" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`});
  [10,25,35,50].forEach(m=>{const x=x0+(x1-x0)*m/60;tl+=`<rect x="${x-26}" y="280" width="52" height="28" rx="7" fill="#F6C431" stroke="${INK}" stroke-width="2.4"/>`+T(x,300,'Foto',{s:15,w:700,font:'Poppins'})});
  [20,40].forEach(m=>{const x=x0+(x1-x0)*m/60;tl+=L(`M${x} 78 V330`,4,INK)+`<rect x="${x-80}" y="336" width="160" height="34" rx="8" fill="${INK}"/>`+T(x,360,'Treppe knarrt',{s:19,w:700,font:'Poppins',c:'#fff'})});
  return `<div class="h2 sm">Haus, Fotos und Zeitleiste</div><div style="width:62%;margin:0 auto">${wsv(1000,540,h)}</div>`+`<div style=\"width:88%;margin:0 auto\">${wsv(1000,250,ph1+ph2+ph3+ph4)}</div>`+`<div style="width:70%;margin:0 auto">${wsv(1000,390,tl)}</div>`};
function wsPage(c){const el=newPage('ws',`<div class="col wscol"><div class="lblrow"><span class="lbl">FALL ${c.n}</span><span class="hint">ARBEITSSEITE</span></div>${WS[c.n]()}${window.__wsExtra||''}</div>${pnoHtml()}`);setPno(el);
  const col=el.querySelector('.col');if(col.scrollHeight>col.clientHeight+1)ISSUES.push('OVERFLOW Arbeitsseite '+c.n);
  {const kids=[...col.children].filter(k=>!k.classList.contains('lblrow')&&!k.classList.contains('h2')&&!k.classList.contains('sub'));const last=col.lastElementChild;const mm=96/25.4;const free=col.clientHeight/mm-(last.offsetTop+last.offsetHeight)/mm-2;if(kids.length&&free>3){const g=Math.min(free/kids.length,14);kids.forEach(k=>k.style.marginTop=g.toFixed(1)+'mm')}}
  return el}
SC['67w']=()=>SC['67']().replace('viewBox="0 0 1000 620"','viewBox="0 235 1000 235"');
window.doublePages=function(c){if(c.n==='55'){const all=c.body.filter(b=>!(b.t==='ill'&&b.kind==='hint'));window.__wsExtra=renderBlocks(c,all.slice(2,4));const l=casePage(c,{blocks:all.slice(0,2).concat(all.slice(4)),fitOpt:{sizes:[116,96,76,66]}});wsPage(c);window.__wsExtra='';return l}if(c.n==='67'){const all=c.body.filter(b=>!(b.t==='ill'&&b.kind==='hint'));window.__wsExtra=renderBlocks(c,all.slice(5,7));const l=casePage(c,{blocks:all.slice(0,5).concat(all.slice(7)),fitOpt:{sizes:[96,76,66,56,46,0]}});wsPage(c);window.__wsExtra='';return l}const l=casePage(c,{});wsPage(c);return l};
