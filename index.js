const https = require("https");
const express = require('express'); const app = express();
const tokens = [
  { symbol: "abbcusdt", contract: "0xe83cE6bfb580583bd6A62B4Be7b34fC25F02910D-bsc" },
  { symbol: "poolzusdt", contract: "0x77018282fd033daf370337a5367e62d8811bc885-bsc" },
  { symbol: "sfundusdt", contract: "0x477bc8d23c634c154061869478bce96be6045d12-bsc" },
  { symbol: "spsusdt", contract: "0x1633b7157e7638c4d6593436111bf125ee74703f-bsc" },
  { symbol: "mggusdt", contract: "0x6125adcab2f171bc70cfe2caecfec5509273a86a-bsc" },
  { symbol: "revousdt", contract: "0xfC279e6ff1FB1C7F5848d31561cAb27d34a2856b-bsc" },
  { symbol: "ktusdt", contract: "0x52da44b5e584f730005dac8d2d2acbdee44d4ba3-bsc" },
  { symbol: "vlxusdt", contract: "0xe9c803f48dffe50180bd5b01dc04da939e3445fc-bsc" },
  { symbol: "inrusdt", contract: "0xab725d0a10c3f24725c89f5765ae5794a26c1336-bsc" },
  { symbol: "xcnusdt", contract: "0x7324c7C0d95CEBC73eEa7E85CbAac0dBdf88a05b-bsc" },
  { symbol: "dypusdt", contract: "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17-bsc" },
  { symbol: "fotausdt", contract: "0x0A4E1BdFA75292A98C15870AeF24bd94BFFe0Bd4-bsc" },
  { symbol: "tlosusdt", contract: "0xb6c53431608e626ac81a9776ac3e999c5556717c-bsc" },
  { symbol: "fiuusdt", contract: "0xef7d50069406a2f5a53806f7250a6c0f17ad9dcd-bsc" },
  { symbol: "gearusdt", contract: "0xb4404DaB7C0eC48b428Cf37DeC7fb628bcC41B36-bsc" },
  { symbol: "wwyusdt", contract: "0x9ab70e92319f0b9127df78868fd3655fb9f1e322-bsc" },
  { symbol: "tincusdt", contract: "0x05ad6e30a855be07afa57e08a4f30d00810a402e-bsc" },
  { symbol: "arknusdt", contract: "0xaA20c2e278D99f978989dAa4460F933745F862d5-bsc" },
  { symbol: "erthausdt", contract: "0x62823659d09F9F9D2222058878f89437425eB261-bsc" },
  { symbol: "strmusdt", contract: "0x15f7a8e2d9d59e9c9e9b7f8f1f7af7d2c2a2f716-bsc" },
  { symbol: "sfundusdt", contract: "0x477bc8d23c634c154061869478bce96be6045d12-bsc" },
  { symbol: "spsusdt", contract: "0x1633b7157e7638c4d6593436111bf125ee74703f-bsc" },
  { symbol: "ceekusdt", contract: "0xe0f94ac5462997d2bc57287ac3a3ae4c31345d66-bsc" },
  { symbol: "dksusdt", contract: "0x121235cff4c59eec80b14c1d38b44e7de3a18287-bsc" },
  { symbol: "starlyusdt", contract: "0xb0a480e2fa5af51c733a0af9fcb4de62bc48c38b-bsc" },
  { symbol: "hotcrossusdt", contract: "0x4fa7163e153419e0e1064e418dd7a99314ed27b6-bsc" },
  { symbol: "muusdt", contract: "0x4c2D292d4c72Ea7003793d86014941522B821fDa-bsc" },
  { symbol: "tdxusdt", contract: "0x317eb4ad9cfac6232f0046831322e895507bcbeb-bsc" },
  { symbol: "kaiusdt", contract: "0x39ae8eefb05138f418bb27659c21632dc1ddab10-bsc" },
  { symbol: "wndrusdt", contract: "0xDfd7b0dD7Bf1012DfDf3307a964c36b972300Ac8-bsc" },
  { symbol: "smcwusdt", contract: "0xb2ea51BAa12C461327d12A2069d47b30e680b69D-bsc" },
  { symbol: "stcusdt", contract: "0x340724464cf51a551106cc6657606ee7d87b28b9-bsc" },
  { symbol: "arvusdt", contract: "0x6679eb24f59dfe111864aec72b443d1da666b360-bsc" },
  { symbol: "mcrtusdt", contract: "0x4b8285aB433D8f69CB48d5Ad62b415ed1a221e4f-bsc" },
  { symbol: "inrusdt", contract: "0xaB725d0A10C3f24725c89F5765Ae5794a26C1336-bsc" },
  { symbol: "ntusdt", contract: "0xfbcf80ed90856AF0d6d9655F746331763EfDb22c-bsc" },
  { symbol: "xcurusdt", contract: "0xd52669712f253CD6b2Fe8A8638F66ed726cb770C-bsc" },
  { symbol: "lblusdt", contract: "0x77edFaE59a7948d66E9911A30cC787d2172343d4-bsc" }
];

setInterval(() => {
  tokens.forEach((token) => {
    try {
      // Get the ask and bid prices for the token from Huobi
      https
        .get(`https://api.huobi.pro/market/detail/merged?symbol=${token.symbol}`, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            const json = JSON.parse(data);
            if(!json.tick || !json.tick.ask[0] || !json.tick.bid[0]) return;
            const ask = json.tick.ask[0];
            const bid = json.tick.bid[0];

            // Get the price of the token on the BSC network from Dex.guru
            https
              .get(`https://api.dex.guru/v1/tokens/${token.contract}`, (res) => {
                let data = "";
                res.on("data", (chunk) => {
                  data += chunk;
                });
                res.on("end", () => {
                  const json = JSON.parse(data);
                  const price = json.priceUSD;

                  // Calculate the ratio of the BSC price to the Huobi bid price
                  const al = price / bid;

                  // Calculate the ratio of the Huobi ask price to the BSC price
                  const sat = price / ask;

                  // Check if the BSC price is less than 98% of the Huobi bid price
                  if (al < 0.99) {
                    console.log(`${token.symbol}: ${al}`);
                  }

                  // Check if the Huobi ask price is more than 102% of the BSC price
                  if (sat > 1.01) {
                    console.log(`${token.symbol}: ${sat}`);
                  }
                });
              })
              .on("error", (err) => {
                console.log("Error: " + err.message);
          });
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
    } catch (err) {  console.log("Error: " + err.message);
  }
})
}, 30000);
