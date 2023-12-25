import { useState, useEffect } from 'react';

const Help = () => {
  const [displayText, setDisplayText] = useState('');
  const text = `
    whois ............. Who is Gabriel Santos?<br />
    whoami ............ Who are you?<br />
    social ............ Display social networks<br />
    secret ............ Find the password<br />
    projects .......... View coding projects<br />
    history ........... View command history<br />
    help .............. You obviously already know what this does<br />
    email ............. Do not email me<br />
    clear ............. Clear terminal<br />
    banner............. Display the header`;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText(text.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > text.length) {
        clearInterval(interval);
      }
    }, 1); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className='response'>
      <span dangerouslySetInnerHTML={{ __html: displayText }}></span>
    </div>
  );
};

export default Help;
