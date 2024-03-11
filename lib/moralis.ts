import { isAddress } from "web3-validator";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-Key": process.env.MORALIS_API_KEY!,
  },
};

let collections = [
  "0x7d5861cfe1c74aaa0999b7e2651bf2ebd2a62d89",
  "0x6541dc28acb78e1b024f5ffe1c840bc3e6fcf36a",
  "0xb3da098a7251a647892203e0c256b4398d131a54",
  "0xe03ef4b9db1a47464de84fb476f9baf493b3e886",
  "0x670971dcb8e1a510253511427593007e074954b7",
  "0x73682a7f47cb707c52cb38192dbb9266d3220315",
  "0xc056375aa215c2ac3211cd9fb5bf69a43bd481c4",
  "0xba5e05cb26b78eda3a2f8e3b3814726305dcac83",
  "0xde7c3435c34ddee79234adf612467727e980400d",
  "0xbdb1a8772409a0c5eeb347060cbf4b41dd7b2c62",
  "0x2d53d0545cd1275b69040e3c50587e2cc4443a52",
  "0x949bed087ff0241e04e98d807de3c3dd97eaa381",
];

export const fetchInfo = async (address: string) => {
  let points = await getOnchainScoreOfAddress(address);

  return { address, points, viewed: true };
};

const getOnchainScoreOfAddress = async (address: string) => {
  if (!isAddress(address)) {
    return 0;
  }
  let promiseArray = [
    getENS(address),
    getStats(address),
    getNFTS(address),
    getTokens(address),
  ];
  let results = await Promise.all(promiseArray);
  let ensScore = results[0] != null ? 1000 : 0;
  let transactionsScore = parseInt(results[1].transactions) >= 100 ? 1000 : 0;
  return ensScore + transactionsScore + (results[2] + results[3]) * 500;
};

const getENS = async (address: string) => {
  let a = await fetch(
    `https://deep-index.moralis.io/api/v2.2/resolve/${address}/reverse`,
    options
  );
  let results = await a.json();
  console.log(results);
  return results.name ? results.name : null;
};

const getNFTS = async (address: string) => {
  let baseUrl = `https://deep-index.moralis.io/api/v2.2/${address}/nft/collections?chain=base&limit=100&token_counts=true&exclude_spam=true`;
  let pageToken;
  let results: any[] = [];
  while (true) {
    let url = baseUrl;
    if (typeof pageToken == "string") {
      url = url + `&cursor=${pageToken}`;
    }
    console.log(url);
    let a = await fetch(url, options);
    let b = await a.json();
    results = results.concat(b.result);

    pageToken = b.cursor;
    if (pageToken == null) {
      break;
    }
  }
  let i = 0;
  for (let a of results) {
    if (collections.indexOf(a.token_address.toLowerCase()) >= 0) {
      i++;
    }
  }
  return i;
};

const getTokens = async (address: string) => {
  let baseUrl = `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=base&token_addresses%5B0%5D=0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed&token_addresses%5B1%5D=0x91F45aa2BdE7393e0AF1CC674FFE75d746b93567&token_addresses%5B2%5D=0x6921B130D297cc43754afba22e5EAc0FBf8Db75b&token_addresses%5B3%5D=0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4&token_addresses%5B4%5D=0xF6e932Ca12afa26665dC4dDE7e27be02A7c02e50&token_addresses%5B5%5D=0x0d97F261b1e88845184f678e2d1e7a98D9FD38dE&token_addresses%5B6%5D=0x532f27101965dd16442E59d40670FaF5eBB142E4&limit=10&exclude_native=true`;

  let a = await fetch(baseUrl, options);
  let b = await a.json();
  // console.log()

  let i = 0;
  for (let c of b.result) {
    if (c.usd_value >= 10) {
      i++;
    }
  }
  return i;
};

export const getStats = async (address: string) => {
  let a = await fetch(
    `https://deep-index.moralis.io/api/v2.2/wallets/${address}/stats?chain=base`,
    options
  );
  let results = await a.json();
  console.log(results);
  let obj = {
    collections: results.collections,
    transactions: results.transactions.total,
  };
  return obj;
};
