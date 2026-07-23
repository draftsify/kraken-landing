// ---- Reveal on scroll ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---- Nav shadow on scroll ----
const nav = document.getElementById('nav');
addEventListener('scroll', () => {
  nav.style.borderBottomColor = scrollY > 10 ? '#242427' : '';
});

// ---- Supported ETF chips ----
const etfs = [
  ['SPY', 'S&P 500'], ['VOO', 'Vanguard 500'], ['QQQ', 'Nasdaq 100'],
  ['VTI', 'Total Market'], ['SCHD', 'Dividend'], ['ARKK', 'Innovation'],
  ['IWM', 'Russell 2000'], ['DIA', 'Dow 30'], ['VIG', 'Div. Growth'],
  ['XLK', 'Technology'], ['XLF', 'Financials'], ['JEPI', 'Equity Income'],
  ['VYM', 'High Div.'], ['GLD', 'Gold'], ['BND', 'Bonds'], ['VUG', 'Growth'],
];
const chips = document.getElementById('chips');
if (chips) {
  chips.innerHTML = etfs.map(([s, n]) => `<div class="chip">${s}<span>${n}</span></div>`).join('');
}

// ---- Live distribution feed ----
const holders = ['A. Rivera', 'M. Chen', 'S. Okafor', 'L. Novak', 'K. Haddad', 'J. Meyer', 'P. Silva', 'T. Weber', 'R. Kaur', 'D. Ford'];
const syms = ['SPY', 'VOO', 'QQQ', 'SCHD', 'VTI', 'JEPI', 'ARKK', 'XLK'];
const feed = document.getElementById('feed');
const initials = (name) => name.split(' ').map(p => p[0]).join('');
const rand = (a) => a[Math.floor(Math.random() * a.length)];
const money = () => '$' + (Math.random() * 240 + 8).toFixed(2);

function makeRow() {
  const who = rand(holders);
  return `<div class="feed-row">
    <div class="feed-av">${initials(who)}</div>
    <div><div class="feed-who">${who}</div><div class="feed-sym">${rand(syms)} distribution</div></div>
    <div class="feed-amt">${money()}</div>
  </div>`;
}

if (feed) {
  feed.innerHTML = Array.from({ length: 5 }, makeRow).join('');
  setInterval(() => {
    feed.insertAdjacentHTML('afterbegin', makeRow());
    while (feed.children.length > 5) feed.lastElementChild.remove();
  }, 2200);
}

// ---- Countdown timer (loops to 3:00) ----
const timer = document.getElementById('timer');
let secs = 167;
if (timer) {
  setInterval(() => {
    secs = secs <= 0 ? 180 : secs - 1;
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    timer.textContent = `${m}:${s}`;
  }, 1000);
}
