import { SunMedium } from "lucide-react";
import DataAtual from "./DataAtual";

export default function HeaderMain({ nome, children }) {
  return (
    <div className="flex flex-col h-16 sm:h-20 gap-1">
      <div className="flex items-center gap-2">
        {children}
        <h1 className="text-xl font-semibold">{nome}</h1>
      </div>
      <DataAtual />
    </div>
  );
}
