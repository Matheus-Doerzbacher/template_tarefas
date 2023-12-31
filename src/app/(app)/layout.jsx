"use client"
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "@/data/context/AppContext";
import useAppData from "@/data/hooks/useAppData";

export default function Layout({ children }) {
  const {tema} = useAppData()

  return (
        <body className={`flex  flex-col w-screen h-screen 
          ${tema === 'dark' ? "bg-[#11100F] text-zinc-200" : "bg-zinc-100 text-[#11100F]"}
        `}>
          <Header />
          <main className="flex flex-1 w-full">
            <Sidebar />
            <div className="flex flex-1 flex-col m-3 sm:m-7 overflow-hidden">
              {children}
            </div>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={tema === 'dark' ? 'dark' : "light"}
          />
        </body>
  );
}
