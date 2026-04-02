import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

// 1. Asegúrate de que la función NO tenga una flecha extra después de TypewriterProps
const Typewriter = ({ text, speed = 25, delay = 0 }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    setDisplayedText(""); 
    
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1)); // Usamos slice para ser más precisos
      i++;
      
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, started]);

  // 2. Este es el return que TypeScript espera (JSX)
  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse border-r-2 border-[#DE8676] ml-1"></span>
      )}
    </span>
  );
};

export default Typewriter;