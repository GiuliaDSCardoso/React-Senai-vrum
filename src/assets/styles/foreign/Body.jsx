import MenuLateral from "./MenuLateral";
import { useState } from "react";

export default function Body(props) {
  // Estado para controlar o menu (deve ser o mesmo que o MenuLateral usa)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="
      flex flex-col h-screen w-screen overflow-hidden
      bg-[#f6fbff] dark:bg-[#000620f8] text-black
      dark:text-gray-100 transition-colors duration-300
    ">

      {/* HEADER FIXO SUPERIOR */}
      <header className="
        fixed top-0 left-0 w-full h-8
        flex items-center justify-center gap-4
        bg-[#005EA9] dark:bg-[#000000] text-white
        z-[1001]
      ">
        <a href="https://senaion.com.br" target="_blank" className="px-2 cursor-pointer hover:underline">Senai On</a>
        <a href="#PortalDoAluno" className="px-2 cursor-pointer hover:underline">Portal do Aluno</a>
        <a href="https://www.senaibahia.com.br" target="_blank" className="px-2 cursor-pointer hover:underline">Senai Bahia</a>
        <a href="#LabMaker" className="px-2 cursor-pointer hover:underline">Lab Maker</a>
      </header>

      {/* ÁREA PRINCIPAL */}
      <div className="flex flex-1  overflow-hidden"> 
        {/* Passamos o estado para o Menu se quiser sincronizar, 
            ou apenas garantimos que as larguras batam */}
        <MenuLateral openExternal={menuOpen} setOpenExternal={setMenuOpen} />

        <main className={`
          flex-1 h-full overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          /* No Mobile: sem margem lateral (o menu vira overlay) */
          /* No Desktop: margem baseada no estado do menu */
          md:ml-16 ${menuOpen ? "md:ml-56" : "md:ml-16"}
        `}>
          <div className="py-1 px-6"> {/* Container de respiro para o conteúdo */}
            {props.children}
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full bg-[#b3d0ff15] dark:bg-[#02061760] z-[1001]">
        <h3 className="py-1 text-md text-center dark:text-white text-black/40">
          LIGUE <b className=" dark:text-white text-black/70">MOVIDA 0800-7222212</b> PARA REBOQUE
        </h3>
      </footer>
    </div>
  );
}