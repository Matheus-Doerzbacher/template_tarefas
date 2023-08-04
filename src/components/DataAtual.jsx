export default function DataAtual() {
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
    <span className=" text-xs text-zinc-300 font-light">{`${
      dayName[now.getDay()]
    }, ${now.getDate()} de ${monName[now.getMonth()]}`}</span>
  );
}
