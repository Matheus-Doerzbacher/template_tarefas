"use client";

import {
    SunMedium,
    ShoppingCart,
    Menu,
    Star,
    FileText,
} from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";
import useAppData from "@/data/hooks/useAppData";

export default function Sidebar() {
    const { tema } = useAppData();
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
            className={`flex flex-col sm:py-7  h-full justify-between
        ${esconderMenu ? "w-18" : "sm:w-48 lg:w-72"}
        ${tema === "dark" ? "bg-[#252423]" : "bg-zinc-200"}
      `}
        >
            <div>
                <button
                    onClick={hiddenMenu}
                    className="ml-6 mb-5 hidden sm:flex"
                >
                    <Menu
                        size={20}
                        className={`${tema === "dark" ? "" : "text-black"}`}
                    />
                </button>
                <SidebarMenu
                    nome="Meu Dia"
                    href="/"
                    esconderMenu={esconderMenu}
                    icon={
                        <SunMedium
                            size={20}
                            className={`${
                                tema === "dark"
                                    ? "text-zinc-400"
                                    : "text-zinc-700"
                            }`}
                        />
                    }
                />

                <SidebarMenu
                    nome="Tarefas"
                    href="/tarefas"
                    esconderMenu={esconderMenu}
                    icon={
                        <FileText
                            size={20}
                            className={`${
                                tema === "dark"
                                    ? "text-home-color"
                                    : "text-[#507464]"
                            }`}
                        />
                    }
                />

                <SidebarMenu
                    nome="Favoritos"
                    href="/favoritos"
                    esconderMenu={esconderMenu}
                    icon={
                        <Star
                            size={20}
                            className={`${
                                tema === "dark"
                                    ? "text-yellow-500"
                                    : "text-[#ceb900]"
                            }`}
                        />
                    }
                />

                <SidebarMenu
                    nome="Compras"
                    href="/compras"
                    esconderMenu={esconderMenu}
                    icon={
                        <ShoppingCart
                            size={20}
                            className={`${
                                tema === "dark"
                                    ? "text-star-color"
                                    : "text-[#cc6f81]"
                            }`}
                        />
                    }
                />
            </div>
        </aside>
    );
}
