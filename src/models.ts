export interface IUsernameProps {
  currentTime: string;
}

export interface ISecretProps {
  showSecret: boolean,
  setShowSecret: (showSecret: boolean) => void;
}

export interface ISecretHistory {
  attempt: string;
  result: string
}

export interface ICommandHistory {
  command: string; 
  response: JSX.Element | null; 
  timestamp: string 
}