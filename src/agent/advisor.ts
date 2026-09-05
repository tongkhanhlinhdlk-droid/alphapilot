export function analyzeMarket(price: number, momentum: number) {
  if (momentum >= 2) {
    return {
      decision: "BUY",
      confidence: 88,
      reason: "Positive momentum suggests increasing buying pressure."
    };
  }

  if (momentum <= -2) {
    return {
      decision: "SELL",
      confidence: 86,
      reason: "Negative momentum suggests increasing selling pressure."
    };
  }

  return {
    decision: "HOLD",
    confidence: 72,
    reason: "Momentum is weak; waiting for stronger confirmation."
  };
}
