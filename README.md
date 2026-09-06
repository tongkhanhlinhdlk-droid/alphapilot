# AlphaPilot - AI Portfolio Operator

AlphaPilot is a portfolio-focused trading agent built for the **Binance Agent OS Mini Hackathon - Track A**.

Instead of directly turning a market signal into an order, AlphaPilot follows a controlled workflow:

**Portfolio → Market Analysis → Decision → Risk Gate → Binance Action → Portfolio Update**

## What AlphaPilot Does

The current MVP:

1. Reads live BTCUSDT market data from Binance
2. Calculates 24h market momentum
3. Generates a BUY / SELL / HOLD decision
4. Assigns a confidence score
5. Applies a confidence-based risk gate
6. Executes approved BUY actions through Binance Demo Trading
7. Syncs the portfolio state after execution

## Core Workflow

```text
Market Data
     ↓
Market Analysis
     ↓
Decision Engine
     ↓
Risk Gate
     ↓
Binance Demo Action
     ↓
Portfolio Update
```

The key idea is simple:

**A signal does not automatically become a trade.**

Every trade must first pass the risk gate.

## Risk Gate

AlphaPilot only approves a trade when:

```text
Decision = BUY or SELL
AND
Confidence >= 80%
```

If the conditions are not satisfied:

```text
Status: BLOCKED
Action: NO TRADE
```

This prevents weak market conditions from automatically triggering an order.

## Binance Integration

AlphaPilot uses the **Binance CLI** to interact with Binance capabilities.

The CLI is used for:

* Live BTCUSDT price
* 24h ticker and momentum data
* Demo Trading orders
* Account and portfolio balances

The project is designed for the **Binance Agent OS ecosystem**, using Binance CLI capabilities rather than implementing a separate Binance REST API client.

## Safety

AlphaPilot uses **Binance Demo Trading** for the current MVP.

The application also includes a local execution guard.

By default:

```text
DRY RUN
```

No order is executed unless execution is explicitly enabled.

To enable Demo Trading execution:

```powershell
$env:ALPHAPILOT_EXECUTE="true"
npx tsx src/index.ts
```

The current MVP does not use real funds and does not include withdrawal functionality.

## Example - DRY RUN

```text
================================
        ALPHAPILOT
   AI Portfolio Operator
================================

[1] MARKET
BTCUSDT: 79624.61
Momentum: -0.143%

[2] AI DECISION
Decision: HOLD
Confidence: 72%
Reason: BTCUSDT momentum is -0.143%, which is not strong enough to justify a trade.

[3] RISK GATE
Status: BLOCKED
Action: NO TRADE

[4] BINANCE DEMO
No order executed.

[5] PORTFOLIO
Portfolio unchanged.

AlphaPilot completed successfully.
```

## Tech Stack

* TypeScript
* Node.js
* Binance CLI
* Binance Demo Trading
* Binance Agent OS ecosystem
* npm

## Project Structure

```text
src/
├── index.ts
└── agent/
    ├── advisor.ts
    ├── prompts.ts
    ├── binanceMcp.ts
    └── binanceOAuth.ts
```

### Main Components

**index.ts**

Orchestrates the complete AlphaPilot workflow.

**advisor.ts**

Analyzes BTCUSDT momentum and produces the current decision and confidence score.

**prompts.ts**

Contains the AI advisor prompt used as the foundation for future AI reasoning.

**binanceMcp.ts / binanceOAuth.ts**

Experimental Binance Agent OS MCP/OAuth integration components.

## Run Locally

Install dependencies:

```bash
npm install
```

Make sure Binance CLI is installed and configured with a Binance Demo Trading profile.

Run AlphaPilot in safe DRY RUN mode:

```bash
npx tsx src/index.ts
```

To explicitly enable Demo Trading execution:

```powershell
$env:ALPHAPILOT_EXECUTE="true"
npx tsx src/index.ts
```

## Hackathon Track

**Binance Agent OS Mini Hackathon - Track A**

AlphaPilot focuses on building an agent that combines:

* Market analysis
* Decision making
* Risk controls
* Binance actions
* Portfolio updates

## Project Status

AlphaPilot is an MVP demonstrating a complete, risk-controlled portfolio operation workflow using Binance Demo Trading.

Future iterations can expand the system with:

* Multi-asset portfolio management
* More market indicators
* Dynamic position sizing
* Advanced risk management
* Richer AI reasoning
* Automated portfolio allocation
