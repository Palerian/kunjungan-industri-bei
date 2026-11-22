'use strict';
/* ========= DATA (edit bagian ini sesuai kunjunganmu) ========= */
const HISTORY = [
  ['1912','Bursa efek pertama di Hindia Belanda dibuka di Batavia (kini Jakarta) oleh pemerintah kolonial Belanda.'],
  ['1977','Pasar modal diaktifkan kembali oleh pemerintah dan dijalankan di bawah Badan Pelaksana Pasar Modal (Bapepam).'],
  ['1992','Bursa Efek Jakarta diswastanisasi menjadi PT Bursa Efek Jakarta.'],
  ['2007','Bursa Efek Jakarta dan Bursa Efek Surabaya bergabung menjadi Bursa Efek Indonesia (BEI).']
];

const STEPS = [
  {time:'Sesi 1', title:'Mengenal benda bersejarah', text:'Kunjungan dimulai dari koleksi bersejarah bursa: prospektus, binokular, kertas saham, dan handheld transceiver. Benda-benda ini menunjukkan bagaimana perdagangan efek berjalan sebelum era digital.'},
  {time:'Sesi 2', title:'Belajar jual beli dan investasi', text:'Peserta diajari cara jual beli saham, dasar-dasar investasi, aplikasi Bibit, serta peran perusahaan sekuritas.'},
  {time:'Sesi 3', title:'Bursa Model dan tiga lembaganya', text:'Peserta mengenal tiga lembaga di Bursa Model: BEI sebagai tempat jual beli, KPEI sebagai kasir, dan KSEI sebagai gudang. Ketiganya diawasi OJK.'},
  {time:'Sesi 4', title:'Produk pasar modal', text:'Materi tentang saham, obligasi (surat utang), dan reksa dana, termasuk perbedaan karakter dan risikonya.'},
  {time:'Sesi 5', title:'Capital gain, dividen, dan risiko', text:'Dijelaskan bahwa keuntungan disebut capital gain, ada pula dividen, dan untung yang besar selalu diikuti risiko yang besar. Pasar modal bersifat dinamis.'},
  {time:'Sesi 6', title:'Investasi legal dan tanya jawab', text:'Peserta belajar memastikan aplikasi investasi diawasi OJK, mengenal IDX Mobile (hanya untuk melihat informasi saham), lalu berdiskusi tentang saham vs judi, obligasi gagal bayar, dan dividen.'}
];

const PHOTOS = [
  // [keterangan, kategori, posisi-crop (opsional)]. File otomatis: foto-01.jpg, foto-02.jpg, dst.
  ['Berkumpul di SMKN 2 Jakarta','perjalanan'],
  ['Perjalanan menuju SCBD dengan bus','perjalanan'],
  ['Tiba di gedung BEI','di-bei'],
  ['Memasuki lobi Bursa Efek Indonesia','di-bei'],
  ['Koleksi benda bersejarah di bursa','di-bei','50% 45%'],
  ['Pemaparan pilihan investasi','di-bei'],
  ['Ruang utama BEI dengan layar indeks melingkar','di-bei'],
  ['Papan IDX Composite di ruang utama BEI','di-bei'],
  ['Koleksi penghargaan dan piala di BEI','di-bei'],
  ['Foto bersama satu sekolah','kebersamaan']
].map(([cap,cat,pos],i)=>({cap,cat,pos,n:i+1,src:`assets/images/foto-${String(i+1).padStart(2,'0')}.jpg`}));
const CATS = {semua:'Semua',perjalanan:'Perjalanan','di-bei':'Di BEI',kebersamaan:'Kebersamaan'};
const TICKERS = ['IHSG','LQ45','IDX30','JII','BBCA','BBRI','BMRI','TLKM','ASII','INDF','ICBP','UNVR'];

/* ========= HELPER ========= */
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const ICONS = {
  search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>', close:'<path d="M18 6 6 18M6 6l12 12"/>',
  play:'<path d="M8 5v14l11-7z"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  chart:'<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>', up:'<path d="M7 17 17 7M8 7h9v9"/>',
  shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  expand:'<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
  trend:'<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>'
};
const ic=(n,s=18)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;
$$('i[data-i]').forEach(el=>{el.innerHTML=ic(el.dataset.i,+el.dataset.s||18);});
const fmt=n=>n.toFixed(2).replace('.',',');
const placeholder=n=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#18211a"/><path d="M0 220h60l40-70 60 110 50-80 40 40h150" fill="none" stroke="#cefa73" stroke-opacity=".35" stroke-width="3"/><text x="200" y="120" fill="#cefa73" font-family="monospace" font-size="20" text-anchor="middle">Foto ${n}</text><text x="200" y="146" fill="#9da49e" font-family="monospace" font-size="12" text-anchor="middle">foto-${String(n).padStart(2,'0')}.jpg di assets/images</text></svg>`);
const toastEl=$('#toast'); let toastT;
function toast(msg){toastEl.textContent=msg;toastEl.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>toastEl.hidden=true,2400);}

