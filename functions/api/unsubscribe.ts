import {body,json,sameOrigin} from '../_lib/community';
export async function onRequestPost({request,env}:any){
 if(!sameOrigin(request))return json({error:'Origin not allowed.'},403);
 if(!env.DB)return json({error:'Please try again later.'},503);
 try{
  const v=await body(request);if(typeof v.token!=='string'||v.token.length!==72)return json({error:'This unsubscribe link is incomplete.'},400);
  await env.DB.prepare('UPDATE subscribers SET active=0 WHERE token=?').bind(v.token).run();
  return json({ok:true});
 }catch{return json({error:'Please try again later.'},503);}
}
