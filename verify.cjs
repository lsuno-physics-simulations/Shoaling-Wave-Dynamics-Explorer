const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(require('path').join(__dirname,'index.html'),'utf8');
const nodes={};const ctx=new Proxy({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)})},{get:(o,k)=>o[k]||(()=>{})});
function node(id){return nodes[id]??=( {value:({amp:'.6',angle:'0',speed:'3',duration:'60',view:'surface',energyRange:'auto'})[id]||'',checked:!['sediment'].includes(id),textContent:'',style:{},getContext:()=>ctx,setPointerCapture(){},click(){},toDataURL:()=>''});}
const box={document:{getElementById:node,createElement:()=>node('temp')},requestAnimationFrame(){},console,Uint8ClampedArray};const api=new Function('document','requestAnimationFrame',html.match(/<script>([\s\S]*?)<\/script>/)[1]+'; return {run:(s)=>eval(s)};')(box.document,box.requestAnimationFrame);
function run(s){return api.run(s);}
assert.equal(run('t'),0);assert(run('Math.min(...h)')>=1);
run('for(let i=0;i<1000;i++)advance()');assert(Math.abs(run('t')-10)<1e-8);assert(run('eta.every(Number.isFinite)'));assert(run('eta.some(v=>Math.abs(v)>0.001)'));
const first=run('Array.from(eta)');run('reset();for(let i=0;i<1000;i++)advance()');assert.deepEqual(run('Array.from(eta)'),first);
run("reset();$('amp').value='0';for(let i=0;i<100;i++)advance()");assert(run('eta.every(v=>v===0)'));
run("reset();$('amp').value='2';$('sediment').checked=true;$('sponge').checked=false;for(let i=0;i<6000;i++)advance()");assert(run('eta.every(Number.isFinite)'));assert(run('h.every(v=>v>=1&&v<=25)'));assert(run('h.some((v,i)=>v!==initial[i])'));
for(const view of ['surface','wave','energy','depth','change'])run(`$('view').value='${view}';render()`);
run("$('contours').checked=false;$('view').value='surface';$('energyRange').value='1';eta.fill(0);eta[0]=0.5;render()");
assert.deepEqual(run('Array.from(energyPixels.data.slice(0,3))'),run('energyColor(.25)'));
assert.deepEqual(run('Array.from(pixels.data.slice(0,3))'),run('energyColor(.25)'));
assert.equal(nodes.energyHigh.textContent,'1.00 m²');assert.equal(nodes.high.textContent,'1.00 m²');
run("$('energyRange').value='auto';eta.fill(0);render()");assert.equal(nodes.energyHigh.textContent,'0.00000100 m²');
run("eta[0]=2;render()");assert.equal(nodes.energyHigh.textContent,'4.00 m²');
run("$('save').onclick()");assert.equal(nodes.temp.width,960);assert.equal(nodes.temp.height,1320);
run("$('bar').checked=false;reset()");assert.equal(run('t'),0);assert(run('eta.every(v=>v===0)'));
console.log('PASS: initialization, 10 s propagation, seeded reset, zero forcing, 60 s high-amplitude sediment/no-sponge stability, five upper views, synchronized energy colors/scales, zero-energy auto-scale floor, combined snapshot dimensions, feature reset.');