/* ========= NAVIGASI ========= */
const menu=$('#menu'), burger=$('#burger');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);};
menu.onclick=e=>{if(e.target.closest('a')){menu.classList.remove('open');burger.setAttribute('aria-expanded',false);}};
const links=$$('a',menu);
const spy=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting) links.forEach(a=>{const on=a.hash==='#'+e.target.id;a.classList.toggle('nav-active',on);on?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current');});
}),{rootMargin:'-40% 0px -55% 0px'});
$$('main section[id]').forEach(s=>spy.observe(s));
$('#share').onclick=()=>{
  (navigator.clipboard?navigator.clipboard.writeText(location.href):Promise.reject()).then(()=>toast('Tautan disalin'),()=>toast('Salin tautan dari bilah alamat browser'));
};

/* ========= TICKER (ilustrasi acak) ========= */
(function(){
  const row=TICKERS.map(t=>{const c=Math.random()*3-1.4;return `<span class="market-quote"><span>${t}</span><em class="${c<0?'negative':''}">${c<0?'▼':'▲'} ${fmt(Math.abs(c))}%</em></span>`;}).join('');
  $('#track').innerHTML=row+row;
})();

/* ========= GRAFIK HARGA (ilustrasi, bisa di-hover) ========= */
(function(){
  const PER={
    '1D':{n:48,vol:.9,l:['09.00','10.30','12.00','13.30','15.00']},
    '1W':{n:35,vol:1.3,l:['Sen','Sel','Rab','Kam','Jum']},
    '1M':{n:22,vol:1.8,l:['Mgg 1','Mgg 2','Mgg 3','Mgg 4']},
    '3M':{n:60,vol:2.2,l:['Bln 1','Bln 2','Bln 3']},
    '1Y':{n:52,vol:3,l:['Q1','Q2','Q3','Q4']}
  };
  const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
  const build=k=>{const {n,vol}=PER[k],r=rng(Object.keys(PER).indexOf(k)*977+13);let v=100;
    return Array.from({length:n},()=>{const d=(r()-.45)*vol;v+=d;return{v,vol:25+r()*75,up:d>=0};});};
  const svg=$('#svg'),plot=$('#plot'),dot=$('#dot'),cross=$('#cross'),tip=$('#tip');
  let key='1M', d=[], n=0, yy, last=0;

  $('#periods').innerHTML=Object.keys(PER).map(k=>`<button type="button" aria-pressed="${k===key}" data-k="${k}">${k}</button>`).join('');
  $('#periods').onclick=e=>{const b=e.target.closest('button');if(!b)return;key=b.dataset.k;$$('#periods button').forEach(x=>x.setAttribute('aria-pressed',x===b));render();};

  function render(){
    d=build(key);n=d.length;
    const vs=d.map(p=>p.v),hi=Math.max(...vs),lo=Math.min(...vs),pad=(hi-lo)*.12||1,top=hi+pad,bot=lo-pad;
    yy=v=>100-(v-bot)/(top-bot)*100;
    const x=i=>i/(n-1)*100;
    svg.innerHTML=[0,1,2,3].map(i=>`<line class="chart-grid" x1="0" x2="100" y1="${i*100/3}" y2="${i*100/3}"/>`).join('')
      +`<polyline class="chart-line" points="${d.map((p,i)=>x(i)+','+yy(p.v)).join(' ')}"/>`;
    $('#axis').innerHTML=[0,1,2,3].map(i=>`<span style="top:${i*100/3}%">${fmt(top-(top-bot)*i/3)}</span>`).join('');
    $('#vol').innerHTML=d.map(p=>`<span class="${p.up?'volume-up':''}" style="height:${p.vol}%"></span>`).join('');
    $('#dates').innerHTML=PER[key].l.map(t=>`<span>${t}</span>`).join('');
    show(n-1,false);
  }
  function show(i,hover){
    last=i;const p=d[i],x=i/(n-1)*100,first=d[0].v,ch=(p.v-first)/first*100;
    dot.style.left=x+'%';dot.style.top=yy(p.v)+'%';
    cross.hidden=tip.hidden=!hover;
    if(hover){cross.style.left=x+'%';tip.style.left=Math.min(88,Math.max(12,x))+'%';
      tip.innerHTML=`<strong>${fmt(p.v)}</strong><span>${ch>=0?'+':''}${fmt(ch)}% dari awal</span><span>Titik ${i+1} dari ${n}</span>`;}
    $('#price').textContent=fmt(p.v);
    const el=$('#delta');el.classList.toggle('negative',ch<0);
    el.innerHTML=ic('up',12)+(ch>=0?'+':'')+fmt(ch)+'%';
    $$('#vol span').forEach((s,j)=>s.classList.toggle('volume-active',hover&&j===i));
  }
  const idx=e=>{const r=plot.getBoundingClientRect();return Math.max(0,Math.min(n-1,Math.round((e.clientX-r.left)/r.width*(n-1))));};
  plot.addEventListener('pointermove',e=>show(idx(e),true));
  plot.addEventListener('pointerleave',()=>show(n-1,false));
  plot.addEventListener('blur',()=>show(n-1,false));
  plot.addEventListener('keydown',e=>{
    const m={ArrowLeft:-1,ArrowRight:1};
    if(e.key in m){e.preventDefault();show(Math.max(0,Math.min(n-1,last+m[e.key])),true);}
    if(e.key==='Home'){e.preventDefault();show(0,true);} if(e.key==='End'){e.preventDefault();show(n-1,true);}
  });
  render();
})();

