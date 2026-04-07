import { CircleArrowRightIcon } from "lucide-react";

export default function Cards(props) {
  return (
    <a
      href={props.href}
      className="flex flex-col text-center bg-white dark:bg-[#020617] md:w-64 md:h-48 w-40 h-40 
                 md:text-md text-sm justify-center gap-2 md:gap-4
                 rounded-lg shadow-lg dark:shadow-none p-4 items-center 
                 hover:scale-105 transition-transform"
    >
      <div className="w-14 h-14 flex items-center justify-center">
        {props.item}
      </div>

      <h3 className="text-sm md:text-md text-[#0055dd71] dark:text-blue-400 font-bold">
        {props.texto}
      </h3>

      <button className="flex items-center dark:text-blue-300 text-textColor gap-2 hover:bg-[#0055dd71]/20  bg-azulClarinhoColor/20 dark:bg-blue-900/40 font-asap md:text-md text-sm font-bold rounded-md px-4 py-1">
        Prosseguir <CircleArrowRightIcon  className="w-4 h-4"/>
      </button>
    </a>
  );
}
