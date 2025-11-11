import { WORDS } from '../services/words';

export const getRandomWord = (): string => {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
};

export const getCorrectLetters = (guessedLetters: string[], targetWord: string): string[] => {
    return guessedLetters.filter(letter => targetWord.includes(letter));
};

export const getWrongLetters = (guessedLetters: string[], targetWord: string): string[] => {
    return guessedLetters.filter(letter => !targetWord.includes(letter));
};

export const checkWin = (targetWord: string, correctLetters: string[]): boolean => {
    return targetWord.split('').every(letter => correctLetters.includes(letter));
};

export const checkLoss = (attempts: number, maxAttempts: number): boolean => {
    return attempts >= maxAttempts;
};

export const isValidLetter = (input: string): boolean => {
    return /^[A-Za-z]$/.test(input);
};
