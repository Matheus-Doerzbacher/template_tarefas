"use client";
import HeaderMain from "../../../components/HeaderMain";
import { Star } from "lucide-react";
import Tarefa from "@/components/Tarefas/Tarefa";
import useTarefas from "@/data/hooks/useTarefas";
import useAppData from "@/data/hooks/useAppData";
import ContainerLoading from '@/components/loading/ContainerLoading'

export default function Favoritos() {
    const {
        concluirTarefa,
        deletarTarefa,
        tarefas,
        favoritar,
        carregando,
    } = useTarefas();

    const { tema } = useAppData();

    function renderTarefas() {
        return (
            <>
                {tarefas
                    .filter(
                        (item) =>
                            item.realizada == false && item.favorito == true
                    )
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

                {tarefas.filter(
                    (item) => item.realizada === true && item.favorito === true
                ).length > 0 ? (
                    <h1 className="mt-5">Concluidas</h1>
                ) : (
                    ""
                )}

                {tarefas
                    .filter(
                        (item) =>
                            item.realizada === true && item.favorito === true
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
            <HeaderMain nome="Favoritos">
                <Star
                    className={`${
                        tema === "dark" ? "text-yellow-500" : "text-[#ceb900]"
                    }`}
                />
            </HeaderMain>

            {carregando ? <ContainerLoading/> : renderTarefas()}
        </>
    );
}
