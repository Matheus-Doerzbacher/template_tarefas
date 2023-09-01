"use client";
import useAppData from "@/data/hooks/useAppData";
import BotaoAlternarTema from '@/components/BotaoAlternarTema'
import {useAuthUser} from '@/data/context/AuthContext'
import BotaoLogout from "./BotãoLogout";

export default function Header() {
  const { tema, alternarTema } = useAppData();
  const {usuario} = useAuthUser()
  return (
    <header
      className={`flex px-7 py-1.5 h-12 w-full  justify-between shadow-xl
                ${tema === "dark" ? "bg-[#1b1a19] shadow-zinc-800" : "bg-zinc-50 border-zinc-300"}
    `}
    >
      <div className="flex flex-col items-center">
        <h1
          className={` font-semibold text-lg leading-none 
          ${tema === "dark" ? "text-zinc-200" : "text-zinc-900"}
        `}
        >
          Minhas Tarefas
        </h1>
        <span
          className={`font-light text-xs
          ${tema === "dark" ? "text-zinc-200" : "text-zinc-950"}
        `}
        >
          {/* By: Matheus Doerzbacher */}
          {usuario?.email}
        </span>
      </div>
      <div className="hidden sm:flex w-[9rem]"></div>
      <div className={`flex items-center gap-4`}>
      <BotaoAlternarTema tema={tema} alternarTema={alternarTema} />
      <BotaoLogout/>
      </div>
    </header>
  );
}
