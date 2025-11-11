import '../css/Word.css';

interface WordProps {
    word: string;
    guessedLetters: string[];
    hasWon: boolean;
    hasLost: boolean;
}

export const Word = ({ word, guessedLetters, hasWon, hasLost }: WordProps) => {
    return (
        <div className="word-container">
            <div className="word-display">
                {word.split('').map((letter, index) => (
                    <div
                        key={index}
                        className={`letter-box ${guessedLetters.includes(letter) ? 'revealed' : ''
                            } ${hasWon ? 'win' : ''} ${hasLost ? 'lose' : ''}`}
                    >
                        {guessedLetters.includes(letter) || hasLost ? letter : ''}
                    </div>
                ))}
            </div>
        </div>
    );
}