import { ICommand } from "../../interface";
export const slash: ICommand = {
  name: 'ping',
  description: 'Calcula o ping do bot',
  testOnly: false,
  run: ({interaction}) => {
    return interaction.followUp({content: `O ping do bot é de estimados ${interaction.client.ws.ping} ms.`})
  }
}