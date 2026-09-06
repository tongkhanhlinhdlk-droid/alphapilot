import { createServer } from "http";
import { randomUUID } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import type {
  OAuthClientProvider,
  OAuthClientMetadata,
  OAuthClientInformation,
  OAuthClientInformationFull,
  OAuthTokens
} from "@modelcontextprotocol/client";

const TOKEN_FILE = ".binance-oauth.json";
const CALLBACK_PORT = 8787;
const REDIRECT_URI = `http://127.0.0.1:${CALLBACK_PORT}/callback`;
const CLIENT_METADATA_URL =
  "https://raw.githubusercontent.com/tongkhanhlinhdlk-droid/alphapilot/main/.well-known/oauth-client-metadata.json";

export class BinanceOAuthProvider implements OAuthClientProvider {
  clientMetadataUrl = CLIENT_METADATA_URL;

  get redirectUrl() {
    return REDIRECT_URI;
  }

  get clientMetadata(): OAuthClientMetadata {
    return {
      redirect_uris: [REDIRECT_URI],
      token_endpoint_auth_method: "none",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      client_name: "AlphaPilot",
      client_uri: "https://github.com/tongkhanhlinhdlk-droid/alphapilot"
    };
  }

  clientInformation(): OAuthClientInformation | undefined {
    if (!existsSync(TOKEN_FILE)) return undefined;

    try {
      return JSON.parse(readFileSync(TOKEN_FILE, "utf8")).clientInformation;
    } catch {
      return undefined;
    }
  }

  async saveClientInformation(
    clientInformation: OAuthClientInformationFull
  ) {
    const existing = existsSync(TOKEN_FILE)
      ? JSON.parse(readFileSync(TOKEN_FILE, "utf8"))
      : {};

    writeFileSync(
      TOKEN_FILE,
      JSON.stringify({ ...existing, clientInformation }, null, 2)
    );
  }

  tokens(): OAuthTokens | undefined {
    if (!existsSync(TOKEN_FILE)) return undefined;

    try {
      return JSON.parse(readFileSync(TOKEN_FILE, "utf8")).tokens;
    } catch {
      return undefined;
    }
  }

  saveTokens(tokens: OAuthTokens) {
    const existing = existsSync(TOKEN_FILE)
      ? JSON.parse(readFileSync(TOKEN_FILE, "utf8"))
      : {};

    writeFileSync(
      TOKEN_FILE,
      JSON.stringify({ ...existing, tokens }, null, 2)
    );
  }

  redirectToAuthorization(authorizationUrl: URL) {
    console.log("\nOpen this URL in your browser:\n");
    console.log(authorizationUrl.toString());
    console.log();
  }

  saveCodeVerifier(codeVerifier: string) {
    const existing = existsSync(TOKEN_FILE)
      ? JSON.parse(readFileSync(TOKEN_FILE, "utf8"))
      : {};

    writeFileSync(
      TOKEN_FILE,
      JSON.stringify({ ...existing, codeVerifier }, null, 2)
    );
  }

  codeVerifier(): string {
    if (!existsSync(TOKEN_FILE)) {
      throw new Error("OAuth code verifier not found");
    }

    return JSON.parse(readFileSync(TOKEN_FILE, "utf8")).codeVerifier;
  }

  state(): string {
    return randomUUID();
  }

  async waitForCallback(): Promise<string> {
    return new Promise((resolve, reject) => {
      const server = createServer((req, res) => {
        const url = new URL(
          req.url ?? "/",
          `http://127.0.0.1:${CALLBACK_PORT}`
        );

        if (url.pathname !== "/callback") {
          res.writeHead(404);
          res.end();
          return;
        }

        const error = url.searchParams.get("error");
        const code = url.searchParams.get("code");

        if (error) {
          res.writeHead(400);
          res.end(`OAuth error: ${error}`);
          server.close();
          reject(new Error(`OAuth error: ${error}`));
          return;
        }

        if (!code) {
          res.writeHead(400);
          res.end("Missing authorization code");
          return;
        }

        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8"
        });

        res.end(
          "<h2>AlphaPilot authorization successful.</h2><p>You can close this window.</p>"
        );

        server.close();
        resolve(code);
      });

      server.listen(CALLBACK_PORT, "127.0.0.1", () => {
        console.log(`OAuth callback listening on ${REDIRECT_URI}`);
      });

      server.on("error", reject);
    });
  }
}
