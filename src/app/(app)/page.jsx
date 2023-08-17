"use client";
import { SunIcon } from "lucide-react";
import BarraAdicionar from "../../components/BarraAdicionar";
import HeaderMain from "../../components/HeaderMain";
import Tarefa from "../../components/Tarefas/Tarefa";
import useTarefas from "@/data/hooks/useTarefas";
import useAppData from "@/data/hooks/useAppData";

export default function Home() {
    const {
        adicionarTarefa,
        concluirTarefa,
        deletarTarefa,
        tarefas,
        favoritar,
    } = useTarefas();
    const { tema } = useAppData();

    const dia = new Date().getDate();
    const mes = new Date().getMonth() + 1;
    const ano = new Date().getFullYear();

    const dataAtual = `${dia}/${mes}/${ano}`;

    return (
        <>
            <HeaderMain nome="Meu Dia">
                <SunIcon
                    className={`${
                        tema === "dark" ? "text-zinc-400" : "text-zinc-700"
                    }`}
                />
            </HeaderMain>

            <BarraAdicionar addTarefa={adicionarTarefa} />

            {tarefas
                .filter(
                    (item) =>
                        !item.realizada &&
                        item.data_criacao === dataAtual &&
                        !item.isListaCompra
                )
                .map((item) => (
                    <Tarefa
                        key={item.id}
                        nome={item.nome}
                        concluirATarefa={() => concluirTarefa(item.id)}
                        deletarTarefas={() => deletarTarefa(item.id)}
                        data={item.data_criacao}
                        isfavorito={item.favorito}
                        favoritarTarefas={() => favoritar(item.id)}
                    />
                ))}

            {tarefas.filter(
                (item) =>
                    item.realizada &&
                    item.data_criacao === dataAtual &&
                    !item.isListaCompra
            ).length > 0 ? (
                <h1 className="mt-5">Concluidas</h1>
            ) : (
                ""
            )}

            {tarefas
                .filter(
                    (item) =>
                        item.realizada &&
                        item.data_criacao === dataAtual &&
                        !item.isListaCompra
                )
                .map((item) => (
                    <Tarefa
                        key={item.id}
                        nome={item.nome}
                        concluirATarefa={() => concluirTarefa(item.id)}
                        deletarTarefas={() => deletarTarefa(item.id)}
                        concluida
                    />
                ))}
        </>
    );
}
