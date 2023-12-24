import { useEffect, useState } from 'react';

const Terminal = () => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === 'Backspace') {
        setInputText((prevText) => prevText.slice(0, -1));
      } else if (key === 'Enter') {
        setInputText((prevText) => prevText + '\n');
      } else {
        setInputText((prevText) => prevText + key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id='terminal-container'>
      <p>Pressione qualquer tecla para simular o terminal:</p>
      {inputText}
    </div>
  );
};

export default Terminal;