/* ========= SEJARAH ========= */
$('#hist').innerHTML=HISTORY.map(([y,t])=>`<div class="research-point"><span>${y}</span><p>${t}</p></div>`).join('');

/* ========= RANGKAIAN KEGIATAN ========= */
(function(){
  const list=$('#stepList'),det=$('#stepDetail');let cur=0;
  list.innerHTML=STEPS.map((s,i)=>`<button type="button" role="tab" data-i="${i}"><span class="step-no">${i+1}</span><span><strong>${s.title}</strong><small>${s.time}</small></span></button>`).join('');
  function show(i){
    cur=i;const s=STEPS[i];
    $$('button',list).forEach((b,j)=>b.setAttribute('aria-selected',j===i));
    det.style.animation='none';det.offsetHeight;det.style.animation='';
    det.innerHTML=`<p class="article-label">${s.time} dari ${STEPS.length}</p><h3>${s.title}</h3><p>${s.text}</p>
      <div class="step-bar">${STEPS.map((_,j)=>`<span class="${j<=i?'on':''}"></span>`).join('')}</div>
      <div class="step-nav"><button class="watch-button" type="button" data-d="-1" ${i===0?'disabled':''}>‹ Sebelumnya</button><button class="watch-button" type="button" data-d="1" ${i===STEPS.length-1?'disabled':''}>Berikutnya ›</button></div>`;
  }
  list.onclick=e=>{const b=e.target.closest('button');if(b)show(+b.dataset.i);};
  det.onclick=e=>{const b=e.target.closest('button[data-d]');if(b)show(cur+ +b.dataset.d);};
  show(0);
})();

/* ========= GALERI + LIGHTBOX ========= */
(function(){
  $('#galCount').textContent=`${PHOTOS.length} foto`;$('#docCount').textContent=`${PHOTOS.length} foto, 1 vlog`;
  const grid=$('#gallery'),filters=$('#filters'),lb=$('#lb'),img=$('#lbImg');
  let shown=PHOTOS,idx=0;
  const fallback=(el,n)=>{el.onerror=()=>{el.onerror=null;el.src=placeholder(n);};};
  grid.innerHTML=PHOTOS.map(p=>`<button class="panel media-card" type="button" data-n="${p.n}" data-cat="${p.cat}" aria-label="Perbesar foto: ${p.cap}">
    <div class="media-cover"><img src="${p.src}" alt="${p.cap}" loading="lazy" style="object-position:${p.pos||'center'}"><span class="media-type">Foto ${String(p.n).padStart(2,'0')}</span><span class="media-cover-action">${ic('expand',15)}</span></div>
    <div class="media-details"><div><h3>${p.cap}</h3><p>${CATS[p.cat]}</p></div>${ic('up',17)}</div></button>`).join('');
  $$('img',grid).forEach((el,i)=>fallback(el,i+1));
  filters.innerHTML=Object.entries(CATS).map(([k,l],i)=>`<button type="button" data-k="${k}" aria-pressed="${i===0}">${l}</button>`).join('');
  filters.onclick=e=>{const b=e.target.closest('button');if(!b)return;const k=b.dataset.k;
    $$('button',filters).forEach(x=>x.setAttribute('aria-pressed',x===b));
    shown=PHOTOS.filter(p=>k==='semua'||p.cat===k);
    $$('.media-card',grid).forEach(c=>c.classList.toggle('hide',k!=='semua'&&c.dataset.cat!==k));};
  function render(){const p=shown[idx];fallback(img,p.n);img.src=p.src;img.alt=p.cap;$('#lbCap').textContent=p.cap;$('#lbCount').textContent=`${idx+1} / ${shown.length}`;}
  const go=d=>{idx=(idx+d+shown.length)%shown.length;render();};
  grid.onclick=e=>{const c=e.target.closest('.media-card');if(!c)return;idx=Math.max(0,shown.findIndex(p=>p.n==c.dataset.n));render();lb.showModal();};
  $('#lbPrev').onclick=()=>go(-1);$('#lbNext').onclick=()=>go(1);
  lb.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1);});
})();

