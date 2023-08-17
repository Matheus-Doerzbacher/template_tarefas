"use client";
import BarraAdicionar from "@/components/BarraAdicionar";
import HeaderMain from "@/components/HeaderMain";
import { ShoppingCart } from "lucide-react";
import Tarefa from "@/components/Tarefas/Tarefa";
import useAppData from "@/data/hooks/useAppData";
import useTarefas from "@/data/hooks/useTarefas";

export default function Compras() {
    const {
        concluirTarefa,
        deletarTarefa,
        tarefas,
        carregando,
        adicionarItemLista,
    } = useTarefas();

    const { tema } = useAppData();

    function renderTarefas() {
        return (
            <>
                {tarefas
                    .filter((item) => !item.realizada && item.isListaCompra)
                    .map((item) => (
                        <Tarefa
                            key={item.id}
                            nome={item.nome}
                            concluirATarefa={() =>
                                concluirTarefa(item.id, true)
                            }
                            deletarTarefas={() => deletarTarefa(item.id, true)}
                            compras
                        />
                    ))}

                {tarefas.filter((item) => item.realizada && item.isListaCompra)
                    .length > 0 ? (
                    <h1 className="mt-5">Tá no carrinho</h1>
                ) : (
                    ""
                )}

                {tarefas
                    .filter((item) => item.realizada && item.isListaCompra)
                    .map((item) => (
                        <Tarefa
                            key={item.id}
                            nome={item.nome}
                            concluirATarefa={() =>
                                concluirTarefa(item.id, true)
                            }
                            deletarTarefas={() => deletarTarefa(item.id, true)}
                            concluida
                        />
                    ))}
            </>
        );
    }

    return (
        <>
            <HeaderMain nome="Compras">
                <ShoppingCart
                    className={`${
                        tema === "dark" ? "text-star-color" : "text-[#cc6f81]"
                    }`}
                />
            </HeaderMain>
            <BarraAdicionar addTarefa={adicionarItemLista} compras />

            {carregando ? <h1>Carregando...</h1> : renderTarefas()}
        </>
    );
}
