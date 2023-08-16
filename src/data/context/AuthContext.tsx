"use client";
import { createContext, useEffect, useState } from "react";
import api from "@/service/api";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";

type AuthContextType = {
    isAutenticado?: boolean;
    singIn?: ({ email, senha }: SignInData) => Promise<void>;
    user?: string;
};

type SignInData = {
    email: string;
    senha: string;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState("");
    const isAutenticado = !!user;

    const router = useRouter();

    async function buscarUsuario(token){
        const {user}: any = await api.post("/usuario/token", {token});
        console.log(user)
    }

    useEffect(() => {
        const {'auth_token': token} = parseCookies()

        if(token){
            buscarUsuario(token) 
        }
    }, [])

    async function singIn({ email, senha }: SignInData) {
        const { data }: any = await api.post("/login", {
            email,
            senha,
        });

        const { token, nome } = data;

        setCookie(undefined, "auth_token", token, {
            maxAge: 60 * 60 * 60, // 60 horas?
        });

        setUser(nome);

        router.push("/");

        console.log(nome);
    }

    return (
        <AuthContext.Provider value={{ isAutenticado, singIn, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
