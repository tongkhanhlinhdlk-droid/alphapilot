import { execSync } from "child_process";
import { analyzeMarket } from "./agent/advisor.js";
const EXECUTE_TRADE = process.env.ALPHAPILOT_EXECUTE === "true";
function binance(command: string) {
  return execSync(command, { encoding: "utf8" });
}

console.log("\n================================");
console.log("        ALPHAPILOT");
console.log("   AI Portfolio Operator");
console.log("================================");

const market = JSON.parse(
  binance("npx binance-cli spot ticker-price --symbol BTCUSDT --profile AlphaPilot-Demo")
);

const price = Number(market.price);
const ticker24h = JSON.parse(
  binance("npx binance-cli spot ticker24hr --symbol BTCUSDT --json true --profile AlphaPilot-Demo")
);

const momentum = Number(ticker24h.priceChangePercent);

console.log("\n[1] MARKET");
console.log("BTCUSDT:", price);
console.log("Momentum:", momentum + "%");

const analysis = analyzeMarket(price, momentum);

console.log("\n[2] AI DECISION");
console.log("Decision:", analysis.decision);
console.log("Confidence:", analysis.confidence + "%");
console.log("Reason:", analysis.reason);

console.log("\n[3] RISK GATE");

const approved =
  (analysis.decision === "BUY" || analysis.decision === "SELL") &&
  analysis.confidence >= 80;

if (approved) {
  console.log("Status: PASSED");
  console.log(`Action: ${analysis.decision} signal approved`);

  console.log("\n[4] BINANCE DEMO");

  if (!EXECUTE_TRADE) {
    console.log("Mode: DRY RUN");
    console.log("DRY RUN — no order executed.");
  } else if (analysis.decision === "BUY") {
    console.log("Executing Demo order: BUY BTCUSDT for 10 USDT...");

    try {
      const order = binance(
        "npx binance-cli spot new-order --symbol BTCUSDT --side BUY --type MARKET --quote-order-qty 10 --profile AlphaPilot-Demo"
      );

      console.log("Order result:");
      console.log(order);
    } catch (error) {
      console.error("Order execution failed.");
      console.error(error);
    }
  } else {
    console.log("SELL execution is not enabled yet.");
  }

  console.log("\n[5] PORTFOLIO");

  if (EXECUTE_TRADE && analysis.decision === "BUY") {
    try {
      const account = JSON.parse(
        binance(
          "npx binance-cli spot get-account --omit-zero-balances true --profile AlphaPilot-Demo"
        )
      );

      const btc = account.balances.find((b: any) => b.asset === "BTC");
      const usdt = account.balances.find((b: any) => b.asset === "USDT");

      console.log("BTC:", btc?.free ?? "0");
      console.log("USDT:", usdt?.free ?? "0");
      console.log("Portfolio synced with Binance Demo.");
    } catch (error) {
      console.error("Portfolio sync failed.");
      console.error(error);
    }
  } else {
    console.log("Portfolio unchanged.");
  }
} else {
  console.log("Status: BLOCKED");
  console.log("Action: NO TRADE");

  console.log("\n[4] BINANCE DEMO");
  console.log("No order executed.");

  console.log("\n[5] PORTFOLIO");
  console.log("Portfolio unchanged.");
}

console.log("\nAlphaPilot completed successfully.");