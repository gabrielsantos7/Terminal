import { commands } from './commands';

export const findCommand = (input: string): string | undefined => {
  return commands.find((cmd) => cmd === input);
};

export const getCurrentTime = (): string => {
  const now: Date = new Date();
  let hours: number | string = now.getHours();
  let minutes: number | string = now.getMinutes();
  let seconds: number | string = now.getSeconds();

  hours = (hours < 10 ? '0' : '') + hours;
  minutes = (minutes < 10 ? '0' : '') + minutes;
  seconds = (seconds < 10 ? '0' : '') + seconds;

  const currentTime: string = `${hours}:${minutes}:${seconds}`;
  return currentTime;
};
