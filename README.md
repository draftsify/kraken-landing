# Kraken — Landing page

Landing page for **Kraken**, an autonomous agent that connects to a Robinhood
account and distributes Robinhood-listed ETFs to holders every 3 minutes.

Static site — no build step. Front-end only.

## Structure
- `index.html` — page markup
- `styles.css` — dark theme (gray / white gradient)
- `app.js` — live distribution feed, countdown, ETF chips, scroll reveals
- `assets/` — logo

## Local preview
Open `index.html` in a browser, or serve the folder:
```bash
npx serve .
```

> Not affiliated with or endorsed by Robinhood.
