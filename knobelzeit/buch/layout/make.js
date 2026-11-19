const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+__dirname+'/page.html');await p.waitForTimeout(500);
await p.pdf({path:__dirname+'/Probeseiten.pdf',preferCSSPageSize:true,printBackground:true});await b.close();console.log('ok')})();
