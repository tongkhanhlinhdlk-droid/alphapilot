import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
import { BinanceOAuthProvider } from "./binanceOAuth.js";

const BINANCE_MCP_URL = "https://agent.binance.com/mcp/agentic";

export async function createBinanceMcpClient() {
  const provider = new BinanceOAuthProvider();

  const client = new Client({
    name: "AlphaPilot",
    version: "1.0.0",
  });

  let transport = new StreamableHTTPClientTransport(
    new URL(BINANCE_MCP_URL),
    {
      authProvider: provider,
    }
  );

  try {
    await client.connect(transport);
    return client;
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("Unauthorized")) {
      throw error;
    }

    console.log("\nBinance authorization required.");
    console.log("Open the URL shown above in your browser.");

    const code = await provider.waitForCallback();

    await transport.finishAuth(code);

    await transport.close();

    transport = new StreamableHTTPClientTransport(
      new URL(BINANCE_MCP_URL),
      {
        authProvider: provider,
      }
    );

    await client.connect(transport);

    return client;
  }
}
