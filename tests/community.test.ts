import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import {verifyRun} from '../functions/_lib/community.ts';
import {LEVELS} from '../functions/_lib/boom/levels.ts';
import {onRequest} from '../functions/api/games/[game].ts';
import {onRequestPost as signup} from '../functions/api/signup.ts';
import {onRequestPost as unsubscribe} from '../functions/api/unsubscribe.ts';
function database(){
 const sql=new DatabaseSync(':memory:');sql.exec(fs.readFileSync(new URL('../migrations/0001_community.sql',import.meta.url),'utf8'));
 const db={prepare(query:string){let args:any[]=[];return{bind(...a:any[]){args=a;return this;},async first(){return sql.prepare(query).get(...args)??null;},async all(){return{results:sql.prepare(query).all(...args)};},async run(){return sql.prepare(query).run(...args);}};},async batch(statements:any[]){sql.exec('BEGIN');try{const rows=[];for(const s of statements)rows.push(await s.run());sql.exec('COMMIT');return rows;}catch(e){sql.exec('ROLLBACK');throw e;}}};return{db,sql};
}
const origin='https://berngames.com';
function request(url:string,payload?:any,cookie=''){return new Request(origin+url,{method:payload?'POST':'GET',headers:{Origin:origin,'Content-Type':'application/json',Cookie:cookie},...(payload?{body:JSON.stringify(payload)}:{})});}
test('all authored campaign wins can be verified, tampered and incomplete runs cannot',()=>{
 for(const level of LEVELS)assert.equal(verifyRun(level.id,level.solution)?.won,true,level.id);
 assert.equal(verifyRun(LEVELS[0].id,[{type:'ignite',id:'imaginary'}]),null);
 assert.equal(verifyRun(LEVELS[4].id,[]),null);
 assert.equal(verifyRun(LEVELS[0].id,[{type:'retry'},{type:'ignite',id:'b0'}]),null);
});
test('visits and retries deduplicate; clear rate counts distinct players',async()=>{
 const {db,sql}=database();let cookie='';const call=async(v?:any)=>{const r=await onRequest({request:request('/api/games/boom-brigade',v,cookie),env:{DB:db},params:{game:'boom-brigade'}});if(r.headers.has('set-cookie'))cookie=r.headers.get('set-cookie')!.split(';')[0];return r;};
 await call({event:'view'});await call({event:'view'});
 const session=crypto.randomUUID(),attempt=crypto.randomUUID(),level=LEVELS[0].id;
 await call({event:'start',session,attempt,level});await call({event:'start',session,attempt,level});
 assert.equal((await call({event:'finish',session,attempt,level,commands:[{type:'ignite',id:'fake'}]})).status,400);
 const finish={event:'finish',session,attempt,level,commands:LEVELS[0].solution};await call(finish);await call(finish);
 await call({event:'start',session,attempt:crypto.randomUUID(),level});
 cookie='';await call({event:'start',session:crypto.randomUUID(),attempt:crypto.randomUUID(),level});
 const stats=await(await call()).json();assert.equal(stats.views,1);assert.equal(stats.plays,2);assert.equal(stats.players,2);assert.equal(stats.levels[0].clearRate,50);assert.equal(stats.levels[0].cleared,1);assert.equal(stats.levels[0].attempts,3);assert.equal(stats.levels[0].wins,1);
 sql.close();
});
test('cross-origin game submissions cannot mutate counts',async()=>{
 const {db,sql}=database();const r=await onRequest({request:new Request(origin+'/api/games/boom-brigade',{method:'POST',headers:{Origin:'https://other.example','Content-Type':'application/json'},body:'{"event":"view"}'}),env:{DB:db},params:{game:'boom-brigade'}});assert.equal(r.status,403);assert.equal(sql.prepare('SELECT count(*) AS n FROM visits').get()!.n,0);sql.close();
});
test('signup requires consent, stores only selected interests, and unsubscribe works',async()=>{
 const {db,sql}=database();const call=(payload:any)=>signup({request:request('/api/signup',payload),env:{DB:db}});
 assert.equal((await call({email:'qa@example.invalid',topics:['puzzle'],consent:false})).status,400);
 const r=await call({email:'qa@example.invalid',topics:['puzzle','not-a-topic'],consent:true});assert.equal(r.status,200);const result=await r.json();const row=sql.prepare('SELECT * FROM subscribers').get()!;assert.equal(row.topics,'["puzzle"]');assert.equal(row.active,1);
 const token=result.unsubscribe.split('#')[1];assert.equal((await unsubscribe({request:request('/api/unsubscribe',{token}),env:{DB:db}})).status,200);assert.equal(sql.prepare('SELECT active FROM subscribers').get()!.active,0);sql.close();
});
