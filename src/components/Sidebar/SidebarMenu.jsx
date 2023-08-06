import {
  Search,
  SunMedium,
  ShoppingCart,
  Home as HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import useAppData from "@/data/hooks/useAppData";

export default function SidebarMenu({ nome, href, icon, esconderMenu }) {
  const {tema} = useAppData()
  const url = usePathname();
  return (
    <>
      <Link
        key={nome}
        href={href}
        className={`flex items-center h-11 
                ${url === href
                    ? (tema === 'dark' ? "bg-[#3b3a39] hover:bg-[#3b3a39]" : "bg-zinc-400 hover:bg-zinc-400")
                    : "hover:bg-[#323130] "}
            `}
      >
        <div
          className={`h-full w-0.5 border-2 rounded-full border-[#55a4f0] bg-[#55a4f0] 
                    ${url === href ? "visible" : "invisible"}`}
        ></div>
        <div className="flex items-center px-5 gap-4">
          {icon}
          {esconderMenu ? (
            ""
          ) : (
            <span className={`text-sm ${tema === 'dark' ? "text-white" : "text-black"} hidden sm:flex`}>{nome}</span>
          )}
        </div>
      </Link>
    </>
  );
}
