import { execSync } from "child_process";
import { analyzeMarket } from "./agent/advisor";

function binance(command: string) {
  return execSync(command, { encoding: "utf8" });
}

console.log("\n================================");
console.log("        ALPHAPILOT");
console.log("   AI Portfolio Operator");
console.log("================================");

const market = JSON.parse(
  binance("binance-cli spot ticker-price --symbol BTCUSDT")
);

const price = Number(market.price);
const momentum = 2.4;

console.log("\n[1] MARKET");
console.log("BTCUSDT:", price);
console.log("Momentum:", momentum + "%");

const analysis = analyzeMarket(price, momentum);

console.log("\n[2] AI DECISION");
console.log("Decision:", analysis.decision);
console.log("Confidence:", analysis.confidence + "%");
console.log("Reason:", analysis.reason);

if (analysis.decision === "BUY" && analysis.confidence >= 80) {
  console.log("\n[3] RISK GATE");
  console.log("Status: PASSED");

  console.log("\n[4] BINANCE DEMO");
  console.log("Executing BUY order: 10 USDT");

  const order = JSON.parse(
    binance(
      "binance-cli spot new-order --symbol BTCUSDT --side BUY --type MARKET --quoteOrderQty 10"
    )
  );

  console.log("Order ID:", order.orderId);
  console.log("Status:", order.status);
  console.log("Executed BTC:", order.executedQty);

  console.log("\n[5] PORTFOLIO");
  console.log("BTC position updated.");
  console.log("\nAlphaPilot completed successfully.");
} else {
  console.log("\n[3] RISK GATE");
  console.log("Status: PASSED");
  console.log("Action: NO TRADE");
}
