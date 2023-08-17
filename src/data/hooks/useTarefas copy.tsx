import api from "@/service/api";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useTarefas() {
    const [tarefas, setTarefas] = useState<any[]>([]);

    async function obterTarefas() {
        try {
            const { auth_token: token } = parseCookies();
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
        obterTarefas();
    }, []);

    useEffect(() => {
        localStorage.setItem("@minhastarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    function adicionarTarefa(tarefa: string) {
        const idTarefa = Math.floor(Date.now() * Math.random()).toString(36);

        if (tarefa) {
            const dataAtual = new Date();

            const objetoTafefa = {
                id: idTarefa,
                nome: tarefa,
                concluido: false,
                data: dataAtual.toDateString(),
                favorito: false,
            };

            setTarefas([...tarefas, objetoTafefa]);
        }
    }

    function concluirTarefa(tarefa: string) {
        const indexTarefa = tarefas.findIndex((item) => item.id === tarefa);

        const tarefaSelecionada = tarefas[indexTarefa];
        tarefaSelecionada.concluido = !tarefaSelecionada.concluido;

        setTarefas(tarefas.filter((item) => item.id !== tarefa));

        setTarefas([...tarefas]);

        if (tarefaSelecionada.concluido === true) {
            toast.success("Tarefas concluida");
        }
    }

    function deletarTarefa(tarefa: string) {
        setTarefas(tarefas.filter((item) => item.id !== tarefa));
        toast.error("Tarefa deleteda");
    }

    function favoritar(tarefa: string) {
        const indexTarefa = tarefas.findIndex((item) => item.id === tarefa);

        const tarefaSelecionada = tarefas[indexTarefa];

        tarefaSelecionada.favorito = !tarefaSelecionada.favorito;

        setTarefas(tarefas.filter((item) => item.id !== tarefa));

        setTarefas([...tarefas]);
    }

    return {
        tarefas,
        adicionarTarefa,
        concluirTarefa,
        deletarTarefa,
        favoritar,
    };
}