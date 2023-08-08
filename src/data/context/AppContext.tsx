"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Tema = "dark" | "";

interface AppContextProps {
  tema?: Tema;
  alternarTema?: () => void;
}

const AppContext = createContext<AppContextProps>({});

export function AppProvider(props: any) {
  const [tema, setTema] = useState<Tema>("");

  const obterTema = useCallback(() => {
    const tema = localStorage.getItem("@temaTarefas");

    if (tema) {
      setTema(JSON.parse(tema));
    }
  }, []);

  useEffect(() => {
    obterTema();
  }, [obterTema]);

  useEffect(() => {
    localStorage.setItem("@temaTarefas", JSON.stringify(tema));
  }, [tema]);

  function alternarTema() {
    setTema(tema === "" ? "dark" : "");
  }

  return (
    <AppContext.Provider
      value={{
        tema,
        alternarTema,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
