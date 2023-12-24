import { commands } from "./commands";
import { ICommand } from "./models";

export const findCommand = (input: string): ICommand | undefined => {
  return commands.find((cmd) => cmd.name === input);
};