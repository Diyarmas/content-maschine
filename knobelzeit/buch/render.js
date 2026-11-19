const {chromium}=require('playwright');
(async()=>{const [,,src,out]=process.argv;const b=await chromium.launch();const p=await b.newPage();
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CON',m.text())});
await p.emulateMedia({media:'print'});await p.goto('file://'+src);await p.waitForFunction(()=>window.__done,null,{timeout:60000});await p.waitForTimeout(300);
console.log(JSON.stringify(await p.evaluate(()=>({pages:window.__done.pages,issues:window.__done.issues,fill:window.__done.fill}))));
await p.pdf({path:out,preferCSSPageSize:true,printBackground:true});await b.close()})();
