import {createState,act} from './boom/game';
import {LEVELS,type Command} from './boom/levels';
export const GAME='boom-brigade';
export const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const json=(value:unknown,status=200,headers:Record<string,string>={})=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
export function verifyRun(levelId:string,commands:unknown){
  const index=LEVELS.findIndex(l=>l.id===levelId);
  if(index<0||!Array.isArray(commands)||!commands.length||commands.length>64)return null;
  const state=createState(index);
  for(const [i,command] of commands.entries()){
    if(!command||typeof command!=='object'||!['move','undo','ignite'].includes(command.type))return null;
    if(command.type!=='undo'&&(typeof command.id!=='string'||command.id.length>32))return null;
    if(command.type==='move'&&(!command.to||!Number.isInteger(command.to.col)||!Number.isInteger(command.to.row)))return null;
    if(command.type==='ignite'&&i!==commands.length-1)return null;
    if(!act(state,command as Command))return null;
  }
  return state.status==='planning'?null:{won:state.status==='won',moves:state.used};
}
export async function body(request:Request){
  if(!request.headers.get('Content-Type')?.startsWith('application/json'))throw new Error('Use JSON.');
  const text=await request.text();if(text.length>12000)throw new Error('Request too large.');
  return JSON.parse(text);
}
export function sameOrigin(request:Request){
  return request.headers.get('Origin')===new URL(request.url).origin;
}
export async function limit(request:Request,db:any,kind:string,max:number){
  const now=Math.floor(Date.now()/1000),hour=Math.floor(now/3600);
  const ip=request.headers.get('CF-Connecting-IP')??'local';
  const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${hour}:${ip}`));
  const key=`${kind}:${hour}:`+Array.from(new Uint8Array(hash)).map(v=>v.toString(16).padStart(2,'0')).join('');
  const r=await db.prepare('INSERT INTO request_limits(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,now+3600).first();
  await db.prepare('DELETE FROM request_limits WHERE expires_at < ?').bind(now).run();
  return r.count<=max;
}
export async function player(request:Request,db:any){
  const existing=request.headers.get('Cookie')?.match(/(?:^|;\s*)bg_player=([0-9a-f-]{36})(?:;|$)/i)?.[1];
  if(existing&&UUID.test(existing)&&await db.prepare('SELECT id FROM players WHERE id=?').bind(existing).first())return{id:existing,headers:{}};
  const id=crypto.randomUUID();await db.prepare('INSERT INTO players(id,created_at) VALUES(?,?)').bind(id,Date.now()).run();
  const secure=new URL(request.url).protocol==='https:'?'; Secure':'';
  return{id,headers:{'Set-Cookie':`bg_player=${id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=15552000${secure}`}};
}
export async function stats(db:any){
  const [views,plays,players,levels]=await Promise.all([
    db.prepare('SELECT count(*) AS n FROM visits WHERE game=?').bind(GAME).first(),
    db.prepare('SELECT count(*) AS n FROM play_sessions WHERE game=?').bind(GAME).first(),
    db.prepare('SELECT count(DISTINCT player) AS n FROM attempts WHERE game=?').bind(GAME).first(),
    db.prepare('SELECT level,count(DISTINCT player) AS players,count(DISTINCT CASE WHEN won=1 THEN player END) AS cleared,count(*) AS attempts,sum(CASE WHEN won=1 THEN 1 ELSE 0 END) AS wins FROM attempts WHERE game=? GROUP BY level').bind(GAME).all()
  ]);
  return{game:GAME,views:views.n,plays:plays.n,players:players.n,levels:LEVELS.map((l,i)=>{
    const row=levels.results.find((r:any)=>r.level===l.id)??{players:0,cleared:0,attempts:0,wins:0};
    return{id:l.id,number:i+1,title:l.title,...row,clearRate:row.players?Math.round(100*row.cleared/row.players):null};
  }),definitions:{views:'One game visit per anonymous browser per 30-minute window.',plays:'A page session with at least one valid puzzle action.',clearRate:'Distinct anonymous browsers that beat a board divided by those that attempted it. Clearing cookies counts as a new player.'},updatedAt:new Date().toISOString()};
}
