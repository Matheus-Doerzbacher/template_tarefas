import api from "@/service/api";
import { data } from "autoprefixer";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useTarefas() {
    const { auth_token: token } = parseCookies();
    const [tarefas, setTarefas] = useState<any[]>([]);
    const [carregando, setCarregando] = useState<Boolean>(false);
    const [teste, setTeste] = useState<Boolean>(false);

    async function obterTarefas() {
        try {
            setTeste(true)
            const { data }: any = await api.get("/tarefa", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const tarefas = data.resultados;

            console.log('Obter Tarefas: ', tarefas)

            if (tarefas) {
                setTarefas(tarefas);
            }

            
        } catch (err) {
            setTarefas([])
            console.error(err.response.data);
        } finally {
            setTeste(false)
        }
    }

    useEffect(() => {  
        
        async function obterTarefasPrimeiro() {
            try {
                setCarregando(true)
                const { data }: any = await api.get("/tarefa", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const tarefas = data.resultados;
    
                if (tarefas) {
                    setTarefas(tarefas);
                }

                setCarregando(false)
            } catch (err) {
                console.error(err.response.data);
            } finally {
                setCarregando(false)
            }
        }

        obterTarefasPrimeiro();
    }, [token]);

    async function adicionarTarefa(tarefa: string) {
        try {
            setTeste(true)
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
            setTeste(true)
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
            setTeste(true)
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
            setTeste(true)
            console.log(idTarefa);
            await api.delete(`/tarefa/${idTarefa}`);
            toast.error(compras ? "Item deletado" : "Tarefa deleteda");
            obterTarefas();
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    async function favoritar(idTarefa: string) {
        try {
            setTeste(true)
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
        carregando,
        teste
    };
}
