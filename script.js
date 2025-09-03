const socket = io("https://your-backend.onrender.com"); // replace with Render URL

socket.on('trade', (trade) => {
  const feed = document.getElementById('trade-feed');
  const el = document.createElement('div');
  el.className = trade.side === 'BUY' ? 'buy' : 'sell';
  el.innerHTML = `[${trade.symbol}] ${trade.side} ${trade.qty} @ ${trade.price} (${new Date(trade.time).toLocaleTimeString()})`;
  feed.prepend(el);
});

socket.on('news', (articles) => {
  const newsDiv = document.getElementById('news');
  newsDiv.innerHTML = '<h3>Crypto News</h3>';
  articles.forEach(a => {
    const item = document.createElement('div');
    item.innerHTML = `<a href="${a.url}" target="_blank">${a.title}</a> <small>(${a.source})</small>`;
    newsDiv.appendChild(item);
  });
});
