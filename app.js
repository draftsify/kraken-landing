// ===== Hero headline: stagger each word =====
document.querySelectorAll('#heroTitle .w').forEach((w, i) => {
  w.style.setProperty('--wi', i);
});

// ===== Reveal on scroll (with per-group stagger) =====
document.querySelectorAll('[data-stagger]').forEach(group => {
  group.querySelectorAll('.rev').forEach((el, i) => el.style.setProperty('--i', i));
});

const revIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    // trigger dependent animations
    if (e.target.dataset.count !== undefined) countUp(e.target);
    if (e.target.querySelector && e.target.querySelector('.cnt')) e.target.querySelectorAll('.cnt').forEach(countUp);
    if (e.target.id === 'bars' || e.target.querySelector?.('#bars')) fillBars();
    revIO.unobserve(e.target);
  });
}, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.rev').forEach(el => revIO.observe(el));

// ===== Count-up numbers =====
function countUp(el) {
  const to = parseFloat(el.dataset.to);
  if (isNaN(to)) return;
  const dec = parseInt(el.dataset.dec || '0', 10);
  const dur = 1200, t0 = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 3);
  function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    el.textContent = (to * ease(p)).toFixed(dec);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = to.toFixed(dec);
  }
  requestAnimationFrame(tick);
}
// stat cnt spans live inside .stat.rev — observe the grid cells directly
document.querySelectorAll('.stat.rev').forEach(s => {
  new IntersectionObserver((es, o) => {
    es.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.cnt').forEach(countUp); o.disconnect(); } });
  }, { threshold: .4 }).observe(s);
});

// ===== Animated bars fill =====
let barsFilled = false;
function fillBars() {
  if (barsFilled) return; barsFilled = true;
  document.querySelectorAll('#bars i').forEach((b, i) => {
    setTimeout(() => b.style.width = b.dataset.w, 120 + i * 90);
  });
}
const barsEl = document.getElementById('bars');
if (barsEl) new IntersectionObserver((es, o) => {
  es.forEach(e => { if (e.isIntersecting) { fillBars(); o.disconnect(); } });
}, { threshold: .3 }).observe(barsEl);

// ===== Nav shadow on scroll =====
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8), { passive: true });

// ===== Parallax hero gradient =====
const heroBg = document.querySelector('.hero-bg');
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    if (heroBg) heroBg.style.transform = `translateY(${scrollY * 0.18}px)`;
    ticking = false;
  });
}, { passive: true });

// ===== Live distribution feed =====
const holders = ['A. Rivera','M. Chen','S. Okafor','L. Novak','K. Haddad','J. Meyer','P. Silva','T. Weber','R. Kaur','D. Ford'];
const syms = ['SPY','VOO','QQQ','SCHD','VTI','JEPI','ARKK','XLK'];
const initials = n => n.split(' ').map(p => p[0]).join('');
const rand = a => a[Math.floor(Math.random() * a.length)];
const money = () => '$' + (Math.random() * 240 + 8).toFixed(2);
const feed = document.getElementById('feed');
const row = () => { const w = rand(holders);
  return `<div class="feed-row"><div class="feed-av">${initials(w)}</div><div><div class="feed-who">${w}</div><div class="feed-sym">${rand(syms)} distribution</div></div><div class="feed-amt">${money()}</div></div>`; };
if (feed) {
  feed.innerHTML = Array.from({ length: 5 }, row).join('');
  setInterval(() => { feed.insertAdjacentHTML('afterbegin', row()); while (feed.children.length > 5) feed.lastElementChild.remove(); }, 2200);
}

// ===== Countdown timer =====
const timer = document.getElementById('timer');
let secs = 167;
if (timer) setInterval(() => {
  secs = secs <= 0 ? 180 : secs - 1;
  timer.textContent = `${String(Math.floor(secs / 60)).padStart(2,'0')}:${String(secs % 60).padStart(2,'0')}`;
}, 1000);

// ===== Holder ledger =====
const ledgerData = [
  ['Arcflow Capital','12.4K','$48.2K','↑ 12.8%'],
  ['Crestlane','10.8K','$41.0K','↑ 7.4%'],
  ['Veltro','9.9K','$37.6K','↓ 2.1%'],
  ['Nimbly','9.1K','$33.9K','↑ 5.9%'],
  ['Doraxis','8.3K','$29.4K','↓ 3.8%'],
  ['Synqra','7.8K','$26.1K','↑ 11.6%'],
];
const ledgerInitials = n => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
const ledger = document.getElementById('ledger');
if (ledger) ledger.innerHTML = ledgerData.map(([n,s,d,c], i) => {
  const pos = c.trim().startsWith('↑');
  return `<div class="ledger-row"><span class="led-rank">${i + 1}</span><div class="led-who"><span class="led-av">${ledgerInitials(n)}</span><span class="led-name">${n}</span></div><span class="led-num">${s}</span><span class="led-num">${d}</span><span class="led-chg ${pos ? 'pos' : 'neg'}">${c}</span></div>`;
}).join('');

// ===== Testimonials marquee =====
const quotes = [
  ['Holders finally stopped asking when they get paid. Kraken just does it, every cycle.','Liam Carter','Product Lead'],
  ["It's set-and-forget. We connected the account and the 3-minute clock has never missed.",'Noah Williams','Founder'],
  ['The ledger reconciles itself. Our finance team loves the timestamped history.','Sara Ahmed','Operations'],
  ['Clean feed, reliable payouts. We actually trust what we see now.','Ethan Brooks','Analyst'],
  ['Lightweight and fast. It slotted right into how we manage holders.','Daniel Park','CTO'],
];
const card = ([q,n,r]) => `<div class="tcard"><p>“${q}”</p><div class="tperson"><span class="tav"></span><div><div class="tname">${n}</div><div class="trole">${r}</div></div></div></div>`;
const track = document.getElementById('track');
if (track) track.innerHTML = (quotes.map(card).join('')).repeat(2);
