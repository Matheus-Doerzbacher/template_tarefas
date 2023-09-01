"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Usuario from "@/model/User";
import Cookies from "js-cookie";
import { auth } from "@/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

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

    async function gerenciarSessao(user) {
        if (user) {
            Cookies.set("auth-minhas-tarefas", user.accessToken, {
                expires: 7,
            });
            const userNormalizado = await usuarioNormalizado(user);
            setUsuario(userNormalizado);
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
                await gerenciarSessao(user);
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
                await gerenciarSessao(user);
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
                await gerenciarSessao(user);
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

    useEffect(() => {
        const token = Cookies.get("auth-minhas-tarefas");
        if (token) {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    if (token === (await user.getIdToken())) {
                        gerenciarSessao(user);
                    } else {
                        Cookies.remove("auth-minhas-tarefas");
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
