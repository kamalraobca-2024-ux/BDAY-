// ---------- ambient floating hearts ----------
(function(){
  const wrap = document.getElementById('ambient-hearts');
  const symbols = ['♡','❤','✿'];
  for(let i=0;i<14;i++){
    const h = document.createElement('div');
    h.className='amb-heart';
    h.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    h.style.left = Math.random()*100+'vw';
    h.style.fontSize = (0.8+Math.random()*1.4)+'rem';
    h.style.animationDuration = (10+Math.random()*10)+'s';
    h.style.animationDelay = (Math.random()*10)+'s';
    wrap.appendChild(h);
  }
})();

// ---------- scroll reveal ----------
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

// ---------- envelope open ----------
const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');
const scrollHint = document.getElementById('scrollHint');

function spawnBurst(container){
  const rect = container.getBoundingClientRect();
  for(let i=0;i<16;i++){
    const isSpark = Math.random() > 0.5;
    const el = document.createElement('div');
    el.className = isSpark ? 'sparkle' : 'burst-heart';
    if(!isSpark) el.textContent = '♡';
    const x = rect.left + rect.width/2 + (Math.random()-0.5)*rect.width;
    const y = rect.top + rect.height*0.3;
    el.style.left = x+'px'; el.style.top = y+'px';
    el.style.setProperty('--dx',(Math.random()-0.5)*120+'px');
    el.style.animationDelay = (Math.random()*0.3)+'s';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 2000);
  }
}

let opened = false;
function openEnvelope(){
  if(opened) return;
  opened = true;
  envelope.classList.add('open');
  spawnBurst(envelope);
  openBtn.style.opacity = '0';
  openBtn.style.pointerEvents = 'none';
  setTimeout(()=>{ scrollHint.style.transition = 'opacity 0.6s ease'; scrollHint.style.opacity = '0.7'; }, 900);
  setTimeout(()=>{ document.getElementById('letter-section').scrollIntoView({behavior:'smooth'}); }, 1500);
}
envelope.addEventListener('click', openEnvelope);
openBtn.addEventListener('click', openEnvelope);

// ---------- letter typing reveal ----------
const letterBody = document.getElementById('letterBody');
let letterTyped = false;
const letterObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting && !letterTyped){
      letterTyped = true;
      letterBody.classList.add('typing-active');
      const lines = letterBody.querySelectorAll('.typed-line');
      lines.forEach((line,i)=>{ setTimeout(()=>line.classList.add('show'), i*650); });
    }
  });
},{threshold:0.3});
letterObserver.observe(document.getElementById('letter-section'));

// ---------- our story timeline ----------
const storyData = [
  "The day we first met...",
  "That Audi memory ❤️",
  "The smoking incident 😂",
  "The birthday gift I'll always remember.",
  "All the random moments that became special."
];
const timelineGrid = document.getElementById('timelineGrid');
storyData.forEach(text=>{
  const item = document.createElement('div');
  item.className = 'timeline-item reveal';
  item.innerHTML = `<div class="timeline-text">${text}</div>`;
  timelineGrid.appendChild(item);
  revealObserver.observe(item);
});

// ---------- gallery data (real photos, injected as data URIs) ----------
const galleryData = [
  {src:"9b8cec80-58df-4dba-9cb4-df122322ad21.JPG", caption:"One of my favourite memories ❤️"},
  {src:"a9c1b9bd-1374-473b-bbb4-7af788f88655__2_.jpg", caption:"You were so cute here."},
  {src:"IMG_2808.jpg", caption:"Another moment I'll never forget."},
  {src:"IMG_5948.jpg", caption:"Just us, being us."},
  {src:"IMG_6020.png", caption:"Flowers, and you. My favourite kind of Sunday."},
  {src:"IMG_7095__1_.png", caption:"The Holi chaos 😂"},
  {src:"assets/photo08.jpg", caption:"Dressed up, still my favourite person."},
  {src:"assets/photo07.jpg", caption:"That clay-pot afternoon ❤️"}
];
const galleryGrid = document.getElementById('galleryGrid');
galleryData.forEach(item=>{
  const card = document.createElement('div');
  card.className = 'polaroid';
  card.innerHTML = `
    <div class="tape"></div>
    <img class="polaroid-photo" src="${item.src}" alt="${item.caption}">
    <div class="polaroid-caption">${item.caption}</div>
  `;
  card.addEventListener('click', ()=>openLightbox(item));
  galleryGrid.appendChild(card);
});

const lightbox = document.getElementById('lightbox');
const lightboxPhoto = document.getElementById('lightboxPhoto');
const lightboxCaption = document.getElementById('lightboxCaption');
function openLightbox(item){
  lightboxPhoto.src = item.src;
  lightboxCaption.textContent = item.caption;
  lightbox.classList.add('show');
}
document.getElementById('lightboxClose').addEventListener('click', ()=>lightbox.classList.remove('show'));
lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) lightbox.classList.remove('show'); });

