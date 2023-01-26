const express = require('express');
const https = require('https');
const app = express();
const tokens = [
  { symbol: "abbcusdt", contract: "0xe83cE6bfb580583bd6A62B4Be7b34fC25F02910D-bsc" },
  { symbol: "bbcusdt", contract: "0x37e5da11b6A4DC6d2f7Abe232cDd30B0B8Fc63B1-bsc" },
  { symbol: "bullusdt", contract: "0x9f95e17b2668AFE01F8fbD157068b0a4405Cc08D-polygon" },
  { symbol: "voxelusdt", contract: "0xd0258a3fD00f38aa8090dfee343f10A9D4d30D3F-polygon" },
  { symbol: "gcoinusdt", contract: "0x071AC29d569a47EbfFB9e57517F855Cb577DCc4C-polygon" },
  { symbol: "zedusdt", contract: "0x5eC03C1f7fA7FF05EC476d19e34A22eDDb48ACdc-polygon" },
  { symbol: "dfxusdt", contract: "0xE7804D91dfCDE7F776c90043E03eAa6Df87E6395-polygon" },
  { symbol: "routeusdt", contract: "0x16ECCfDbb4eE1A85A33f3A9B21175Cd7Ae753dB4-polygon" },
  { symbol: "ncashusdt", contract: "0xc69Eba65e87889f0805dB717Af06797055A0BA07-avalanche" },
  { symbol: "xetausdt", contract: "0x31c994AC062C1970C086260Bc61babB708643fAc-avalanche" },
  { symbol: "fitfiusdt", contract: "0x714f020C54cc9D104B6F4f6998C63ce2a31D1888-avalanche" },
  { symbol: "hecusdt", contract: "0xC7f4debC8072e23fe9259A5C0398326d8EfB7f5c-avalanche" },
  { symbol: "dypusdt", contract: "0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17-avalanche" },
  { symbol: "wxtusdt", contract: "0xfcDe4A87b8b6FA58326BB462882f1778158B02F1-avalanche" },
  { symbol: "gmxusdt", contract: "0x62edc0692BD897D2295872a9FFCac5425011c661-avalanche" },
  { symbol: "lblusdt", contract: "0x77edFaE59a7948d66E9911A30cC787d2172343d4-bsc" },
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
  { symbol: "slcusdt", contract: "SLC" },
  { symbol: "diousdt", contract: "DIO" },
  { symbol: "zbcusdt", contract: "ZBC" },
  { symbol: "gmtusdt", contract: "GMT" },
  { symbol: "auryusdt", contract: "AURY" },
  { symbol: "gstusdt", contract: "GST" },
  { symbol: "mplxusdt", contract: "MPLX" },
  { symbol: "hbbusdt", contract: "HBB" },
  { symbol: "saousdt", contract: "SAO" },
  { symbol: "eluusdt", contract: "ELU" },
  { symbol: "likeusdt", contract: "LIKE" },
  { symbol: "GENEUSDT", contract: "GENE" },
  { symbol: "ZBCUSDT", contract: "ZBC" },
  { symbol: "REALUSDT", contract: "REAL" },
  { symbol: "GMTUSDT", contract: "GMT" },
  { symbol: "FIDAUSDT", contract: "FIDA" },
  { symbol: "MBSUSDT", contract: "MBS" },
  { symbol: "1SOLUSDT", contract: "1SOL" },
  { symbol: "GSTUSDT", contract: "GST" },
  { symbol: "SHILLUDST", contract: "SHILL" },
  { symbol: "CWARUSDT", contract: "CWAR" },
  { symbol: "DFLUSDT", contract: "DFL" },
  { symbol: "BONKUSDT", contract: "BONK" },
  { symbol: "MPLXUSDT", contract: "MPLX" },
  { symbol: "KASTAUSDT", contract: "0x235737dbb56e8517391473f7c964db31fa6ef280-polygon" },
  { symbol: "KASTAUSDT", contract: "0x235737dbb56e8517391473f7c964db31fa6ef280-polygon" },
  { symbol: "rocousdt", contract: "0xb2a85C5ECea99187A977aC34303b80AcbDdFa208-avalanche" }
];

