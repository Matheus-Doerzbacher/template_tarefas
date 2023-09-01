import { auth, db } from "@/firebase";
import api from "@/service/api";
import { User, UserCredential, onAuthStateChanged } from "firebase/auth";
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
import "react-toastify/dist/ReactToastify.css";

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
    const [user, setUser] = useState<User>(null);

    async function obterTarefas() {
        try {
            
            const q = query(collection(db, "tarefas"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let tarefasArr = [];
                querySnapshot.forEach((doc) => {
                        tarefasArr.push({ ...doc.data(), id: doc.id });
                });
                    setTarefas(tarefasArr);
            });
            return () => unsubscribe();
        } catch (err) {
            setTarefas([]);
            console.error(err.response.data);
        } finally {
            setTeste(false);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => setUser(user));
            
            const q = query(collection(db, "tarefas"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let tarefasArr = [];
                querySnapshot.forEach((doc) => {
                        tarefasArr.push({ ...doc.data(), id: doc.id });
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
                usuario: user.uid,
            });

            obterTarefas();
        } catch (err) {
            console.log(err.response.data.message);
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
                usuario: user.uid,
            });

            obterTarefas();
        } catch (err) {
            console.log(err.response.data.message);
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
            console.log(err.response.data.message);
        }
    }

    async function deletarTarefa(tarefa: any, compras: Boolean = false) {
        try {
            setTeste(true);
            await deleteDoc(doc(db, "tarefas", tarefa.id));
            toast.error(compras ? "Item deletado" : "Tarefa deleteda");
            obterTarefas();
        } catch (err) {
            console.log(err.response.data.message);
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
            console.log(err.response.data);
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
