import { useAuthUser } from "@/data/context/AuthContext";
import { LogOut } from "lucide-react";


export default function BotaoLogout(){

    const {logOut} = useAuthUser()


    return (
        <div className="flex gap-2 text-red-500 cursor-pointer" onClick={logOut}>
                <span className="hidden md:flex">Sair</span>
                <LogOut/>
            </div>
    )
}