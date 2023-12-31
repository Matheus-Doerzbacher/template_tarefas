"use client";
import { FileText, SunIcon } from "lucide-react";
import BarraAdicionar from "../../components/BarraAdicionar";
import HeaderMain from "../../components/HeaderMain";
import Tarefa from "../../components/Tarefas/Tarefa";
import useTarefas from "@/data/hooks/useTarefas";
import useAppData from "@/data/hooks/useAppData";
import ContainerLoading from "@/components/loading/ContainerLoading";

export default function Home() {
    const {
        adicionarTarefa,
        concluirTarefa,
        deletarTarefa,
        tarefas,
        carregando,
        favoritar,
        teste
    } = useTarefas();
    const { tema } = useAppData();

    const dia = new Date().getDate();
    const mes = new Date().getMonth() + 1;
    const ano = new Date().getFullYear();

    const dataAtual = `${dia}/${mes}/${ano}`;

    function renderTarefas() {
        return (
            <>
                {tarefas
                    .filter(
                        (item) => !item.realizada && !item.isListaCompra
                    )
                    .map((item) => (
                        <Tarefa
                            key={item.id}
                            nome={item.nome}
                            concluirATarefa={() => concluirTarefa(item)}
                            deletarTarefas={() => deletarTarefa(item)}
                            data={item.data_criacao}
                            isfavorito={item.favorito}
                            favoritarTarefas={() => favoritar(item)}
                        />
                    ))}

                {tarefas.filter(
                    (item) => item.realizada && !item.isListaCompra
                ).length > 0 ? (
                    <h1 className="mt-5">Concluidas</h1>
                ) : (
                    ""
                )}

                {tarefas
                    .filter(
                        (item) => item.realizada && !item.isListaCompra
                    )
                    .map((item) => (
                        <Tarefa
                            key={item.id}
                            nome={item.nome}
                            concluirATarefa={() => concluirTarefa(item)}
                            deletarTarefas={() => deletarTarefa(item)}
                            concluida
                        />
                    ))}
            </>
        );
    }

    return (
        <>
            <HeaderMain nome="Tarefas">
                <FileText
                    className={`${
                        tema === "dark" ? "text-zinc-400" : "text-zinc-700"
                    }`}
                />
            </HeaderMain>

            <BarraAdicionar addTarefa={adicionarTarefa} />

            {carregando ? <ContainerLoading/> : renderTarefas()}

            {teste ? <ContainerLoading/> : ""}
        </>
    );
}
