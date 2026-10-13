import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const require=createRequire('/Users/golbez/AI Games/AI-Game-Dev-Harness/package.json');
const {chromium}=require('playwright');
const base=process.env.SITE_URL??'http://127.0.0.1:4352';
const out=new URL('../press/boom-brigade/screenshots/',import.meta.url);
const browser=await chromium.launch({channel:'chrome',headless:true});
const captures=[];
try{
 const context=await browser.newContext({viewport:{width:375,height:812},hasTouch:true,isMobile:true,deviceScaleFactor:1});
 const page=await context.newPage();
 await page.goto(`${base}/games/boom-brigade/?qa=1`);await page.locator('#loading').waitFor({state:'detached'});await page.evaluate(()=>document.fonts.ready);
 for(const [file,level] of [['first-board.png',0],['gold-barrels.png',11],['rolling-finale.png',15]]){
  if(level){await page.locator('#levels').click();await page.locator(`[data-level="${level}"]`).click();}
  await page.waitForFunction(()=>Array.from(document.images).every(i=>i.complete));
  await page.screenshot({path:new URL(file,out).pathname});
  const data=await fs.readFile(new URL(file,out));captures.push({file,level:level+1,width:375,height:812,sha256:crypto.createHash('sha256').update(data).digest('hex')});
 }
 await fs.copyFile(new URL('rolling-finale.png',out),new URL('../assets/boom-brigade-gameplay.png',import.meta.url));
 await context.close();
}finally{await browser.close();}
await fs.writeFile(new URL('capture.json',out),JSON.stringify({source:'Actual Boom Brigade 0.1.1 production browser renderer',capturedAt:new Date().toISOString(),method:'Chrome 375×812; no generated imagery; qa query excludes capture visits from community counts',captures},null,2)+'\n');
console.log(JSON.stringify(captures));
