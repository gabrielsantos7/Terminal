import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Username from './Username';

import { commands } from '../commands';
import { findCommand } from '../helper';

const Terminal = () => {
  const [inputText, setInputText] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
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
      matchedCommand.action();
    } else {
      console.log(`Comando '${inputText}' não reconhecido.`);
    }
      setHistory((prevHistory) => [...prevHistory, trimmedInput]);
      
      setInputText('');
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
      
      {history.map((command, index) => (
        <div key={index}>
          <Username />
          <span className='color-white'>{command}</span>
        </div>
      ))}

      <Username />
      <span className='color-white'>{!!inputText.length ? inputText.trim() : inputText}</span> <span id='typer'></span>
    </div>
  );
};

export default Terminal;
