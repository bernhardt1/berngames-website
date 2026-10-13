import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire('/Users/golbez/AI Games/AI-Game-Dev-Harness/package.json');
const {chromium}=require('playwright');
const base=process.env.SITE_URL??'http://127.0.0.1:4352',out=new URL('../.impeccable/review/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const report={base,checks:[],errors:[]};
try{
 for(const [name,width,height]of [['desktop',1280,900],['mobile',375,812]]){
  const context=await browser.newContext({viewport:{width,height},hasTouch:name==='mobile',isMobile:name==='mobile'}),page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:new URL(`${name}.png`,out).pathname,fullPage:true});
  await page.goto(`${base}/press/boom-brigade/`);await page.evaluate(()=>document.fonts.ready);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.equal(await page.locator('.press-shots img').count(),3);for(const img of await page.locator('.press-shots img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.complete?null:new Promise(r=>i.addEventListener('load',r,{once:true})));}assert.ok(await page.locator('.press-shots img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)));await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:new URL(`press-${name}.png`,out).pathname,fullPage:true});
  await page.goto(`${base}/games/boom-brigade/`);await page.locator('#loading').waitFor({state:'detached'});await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.evaluate(()=>typeof window.__GAME_DEV__),'undefined');
  await page.locator('[data-id="b0"]').click();await page.locator('#result[open]').waitFor();
  await page.locator('#result-community').filter({hasText:/players have cleared/}).waitFor();
  assert.ok((await page.locator('#result-community').textContent()).includes('100%'));
  await page.screenshot({path:new URL(`win-${name}.png`,out).pathname});
  await page.locator('#next').click();await page.locator('#settings-open').click();await page.locator('#community-section summary').click();
  await page.locator('#community-boards li').nth(15).waitFor();assert.equal(await page.locator('#community-boards li').count(),16);
  await page.screenshot({path:new URL(`stats-${name}.png`,out).pathname});
  await page.locator('#close-settings').click();
  // Stats failure must never disable puzzle input or cause an uncaught error.
  await page.route('**/api/games/boom-brigade',route=>route.fulfill({status:503,contentType:'application/json',body:'{"error":"Offline test"}'}));
  await page.locator('#levels').click();await page.locator('[data-level="0"]').click();await page.locator('[data-id="b0"]').click();await page.locator('#result[open]').waitFor();
  assert.equal(await page.locator('#result-title').textContent(),'BOOM!');
  report.checks.push({name,firstWin:true,realStats:true,boards:16,statsFailurePlay:true,qaHookAbsent:true,noOverflow:true});await context.close();
 }
 if(!base.startsWith('https://')){
  const page=await browser.newPage();await page.goto(base+'/#new-games');await page.locator('#release-email').fill('publishing-browser-test@example.invalid');await page.locator('[name="consent"]').check();await page.getByRole('button',{name:'Keep me posted'}).click();await page.locator('[data-release-signup] [role="status"]').filter({hasText:'You’re on the list'}).waitFor();
  await page.locator('[data-release-signup] a',{hasText:'Unsubscribe'}).click();await page.getByRole('button',{name:'Unsubscribe'}).click();await page.locator('#status').filter({hasText:'You have been unsubscribed'}).waitFor();report.signupUnsubscribe=true;
 }
 assert.deepEqual(report.errors,[]);report.ok=true;await fs.writeFile(new URL('community-report.json',out),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await browser.close();}
