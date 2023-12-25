import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Username from './Username';

import { findCommand } from '../helper';
import Help from './CommandResponses/Help';

const Terminal = () => {
  const [inputText, setInputText] = useState<string>('');
  const [history, setHistory] = useState<{ command: string; response: JSX.Element | null }[]>([]);
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
      const trimmedInput = inputText.trim()
      const matchedCommand = findCommand(trimmedInput);

      if (matchedCommand) {

        switch (matchedCommand) {
          case 'help':
            setHistory((prevHistory) => [...prevHistory, { command: trimmedInput, response: <Help /> }]);
            break;

          default:
            setHistory((prevHistory) => [...prevHistory, { command: trimmedInput, response: null }]);
            break;
        }

        setInputText('');
      } else {
        console.log(`Comando '${inputText}' não reconhecido.`);
      }
    }
  };

  return (
    <div id='terminal-container' onClick={textareaFocus}>
      <p className='color-main-yellow'>
        Pressione qualquer tecla para simular o terminal:
      </p>
      <textarea
        ref={textAreaRef}
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />

      {/* Histórico de comandos e respostas */}
      {history.map((item, index) => (
        <div key={index}>
          <Username />
          <span className='color-white'>{item.command}</span>
          {item.response && <span>{item.response}</span>}
        </div>
      ))}

      {/* Último comando digitado */}
      <Username />
      <span className='color-white'>{!!inputText.length ? inputText.trim() : inputText}</span> <span id='typer'></span>
    </div>
  );
};

export default Terminal;
