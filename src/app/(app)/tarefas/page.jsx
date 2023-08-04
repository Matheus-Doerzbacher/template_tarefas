"use client";
import BarraAdicionar from "@/components/BarraAdicionar";
import HeaderMain from "@/components/HeaderMain";
import Tarefa from "@/components/Tarefas/Tarefa";
import { HomeIcon } from "lucide-react";
import useTarefas from "../../../data/hooks/useTarefas";

export default function Tarefas() {
  const { adicionarTarefa, concluirTarefa, deletarTarefa, tarefas, favoritar } =
    useTarefas();

  return (
    <>
      <HeaderMain nome="Tarefas">
        <HomeIcon className="text-home-color"/>
      </HeaderMain>
      <BarraAdicionar addTarefa={adicionarTarefa} />

      {tarefas
        .filter((item) => item.concluido === false)
        .map((item) => (
          <Tarefa
            key={item.id}
            nome={item.nome}
            concluirATarefa={() => concluirTarefa(item.id)}
            data={item.data}
            isfavorito={item.favorito}
            favoritarTarefas={() => favoritar(item.id)}
          />
        ))}

      {tarefas.filter((item) => item.concluido === true).length > 0 ? (
        <h1 className="mt-5">Concluidas</h1>
      ) : (
        ""
      )}

      {tarefas
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
