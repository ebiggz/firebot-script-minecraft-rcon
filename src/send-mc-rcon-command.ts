import { Firebot } from "firebot-custom-scripts-types";
import { sendRconCommand } from "./mc-rcon";

export const SendMcRconCommandEffect: Firebot.EffectType<{
  command: string;
}> = {
  definition: {
    id: "ebiggz:send-mc-rcon-command",
    name: "Send Minecraft RCON Command",
    description: "Send a RCON command to the configured MC server",
    icon: "fad fa-terminal",
    categories: ["scripting"],
  },
  optionsTemplate: `
    <eos-container header="Command">
      <input type="text" class="form-control" ng-model="effect.command" placeholder="say hello world" replace-variables menu-position="below" />
    </eos-container>
  `,
  optionsController: () => {},
  optionsValidator: (effect) => {
    if (effect.command?.length < 1) {
      return ["Please specify a command to run"];
    }
    return [];
  },
  onTriggerEvent: async ({ effect }) => {
    await sendRconCommand(effect.command);
    return true;
  },
};
