import { spawn } from "node:child_process";
import readline from "node:readline";
import type WebSocket from "ws";

export function attachBridgedProcess(
  socket: WebSocket,
  command: string,
  args: string[],
  env?: NodeJS.ProcessEnv,
): void {
  const child = spawn(command, args, { env });
  const send = (message: string | object): void => {
    if (socket.readyState === socket.OPEN) {
      socket.send(typeof message === "string" ? message : JSON.stringify(message));
    }
  };

  readline.createInterface({ input: child.stdout }).on("line", (line) => send(line));
  child.stderr.on("data", (chunk: Buffer) =>
    send({ __bridge: "stderr", data: chunk.toString() }),
  );

  child.on("exit", (code, signal) => {
    send({ __bridge: "exit", code, signal });
    socket.close();
  });

  socket.on("message", (data) => {
    child.stdin.write(`${data.toString()}\n`);
  });

  socket.on("close", () => {
    if (!child.killed && child.exitCode === null) {
      child.kill();
    }
  });
}
