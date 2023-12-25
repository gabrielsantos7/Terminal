import { commands } from './commands';

export const findCommand = (input: string): string | undefined => {
  return commands.find((cmd) => cmd === input);
};

export const getCurrentTime = (): string => {
  const now: Date = new Date();
  let hours: number | string = now.getHours();
  let minutes: number | string = now.getMinutes();

  hours = (hours < 10 ? '0' : '') + hours;
  minutes = (minutes < 10 ? '0' : '') + minutes;

  const currentTime: string = `${hours}:${minutes}`;
  return currentTime;
};
