import { commands } from './commands';

export const findCommand = (input: string): string | undefined => {
  return commands.find((cmd) => cmd === input);
};
