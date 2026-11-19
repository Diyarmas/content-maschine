const {chromium}=require('playwright');
(async()=>{const [,,src,out,w,h]=process.argv;const b=await chromium.launch();const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.emulateMedia({media:'print'});await p.goto('file://'+src);await p.waitForTimeout(800);
await p.pdf({path:out,width:w+'mm',height:h+'mm',printBackground:true,preferCSSPageSize:true});await b.close()})();
