import { ApplicationCommandDataResolvable, Client, Collection } from "discord.js";
import dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { ICommand, IEvent, IRegisterCommandsOptions } from "../interface";
import path from 'path';
dotenv.config();


class Bot extends Client {
  public commands: Collection<string, ICommand> = new Collection();
  public events: Collection<string, IEvent> = new Collection();
  public aliases: Collection<string, ICommand> = new Collection();
  public config = process.env;

  public constructor() {
    super({
      intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_WEBHOOKS', 'GUILD_MEMBERS'],
      partials: ['CHANNEL', 'GUILD_MEMBER', 'USER', 'MESSAGE'],
    });
  }

  private async importFile(filePath: string) {
    return (await import(filePath))?.slash;
  }

  private async registerCommands({ commands, guildId }: IRegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`Registrei comandos no servidor ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      console.log(`Registrei comandos globalmente`);
    }
  }

  private async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandPath = path.join(__dirname, '..', 'command');

    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'));
      commands.forEach(async (file) => {
        const command: ICommand = await this.importFile(`${commandPath}/${dir}/${file}`);
        console.log(`${command.name} foi carregado com sucesso`);
        if (!command.name) return;
        this.commands.set(command.name, command);
        slashCommands.push(command);
      });
    });
    this.on('ready', () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: `${this.config.TESTSERVER}`,
      });
    });

  }

  public async init() {
    this.login(this.config.TOKEN);
    this.registerModules();

    if (!this.config.TESTSERVER) console.log('Não configurou o servidor de testes.');

    const eventPath = path.join(__dirname, '..', 'event');

    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${ file }`);
      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
    });
  }
}

export { Bot };