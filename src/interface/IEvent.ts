import {Bot} from '../client/Bot';

import { ClientEvents } from 'discord.js';

interface IRun {
  (client: Bot, ...args: any[]): any;
}

interface IEvent {
  name: keyof ClientEvents;
  run: IRun;
}

export {IEvent};