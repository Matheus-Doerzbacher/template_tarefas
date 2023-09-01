"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Usuario from "@/model/User";
import Cookies from "js-cookie";
import { auth } from "@/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import useTarefas from "../hooks/useTarefas";

interface AuthContextProps {
    usuario?: Usuario;
    carregando?: boolean;
    login?: (email: string, senha: string) => Promise<void>;
    cadastrar?: (email: string, senha: string) => Promise<void>;
    loginGoogle?: () => Promise<void>;
    logOut?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

const usuarioNormalizado = async (user) => {
    if (user) {
        const token = await user.getIdToken();
        return {
            id: user.uid,
            nome: user.displayName,
            email: user.email,
            token,
            provedor: user.providerData[0].providerId,
            imagemUrl: user.photoURL,
        };
    }
};

export function AuthProvider({ children }: any) {
    const [carregando, setCarregando] = useState(true);
    const [usuario, setUsuario] = useState<Usuario>();

    const route = useRouter();

    useEffect(() => {
        const token = Cookies.get("auth-minhas-tarefas");
        if (token) {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const usuario = await usuarioNormalizado(user)
                    
                    if (token === usuario.token) {
                        await gerenciarSessao(usuario);
                    } else {
                        Cookies.remove("auth-minhas-tarefas");
                        Cookies.remove("user-minhas-tarefas");
                        route.push("/login");
                        return false;
                    }
                } else {
                    console.log("No authentication");
                    route.push("/login");
                }
            });
        }
    }, [route]);

    async function gerenciarSessao(usuario) {
        if (usuario) {
            Cookies.set("auth-minhas-tarefas", usuario.token, {
                expires: 7,
            });
            Cookies.set("user-minhas-tarefas", usuario.id?? 'teste', {
                expires: 7,
            });
            setUsuario(usuario);
        }
    }

    async function login(email, senha) {
        try {
            setCarregando(true);
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                senha
            );

            if (user) {
                const usuario = await usuarioNormalizado(user)
                await gerenciarSessao(usuario);
            }

            route.push("/");
        } catch (err) {
            throw new Error(err.message);
        } finally {
            setCarregando(false);
        }
    }

    async function cadastrar(email, senha) {
        try {
            setCarregando(true);
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                senha
            );
            if (user) {
                const usuario = await usuarioNormalizado(user)
                await gerenciarSessao(usuario);
            }
            route.push("/");
        } catch (err) {
            throw new Error(err.message);
        } finally {
            setCarregando(false);
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true);
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            if (user) {
                const usuario = await usuarioNormalizado(user)
                await gerenciarSessao(usuario);
            }

            route.push("/");
        } finally {
            setCarregando(false);
        }
    }

    async function logOut() {
        try {
            setCarregando(true);
            await signOut(auth);
            Cookies.remove("auth-minhas-tarefas");
            setUsuario(null);
            route.push("/login");
        } finally {
            setCarregando(false);
        }
    }

    

    return (
        <AuthContext.Provider
            value={{
                login,
                cadastrar,
                usuario,
                logOut,
                carregando,
                loginGoogle,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthUser = () => {
    return useContext(AuthContext);
};
