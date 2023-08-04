"use client";
import BarraAdicionar from "@/components/BarraAdicionar";
import HeaderMain from "../../components/HeaderMain";
import { ShoppingCart } from "lucide-react";
import useListaCompras from "@/data/hooks/useListaCompras";
import Tarefa from "@/components/Tarefas/Tarefa";

export default function Compras() {
  const { lista, adicionarTarefa, concluirTarefa, deletarTarefa } =
    useListaCompras();

  return (
    <>
      <HeaderMain nome="Compras">
        <ShoppingCart className="text-star-color"/>
      </HeaderMain>
      <BarraAdicionar addTarefa={adicionarTarefa} compras />

      {lista
        .filter((item) => item.concluido === false)
        .map((item) => (
          <Tarefa
            key={item.id}
            nome={item.nome}
            concluirATarefa={() => concluirTarefa(item.id)}
            data={item.data}
            isfavorito={item.favorito}
            favoritarTarefas={() => favoritar(item.id)}
            compras
          />
        ))}

      {lista.filter((item) => item.concluido === true).length > 0 ? (
        <h1 className="mt-5">Tá no carrinho</h1>
      ) : (
        ""
      )}

      {lista
        .filter((item) => item.concluido === true)
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
