import { ApplicationCommandDataResolvable } from "discord.js";

interface IRegisterCommandsOptions {
  guildId?: string;
  commands: ApplicationCommandDataResolvable[]
}

export {IRegisterCommandsOptions};