require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const WebSocket = require('ws');
const fetch = require('node-fetch');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// --- Binance live trades ---
function startBinanceStream(symbol = 'btcusdt') {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);

  ws.on('message', (msg) => {
    const t = JSON.parse(msg);
    const trade = {
      price: parseFloat(t.p),
      qty: parseFloat(t.q),
      side: t.m ? 'SELL' : 'BUY',
      time: t.T,
      symbol: symbol.toUpperCase()
    };
    io.emit('trade', trade);
  });

  ws.on('close', () => {
    console.log('Binance WS closed, reconnecting...');
    setTimeout(() => startBinanceStream(symbol), 5000);
  });
}

startBinanceStream('btcusdt');

// --- News Fetcher ---
async function fetchNews() {
  try {
    const url = `https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&language=en&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.articles) {
      io.emit('news', data.articles.map(a => ({
        title: a.title,
        url: a.url,
        source: a.source.name,
        publishedAt: a.publishedAt
      })));
    }
  } catch (err) {
    console.error('News fetch error:', err);
  }
}
setInterval(fetchNews, 60 * 1000);
fetchNews();

io.on('connection', () => console.log('Client connected'));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
