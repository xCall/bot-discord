import { CommandInteractionOptionResolver, Interaction } from "discord.js";
import { IEvent } from "../interface";
import { IExtendedInteraction } from "../interface/ICommands";


 export const event: IEvent = {
   name: 'interactionCreate',
   run: async (client, interaction: Interaction) => {
    if(interaction.isCommand()) {
      await interaction.deferReply();
      const command = client.commands.get(interaction.commandName);
      if(!command) {
        return interaction.reply('Esse comando nao existe');
      }
      command.run({
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as IExtendedInteraction
      })
    }
   }
 }
