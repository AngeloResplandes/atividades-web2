import Frame1 from "../assets/Frame1.svg";
import '../css/Attempt.css';

interface AttemptProps {
    attempts: number;
    maxAttempts: number;
    onReset: () => void;
}

export const Attempt = ({ attempts, maxAttempts, onReset }: AttemptProps) => {
    return (
        <div className="attempt">
            <h3><span className="attempts-number">{attempts}</span> de {maxAttempts} tentativas</h3>
            <button onClick={onReset} title="Reiniciar jogo">
                <img src={Frame1} alt="Reiniciar" />
            </button>
        </div>
    );
}