"use client";
import BarraAdicionar from "@/components/BarraAdicionar";
import HeaderMain from "@/components/HeaderMain";
import Tarefa from "@/components/Tarefas/Tarefa";
import { FileText, HomeIcon } from "lucide-react";
import useTarefas from "../../../data/hooks/useTarefas";
import useAppData from "@/data/hooks/useAppData";
import ContainerLoading from "@/components/loading/ContainerLoading";
import { SunIcon } from "lucide-react";

export default function Tarefas() {
    const {
        adicionarTarefa,
        concluirTarefa,
        deletarTarefa,
        tarefas,
        favoritar,
        carregando,
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
                    .filter((item) => 
                        !item.realizada &&
                        item.data_criacao === dataAtual &&
                        !item.isListaCompra)
                    .map((item) => (
                        <Tarefa
                            key={item.id}
                            nome={item.nome}
                            concluirATarefa={() => concluirTarefa(item.id)}
                            deletarTarefas={() => deletarTarefa(item.id)}
                            data={item.data}
                            isfavorito={item.favorito}
                            favoritarTarefas={() => favoritar(item.id)}
                        />
                    ))}

                {tarefas.filter((item) => 
                    item.realizada &&
                    item.data_criacao === dataAtual &&
                    !item.isListaCompra
                )
                    .length > 0 ? (
                    <h1 className="mt-5">Concluidas</h1>
                ) : (
                    ""
                )}

                {tarefas
                    .filter((item) => 
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

    return (
        <>
            <HeaderMain nome="Meu Dia">
                <SunIcon
                    className={`${
                        tema === "dark" ? "text-home-color" : "text-[#507464]"
                    }`}
                />
            </HeaderMain>
            <BarraAdicionar addTarefa={adicionarTarefa} />

            {carregando ? <ContainerLoading/> : renderTarefas()}

            {teste ? <ContainerLoading/> : ""}
        </>
    );
}
