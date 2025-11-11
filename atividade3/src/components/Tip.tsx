import Frame2 from "../assets/Frame2.svg";
import '../css/Tip.css';

interface TipProps {
    tip: string;
}

export const Tip = ({ tip }: TipProps) => {
    return (
        <div className="tip">
            <img src={Frame2} alt="Dica" />
            <div className="text">
                <h3>Dica</h3>
                <p>{tip}</p>
            </div>
        </div>
    )
}