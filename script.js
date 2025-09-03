// Example: Fetching Bitcoin price from CoinGecko API
async function loadCrypto() {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
  const data = await res.json();
  document.getElementById("crypto-data").innerHTML = `
    Bitcoin: $${data.bitcoin.usd} <br>
    Ethereum: $${data.ethereum.usd}
  `;
}

// Example: Forex rates (USD to EUR/PKR) from exchangerate.host
async function loadForex() {
  const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=EUR,PKR");
  const data = await res.json();
  document.getElementById("forex-data").innerHTML = `
    1 USD = ${data.rates.EUR} EUR <br>
    1 USD = ${data.rates.PKR} PKR
  `;
}

// Example: Stock prices (AAPL, TSLA) from Financial Modeling Prep (free API)
async function loadStocks() {
  const res = await fetch("https://financialmodelingprep.com/api/v3/quote/AAPL,TSLA?apikey=demo");
  const data = await res.json();
  document.getElementById("stock-data").innerHTML = `
    Apple (AAPL): $${data[0].price} <br>
    Tesla (TSLA): $${data[1].price}
  `;
}

// Load all data
loadCrypto();
loadForex();
loadStocks();