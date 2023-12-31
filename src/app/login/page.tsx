/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import AuthInput from "@/components/AuthInput";
import Pacman from "@/components/animacao/Pacman";
import { useAuthUser } from "@/data/context/AuthContext";

export default function Autentificacao() {
    const [modo, setModo] = useState<"login" | "cadastro">("login");
    const [erro, setErro] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState<Boolean>(false);

    const { login, cadastrar } = useAuthUser();

    useEffect(() => {
        setErro("");
    }, [modo]);

    const fazerLogin = async () => {
        if (modo === "login") {
            try {
                setCarregando(true);
                await login(email, senha);
            } catch (err) {
                if (
                    err.message === "Firebase: Error (auth/invalid-email)." ||
                    err.message === "Firebase: Error (auth/wrong-password)."
                ) {
                    setErro("Email ou senha inválios");
                } else if (
                    err.message === "Firebase: Error (auth/user-not-found)."
                ) {
                    setErro("Usuario não encontado");
                } else {
                    setErro(err.message);
                }
            } finally {
                setCarregando(false);
            }
            setEmail("");
            setSenha("");
        } else {
            try {
                await cadastrar(email, senha, nome);
                setEmail("");
                setSenha("");
                setNome("");
                setModo("login");
            } catch (err) {
                if (err.message === "Firebase: Error (auth/invalid-email).") {
                    setErro("Email inválido");
                } else {
                    setErro(err.message);
                }
            }
        }
    };

    function RenderizarForm() {
        return (
            <div className="m-5">
                <h1 className={` text-2xl font-bold mb-5 `}>
                    {modo === "login"
                        ? "Entre com a Sua Conta"
                        : "Cadastre-se na Plataforma"}
                </h1>

                {erro ? (
                    <div
                        className={`
                                    flex items-center
                                    bg-red-400 text-white py-3 px-5 my-2
                                    border-2 border-red-700 rounded-lg
                                `}
                    >
                        <span className="ml-3">{erro}</span>
                    </div>
                ) : (
                    false
                )}

                {modo !== "login" && (
                    <AuthInput
                        label="Nome"
                        tipo="text"
                        valor={nome}
                        valorMudou={setNome}
                        fazerLogin={fazerLogin}
                    />
                )}

                <AuthInput
                    label="Email"
                    tipo="email"
                    valor={email}
                    valorMudou={setEmail}
                    fazerLogin={fazerLogin}
                />
                <AuthInput
                    label="Senha"
                    tipo="password"
                    valor={senha}
                    valorMudou={setSenha}
                    fazerLogin={fazerLogin}
                />

                <button
                    onClick={fazerLogin}
                    className={`
                                w-full bg-indigo-500 hover:bg-indigo-400
                                text-white rounded-lg px-4 py-3 mt-6
                            `}
                >
                    {modo === "login" ? "Entrar" : "Cadastrar"}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                {modo === "login" ? (
                    <div className="flex flex-col  items-center mt-8">
                    <p className="">
                        Novo por aqui?
                        </p>
                        <a
                            onClick={() => setModo("cadastro")}
                            className={`
                                        text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                                    `}
                        >
                            Crie uma conta gratuitamente
                        </a>
                    </div>
                ) : (
                    <div className="flex flex-col  items-center mt-8">
                        <p className="">Ja faz parte da nossa comunidade?</p>
                        <a
                            onClick={() => setModo("login")}
                            className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                            `}
                        >
                            Entre com a suas Credenciais
                        </a>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex  h-screen justify-center items-center">
            <img
                className=" h-screen w-full object-cover  "
                src="https://cdn.wallpapersafari.com/9/57/PdJiN3.jpg"
                alt="Imagen da tela de Autentificação"
            />

            <div className=" fixed w-full sm:w-2/3 md:w-1/2 xl:w-1/3 ">
                <div className="bg-white/20 rounded-3xl m-5 py-1">
                    {carregando ? (
                        <div className="m-5">
                            <div className="flex items-center justify-center">
                                <Pacman />
                            </div>
                        </div>
                    ) : (
                        RenderizarForm()
                    )}
                </div>
            </div>
        </div>
    );
}
