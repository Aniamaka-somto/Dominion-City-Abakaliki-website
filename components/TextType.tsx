"use client";

import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { gsap } from "gsap";

export interface TextTypeProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  /** The text (or list of texts) to type out. */
  text: string | readonly string[];
  /** Element to render. */
  as?: keyof React.JSX.IntrinsicElements;
  /** Milliseconds between keystrokes. */
  typingSpeed?: number;
  /** Milliseconds before typing starts. */
  initialDelay?: number;
  /** Milliseconds to hold a completed sentence before deleting. */
  pauseDuration?: number;
  /** Milliseconds between deletions. */
  deletingSpeed?: number;
  /** Loop through the text list forever. */
  loop?: boolean;
  /** Show the blinking cursor. */
  showCursor?: boolean;
  /** Hide the cursor while typing. */
  hideCursorWhileTyping?: boolean;
  /** The character used for the cursor. */
  cursorCharacter?: string;
  /** Classes for the cursor span. */
  cursorClassName?: string;
  /** Seconds for one cursor blink cycle. */
  cursorBlinkDuration?: number;
  /** Per-text colours. Falls back to `inherit` when empty. */
  textColors?: string[];
  /** Randomise the typing speed between these bounds. */
  variableSpeed?: { min: number; max: number };
  /** Called when a sentence finishes typing. */
  onSentenceComplete?: (text: string, index: number) => void;
  /** Wait until the element scrolls into view before typing. */
  startOnVisible?: boolean;
  /** Type the text in reverse. */
  reverseMode?: boolean;
  /** Classes for the wrapper element. */
  className?: string;
}

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const textArray = useMemo<string[]>(
    () => (Array.isArray(text) ? [...text] : [text as string]),
    [text],
  );

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return "inherit";
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;

    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(
                (prev) => prev + processedText[currentCharIndex],
              );
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed,
          );
        } else if (textArray.length >= 1) {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    getRandomSpeed,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < (textArray[currentTextIndex]?.length ?? 0) || isDeleting);

  const Tag = Component as React.ElementType;

  return (
    <Tag
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap tracking-tight ${className}`}
      {...props}
    >
      <span
        className="inline"
        style={{ color: getCurrentTextColor() || "inherit" }}
      >
        {displayedText}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}
        >
          {cursorCharacter}
        </span>
      )}
    </Tag>
  );
};

export default TextType;
