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
  const [combinedHistory, setCombinedHistory] = useState<
    (ICommandHistory | ISecretHistory)[]
  >([]);
  const [showSecret, setShowSecret] = useState<boolean>(false);
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
        setCombinedHistory([]);
        return null;
      case 'banner':
        return <Banner />;
      case 'whois':
        return <Whois />;
      case 'projects':
        return <Projects />;
      case 'secret':
        setShowSecret(true);
        return null;
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

    setCombinedHistory((prevHistory) => [...prevHistory, commandObj]);
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
      {combinedHistory.map((item, index) => (
        <div key={index}>
          {'timestamp' in item ? (
            <>
              <Username currentTime={item.timestamp} />
              <span className='color-white'>{item.command}</span>
              {item.response && <span>{item.response}</span>}
            </>
          ) : (
            <div>
              <span>Find the password: {item.attempt}</span>
              <br />
              <span
                className={
                  item.result.includes('Wrong') ? 'color-main-red' : ''
                }
              >
                {item.result}
              </span>
            </div>
          )}
        </div>
      ))}

      {showSecret && (
        <Secret setShowSecret={setShowSecret} showSecret={showSecret} />
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
