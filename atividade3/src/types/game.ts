export interface GameState {
    targetWord: string;
    guessedLetters: string[];
    attempts: number;
    correctLetters: string[];
    wrongLetters: string[];
    hasWon: boolean;
    hasLost: boolean;
}

export interface GameActions {
    handleGuess: (letter: string) => void;
    resetGame: () => void;
}
