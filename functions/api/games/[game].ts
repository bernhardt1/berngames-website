import {GAME,UUID,json,body,sameOrigin,limit,player,stats,verifyRun} from '../../_lib/community';
import {LEVELS} from '../../_lib/boom/levels';
export async function onRequest(context:any){
 const {request,env,params}=context;
 if(params.game!==GAME)return json({error:'Unknown game.'},404);
 if(!env.DB)return json({error:'Community stats are taking a break.'},503);
 try{
  if(request.method==='GET')return json(await stats(env.DB));
  if(request.method!=='POST')return json({error:'Method not allowed.'},405);
  if(!sameOrigin(request))return json({error:'Origin not allowed.'},403);
  if(!await limit(request,env.DB,'game',600))return json({error:'Please try again later.'},429);
  const v=await body(request);
  if(!['view','start','finish'].includes(v.event))return json({error:'Unknown event.'},400);
  if(v.event!=='view'&&(!UUID.test(v.attempt??'')||!UUID.test(v.session??'')||!LEVELS.some(l=>l.id===v.level)))return json({error:'Invalid attempt.'},400);
  const p=await player(request,env.DB),now=Date.now();
  if(v.event==='view'){
   await env.DB.prepare('INSERT OR IGNORE INTO visits(player,game,bucket) VALUES(?,?,?)').bind(p.id,GAME,Math.floor(now/1800000)).run();
  }else if(v.event==='start'){
   await env.DB.batch([
    env.DB.prepare('INSERT OR IGNORE INTO play_sessions(id,player,game,created_at) VALUES(?,?,?,?)').bind(v.session,p.id,GAME,now),
    env.DB.prepare('INSERT OR IGNORE INTO attempts(id,player,game,level,session,started_at) VALUES(?,?,?,?,?,?)').bind(v.attempt,p.id,GAME,v.level,v.session,now)
   ]);
  }else{
   const verified=verifyRun(v.level,v.commands);
   if(!verified)return json({error:'The recorded moves do not resolve this board.'},400,p.headers);
   const attempt=await env.DB.prepare('SELECT id FROM attempts WHERE id=? AND player=? AND level=? AND session=?').bind(v.attempt,p.id,v.level,v.session).first();
   if(!attempt)return json({error:'Attempt was not started.'},409,p.headers);
   await env.DB.prepare('UPDATE attempts SET won=?,finished_at=? WHERE id=? AND player=? AND finished_at IS NULL').bind(verified.won?1:0,now,v.attempt,p.id).run();
  }
  return json({ok:true},200,p.headers);
 }catch(e){console.error('Community request failed:',e instanceof Error?e.message:'error');return json({error:'Stats are unavailable right now. Your game is unaffected.'},503);}
}
