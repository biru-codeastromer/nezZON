"use client";

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MorphingTextProps {
  phrases: string[];
  className?: string;
  duration?: number; // Duration for each phrase in milliseconds
  transitionDuration?: number; // Duration of transition between phrases
}

export function MorphingText({
  phrases,
  className,
  duration = 2000,
  transitionDuration = 400,
}: MorphingTextProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayText, setDisplayText] = useState(phrases[0]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (phrases.length <= 1) return;

    const cycleText = () => {
      setIsAnimating(true);
      
      // Set timeout for fade out duration
      timeoutRef.current = setTimeout(() => {
        // Update to next phrase
        setCurrentPhraseIndex(prevIndex => (prevIndex + 1) % phrases.length);
        setDisplayText(phrases[(currentPhraseIndex + 1) % phrases.length]);
        
        // Set timeout for fade in duration
        timeoutRef.current = setTimeout(() => {
          setIsAnimating(false);
          
          // Set timeout for displaying duration before next cycle
          timeoutRef.current = setTimeout(cycleText, duration);
        }, transitionDuration / 2);
      }, transitionDuration / 2);
    };

    // Start the cycle
    timeoutRef.current = setTimeout(cycleText, duration);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [phrases, currentPhraseIndex, duration, transitionDuration]);

  return (
    <span 
      className={cn(
        "transition-opacity duration-400",
        isAnimating ? "opacity-0" : "opacity-100",
        className
      )}
    >
      {displayText}
    </span>
  );
}