import { useEffect, useState } from 'react';
import './LoadingScreen.css';

const words = [
    "Hello",        // English
    "नमस्ते",        // Hindi
    "你好",         // Chinese
    "Ciao",          // Italian
    "Hola",         // Spanish
    "こんにちは",     // Japanese
    "Bonjour",      // French
    "안녕하세요",      // Korean
    "مرحباً",       // Arabic
    "Guten Tag"     // German
];

interface LoadingScreenProps {
    onFinished: () => void;
}

export const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        if (index === words.length - 1) {
            const timer = setTimeout(() => {
                onFinished();
            }, 1000);
            return () => clearTimeout(timer);
        }

        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setFade(true);
            }, 100); // Short fade out before changing word
        }, 500);

        return () => clearInterval(interval);
    }, [index, onFinished]);

    return (
        <div className="loading-screen">
            <div className={`loading-text ${fade ? 'fade-in' : 'fade-out'}`}>
                {words[index]}
            </div>
        </div>
    );
};
