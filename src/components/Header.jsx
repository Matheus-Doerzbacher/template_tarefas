import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex px-7 py-1.5 h-12 w-full bg-[#1b1a19] border-b border-[#484644] justify-between">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-lg leading-none ">Minhas Tarefas</h1>
        <span className="font-light text-xs ">By: Matheus Doerzbacher</span>
      </div>
      <div className="hidden sm:flex w-[9rem]"></div>
    </header>
  );
}
