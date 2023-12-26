import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { ISecretHistory, ISecretProps } from '../../models';

const Secret = ({
  showSecret,
  setShowSecret,
  setSecretHistory,
}: ISecretProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [outputValue, setOutputValue] = useState<string>('');
  const [password] = useState<string>('password');
  const [mask, setMask] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(3);
  const [history, setHistory] = useState<ISecretHistory[]>(
    [],
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTimeout(() => {
      textareaFocus();
    }, 50);
  }, []);

  useEffect(() => {
    if (attempts === 0) {
      setOutputValue(
        'You have exceeded the maximum number of attempts. Please try again later.',
      );
      setSecretHistory([...history]);
      setShowSecret(false);
    }
  }, [attempts]);

  const textareaFocus = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const getInputMasked = (length: number) => {
    return '*'.repeat(length);
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    text.length <= 30 && setInputValue(text);
    setMask(getInputMasked(!!text.length? text.length-1 : text.length));
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (inputValue.toLowerCase().trim() === password) {
        setOutputValue('Congratulations! You have guessed the password.');
        setShowSecret(false);
        setInputValue('');
        setMask('');
      } else {
        const resultMessage = `Wrong password. ${
          attempts - 1
        } attempts remaining.`;
        setAttempts(attempts - 1);
        addToHistory(inputValue, resultMessage);
        setOutputValue('');
      }
      setInputValue('');
      setMask('');
    } else if (event.key === 'q') {
      setShowSecret(false);
    }
  };

  const addToHistory = (attempt: string, result: string) => {
    const newHistoryItem = { attempt, result };
    setHistory((prevHistory) => [...prevHistory, newHistoryItem]);
  };

  return (
    <div onClick={textareaFocus}>
      <textarea
        ref={textAreaRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        autoFocus
      />

      {/* Histórico de tentativas */}
      {history.map((item, index) => (
        <div key={index}>
          <span>Find the password: {item.attempt}</span> <br />
          <span
            className={item.result.includes('Wrong') ? 'color-main-red' : ''}
          >
            {item.result}
          </span>
        </div>
      ))}

      {showSecret && (
        <>
          <span>Find the password:</span>{' '}
          <span className='color-white'>{mask}</span>
          <span className='typer'></span>
          <p className={outputValue.includes('Wrong') ? 'color-main-red' : ''}>
            {outputValue}
          </p>
        </>
      )}
    </div>
  );
};

export default Secret;