tokens.forEach(async (token) => {
  try {
    // Get the ask and bid prices for the token from Huobi
    const huobiRes = await https.get(`https://api.huobi.pro/market/detail/merged?symbol=${token.symbol}`);
    const huobiData = await huobiRes.json();
    if(!huobiData.tick || !huobiData.tick.ask[0] || !huobiData.tick.bid[0]) return;
    const ask = huobiData.tick.ask[0];
    const bid = huobiData.tick.bid[0];

    // Get the price of the token on the BSC network from Dex.guru
    const dexRes = await https.get(`https://api.dex.guru/v1/tokens/${token.contract}`);
    const dexData = await dexRes.json();
    let price = dexData.priceUSD;

    // Get the price of the token on the BSC network from Jup.ag
    const jupRes = await https.get(`https://price.jup.ag/v1/price?id=${token.contract}`);
    const jupData = await jupRes.json();
    let jupPrice = jupData.data.price;

    // Get the ask and bid prices for the token from Bybit
    const bybitRes = await https.get(`https://api.bybit.com/spot/quote/v1/ticker/24hr?symbol=${token.symbol}`);
    const bybitData = await bybitRes.json();
    const bybitAsk = bybitData.result[0].bestAskprice;
    const bybitBid = bybitData.result[0].bestBidprice;
    token.al_bybit = price / bybitBid;
    token.sat_bybit = price / bybitAsk;
    token.al_jupbybit = jupPrice / bybitBid;
    token.sat_jupbybit = jupPrice / bybitAsk;
    token.al_dex = price / bid;
    token.al_jup = jupPrice / bid;
    token.sat_dex = price / ask;
    token.sat_jup = jupPrice / ask;
    console.log(token);
    } catch (err) {
    console.log("Error: " + err.message);
    }
});
    
setInterval(() => {
  tokens.forEach(async (token) => {
    try {
      // Get the ask and bid prices for the token from Huobi
     const huobiRes = await https.gethttps.get(`https://api.huobi.pro/market/detail/merged?symbol=${token.symbol}`);
     const huobiData = await huobiRes.json();
     if(!huobiData.tick || !huobiData.tick.ask[0] || !huobiData.tick.bid[0]) return;
     const ask = huobiData.tick.ask[0];
     const bid = huobiData.tick.bid[0];
     // Get the price of the token on the BSC network from Dex.guru
     // Get the price of the token on the BSC network from Dex.guru
     const dexRes = await https.get(`https://api.dex.guru/v1/tokens/${token.contract}`);
     const dexData = await dexRes.json();
     let price = dexData.priceUSD;
   
     // Get the price of the token on the BSC network from Jup.ag
     const jupRes = await https.get(`https://price.jup.ag/v1/price?id=${token.contract}`);
     const jupData = await jupRes.json();
     let jupPrice = jupData.data.price;
   
     // Get the ask and bid prices for the token from Bybit
     const bybitRes = await https.get(`https://api.bybit.com/spot/quote/v1/ticker/24hr?symbol=${token.symbol}`);
     const bybitData = await bybitRes.json();
     const bybitAsk = bybitData.result[0].bestAskprice;
     const bybitBid = bybitData.result[0].bestBidprice;
     token.al_bybit = price / bybitBid;
     token.sat_bybit = price / bybitAsk;
     token.al_jupbybit = jupPrice / bybitBid;
     token.sat_jupbybit = jupPrice / bybitAsk;
     token.al_dex = price / bid;
     token.al_jup = jupPrice / bid;
     token.sat_dex = price / ask;
     token.sat_jup = jupPrice / ask;
     console.log(token);
   } catch (err) {
     console.log("Error: " + err.message);
   }
 });
 }, 6000);

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
        if (token.al_dex < 0.98 || token.sat_dex > 1.02 || token.sat_jup > 1.01 || token.al_jup < 0.99 || token.al_bybit < 0.98 || token.sat_bybit > 1.02 || token.sat_jupbybit > 1.01 || token.al_jupbybit < 0.99 ) {
          return `
            <tr>
            <td>${token.symbol}</td>
            <td>${token.contract}</td>
            <td>${token.al_dex < 0.98 ? token.al_dex : ''}</td>
            <td>${token.sat_dex > 1.02 ? token.sat_dex : ''}</td>
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


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

