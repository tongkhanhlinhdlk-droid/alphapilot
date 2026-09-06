export function analyzeMarket(price: number, momentum: number) {
  if (momentum >= 1) {
    return {
      decision: "BUY",
      confidence: Math.min(95, 80 + Math.round(momentum * 3)),
      reason: `BTCUSDT is showing positive 24h momentum at ${momentum.toFixed(3)}%, indicating stronger buying pressure.`
    };
  }

  if (momentum <= -1) {
    return {
      decision: "SELL",
      confidence: Math.min(95, 80 + Math.round(Math.abs(momentum) * 3)),
      reason: `BTCUSDT is showing negative 24h momentum at ${momentum.toFixed(3)}%, indicating increasing selling pressure.`
    };
  }

  return {
    decision: "HOLD",
    confidence: 72,
    reason: `BTCUSDT momentum is ${momentum.toFixed(3)}%, which is not strong enough to justify a trade.`
  };
}