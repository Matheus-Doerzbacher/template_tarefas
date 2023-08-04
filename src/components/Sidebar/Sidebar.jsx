"use client";

import {
  Search,
  SunMedium,
  ShoppingCart,
  Home as HomeIcon,
  Menu,
  Star,
} from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [selecionado, setSelecionado] = useState("/");
  const [esconderMenu, setEsconderMenu] = useState(false);

  function hiddenMenu() {
    if (esconderMenu) {
      setEsconderMenu(false);
    } else {
      setEsconderMenu(true);
    }
  }

  return (
    <aside
      className={`flex flex-col sm:py-7 bg-[#252423] h-full ${
        esconderMenu ? "w-18" : "sm:w-48 lg:w-72"
      }`}
    >
      <button onClick={hiddenMenu} className="ml-6 mb-5 hidden sm:flex">
        <Menu size={20} />
      </button>
      <SidebarMenu
        nome="Meu Dia"
        href="/"
        esconderMenu={esconderMenu}
        icon={<SunMedium size={20} className="text-zinc-400" />}
      />

      <SidebarMenu
        nome="Tarefas"
        href="/tarefas"
        esconderMenu={esconderMenu}
        icon={<HomeIcon size={20} className="text-home-color" />}
      />

      <SidebarMenu
        nome="Favoritos"
        href="/favoritos"
        esconderMenu={esconderMenu}
        icon={<Star size={20} className="text-yellow-500" />}
      />
      
      <SidebarMenu
        nome="Compras"
        href="/compras"
        esconderMenu={esconderMenu}
        icon={<ShoppingCart size={20} className="text-star-color" />}
      />

    </aside>
  );
}
