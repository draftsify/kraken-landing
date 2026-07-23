// ---- Reveal on scroll ----
const io = new IntersectionObserver((es) => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---- Nav border on scroll ----
const nav = document.getElementById('nav');
addEventListener('scroll', () => { nav.style.borderBottomColor = scrollY > 10 ? '#242427' : ''; });

// ---- Trust logos (abstract marks) ----
const marks = {
  a: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="2"/></svg>',
  b: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><path d="M11 7h4a2 2 0 0 1 2 2v4" stroke="currentColor" stroke-width="2"/></svg>',
  c: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l9 5v8l-9 5-9-5V8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  d: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V6l8-3 8 3v14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 20v-6h6v6" stroke="currentColor" stroke-width="2"/></svg>',
  e: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="2"/></svg>',
  f: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 0 1 18 0M3 12a9 9 0 0 0 18 0" stroke="currentColor" stroke-width="2"/></svg>',
};
const etfLogos = [
  ['SPY','S&P 500'], ['QQQ','Nasdaq 100'], ['VOO','Vanguard 500'],
  ['VTI','Total Market'], ['SCHD','Dividend'], ['ARKK','Innovation'],
];
const etfBar = document.getElementById('etfBar');
if (etfBar) etfBar.innerHTML = etfLogos.map(([t,n]) =>
  `<div class="etf-cell"><span class="etf-tkr">${t}</span><span class="etf-nm">${n}</span></div>`).join('');

// ---- Live distribution feed ----
const holders = ['A. Rivera','M. Chen','S. Okafor','L. Novak','K. Haddad','J. Meyer','P. Silva','T. Weber','R. Kaur','D. Ford'];
const syms = ['SPY','VOO','QQQ','SCHD','VTI','JEPI','ARKK','XLK'];
const initials = n => n.split(' ').map(p => p[0]).join('');
const rand = a => a[Math.floor(Math.random()*a.length)];
const money = () => '$' + (Math.random()*240+8).toFixed(2);
const feed = document.getElementById('feed');
function row(){ const w = rand(holders);
  return `<div class="feed-row"><div class="feed-av">${initials(w)}</div><div><div class="feed-who">${w}</div><div class="feed-sym">${rand(syms)} distribution</div></div><div class="feed-amt">${money()}</div></div>`; }
if (feed){
  feed.innerHTML = Array.from({length:5}, row).join('');
  setInterval(() => { feed.insertAdjacentHTML('afterbegin', row()); while (feed.children.length>5) feed.lastElementChild.remove(); }, 2200);
}

// ---- Countdown timer (loops to 3:00) ----
const timer = document.getElementById('timer');
let secs = 167;
if (timer) setInterval(() => {
  secs = secs <= 0 ? 180 : secs-1;
  timer.textContent = `${String(Math.floor(secs/60)).padStart(2,'0')}:${String(secs%60).padStart(2,'0')}`;
}, 1000);

// ---- Holder ledger ----
const ledgerData = [
  ['Arcflow Capital','12.4K','$48.2K','↑ 12.8%'],
  ['Crestlane','10.8K','$41.0K','↑ 7.4%'],
  ['Veltro','9.9K','$37.6K','↓ 2.1%'],
  ['Nimbly','9.1K','$33.9K','↑ 5.9%'],
  ['Doraxis','8.3K','$29.4K','↓ 3.8%'],
  ['Synqra','7.8K','$26.1K','↑ 11.6%'],
];
const ledger = document.getElementById('ledger');
if (ledger) ledger.innerHTML = ledgerData.map(([n,s,d,c]) =>
  `<div class="ledger-row"><div class="led-who"><span class="led-av"></span>${n}</div><span class="led-num">${s}</span><span class="led-num">${d}</span><span class="led-up">${c}</span></div>`).join('');

// ---- ETF coverage grid ----
const etfs = [
  ['SPY','S&P 500',1],['VOO','Vanguard 500',1],['QQQ','Nasdaq 100',1],['VTI','Total Market',1],
  ['SCHD','Dividend',1],['JEPI','Equity Income',1],['ARKK','Innovation',1],['IWM','Russell 2000',1],
  ['XLK','Technology',1],['VYM','High Dividend',1],['GLD','Gold',0],['BND','Bonds',0],
];
const grid = document.getElementById('etfGrid');
if (grid) grid.innerHTML = etfs.map(([s,n,live]) =>
  `<div class="etf ${live?'':'soon'}"><div class="etf-top"><div class="etf-mark">${s.slice(0,3)}</div><span class="etf-status">${live?'Live':'Coming soon'}</span></div><h3>${s}</h3><p>${n}</p></div>`).join('');

// ---- Testimonials marquee (duplicated for seamless loop) ----
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
