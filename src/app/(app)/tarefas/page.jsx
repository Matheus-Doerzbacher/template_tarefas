"use client";
import BarraAdicionar from "@/components/BarraAdicionar";
import HeaderMain from "@/components/HeaderMain";
import Tarefa from "@/components/Tarefas/Tarefa";
import { FileText, HomeIcon } from "lucide-react";
import useTarefas from "../../../data/hooks/useTarefas";
import useAppData from "@/data/hooks/useAppData";

export default function Tarefas() {
  const { adicionarTarefa, concluirTarefa, deletarTarefa, tarefas, favoritar } =
    useTarefas();

    const {tema} = useAppData()

  return (
    <>
      <HeaderMain nome="Tarefas">
        <FileText className={`${tema === 'dark' ? "text-home-color" : "text-[#507464]"}`}/>
      </HeaderMain >
      <BarraAdicionar addTarefa={adicionarTarefa} />

      {tarefas
        .filter((item) => item.concluido === false)
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
