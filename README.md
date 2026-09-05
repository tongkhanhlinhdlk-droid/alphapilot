\# AlphaPilot - AI Portfolio Operator



AlphaPilot is an AI-powered portfolio operator built for the Binance Agent OS Mini Hackathon.



Instead of reacting to a single market signal, AlphaPilot follows a portfolio-first workflow:



\*\*Portfolio → Market Analysis → AI Decision → Risk Gate → Binance Action → Portfolio Update\*\*



\## What AlphaPilot Does



AlphaPilot connects market data and portfolio actions into one automated workflow.



The current MVP:



1\. Reads live BTCUSDT market data from Binance

2\. Analyzes market momentum

3\. Generates a BUY / SELL / HOLD decision

4\. Applies a confidence-based risk gate

5\. Executes an approved trade through Binance Demo Trading

6\. Updates the portfolio state



\## Why AlphaPilot?



Most simple trading agents follow:



\*\*Signal → Trade\*\*



AlphaPilot is designed around:



\*\*Portfolio → Context → Decision → Risk → Action\*\*



The goal is to make the agent behave more like a portfolio operator than a simple trading bot.



\## Architecture



```text

User Goal

&#x20;  ↓

Portfolio State

&#x20;  ↓

Market Data

&#x20;  ↓

Market Analysis

&#x20;  ↓

AI Decision

&#x20;  ↓

Risk Gate

&#x20;  ↓

Binance Action

&#x20;  ↓

Portfolio Update

```



\## Tech Stack



\* TypeScript

\* Node.js

\* Binance CLI

\* Binance Demo Trading

\* Binance Agent OS ecosystem

\* npm



\## Binance Integration



AlphaPilot uses Binance CLI to access Binance market data and execute Demo Trading orders.



The project is designed around the Binance Agent OS ecosystem, where AI agents can interact with Binance capabilities through agent tools and skills.



No real funds are used by the current MVP.



\## Example



```text

================================

&#x20;       ALPHAPILOT

&#x20;  AI Portfolio Operator

================================



\[1] MARKET

BTCUSDT: 79722

Momentum: 2.4%



\[2] AI DECISION

Decision: BUY

Confidence: 88%

Reason: Positive momentum suggests increasing buying pressure.



\[3] RISK GATE

Status: PASSED



\[4] BINANCE DEMO

Executing BUY order: 10 USDT

Order ID: ...

Status: FILLED

Executed BTC: ...



\[5] PORTFOLIO

BTC position updated.



AlphaPilot completed successfully.

```



\## Run Locally



Install dependencies:



```bash

npm install

```



Make sure Binance CLI is installed and authenticated with a Demo Trading profile.



Then run:



```bash

npx tsx src/index.ts

```



\## Safety



AlphaPilot currently uses \*\*Binance Demo Trading\*\*.



The MVP does not use real funds and does not include withdrawal functionality.



\## Hackathon Track



\*\*Binance Agent OS Mini Hackathon — Track A\*\*



Focus: AI agent for trading and portfolio workflows.



\## Project Status



AlphaPilot is an MVP focused on demonstrating the complete agent workflow from market analysis to risk-controlled Binance execution.



Future versions can expand the portfolio layer, multi-asset analysis, dynamic risk management, and richer AI reasoning.



