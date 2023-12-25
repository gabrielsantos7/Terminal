import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Username from './Username';
import { findCommand, getCurrentTime } from '../helper';
import Help from './CommandResponses/Help';
import NotFound from './CommandResponses/NotFound';
import Banner from './CommandResponses/Banner';
import Whois from './CommandResponses/Whois';
import { ICommandHistory } from '../models';
import Projects from './CommandResponses/Projects';

const Terminal = () => {
  const [inputText, setInputText] = useState<string>('');
  const [history, setHistory] = useState<ICommandHistory[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTimeout(() => {
      textareaFocus();
    }, 50);
  }, []);

  const textareaFocus = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    text.length <= 30 && setInputText(text);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      const trimmedInput = inputText.trim().toLowerCase();
      const timestamp = getCurrentTime(); // Obtém a data e hora atual
  
      if (trimmedInput) {
        const response = getCommandResponse(trimmedInput);
        addToHistory(trimmedInput, response, timestamp);
      } else {
        addToHistory(trimmedInput, null, timestamp);
      }
    }
  };
  
  const getCommandResponse = (command: string): JSX.Element | null => {
    switch (findCommand(command)) {
      case 'help':
        return <Help />;
      case 'clear':
        setHistory([]);
        return null;
      case 'banner':
        return <Banner />;
      case 'whois':
        return <Whois />;
      case 'projects':
        return <Projects />;
      default:
        return <NotFound />;
    }
  };
  
  const addToHistory = (
    command: string,
    response: JSX.Element | null,
    timestamp: string
  ) => {
    const commandObj: ICommandHistory = {
      command,
      response,
      timestamp,
    };
  
    setHistory((prevHistory) => [...prevHistory, commandObj]);
    setInputText('');
  
    setTimeout(() => {
      window.scrollTo(0, document.body.offsetHeight);
    }, 50);
  };  

  return (
    <div id='terminal-container' onClick={textareaFocus}>
      <p className='color-main-yellow'>
        Web Terminal project © 2024. All right reserved.
      </p>
      <textarea
        ref={textAreaRef}
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        autoFocus
      />

      {/* Histórico de comandos e respostas */}
      {history.map((item, index) => (
        <div key={index}>
          <Username currentTime={item.timestamp} />
          <span className='color-white'>{item.command}</span>
          {<span>{item.response}</span>}
        </div>
      ))}

      {/* Último comando digitado */}
      <Username currentTime={getCurrentTime()} />
      <span className='color-white'>
        {!!inputText.length ? inputText.trim() : inputText}
      </span>{' '}
      <span id='typer'></span>
    </div>
  );
};

export default Terminal;
