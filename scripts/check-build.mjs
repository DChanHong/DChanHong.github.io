import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
async function files(dir) {
 const entries = await readdir(dir, {withFileTypes:true});
 return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(dir,e.name)) : join(dir,e.name)))).flat();
}
const output = await files('_site');
for (const path of output.filter(p => p.endsWith('.html'))) {
 const html = await readFile(path,'utf8');
 if (html.includes('미발행 작성안') || html.includes('작성안 미리보기')) throw new Error(`Draft leaked: ${path}`);
 for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^\"]*"/g)) {
  const target = match[1];
  await access(join('_site',target.endsWith('/') ? `${target}index.html` : target));
 }
}
if(output.some(p=>p.includes('writing-guide'))) throw new Error('Draft output was generated');
console.log('Production build: drafts excluded; internal page and asset links resolve.');
