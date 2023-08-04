"use client";
import { Check, Star, Trash, Trash2 } from "lucide-react";

export default function Tarefa({
  nome,
  deletarTarefas,
  concluirATarefa,
  concluida,
  isfavorito,
  favoritarTarefas,
  compras,
}) {

  function deletar() {
    deletarTarefas();
  }

  function concluir(){
    concluirATarefa();
  }

  function favoritar(){
    favoritarTarefas();
  }

  return (
    <div
      className={`
            flex items-center mt-2 w-full min-h-[48px] py-1  rounded justify-between
            ${
              concluida
                ? "bg-[#161615] hover:bg-[#242322] text-zinc-500"
                : "bg-[#252423] hover:bg-[#323130]"
            }
        `}
    >
      <div className="flex items-center">
        <div>
          <button className={`rounded-full`} onClick={concluir}>
            <div
              className={`h-5 w-5 border-2 rounded-full group mx-4 flex items-center justify-center ${
                concluida && "border-zinc-500"
              }`}
            >
              <Check
                size={13}
                className={`invisible group-hover:visible pointer-events-none `}
              />
            </div>
          </button>
        </div>

        <span className={`text-sm`}>{nome}</span>
      </div>

      {!compras && 
        <div>
          {!concluida ? (
            <div className="mr-2 cursor-pointer" onClick={favoritar}>
                  <Star size={20} className={` ${ isfavorito ? "text-zinc-100" : "text-zinc-600"} transition-colors duration-300
                `} />
            </div>
        ) : (
          <div className="mr-2 cursor-pointer" onClick={deletar}>
                  <Trash2 size={20} className={` hover:text-red-800 transition-colors duration-300
                `} />
            </div>
        )}
        </div>
      }
    </div>
  );
}
