import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/auth";
import { type RegisterFormInputs } from "../types/auth";

export const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormInputs) => {
        console.log("Register Data:", data);
        alert("Cadastro realizado com sucesso! (Verifique o console)");
    };

    return (
        <div className="w-full max-w-md px-8">
            <div className="flex justify-center gap-2 mb-4">
                <img src={Logo} alt="HelpDesk" className="h-8" />
            </div>

            <div className="border border-gray-300 rounded-2xl p-5">
                <div className="flex flex-col items-center mb-3">
                    <div className="w-full text-left">
                        <h1 className="text-xl font-bold text-gray-900 mb-2">
                            Crie sua conta
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Informe seu nome, e-mail e senha
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div>
                        <label
                            htmlFor="name"
                            className={`block text-xs font-bold text-gray-500 
                        uppercase tracking-wider mb-1`}>
                            Nome
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register("name")}
                            className={`w-full px-0 py-2 bg-transparent border-b 
                        ${errors.name ? 'border-red-500' : 'border-gray-300'} 
                        text-gray-900 placeholder-gray-400 
                        focus:outline-none focus:border-blue-600 transition-colors`}
                            placeholder="Digite o nome completo"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </span>
                        )}
                    </div>

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
                        <p className="text-xs text-gray-400 mt-1 italic">
                            Mínimo de 8 caracteres
                        </p>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 
                        text-white font-medium rounded-lg transition-colors mt-1`}
                    >
                        Cadastrar
                    </button>
                </form>
            </div>

            <div className="mt-4 border border-gray-300 rounded-2xl p-5">
                <h3 className="text-gray-900 font-semibold mb-1">
                    Já uma conta?
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                    Entre agora mesmo
                </p>
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className={`w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 
                        text-gray-800 font-medium rounded-lg transition-colors`}
                >
                    Acessar conta
                </button>
            </div>
        </div>
    );
}