/* ========= MODAL (tutup) ========= */
$$('dialog').forEach(dl=>{
  dl.addEventListener('click',e=>{if(e.target===dl||e.target.closest('[data-close]'))dl.close();});
});

/* ========= CARI MATERI ========= */
(function(){
  const dl=$('#searchModal'),q=$('#q'),out=$('#results');
  const items=()=>$$('main h2, #materi h4, #profil dt, summary, .step-list strong').map(el=>{
    const sec=el.closest('section[id]');
    return{el,title:el.textContent.trim(),where:el.tagName==='H2'?'Bagian':(sec?$('h2',sec).textContent.trim():'')};
  });
  function list(){
    const t=q.value.trim().toLowerCase(),all=items();
    const hit=(t?all.filter(i=>(i.title+' '+i.where).toLowerCase().includes(t)):all.filter(i=>i.where==='Bagian')).slice(0,8);
    out.innerHTML=hit.length?hit.map((h,i)=>`<button class="stock-result" type="button" data-i="${i}"><span><strong>${h.title}</strong><small>${h.where}</small></span>${ic('up',16)}</button>`).join(''):'<p class="empty">Tidak ada hasil. Coba kata lain, misalnya KPEI atau dividen.</p>';
    out._hit=hit;
  }
  out.onclick=e=>{const b=e.target.closest('button');if(!b)return;const el=out._hit[+b.dataset.i].el;
    dl.close();const d=el.closest('details');if(d)d.open=true;
    const tgt=el.closest('.card,.research-point,.snapshot-list>div,.step-list button')||el;
    tgt.scrollIntoView({block:'center'});tgt.classList.remove('flash');void tgt.offsetWidth;tgt.classList.add('flash');
    if(el.closest('.step-list')) el.closest('button').click();};
  const open=()=>{q.value='';list();dl.showModal();q.focus();};
  $('#openSearch').onclick=open;
  q.oninput=list;
  document.addEventListener('keydown',e=>{
    const typing=/INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if((e.key==='/'&&!typing)||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k')){e.preventDefault();open();}
  });
})();

/* ========= VIDEO ========= */
(function(){
  const v=$('#vid'),note=$('#vidNote');
  const f=s=>`${Math.floor(s/60)}:${String(Math.round(s%60)).padStart(2,'0')}`;
  let loaded=false;
  v.addEventListener('loadedmetadata',()=>{loaded=true;const ok=Math.abs(v.duration-90)<=5;
    note.textContent=`Durasi video ${f(v.duration)}.`+(ok?'':' Target tugas adalah 90 detik (1:30).');note.classList.toggle('warn',!ok);});
  function fail(){
    if(loaded) return;
    note.innerHTML='Video tidak bisa dimuat di browser ini. Coba buka halaman lewat Chrome atau Edge, atau <a href="assets/video/vlog-kunjungan.mp4" style="color:inherit;text-decoration:underline">buka videonya langsung</a>. Pastikan file ada di assets/video.';
    note.classList.add('warn');
  }
  $$('source',v).forEach(s=>s.addEventListener('error',()=>setTimeout(()=>{if(v.networkState===3)fail();},50)));
  v.addEventListener('error',fail);
  /* cadangan: error bisa terjadi sebelum script ini berjalan */
  const check=()=>{if(!loaded&&(v.error||v.networkState===3))fail();};
  check(); addEventListener('load',()=>setTimeout(check,400)); setTimeout(check,2500);
})();
