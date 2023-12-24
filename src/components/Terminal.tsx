import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

const Terminal = () => {
  const [inputText, setInputText] = useState<string>('');
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
    text.length <=20 && setInputText(text);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      console.log(inputText);
      setInputText('');
    }
  };

  return (
    <div id='terminal-container' onClick={textareaFocus}>
      <p>Pressione qualquer tecla para simular o terminal:</p>
      {inputText}
      <textarea
        ref={textAreaRef}
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Terminal;
