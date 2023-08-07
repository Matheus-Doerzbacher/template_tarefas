import useAppData from "@/data/hooks/useAppData";

export default function DataAtual() {

  const {tema} = useAppData()

  const dayName = new Array(
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado"
  );
  const monName = new Array(
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro"
  );
  const now = new Date();

  return (
    <span className={`text-xs font-light
      ${tema === 'dark' ? 'text-zinc-300' : 'text-zinc-800'}
    `}>{`${
      dayName[now.getDay()]
    }, ${now.getDate()} de ${monName[now.getMonth()]}`}</span>
  );
}
