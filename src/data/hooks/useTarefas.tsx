import api from "@/service/api";
import { data } from "autoprefixer";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useTarefas() {
    const { auth_token: token } = parseCookies();
    const [tarefas, setTarefas] = useState<any[]>([]);

    async function obterTarefas() {
        try {
            const { data }: any = await api.get("/tarefa", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const tarefas = data.resultados;

            if (tarefas) {
                setTarefas(tarefas);
            }
        } catch (err) {
            console.error(err.response.data);
        }
    }

    useEffect(() => {  
        
        async function obterTarefasPrimeiro() {
            try {
                const { data }: any = await api.get("/tarefa", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const tarefas = data.resultados;
    
                if (tarefas) {
                    setTarefas(tarefas);
                }
            } catch (err) {
                console.error(err.response.data);
            }
        }

        obterTarefasPrimeiro();
    }, [token]);

    async function adicionarTarefa(tarefa: string) {
        try {
            await api.post(
                "/tarefa",
                {
                    nome: tarefa,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            obterTarefas();
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    async function adicionarItemLista(tarefa: string) {
        try {
            await api.post(
                "/tarefa",
                {
                    nome: tarefa,
                    isListaCompra: true,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            obterTarefas();
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    async function concluirTarefa(idTarefa: string, compras: Boolean = false) {
        try {
            api.patch(`/tarefa/realizar/${idTarefa}`);

            const tarefaRealizada = await api.get(`/tarefa/${idTarefa}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const realizada = tarefaRealizada.data.realizada;

            obterTarefas();

            if (realizada !== true) {
                toast.success(compras ? "Item no carrinho" :"Tarefas concluida");
            }
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    async function deletarTarefa(idTarefa: string, compras: Boolean = false) {
        try {
            console.log(idTarefa);
            await api.delete(`/tarefa/${idTarefa}`);
            obterTarefas();
            toast.error(compras ? "Item deletado" : "Tarefa deleteda");
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    async function favoritar(idTarefa: string) {
        try {
            await api.patch(`/tarefa/favorito/${idTarefa}`);
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
    };
}
