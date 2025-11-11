import { useState, useRef, useEffect } from 'react';
import { isValidLetter } from '../utils/gameHelpers';
import '../css/Lyrics.css';

interface LyricsProps {
    guessedLetters: string[];
    correctLetters: string[];
    wrongLetters: string[];
    onGuess: (letter: string) => void;
    disabled: boolean;
}

export const Lyrics = ({
    guessedLetters,
    correctLetters,
    onGuess,
    disabled
}: LyricsProps) => {
    const [inputLetter, setInputLetter] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!disabled && inputRef.current) {
            inputRef.current.focus();
        }
    }, [guessedLetters, disabled]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputLetter.trim() && !disabled) {
            if (!isValidLetter(inputLetter)) {
                alert('Por favor, digite apenas letras!');
                setInputLetter('');
                return;
            }
            onGuess(inputLetter);
            setInputLetter('');
        }
    };

    return (
        <div className="lyrics-container">
            <form onSubmit={handleSubmit} className="guess-form">
                <h3>Palpite</h3>
                <div className="input-group">
                    <input
                        ref={inputRef}
                        type="text"
                        maxLength={1}
                        value={inputLetter}
                        onChange={(e) => setInputLetter(e.target.value.toUpperCase())}
                        placeholder=""
                        disabled={disabled}
                        className="letter-input"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={disabled || !inputLetter.trim()}
                        className="confirm-button"
                    >
                        Confirmar
                    </button>
                </div>
            </form>

            <div className="letters-history">
                <h3>Letras utilizadas</h3>
                <div className="letters-list">
                    {guessedLetters.length === 0 ? (
                        <p className="no-letters">Nenhuma letra utilizada ainda</p>
                    ) : (
                        guessedLetters.map((letter, index) => (
                            <div
                                key={index}
                                className={`letter-badge ${correctLetters.includes(letter) ? 'correct' : 'wrong'
                                    }`}
                            >
                                {letter}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}