const CACHE="carnet-muscu-v9";
const SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png"];
const CACHED_HOSTS=["www.gstatic.com","fonts.googleapis.com","fonts.gstatic.com"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  const own=u.origin===self.location.origin;
  // never touch Firebase Auth / Firestore traffic; only the app files, the Firebase SDK and fonts
  if(!own&&!CACHED_HOSTS.includes(u.hostname))return;
  if(own&&u.pathname.startsWith("/__/"))return;
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==="opaque")){const c=r.clone();caches.open(CACHE).then(cc=>cc.put(e.request,c))}return r}).catch(()=>hit);
    return hit||net;
  }));
});
