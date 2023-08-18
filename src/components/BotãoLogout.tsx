import Cookie from "js-cookie";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";


export default function BotaoLogout(){
    const router = useRouter()

    function logout() {
        Cookie.remove('auth_token')
        router.push('/login')
      }


    return (
        <div className="flex gap-2 text-red-500 cursor-pointer" onClick={logout}>
                <span className="hidden md:flex">Sair</span>
                <LogOut/>
            </div>
    )
}