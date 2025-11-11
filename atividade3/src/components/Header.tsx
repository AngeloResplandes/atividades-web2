import Logo from "../assets/logo.svg";
import '../css/Header.css';

export const Header = () => {
    return (
        <header>
            <img src={Logo} alt="logo" />
        </header>
    );
}