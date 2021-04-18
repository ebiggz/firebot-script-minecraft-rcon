import { Firebot } from "firebot-custom-scripts-types";
import { sendRconCommand } from "./mc-rcon";

export const McRconOutputVariable: Firebot.ReplaceVariable = {
  definition: {
    handle: "mcRconOutput",
    usage: "mcRconOutput[command]",
    description:
      "Runs an MC Rcon command and displays the response from the server.",
    possibleDataOutput: ["text"],
  },
  evaluator: async (_, command) => {
    return await sendRconCommand(command);
  },
};
