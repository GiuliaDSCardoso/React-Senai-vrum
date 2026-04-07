import MenuLateral from "./MenuLateral";


export default function Body(props) {
  return (
    <div className="
      flex flex-col h-screen w-screen overflow-hidden
      bg-[#f6fbff] dark:bg-[#000620f8] text-black
      dark:text-gray-100 transition-colors duration-300
    ">

      {/* HEADER */}
      <header className="
        fixed top-0 left-0 w-full h-8
        flex items-center justify-center gap-4
        bg-[#005EA9] dark:bg-[#000000] text-white
        z-[1000]
      ">
        <a href="https://senaion.com.br" target="_blank" className="px-2 cursor-pointer hover:underline">
          Senai On
        </a>
        <a href="#PortalDoAluno" className="px-2 cursor-pointer hover:underline">
          Portal do Aluno
        </a>
        <a href="https://www.senaibahia.com.br" target="_blank" className="px-2 cursor-pointer hover:underline">
          Senai Bahia
        </a>
        <a href="#LabMaker" className="px-2 cursor-pointer hover:underline">
          Lab Maker
        </a>
      </header>

      {/* CONTEÚDO ABAIXO DO HEADER */}
      <div className="flex h-full">
        <MenuLateral/>

        <div className="flex-1 w-full relative z-10">
          {props.children}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#b3d0ff15] dark:bg-[#02061760]">
        <h3 className="py-1 text-md text-center  dark:text-white text-black/40">
          LIGUE <b className=" dark:text-white text-black/70">MOVIDA 0800-7222212</b> PARA REBOQUE
        </h3>
      </footer>

    </div>
  );
}