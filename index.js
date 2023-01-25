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
  { symbol: "KASTAUSDT", contract: "0x235737dbb56e8517391473f7c964db31fa6ef280-polygon" }
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
        let bybit_ask = parseFloat(json.result.bestAskprice);
        let bybit_bid = parseFloat(json.result.bestBidprice);
        console.log(token.symbol + ": best ask price: " + bybit_ask + ", best bid price: " + bybit_bid);
      });
    });
  });
}, 30000);
