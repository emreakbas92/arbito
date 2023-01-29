const express = require('express');
const https = require('https');
const app = express();
const tokens = [
  { symbol: "KUNCIUSDT", contract: "0x6cf271270662be1C4fc1b7BB7D7D7Fc60Cc19125-bsc" },
  { symbol: "SFUNDUSDT", contract: "0x477bC8d23c634C154061869478bce96BE6045D12-bsc" },
  { symbol: "KMONUSDT", contract: "0xc732B6586A93b6B7CF5FeD3470808Bc74998224D-bsc" },
  { symbol: "ERTHAUSDT", contract: "0x62823659d09F9F9D2222058878f89437425eB261-bsc" },
  { symbol: "FAMEUSDT", contract: "0x28cE223853D123b52C74439B10b43366d73Fd3B5-bsc" },
  { symbol: "GSTSUSDT", contract: "0x7eDC0eC89F987ECd85617b891c44fE462a325869-bsc" },
  { symbol: "TAPUSDT", contract: "0x35bEdBF9291b22218a0dA863170dcC9329Ef2563-bsc" },
  { symbol: "MIXUSDT", contract: "0x398f7827DcCbeFe6990478876bBF3612D93baF05-bsc" },
  { symbol: "ZAMUSDT", contract: "0xBbcF57177D8752B21d080bf30a06CE20aD6333F8-bsc" },
  { symbol: "FIUUSDT", contract: "0xEF7d50069406A2F5A53806f7250A6c0f17AD9dCD-bsc" },
  { symbol: "VINUUSDT", contract: "0xfEbe8C1eD424DbF688551D4E2267e7A53698F0aa-bsc" },
  { symbol: "RACAUSDT", contract: "0x12BB890508c125661E03b09EC06E404bc9289040-bsc" },
  { symbol: "DRIVUSDT", contract: "0x461daB902f38210b42b7D8B4bfc71296E0629006-bsc" },
  { symbol: "MNZUSDT", contract: "0x861f1E1397daD68289e8f6a09a2ebb567f1B895C-bsc" },
  { symbol: "HEROUSDT", contract: "0xD40bEDb44C081D2935eebA6eF5a3c8A31A1bBE13-bsc" },
  { symbol: "XWGUSDT", contract: "0x6b23C89196DeB721e6Fd9726E6C76E4810a464bc-bsc" },
  { symbol: "SONUSDT", contract: "0x3b0E967cE7712EC68131A809dB4f78ce9490e779-bsc" },
  { symbol: "STRMUSDT", contract: "0xC598275452fA319d75ee5f176FD3B8384925b425-bsc" },
  { symbol: "SLGUSDT", contract: "0x2348b010Fa9c0Ce30Bb042D54c298a3411361a01-bsc" },
  { symbol: "LGXUSDT", contract: "0x9096B4309224d751FCB43d7eB178dcFFc122aD15-bsc" },
  { symbol: "LFWUSDT", contract: "0xD71239a33C8542Bd42130c1B4ACA0673B4e4f48B-bsc" },
  { symbol: "AZYUSDT", contract: "0x7b665B2F633d9363b89A98b094B1F9E732Bd8F86-bsc" },
  { symbol: "DEFYUSDT", contract: "0xBF9f916bBda29A7F990F5F55c7607D94D7C3A60b-polygon" },
  { symbol: "COTUSDT", contract: "0x8d520c8E66091cfD6743fe37Fbe3A09505616C4b-polygon" },
  { symbol: "MVUSDT", contract: "0xA3c322Ad15218fBFAEd26bA7f616249f7705D945-polygon" },
  { symbol: "NXDUSDT", contract: "0x228b5C21ac00155cf62c57bcc704c0dA8187950b-polygon" },
  { symbol: "KASTAUSDT", contract: "0x235737dBb56e8517391473f7c964DB31fA6ef280-polygon" },
  { symbol: "GENEUSDT", contract: "GENE" },
  { symbol: "ZBCUSDT", contract: "ZBC" },
  { symbol: "REALUSDT", contract: "REAL" },
  { symbol: "GMTUSDT", contract: "GMT" },
  { symbol: "FIDAUSDT", contract: "FIDA" },
  { symbol: "MBSUSDT", contract: "MBS" },
  { symbol: "1SOLUSDT", contract: "1SOL" },
  { symbol: "GSTUSDT", contract: "GST" },
  { symbol: "SHILLUSDT", contract: "SHILL" },
  { symbol: "CWARUSDT", contract: "CWAR" },
  { symbol: "DFLUSDT", contract: "DFL" },
  { symbol: "XAVAUSDT", contract: "0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4-avalanche" },
  { symbol: "CRAFTUSDT", contract: "0x8aE8be25C23833e0A01Aa200403e826F611f9CD2-avalanche" },
  { symbol: "IMEIUSDT", contract: "0xF891214fdcF9cDaa5fdC42369eE4F27F226AdaD6-avalanche" },
  { symbol: "GMXUSDT", contract: "0x62edc0692BD897D2295872a9FFCac5425011c661-avalanche" },
  { symbol: "OBXUSDT", contract: "0xcCf719c44e2C36E919335692E89d22Cf13D6aaEB-avalanche" },
  { symbol: "XETAUSDT", contract: "0x31c994AC062C1970C086260Bc61babB708643fAc-avalanche" }
];

let al, sat;
setInterval(() => {
  tokens.forEach((token) => {
    // Get the ask and bid prices for the token from Huobi
    https.get(`https://https://api.bybit.com/spot/quote/v1/ticker/24hr?symbol=${token.symbol}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if(!json.result || !json.result.bestBidPrice || !json.result.bestAskPrice) return;
          const ask = json.result.bestAskPrice;
          const bid = json.result.bestBidPrice;

          // Get the price of the token on the BSC network from Dex.guru
          https.get(`https://api.dex.guru/v1/tokens/${token.contract}`, (res) => {
            let data = "";
            res.on("data", (chunk) => {
              data += chunk;
            });
            res.on("end", () => {
              try {
                const json = JSON.parse(data);
                let price = json.priceUSD;
                // Get the price of the token on the BSC network from Jup.ag
                https.get(`https://price.jup.ag/v1/price?id=${token.contract}`, (res) => {
                  let data = "";
                  res.on("data", (chunk) => {
                    data += chunk;
                  });
                  res.on("end", () => {
                    try {
                      const json = JSON.parse(data);
                      let jupPrice = json.data.price;
                      // Calculate the ratio of the Huobi ask price to the BSC price
                      token.al_dex = price / bid;
                      token.al_jup = jupPrice / bid;
                      token.sat_dex = price / ask;
                      token.sat_jup = jupPrice / ask;
                      console.log(token);
                    } catch (err) {
                      console.log("Error: " + err.message);
                    }
                  });
                }).on("error", (err) => {
                  console.log("Error: " + err.message);
                });
              } catch (err) {
                console.log("Error: " + err.message);
              }
            });
        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
      } catch (err) {
        console.log("Error: " + err.message);
      }
    });
  }).on("error", (err) => {
  console.log("Error: " + err.message);
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
      </tr>
      ${tokens.map(token => {
          return `
            <tr>
              <td>${token.symbol}</td>
              <td>${token.contract}</td>
              <td>${token.al_dex}</td>
              <td>${token.sat_dex}</td>
              <td>${token.al_jup}</td>
              <td>${token.sat_jup}</td>
            </tr>
          `;
        }
        return '';
      }).join('')}
    </table>
  `);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

