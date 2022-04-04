import { Message, MessageEmbed, Permissions } from 'discord.js';
import { IEvent } from '../interface';
import dotenv from 'dotenv';
dotenv.config();

export const event: IEvent = {
  name: 'messageCreate',
  run: async (client, message: Message) => {
    if(message.channel.type === 'DM') return;
    const PREFIX = process.env.PREFIX as string;
    if(message.author.bot || !message.content.startsWith(PREFIX)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const cmd = args.shift()?.toLowerCase();

    message.reply('Hey!')
  },
}