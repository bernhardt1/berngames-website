import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const source='/Users/golbez/AI Games/Games/boom-brigade/src';
const target=new URL('../functions/_lib/boom/',import.meta.url);
await fs.mkdir(target,{recursive:true});
const hashes={};
for(const file of ['game.ts','levels.ts','campaign.ts']){
  const data=await fs.readFile(path.join(source,file));
  await fs.writeFile(new URL(file,target),data);
  hashes[file]=crypto.createHash('sha256').update(data).digest('hex');
}
await fs.writeFile(new URL('source.json',target),JSON.stringify({source,hashes},null,2)+'\n');
console.log('Copied Boom Brigade rules for server-side outcome verification.');
