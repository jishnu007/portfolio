import { useState, useEffect } from "react";

interface TextLoopProps {
  children: React.ReactNode[];
  interval?: number;
}

export const TextLoop: React.FC<TextLoopProps> = ({ 
  children, 
  interval = 2000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    }, interval);

    return () => clearInterval(timer);
  }, [children.length, interval]);

  return <>{children[currentIndex]}</>;
};
