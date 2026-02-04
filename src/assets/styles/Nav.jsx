import { useState } from "react";
import ALink from "../styles/ALink.jsx";
import {
  BoltIcon,
  BotMessageSquareIcon,
  CircleUserRoundIcon,
  HouseIcon,
  LogOutIcon,
} from "lucide-react";

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex justify-center">
      <nav className="grid grid-cols-3 items-center h-[5vh] w-full md:w-[70%]">
        
        {/* LOGO — esquerda */}
        <a href="/" className="justify-self-start">
          <img
            src="../../public/LogoSenaiAzul.png"
            className="w-[160px] cursor-pointer"
            alt=""
          />
        </a>

        {/* MENU DESKTOP — centro */}
        <ul className="hidden md:flex justify-center gap-3">
          <ALink href="/">Home</ALink>
          <ALink href="/">Configurações</ALink>
          <ALink href="/">Suporte</ALink>
          <ALink href="/">Perfil</ALink>
          <ALink href="/">Sair</ALink>
        </ul>

        {/* MENU MOBILE — direita */}
        <div className="flex justify-end md:hidden relative pr-6">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className={`text-[32px] font-bold transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          >
            ☰
          </button>

          {openMenu && (
            <ul className="absolute right-0 top-12 flex flex-col bg-white rounded-lg shadow-lg text-center min-w-[180px]">
              <ALink href="/"><HouseIcon /> Home</ALink>
              <ALink href="/"><BoltIcon /> Configurações</ALink>
              <ALink href="/"><BotMessageSquareIcon /> Suporte</ALink>
              <ALink href="/"><CircleUserRoundIcon /> Perfil</ALink>
              <ALink href="/"><LogOutIcon /> Sair</ALink>
            </ul>
          )}
        </div>

      </nav>
    </div>
  );
}
