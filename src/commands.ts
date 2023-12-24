import { ICommand } from "./models";

export const commands: ICommand[] = [
  {
    name: 'help',
    action: () => {
      // Ação para o comando 'help'
      console.log('helping...');
    },
  },
  {
    name: 'clear',
    action: () => {
      // Ação para o comando 'clear'
      console.log('clearing...');
    },
  },
]