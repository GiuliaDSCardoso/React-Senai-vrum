import MenuLateral from "./MenuLateral";

export default function Body(props) {
  return (
    <div
      className="
        flex flex-col h-screen w-screen overflow-hidden
        bg-[#f6fbff] text-black
        dark:bg-[#000620f8] dark:text-gray-100
        transition-colors duration-300
      "
    >
      <MenuLateral />
      {/* Conteúdo */}
      <div className="flex-1 w-full">
        {props.children}
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#b3d0ff15] dark:text-white text-textColor dark:bg-[#02061760] ">
        <h3 className="py-1 text-md text-center">
          LIGUE <b>MOVIDA 0800-7222212</b> PARA REBOQUE
        </h3>
      </footer>
    </div>
  );
}
