import { ScriptModules } from "firebot-custom-scripts-types";
import { Rcon, RconOptions } from "rcon-client";
import { logger } from "./logger";

let rcon: Rcon;

let connected = false;

export function initRcon({
  host,
  port,
  password,
}: {
  host: string;
  port: number;
  password: string;
}) {
  rcon = new Rcon({ host, port, password });

  rcon.on("connect", () => {
    connected = true;
    logger.info("Successfully connected to MC RCON.");
  });

  rcon.on("authenticated", () => logger.info("Authenticated with MC RCON"));

  rcon.on("error", logger.error);

  rcon.on("end", () => {
    if (!connected) return;
    connected = false;
    try {
      logger.info("MC RCON connection ended, attempting again in 10 secs...");
      setTimeout(() => maintainConnection(), 10000);
    } catch (err) {
      // silently fail
    }
  });

  maintainConnection();
}

async function maintainConnection() {
  if (!connected) {
    try {
      logger.debug("Trying to connect to MC RCON...");

      await rcon.connect();
    } catch (error) {
      logger.debug(
        "Failed to connect to MC RCON, attempting again in 10 secs."
      );
      logger.debug(error);
      setTimeout(() => maintainConnection(), 10000);
    }
  }
}

export async function sendRconCommand(command: string): Promise<string | null> {
  if (connected) {
    try {
      const response = await rcon.send(command);
      logger.debug(`Response from MC RCON (${command}): `, response);
      return response;
    } catch (error) {
      logger.warn(error);
    }
  }
  return "";
}
