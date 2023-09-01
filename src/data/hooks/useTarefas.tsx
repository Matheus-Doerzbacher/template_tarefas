/* eslint-disable react-hooks/exhaustive-deps */
import { auth, db } from "@/firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    updateDoc,
} from "firebase/firestore";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthUser } from "@/data/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function dataAtual() {
    const dia = new Date().getDate();
    const mes = new Date().getMonth() + 1;
    const ano = new Date().getFullYear();

    const data = `${dia}/${mes}/${ano}`;

    return data;
}

export default function useTarefas() {
    const { auth_token: token } = parseCookies();
    const [tarefas, setTarefas] = useState<any[]>([]);
    const [carregando, setCarregando] = useState<Boolean>(false);
    const [teste, setTeste] = useState<Boolean>(false);

    const {usuario} = useAuthUser()

    const idUsuario = Cookies.get('user-minhas-tarefas')

    const obterTarefas = async () => {
        try {
            const q = query(collection(db, "tarefas"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let tarefasArr = [];

                querySnapshot.forEach((doc) => {
                    if (doc.data().usuario === idUsuario) {
                        tarefasArr.push({ ...doc.data(), id: doc.id });
                    }
                });
                setTarefas(tarefasArr);
            });
            return () => unsubscribe();
        } catch (err) {
            setTarefas([]);
            console.error(err.message);
        } finally {
            setTeste(false);
        }
    };

    useEffect(() => {
                const q = query(collection(db, "tarefas"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    let tarefasArr = [];
                    
                    querySnapshot.forEach((doc) => {
                        if (doc.data().usuario === idUsuario) {
                            tarefasArr.push({ ...doc.data(), id: doc.id });
                        }
                    });
                    setTarefas(tarefasArr);
                });
                return () => unsubscribe();
    }, []);

    async function adicionarTarefa(tarefa: string) {
        try {
            await addDoc(collection(db, "tarefas"), {
                nome: tarefa,
                realizada: false,
                favorito: false,
                data_criacao: dataAtual(),
                isListaCompra: false,
                usuario: usuario.id,
            });

            obterTarefas();
        } catch (err) {
            console.log(err.message);
        }
    }

    async function adicionarItemLista(tarefa: string) {
        try {
            await addDoc(collection(db, "tarefas"), {
                nome: tarefa,
                realizada: false,
                favorito: false,
                data_criacao: dataAtual(),
                isListaCompra: true,
                usuario: usuario.id,
            });

            obterTarefas();
        } catch (err) {
            console.log(err.message);
        }
    }

    async function concluirTarefa(tarefa: any, compras: Boolean = false) {
        try {
            setTeste(true);

            await updateDoc(doc(db, "tarefas", tarefa.id), {
                realizada: !tarefa.realizada,
            });

            obterTarefas();
            if (tarefa.realizada === false) {
                toast.success(
                    compras ? "Item no carrinho" : "Tarefas concluida"
                );
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    async function deletarTarefa(tarefa: any, compras: Boolean = false) {
        try {
            setTeste(true);
            await deleteDoc(doc(db, "tarefas", tarefa.id));
            toast.error(compras ? "Item deletado" : "Tarefa deleteda");
            obterTarefas();
        } catch (err) {
            console.log(err.message);
        }
    }

    async function favoritar(tarefa: any) {
        try {
            setTeste(true);
            await updateDoc(doc(db, "tarefas", tarefa.id), {
                favorito: !tarefa.favorito,
            });

            obterTarefas();
        } catch (err) {
            console.log(err.message);
        }
    }

    return {
        tarefas,
        adicionarTarefa,
        concluirTarefa,
        deletarTarefa,
        favoritar,
        adicionarItemLista,
        carregando,
        teste,
    };
}
