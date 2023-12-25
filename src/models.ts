export interface IUsernameProps {
  currentTime: string;
}

export interface ICommandHistory {
  command: string; 
  response: JSX.Element | null; 
  timestamp: string 
}