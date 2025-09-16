import { useState, useEffect } from 'react';

export function useTypewriter(text, speed = 150) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Reset after full text shown, pause 1.5s before restarting
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return displayedText;
}
