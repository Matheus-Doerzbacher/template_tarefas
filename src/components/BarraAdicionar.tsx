"use client";
import { useEffect, useState } from "react";
import { Circle, Plus } from "lucide-react";
import useAppData from "@/data/hooks/useAppData";

interface BarraAdicionarProps{
  addTarefa: (tarefa: string) => void,
  compras?: boolean
}


export default function BarraAdicionar({ addTarefa, compras }: BarraAdicionarProps) {
  
  const {tema} = useAppData()
  const [inFocus, setInFocus] = useState("");
  const [tarefa, setTarefa] = useState("");

  return (
    <div className={`w-full h-12  flex items-center rounded mb-3
      ${tema === 'dark' ? 'bg-[#252423]' : 'bg-zinc-300'}
    `}>
      <label id="barra">
        <button
          className={`px-5 py-3 ${tema === 'dark' ? 'text-[#55a4f0]' : 'text-[#004e97]'}`}
          onClick={() => {
            addTarefa(tarefa), setTarefa("");
          }}
        >
          {!inFocus ? (
            <Plus size={23} className="" />
          ) : (
            <Circle size={23} className={`${tema === 'dark' ? "hover:text-[#8ec7ff]" : "hover:text-[#0079f1]"}`} />
          )}
        </button>
      </label>

      <input
        id="barra"
        type="text"
        placeholder={compras ? "Adicinar um item" : "Adicionar uma tarefa"}
        value={tarefa}
        onKeyUp={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            addTarefa(tarefa);
            setTarefa("");
          }
        }}
        onChange={(i) => {
          setInFocus(i.target.value), setTarefa(i.target.value);
        }}
        className={`w-full h-full pr-2 bg-transparent outline-none 
          ${tema === 'dark' 
            ? "placeholder:text-[#55a4f0] focus:placeholder:text-zinc-100" 
            : "placeholder:text-[#004e97] focus:placeholder:text-zinc-800"}
        `}
        autoComplete="off"
      />
    </div>
  );
}
