import Image from "next/image";
import Inicio from "../components/Pages/Incio";
import funcion from "../components/Pages/FuncionPDFS";
import FuncionPDF from "../components/Pages/FuncionPDFS";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Inicio />
      <FuncionPDF />
    </div>
  );
}
