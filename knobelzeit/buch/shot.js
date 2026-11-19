const {chromium}=require('playwright');
(async()=>{const [,,file,out,w,h]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:+w||1900,height:+h||1000}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CON',m.text())});
await p.goto('file://'+file);await p.waitForTimeout(600);await p.screenshot({path:out,fullPage:true});await b.close()})();
