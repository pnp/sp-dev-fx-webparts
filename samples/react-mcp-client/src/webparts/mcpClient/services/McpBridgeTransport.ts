import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";
import { IServerLaunchConfig } from "./types";

export class McpBridgeTransport implements Transport {
  public onclose?: () => void;
  public onerror?: (error: Error) => void;
  public onmessage?: (message: JSONRPCMessage) => void;
  private socket?: WebSocket;

  constructor(
    private bridgeUrl: string,
    private launchConfig: IServerLaunchConfig
  ) {}

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`${this.bridgeUrl}/mcp`);
      this.socket.onopen = () => {
        this.socket!.send(JSON.stringify({ type: "spawn", ...this.launchConfig }));
      };
      this.socket.onmessage = (evt) => {
        const text = String(evt.data);
        const parsed = JSON.parse(text);
        if (parsed?.__bridge === "spawned") { resolve(); return; }
        if (parsed?.__bridge === "exit") { this.onclose?.(); return; }
        if (parsed?.__bridge === "stderr") return;
        this.onmessage?.(parsed as JSONRPCMessage);
      };
      this.socket.onerror = () => {
        const err = new Error(`Bridge connection failed: ${this.bridgeUrl}`);
        this.onerror?.(err);
        reject(err);
      };
      this.socket.onclose = () => this.onclose?.();
    });
  }

  async send(message: JSONRPCMessage): Promise<void> {
    this.socket?.send(JSON.stringify(message));
  }

  async close(): Promise<void> {
    this.socket?.close();
  }
}
