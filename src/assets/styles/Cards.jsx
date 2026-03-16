import { CircleArrowRightIcon } from "lucide-react";

export default function Cards(props) {
  return (
    <a
      href={props.href}
      className="flex flex-col text-center bg-white dark:bg-[#020617] md:w-72 md:h-72 w-40 h-40 
                 md:text-2xl text-lg justify-center gap-2 md:gap-6 
                 rounded-lg shadow-lg dark:shadow-none p-4 items-center 
                 hover:scale-105 transition-transform"
    >
      <div className="w-14 h-14 flex items-center justify-center">
        {props.item}
      </div>

      <h3 className="text-lg md:text-xl text-[#0055dd71] dark:text-blue-400 font-bold">
        {props.texto}
      </h3>

      <button className="flex items-center dark:text-blue-300 text-textColor gap-2 hover:bg-[#0055dd71]/80 hover:text-white bg-azulClarinhoColor/20 dark:bg-blue-900/40 dark:bg-blue-900/40font-asap md:text-xl text-lg font-bold rounded-md px-4">
        Prosseguir <CircleArrowRightIcon />
      </button>
    </a>
  );
}
