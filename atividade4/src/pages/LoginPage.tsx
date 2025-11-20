import Background from "../assets/background.png";
import { Login } from "../components/Login";

export const LoginPage = () => {
    return (
        <div
            className="flex h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Background})` }}>

            <div className="hidden md:block md:w-1/2 h-full relative">
                <div className="absolute inset-0"></div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-end">
                <div
                    className={`bg-gray-50 h-[calc(100%-16px)] w-full 
                    rounded-tl-[40px] flex justify-center items-center 
                    shadow-2xl`}>
                    <Login />
                </div>
            </div>
        </div>
    );
}
