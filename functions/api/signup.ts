import {body,json,sameOrigin,limit} from '../_lib/community';
export async function onRequestPost({request,env}:any){
 if(!sameOrigin(request))return json({error:'Origin not allowed.'},403);
 if(!env.DB)return json({error:'Signup is unavailable right now. Please try again later.'},503);
 try{
  if(!await limit(request,env.DB,'signup',10))return json({error:'Please try again later.'},429);
  const v=await body(request),email=typeof v.email==='string'?v.email.trim().toLowerCase():'';
  if(v.website)return json({ok:true});
  if(v.consent!==true||email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({error:'Enter a valid email and agree to release updates.'},400);
  const topics=(Array.isArray(v.topics)?v.topics:[]).filter((t:any)=>['puzzle','idle','dark-fantasy'].includes(t));
  if(!topics.length)return json({error:'Choose at least one kind of game.'},400);
  const token=crypto.randomUUID()+crypto.randomUUID();
  await env.DB.prepare('INSERT INTO subscribers(email,topics,consent_at,source,token,active) VALUES(?,?,?,?,?,1) ON CONFLICT(email) DO UPDATE SET topics=excluded.topics,consent_at=excluded.consent_at,source=excluded.source,token=excluded.token,active=1').bind(email,JSON.stringify([...new Set(topics)]),Date.now(),'berngames-release-form-v1',token).run();
  return json({ok:true,unsubscribe:`/unsubscribe.html#${token}`});
 }catch{return json({error:'Signup did not finish. Please try again.'},503);}
}
