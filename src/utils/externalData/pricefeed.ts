import type { Tokendata } from "types/bribedata.raw";
import { getPoolPriceHist, getPoolPriceLive, getTokenPrice } from "./beetsBack";
import { getCoingeckoCurrentPrice, getCoingeckoPrice } from "./coingecko";
import { getRpcPrice } from "./liveRpcQueries";

export async function getPrice(
  history: boolean,
  token: Tokendata,
  timestamp?: number
): Promise<number> {
  if (history) {
    if (!timestamp) return 0;
    if (token.lastprice) return token.lastprice;
    if (token.coingeckoid) {
      const price = await getCoingeckoPrice(token.coingeckoid, timestamp);
      if (price) return price;
    }
    if (token.isbpt && token.tokenaddress)
      return await getPoolPriceHist(timestamp, token.tokenaddress);
    if (token.tokenaddress) return await getTokenPrice(timestamp, token.tokenaddress);
    return 0;
  }
  if (token.isbpt && token.tokenaddress) return await getPoolPriceLive(token.tokenaddress);
  if (token.tokenaddress) {
    const price = await getRpcPrice(token.tokenaddress);
    if (price) return price;
  }
  if (token.coingeckoid) return await getCoingeckoCurrentPrice(token.coingeckoid);
  return 0;
}
