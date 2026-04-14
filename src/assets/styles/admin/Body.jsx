import MenuLateral from "./MenuLateral";
import { useState } from "react";
export default function Body(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f6fbff] dark:bg-[#000620f8] transition-colors duration-300">
      
      {/* HEADER: Fica no topo absoluto */}
      <header className="fixed top-0 left-0 w-full h-8 flex items-center justify-center gap-4 bg-[#005EA9] dark:bg-[#11173a]  text-white z-[1001] text-xs">
        <a href="#" className="hover:underline">Senai On</a>dark:bg-[#000000]
        <a href="#" className="hover:underline">Portal do Aluno</a>
        <a href="#" className="hover:underline">Senai Bahia</a>
      </header>

      <div className="flex flex-1 overflow-hidden"> 
        <MenuLateral openExternal={menuOpen} setOpenExternal={setMenuOpen} />

        {/* CONTEÚDO: Margem dinâmica faz a página encolher/abrir */}
        <main className={`
          flex-1 h-full overflow-y-auto pt-8 pb-8
          transition-[margin] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${menuOpen ? "ml-64" : "ml-20"}
        `}>
          <div className="p-6">
            {props.children}
          </div>
        </main>
      </div>

      {/* FOOTER: Fica no fundo absoluto */}
      <footer className="fixed bottom-0 left-0 w-full h-8 bg-[#044b9c] dark:bg-[#181818] text-white z-[1001] flex items-center justify-center border-t border-white/10">
        <h3 className="text-[10px] md:text-xs uppercase tracking-widest font-bold">
          LIGUE <span className="text-orange-500">MOVIDA 0800-7222212</span> PARA REBOQUE
        </h3>
      </footer>
    </div>
  );
}