/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import api from "@/service/api";
import AuthInput from "@/components/AuthInput";
import useAuthData from "@/data/hooks/useAuthData";

export default function Autentificacao() {
    const [modo, setModo] = useState<"login" | "cadastro">("login");
    const [erro, setErro] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    const {singIn} = useAuthData()
    

    const fazerLogin = async () => {
        if (modo === "login") {
            try{
                await singIn({email, senha})
            } catch(err){
                setErro(err)
            }

            setEmail("");
            setSenha("");
        } else {
            await api
                .post("/usuario", {
                    nome,
                    email,
                    senha,
                })
                .then((res) => {
                    console.log(res.data);
                    setEmail("");
                    setSenha("");
                    setNome("");
                })
                .catch((err) => {
                    console.error(err.response.data);
                });
        }
    };

    return (
        <div className="flex  h-screen justify-center items-center ">
            <div className=" hidden md:block md:w-1/2 lg:w-2/3">
                <img
                    className=" h-screen w-full object-cover  "
                    src="https://img.freepik.com/fotos-gratis/caderno-plano-com-lista-de-tarefas-na-mesa_23-2148938724.jpg?w=2000"
                    alt="Imagen da tela de Autentificação"
                />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
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

                {modo !== "login" &&
                    <AuthInput
                        label="Nome"
                        tipo="text"
                        valor={nome}
                        valorMudou={setNome}
                        obrigatorio
                        fazerLogin={fazerLogin}
                    />
                }

                <AuthInput
                    label="Email"
                    tipo="email"
                    valor={email}
                    valorMudou={setEmail}
                    obrigatorio
                    fazerLogin={fazerLogin}
                />
                <AuthInput
                    label="Senha"
                    tipo="password"
                    valor={senha}
                    valorMudou={setSenha}
                    obrigatorio
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
                    <p className="mt-8">
                        Novo por aqui?
                        <a
                            onClick={() => setModo("cadastro")}
                            className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}
                        >
                            {" "}
                            Crie uma conta gratuitamente
                        </a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Ja faz parte da nossa comunidade?
                        <a
                            onClick={() => setModo("login")}
                            className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}
                        >
                            {" "}
                            Entre com a suas Credenciais
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}
