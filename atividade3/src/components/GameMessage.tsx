import '../css/GameMessage.css';

interface GameMessageProps {
    type: 'win' | 'lose';
    word?: string;
}

export const GameMessage = ({ type, word }: GameMessageProps) => {
    if (type === 'win') {
        return (
            <div className="game-message win">
                <h2>Parabéns! Você acertou!</h2>
            </div>
        );
    }

    return (
        <div className="game-message lose">
            <h2>Fim de jogo! A palavra era: {word}</h2>
        </div>
    );
};
