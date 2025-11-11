import { useState, useEffect, useCallback } from 'react';
import { GAME_CONFIG } from '../services/words';
import type { GameState, GameActions } from '../types/game';
import {
    getRandomWord,
    getCorrectLetters,
    getWrongLetters,
    checkWin,
    checkLoss
} from '../utils/gameHelpers';

export const useGame = (): GameState & GameActions => {
    const [targetWord, setTargetWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(0);

    const correctLetters = getCorrectLetters(guessedLetters, targetWord);
    const wrongLetters = getWrongLetters(guessedLetters, targetWord);

    const hasWon = checkWin(targetWord, correctLetters);
    const hasLost = checkLoss(attempts, GAME_CONFIG.MAX_ATTEMPTS);

    const resetGame = useCallback(() => {
        const randomWord = getRandomWord();
        setTargetWord(randomWord);
        setGuessedLetters([]);
        setAttempts(0);
    }, []);

    useEffect(() => {
        resetGame();
    }, [resetGame]);

    const handleGuess = useCallback((letter: string) => {
        const upperLetter = letter.toUpperCase();

        if (guessedLetters.includes(upperLetter)) {
            alert('Essa letra já foi utilizada!');
            return;
        }

        setGuessedLetters(prev => [...prev, upperLetter]);
        setAttempts(prev => prev + 1);
    }, [guessedLetters]);

    return {
        targetWord,
        guessedLetters,
        attempts,
        correctLetters,
        wrongLetters,
        hasWon,
        hasLost,
        handleGuess,
        resetGame
    };
};
