import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import { type LoginFormInputs } from "../types/auth";

export const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormInputs) => {
        console.log("Login Data:", data);
        alert("Login realizado com sucesso!");
    };

    return (
        <div className="w-full max-w-md px-8">
            <div className="flex justify-center gap-2 mb-4">
                <img src={Logo} alt="HelpDesk" className="h-8" />
            </div>

            <div className="border border-gray-300 rounded-2xl p-6">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-full text-left">
                        <h1 className="text-xl font-bold text-gray-900 mb-2">
                            Acesse o portal
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Entre usando seu e-mail e senha cadastrados
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <label
                            htmlFor="email"
                            className={`block text-xs font-bold text-gray-500 
                        uppercase tracking-wider mb-2`}>
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            className={`w-full px-0 py-2 bg-transparent border-b 
                        ${errors.email ? 'border-red-500' : 'border-gray-300'} 
                        text-gray-900 placeholder-gray-400 
                        focus:outline-none focus:border-blue-600 transition-colors`}
                            placeholder="exemplo@mail.com"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className={`block text-xs font-bold text-gray-500 
                        uppercase tracking-wider mb-2`}>
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className={`w-full px-0 py-2 bg-transparent border-b 
                            ${errors.password ? 'border-red-500' : 'border-gray-300'}
                            text-gray-900 
                            placeholder-gray-400 focus:outline-none 
                            focus:border-blue-600 transition-colors`}
                            placeholder="Digite sua senha"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 
                        text-white font-medium rounded-lg transition-colors mt-4`}
                    >
                        Entrar
                    </button>
                </form>
            </div>

            <div className="mt-4 border border-gray-300 rounded-2xl p-6">
                <h3 className="text-gray-900 font-semibold mb-1">
                    Ainda não tem uma conta?
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                    Cadastre agora mesmo
                </p>
                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className={`w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 
                        text-gray-800 font-medium rounded-lg transition-colors`}
                >
                    Criar conta
                </button>
            </div>
        </div>
    );
}