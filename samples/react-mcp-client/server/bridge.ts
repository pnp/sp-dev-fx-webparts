import cors from "cors";
import express from "express";
import { WebSocketServer } from "ws";
import { attachBridgedProcess } from "./processManager.js";

const app = express();
app.use(cors({ origin: /\.sharepoint\.com$|localhost/ }));
app.get("/health", (_request, response) => response.json({ status: "ok" }));

const port = Number(process.env.PORT ?? 3001);
const server = app.listen(port, () =>
  console.log(`MCP bridge listening on ws://localhost:${port}/mcp`),
);
const wss = new WebSocketServer({ server, path: "/mcp" });

wss.on("connection", (socket) => {
  socket.once("message", (data) => {
    let directive: unknown;

    try {
      directive = JSON.parse(data.toString());
    } catch {
      socket.close(1008, "First message must be a JSON spawn directive");
      return;
    }

    if (!isSpawnDirective(directive)) {
      socket.close(1008, "Invalid spawn directive");
      return;
    }

    attachBridgedProcess(socket, directive.command, directive.args, directive.env);
  });
});

type SpawnDirective = {
  type: "spawn";
  command: string;
  args: string[];
  env?: NodeJS.ProcessEnv;
};

function isSpawnDirective(value: unknown): value is SpawnDirective {
  if (typeof value !== "object" || value === null) return false;
  const { type, command, args, env } = value as Record<string, unknown>;

  return (
    type === "spawn" &&
    typeof command === "string" &&
    Array.isArray(args) &&
    args.every((arg) => typeof arg === "string") &&
    (env === undefined ||
      (typeof env === "object" &&
        env !== null &&
        Object.values(env).every((entry) => typeof entry === "string")))
  );
}
