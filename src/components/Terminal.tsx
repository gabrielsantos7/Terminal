import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

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
    text.length <= 20 && setInputText(text);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      setHistory((prevHistory) => [...prevHistory, inputText.trim()]);
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
      {/* <span id='username'>
        visitor@terminal.com:<span className='color-main-blue'>~</span>
        <span className='color-white'>$</span>
      </span>
      <span className='color-white'>{inputText}</span> <span id='typer'></span> */}
      {/* Exibir histórico de comandos */}
      {history.map((command, index) => (
        <div key={index}>
          <span className='username'>
            visitor@terminal.com:<span className='color-main-blue'>~</span>
            <span className='color-white'>$</span>
          </span>
          <span className='color-white'>{command}</span>
        </div>
      ))}
      <span className='username'>
        visitor@terminal.com:<span className='color-main-blue'>~</span>
        <span className='color-white'>$</span>
      </span>
      <span className='color-white'>{!!inputText.length ? inputText.trim() : inputText}</span> <span id='typer'></span>
    </div>
  );
};

export default Terminal;
