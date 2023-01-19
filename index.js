const express = require('express');
const https = require('https');
const app = express();
const tokens = [
  { symbol: 'abbcusdt', contract: '0xe83cE6bfb580583bd6A62B4Be7b34fC25F02910D-bsc' },
  { symbol: 'lblusdt', contract: '0x77edFaE59a7948d66E9911A30cC787d2172343d4-bsc' },
];

const getData = async (url) => {
  try {
    return await https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        return JSON.parse(data);
      });
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

setInterval(async () => {
  try {
    for (const token of tokens) {
      const huobiRes = await getData(`https://api.huobi.pro/market/detail/merged?symbol=${token.symbol}`);
      const huobiAsk = huobiRes.tick.ask[0];
      const huobiBid = huobiRes.tick.bid[0];
      const dexguruRes = await getData(`https://api.dex.guru/v1/tokens/${token.contract}`);
      const bscPrice = dexguruRes.priceUSD;
      const al = bscPrice / huobiBid;
      const sat = bscPrice / huobiAsk;
      if (al < 0.99) {
        console.log(`${token.symbol}: ${al}`);
      }
      if (sat > 1.01) {
        console.log(`${token.symbol}: ${sat}`);
      }
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}, 30000);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
