import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Username from './Username';
import { findCommand, getCurrentTime } from '../helper';
import Help from './CommandResponses/Help';
import NotFound from './CommandResponses/NotFound';
import Banner from './CommandResponses/Banner';
import Whois from './CommandResponses/Whois';
import { ICommandHistory, ISecretHistory } from '../models';
import Projects from './CommandResponses/Projects';
import Secret from './CommandResponses/Secret';

const Terminal = () => {
  const [inputText, setInputText] = useState<string>('');
  const [history, setHistory] = useState<ICommandHistory[]>([]);
  const [secretHistory, setSecretHistory] = useState<ISecretHistory[]>([]);
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTimeout(() => {
      textareaFocus();
    }, 50);
  }, []);

  useEffect(() => {
    console.log(history);
  }, [history]);
  

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
      const timestamp = getCurrentTime();

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
      case 'secret':
        setShowSecret(true)
        return <Secret setShowSecret={setShowSecret} showSecret={true} setSecretHistory={setSecretHistory} />;
      default:
        return <NotFound />;
    }
  };
  

  const addToHistory = (
    command: string,
    response: JSX.Element | null,
    timestamp: string,
  ) => {
    const commandObj: ICommandHistory = {
      command,
      response,
      timestamp,
    };
  
    // Usa uma função de callback para obter o estado anterior atualizado
    setHistory((prevHistory) => {
      return [...prevHistory, commandObj];
    });
  
    setInputText('');
  
    console.log(history);
  
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
          {item.command === 'secret' ? (
            secretHistory.map((secretItem, secretIndex) => (
              <div key={`secret-${secretIndex}`}>
                <span>Find the password: </span>
                <span className='color-white'>{secretItem.attempt}</span> <br />
                <span
                  className={
                    secretItem.result.includes('Wrong') ? 'color-main-red' : ''
                  }
                >
                  {secretItem.result}
                </span>
              </div>
            ))
          ) : (
            <>
              <Username currentTime={item.timestamp} />
              <span className='color-white'>{item.command}</span>
              {item.response && <span>{item.response}</span>}
            </>
          )}
        </div>
      ))}

      {showSecret && (
        <Secret
          setShowSecret={setShowSecret}
          showSecret={showSecret}
          setSecretHistory={setSecretHistory}
        />
      )}

      {/* Último comando digitado */}
      {!showSecret && (
        <>
          <Username currentTime={getCurrentTime()} />
          <span className='color-white'>
            {!!inputText.length ? inputText.trim() : inputText}
          </span>{' '}
          <span className='typer'></span>
        </>
      )}
    </div>
  );
};

export default Terminal;
