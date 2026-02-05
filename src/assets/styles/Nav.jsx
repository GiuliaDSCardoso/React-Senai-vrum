import { useEffect, useState } from "react";
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
  const [openPerfil, setOpenPerfil] = useState(false);
  const [nome, setNome] = useState();

  useEffect(() => {
    const nomeCompleto = "Giulia dos Santos Cardoso"

    const partes = nomeCompleto.split(" ");
    const nomeFormatado = `${partes[0]} ${partes[partes.length - 1 ]}`;

    setNome(nomeFormatado);
  }, []);
    return (
      <div className="flex pr-10 w-[100%] md:w-full">
      <nav className="flex justify-between md:justify-center items-center w-full py-4">
    
        {/* LOGO - ESQUERDA */}
        <a href="/" className="flex-shrink-0 ml-[7%] md:ml-0">
          <img
            src="../public/LogoSenaiAzul.png"
            className="h-8"
            alt="Lab Maker Logo"
          />
        </a>
    
        {/* MENU - CENTRO */}
        <ul className="flex-1 flex items-center md:justify-center relative">

          <ul className="hidden md:flex items-center gap-6">
            <ALink href="/">Home</ALink>
            <ALink href="/">Configurações</ALink>
            <ALink href="/">Suporte</ALink>
            
          </ul>
    
          {/* DROPDOWN MOBILE */}
          <li className="relative flex h-full justify-center mr-[12%] md:hidden ml-auto">

            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex  justify-center w-[100%] gap-4 pt-2 pb-2 items-center hover:text-[#4f92ff] text-md md:text-xl font-bold font-inter"
            >
              Menu
             
            </button>
    
            {openMenu && (
              <ul className="absolute mt-10 w-52 md:w-52  items-center bg-white shadow-xl border-[#eff6ff] border-2 gap-1 flex flex-col z-50">
                <ALink href="/"><HouseIcon /> Home </ALink>
                <ALink href="/"><BoltIcon /> Configurações</ALink>
                <ALink href="/"><BotMessageSquareIcon /> Suporte</ALink>
                <ALink href="/"><CircleUserRoundIcon /> Perfil</ALink>
                
              </ul>
            )}
          </li>
        </ul>
    
        {/* PERFIL - EXTREMA DIREITA */}
        <div className=" md:justify-end  hidden md:flex ml-auto">
         <button
              onClick={() => setOpenPerfil(!openPerfil)}
              className="flex  justify-center w-[100%] gap-4 pt-2 pb-2 items-center hover:text-[#4f92ff] text-md md:text-xl font-bold font-inter"
            >
              {nome}
              <img src="../public/Perfil.png" className="w-10" alt="" />
            </button>
            {openPerfil &&(
            <ul className="absolute mt-14 w-44 md:w-52 items-center  bg-white shadow-lg flex flex-col ">
            
                <ALink href="/"><BoltIcon /> Configurações</ALink>
                <ALink href="/"><BotMessageSquareIcon /> Suporte</ALink>
                <ALink href="/"><LogOutIcon /> Sair</ALink>
                
              </ul>
        )}
        </div>
        
    
      </nav>
    </div>
    
     ); 
}