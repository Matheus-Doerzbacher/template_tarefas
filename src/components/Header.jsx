"use client";
import useAppData from "@/data/hooks/useAppData";
import { Search } from "lucide-react";
import BotaoAlternarTema from '@/components/BotaoAlternarTema'
import useAuthData from "@/data/hooks/useAuthData";

export default function Header() {
  const { tema, alternarTema } = useAppData();
  const {user} = useAuthData()
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
          By: Matheus Doerzbacher
        </span>
      </div>
      <div>
        <h1 className="text-zinc-50">{user}</h1>
      </div>
      <div className="hidden sm:flex w-[9rem]"></div>
      <BotaoAlternarTema tema={tema} alternarTema={alternarTema} />
    </header>
  );
}
