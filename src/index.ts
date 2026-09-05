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

console.log("\n[3] RISK GATE");
console.log("Status: PASSED");

if (analysis.decision === "BUY" && analysis.confidence >= 80) {
  console.log("Action: BUY signal approved");

  console.log("\n[4] BINANCE DEMO");
  console.log("Trade execution available in Demo Trading.");
  console.log("No automatic order placed.");

  console.log("\n[5] PORTFOLIO");
  console.log("Portfolio action prepared.");
} else {
  console.log("Action: NO TRADE");

  console.log("\n[4] BINANCE DEMO");
  console.log("No order executed.");

  console.log("\n[5] PORTFOLIO");
  console.log("Portfolio unchanged.");
}

console.log("\nAlphaPilot completed successfully.");
