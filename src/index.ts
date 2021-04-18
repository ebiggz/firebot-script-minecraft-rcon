import { Firebot } from "firebot-custom-scripts-types";
import { initLogger } from "./logger";
import { initRcon } from "./mc-rcon";
import { McRconOutputVariable } from "./mc-rcon-output";
import { SendMcRconCommandEffect } from "./send-mc-rcon-command";

interface Params {
  host: string;
  port: number;
  password: string;
}

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => {
    return {
      name: "Minecraft RCON",
      description:
        "Connects to a Minecraft server via RCON. Adds 'Send Minecraft RCON Command' Effect and $mcRconOutput Variable",
      author: "ebiggz",
      version: "1.0",
      firebotVersion: "5",
      startupOnly: true,
    };
  },
  getDefaultParameters: () => {
    return {
      host: {
        type: "string",
        default: "",
        description: "host",
        secondaryDescription: "The ip address/url of the MC server",
      },
      port: {
        type: "number",
        default: 25575,
        description: "Port",
        secondaryDescription: "Port the MC server uses for RCON",
      },
      password: {
        type: "password",
        default: "",
        description: "Password",
        secondaryDescription: "The password set for MC RCON",
      },
    };
  },
  run: ({ parameters, modules }) => {
    const { logger, effectManager, replaceVariableManager } = modules;

    initLogger(logger);

    initRcon({
      host: parameters.host,
      port: parameters.port,
      password: parameters.password,
    });

    effectManager.registerEffect(SendMcRconCommandEffect);

    replaceVariableManager.registerReplaceVariable(McRconOutputVariable);
  },
};

export default script;
