import { IEvent } from '../interface';

export const event: IEvent = {
  name: 'ready',
  run: (client) => {
    console.log(`[CLIENT]: ${client.user?.username} está no ar!`);
  }
}