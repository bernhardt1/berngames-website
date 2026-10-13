import fs from 'node:fs/promises';
const root=new URL('../',import.meta.url),out=new URL('../public/',import.meta.url);
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
for(const name of ['index.html','privacy.html','support.html','unsubscribe.html','styles.css','community.js','_routes.json','assets','games','press']){
 const source=new URL(name,root);try{await fs.stat(source);}catch{continue;}
 await fs.cp(source,new URL(name,out),{recursive:true});
}
console.log('Built public site assets; server source, local databases, and credentials excluded.');
