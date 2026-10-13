for(const form of document.querySelectorAll('[data-release-signup]')){
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const button=form.querySelector('button[type="submit"]'),status=form.querySelector('[role="status"]'),data=new FormData(form);
  button.disabled=true;status.textContent='Adding you to the list…';
  try{
   const response=await fetch('/api/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:data.get('email'),website:data.get('website'),topics:data.getAll('topics'),consent:data.get('consent')==='yes'}),signal:AbortSignal.timeout(8000)});
   const result=await response.json();if(!response.ok)throw new Error(result.error??'Signup did not finish. Please try again.');
   status.replaceChildren(document.createTextNode('You’re on the list. We’ll email you when a new game is ready. '));
   if(result.unsubscribe){const link=document.createElement('a');link.href=result.unsubscribe;link.textContent='Unsubscribe';link.className='inline-link';status.append(link);}
   form.querySelector('input[type="email"]').value='';
  }catch(error){status.textContent=error.name==='TimeoutError'?'Signup took too long. Please try again.':error.message;}
  finally{button.disabled=false;}
 });
}
for(const element of document.querySelectorAll('[data-game-stats]')){
 fetch('/api/games/boom-brigade',{signal:AbortSignal.timeout(5000)}).then(async response=>{
  if(!response.ok)throw new Error();const stats=await response.json();
  element.textContent=`${stats.views.toLocaleString()} views · ${stats.plays.toLocaleString()} plays · ${stats.players.toLocaleString()} players`;
 }).catch(()=>{element.textContent='Community progress is available inside the game.';});
}
