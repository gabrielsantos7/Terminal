import { useState, useEffect } from 'react';

const TypingEffect = () => {
  const [displayText, setDisplayText] = useState('');
  const text = `Hey, I'm Gabriel Santos 👋  I'm a programming enthusiast who loves what I do. I live in beauty city of Dom Basílio, in the heart of Bahia.
  I've been studying programming for almost two years, and since then, I
  have been perfecting my skills to become a complete and versatile
  FullStack developer.
  I'm a professional with exceptional
  adaptation and resilience skills, demonstrating calmness even under
  pressure. My nature Collaborative and sociable excels in team
  environments, where I contribute effectively to creating healthy and
  productive relationships. In addition Furthermore, I apply solid logical
  reasoning when solving problems, seeking practical and efficient
  solutions.
  In my free time, I like walk outdoors, listen to
  music, read, play dominoes and cards with my friends, always seeking to
  learn new things. My language Favorite programming is TypeScript. This
  superset provides additional features to JavaScript, which can be used
  both in backend and frontend for building applications.`;

  useEffect(() => {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayText((prevText) => prevText + text.charAt(charIndex));
      charIndex++;
      if (charIndex === text.length) {
        clearInterval(typingInterval);
      }
    }, 5);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return <div className='response'><span className='command'>{displayText}</span></div>;
};

export default TypingEffect;