// ---------- things I love ----------
const loveData = [
  "The way you laugh at your own jokes before you even finish telling them.",
  "How you make ordinary days feel like something worth remembering.",
  "Your ridiculous morning energy that somehow I love anyway.",
  "The way you say the most random things and make them adorable.",
  "How safe and calm I feel, just being next to you.",
  "Every small, unremarkable thing that somehow makes you, you."
];
const loveGrid = document.getElementById('loveGrid');
loveData.forEach(text=>{
  const card = document.createElement('div');
  card.className = 'love-card reveal';
  card.innerHTML = `<span class="heart-icon">♡</span><span>${text}</span>`;
  loveGrid.appendChild(card);
  revealObserver.observe(card);
});

// ---------- final section sequence ----------
const finalSection = document.getElementById('final');
const finalLines = finalSection.querySelectorAll('.final-line');
const playerCard = document.getElementById('playerCard');
let finalPlayed = false;
const finalObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting && !finalPlayed){
      finalPlayed = true;
      finalLines.forEach((line,i)=>{ setTimeout(()=>line.classList.add('show'), i*1000 + 300); });
      setTimeout(()=>{ playerCard.classList.add('show'); }, finalLines.length*1000 + 500);
    }
  });
},{threshold:0.35});
finalObserver.observe(finalSection);

// falling petals in final section
(function(){
  const wrap = document.getElementById('petalWrap');
  const petals = ['♡','✿','❀'];
  for(let i=0;i<10;i++){
    const p = document.createElement('div');
    p.className='petal';
    p.textContent = petals[Math.floor(Math.random()*petals.length)];
    p.style.left = Math.random()*100+'%';
    p.style.animationDuration = (8+Math.random()*8)+'s';
    p.style.animationDelay = (Math.random()*8)+'s';
    wrap.appendChild(p);
  }
})();

// ---------- song player ----------
const audio = document.getElementById('ourSong');
const playBtn = document.getElementById('playBtn');
const playerDisc = document.getElementById('playerDisc');
const playerWave = document.getElementById('playerWave');
const tapHint = document.getElementById('tapHint');
let isPlaying = false;
const songSrc = audio.getAttribute('data-src');
if(songSrc){ audio.src = songSrc; }

function togglePlay(){
  if(!songSrc){ tapHint.textContent = 'Add your song file to play music here ♡'; return; }
  if(isPlaying){ audio.pause(); } else { audio.play().catch(()=>{ tapHint.textContent = 'Tap to play our song ♡'; }); }
}
playBtn.addEventListener('click', togglePlay);
audio.addEventListener('play', ()=>{
  isPlaying = true; playBtn.textContent = '❚❚';
  playerDisc.classList.add('spin'); playerWave.classList.add('playing'); tapHint.style.opacity = '0';
});
audio.addEventListener('pause', ()=>{
  isPlaying = false; playBtn.textContent = '▶';
  playerDisc.classList.remove('spin'); playerWave.classList.remove('playing'); tapHint.style.opacity = '1';
});

// ---------- cake finale ----------
const cakeWrap = document.getElementById('cakeWrap');
const tapCakeHint = document.getElementById('tapCakeHint');
const knifeSvg = document.getElementById('knifeSvg');
const cakeFinalLines = document.querySelectorAll('#cakeFinalLines .final-line');
let cakeDone = false;

function spawnSmoke(){
  const rect = cakeWrap.getBoundingClientRect();
  for(let i=0;i<10;i++){
    const s = document.createElement('div');
    s.className = 'smoke';
    const x = rect.left + rect.width*0.5 + (Math.random()-0.5)*40;
    const y = rect.top + rect.height*0.28;
    s.style.left = x+'px'; s.style.top = y+'px';
    s.style.setProperty('--sdx',(Math.random()-0.5)*40+'px');
    s.style.animationDelay = (Math.random()*0.3)+'s';
    document.body.appendChild(s);
    setTimeout(()=>s.remove(), 1800);
  }
}

function spawnCelebration(){
  const rect = cakeWrap.getBoundingClientRect();
  const colors = ['#FF6FAE','#FFB6D5','#E94F91','#fff','#F8A9C4'];
  for(let i=0;i<26;i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = (rect.left + Math.random()*rect.width) + 'px';
    c.style.top = (rect.top - 10) + 'px';
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDelay = (Math.random()*0.4)+'s';
    c.style.borderRadius = Math.random()>0.5 ? '50%' : '2px';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(), 2800);
  }
  spawnBurst(cakeWrap);
}

function cutCake(){
  if(cakeDone) return;
  cakeDone = true;
  tapCakeHint.classList.add('hide');

  // step 1: flicker then extinguish
  cakeWrap.classList.add('flicker');
  setTimeout(()=>{
    cakeWrap.classList.remove('flicker');
    cakeWrap.classList.add('out');
    spawnSmoke();
  }, 900);

  // step 2: knife animation
  setTimeout(()=>{
    knifeSvg.classList.add('animate');
  }, 1400);

  // step 3: cut + celebration
  setTimeout(()=>{
    cakeWrap.classList.add('cut');
    spawnCelebration();
  }, 2100);

  // step 4: reveal final messages
  setTimeout(()=>{
    cakeFinalLines.forEach((line,i)=>{ setTimeout(()=>line.classList.add('show'), i*1000); });
  }, 2700);
}
cakeWrap.addEventListener('click', cutCake);
cakeWrap.addEventListener('touchend', (e)=>{ e.preventDefault(); cutCake(); }, {passive:false});
