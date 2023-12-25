import React, { useEffect, useState } from 'react';

const NotFound = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Command not found. For a list of commands, type 'help'";

  useEffect(() => {
    let index = 0;
    const typingEffect = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingEffect);
      }
    }, 10);

    return () => clearInterval(typingEffect);
  }, [fullText]);

  return (
    <div className='response'>
      <span className='color-main-red'>{displayedText}</span>
    </div>
  );
};

export default NotFound;
