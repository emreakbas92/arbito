const express = require('express');
const https = require('https');
const app = express();
const tokens = [
  { symbol: "GSTUSDT", contract: "GST" },
  { symbol: "SHILLUDST", contract: "SHILL" },
  { symbol: "CWARUSDT", contract: "CWAR" },
  { symbol: "DFLUSDT", contract: "DFL" },
  { symbol: "BONKUSDT", contract: "BONK" },
  { symbol: "MPLXUSDT", contract: "MPLX" },
  { symbol: "KASTAUSDT", contract: "0x235737dbb56e8517391473f7c964db31fa6ef280-polygon" },
  { symbol: "KASTAUSDT", contract: "0x235737dbb56e8517391473f7c964db31fa6ef280-polygon" },
  { symbol: "rocousdt", contract: "0xb2a85C5ECea99187A977aC34303b80AcbDdFa208-avalanche" },
  { symbol: "rocousdt", contract: "0xb2a85C5ECea99187A977aC34303b80AcbDdFa208-avalanche" }
];
setInterval(() => {
  tokens.forEach((token) => {
    https.get(`https://api.bybit.com/spot/quote/v1/ticker/24hr?symbol=${token.symbol}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const json = JSON.parse(data);
        if(!json.result || !json.result.bestAskprice || !json.result.bestBidprice) return;
        const bybit_ask = json.result.bestAskprice;
        const bybit_bid = json.result.bestBidprice;
        console.log(token.symbol + ": best ask price: " + bybit_ask + ", best bid price: " + bybit_bid);
      });
    });
  });
}, 30000);

app.get("/", (req, res) => {
  res.send(`
    <h1>Token List</h1>
    <table>
      <tr>
        <th>Symbol</th>
        <th>Contract Address</th>
        <th>BSC/Huobi Bid Ratio</th>
        <th>Huobi/BSC Ask Ratio</th>
        <th>Jup/Huobi Ask Ratio</th>
        <th>Huobi/Jup Ask Ratio</th>
        <th>BSC/Bybit Bid Ratio</th>
        <th>Bybit/BSC Ask Ratio</th>
        <th>Jup/Bybit Bid Ratio</th>
        <th>Bybit/Jup Ask Ratio</th>
      </tr>
      ${tokens.map(token => {
        if ( ) {
          return `
          <tr>
            <td>${token.symbol}</td>
            <td>${token.contract}</td>
            <td>${bybit_bid}</td>
            <td>${bybit_ask}</td>
            <td>${token.al_jup < 0.99 ? token.al_jup : ''}</td>
            <td>${token.sat_jup > 1.01 ? token.sat_jup : ''}</td>
            <td>${token.al_bybit < 0.98 ? token.al_bybit : ''}</td>
            <td>${token.sat_bybit > 1.02 ? token.sat_bybit : ''}</td>
            <td>${token.al_jupbybit < 0.99 ? token.al_jupbybit : ''}</td>
            <td>${token.sat_jupbybit > 1.01 ? token.sat_jupbybit : ''}</td>
         </tr>
        
          `;
        }
        return '';
      }).join('')}
    </table>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
