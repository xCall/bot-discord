import { CommandInteraction, ChatInputApplicationCommandData, GuildMember, ApplicationCommandData, CommandInteractionOptionResolver } from "discord.js";
import { Bot } from '../client/Bot';

interface IExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

interface IRunOptions {
  client: Bot;
  interaction: IExtendedInteraction;
  args: CommandInteractionOptionResolver;
}

type Run = (options: IRunOptions) => any;

type ICommand = ApplicationCommandData & {
  name: string;
  description: string;
  testOnly: boolean;
  run: Run;
} & ChatInputApplicationCommandData;

export { IExtendedInteraction, Run, ICommand };