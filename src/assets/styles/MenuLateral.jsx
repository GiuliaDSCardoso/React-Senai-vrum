import { useEffect, useRef, useState } from "react";
import { CloudMoon, CloudSun } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MenuLateral() {
  const [open, setOpen] = useState(false);
  const [openPerfil, setOpenPerfil] = useState(false);
  const [nome, setNome] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const menuMobileRef = useRef(null);
  const menuDesktopRef = useRef(null);
  const perfilRef = useRef(null);

  const menuButtonMobileRef = useRef(null);
  const menuButtonDesktopRef = useRef(null);
  const navigate = useNavigate();

  // ===============================
  // FECHAR AO CLICAR FORA
  // ===============================
  useEffect(() => {
    function handleClickOutside(event) {

      if (
        (menuButtonMobileRef.current &&
          menuButtonMobileRef.current.contains(event.target)) ||
        (menuButtonDesktopRef.current &&
          menuButtonDesktopRef.current.contains(event.target))
      ) {
        return;
      }

      if (
        open &&
        menuMobileRef.current &&
        !menuMobileRef.current.contains(event.target) &&
        menuDesktopRef.current &&
        !menuDesktopRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

      if (
        openPerfil &&
        perfilRef.current &&
        !perfilRef.current.contains(event.target)
      ) {
        setOpenPerfil(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, openPerfil]);

  // ===============================
  // NOME
  // ===============================
  useEffect(() => {
    const nomeCompleto = "Giulia dos Santos Cardoso";
    const partes = nomeCompleto.split(" ");
    const nomeFormatado = `${partes[0]} ${partes[partes.length - 1]}`;
    setNome(nomeFormatado);
  }, []);

  // ===============================
  // DARK MODE
  // ===============================
  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  return (
    <>
      {/* ================= MOBILE NAV ================= */}
      <header
        className="md:hidden fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-4 shadow-md"
        style={{
          backgroundColor: darkMode ? "#001028" : "#D9E5FA",
        }}
      >
        <img src="/LogoSenaiAzul.png" className="h-8 dark:brightness-200" />

        <button
          ref={menuButtonMobileRef}
          onClick={() => setOpen(!open)}
        >
          <img
            src={open ? "/IconMenuExpandido.svg" : "/IconMenuRecolhido.svg"}
            className="w-7"
          />
        </button>
      </header>

      {/* ================= OVERLAY MOBILE ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MENU MOBILE ================= */}
      {open && (
        <div
          ref={menuMobileRef}
          className="md:hidden fixed top-16 right-0 bottom-0 w-64 shadow-lg flex flex-col justify-between p-6 z-50"
          style={{
            backgroundColor: darkMode ? "#001028" : "#D9E5FA",
          }}
        >
          <div className="flex flex-col gap-4">
            <MenuItem icon="/iconHome.svg" onClick={() => navigate("/")} label="Home" open />
            <MenuItem icon="/iconConfig.png" onClick={() => navigate("#")} label="Configurações" open />
            <MenuItem icon="/iconSup.png" onClick={() => navigate("#")} label="Suporte" open />
            <MenuItem icon="/Perfil.png" onClick={() => navigate("#")} label="Perfil" open />

            <MenuItem
              icon={darkMode ? <CloudSun /> : <CloudMoon />}
              label={darkMode ? "Modo claro" : "Modo escuro"}
              open
              onClick={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        ref={menuDesktopRef}
        className={`hidden md:flex fixed top- pt-6 left-0 h-screen flex-col justify-between
        z-[999]
        transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${open ? "w-56" : "w-16"}`}
        style={{
          backgroundColor: darkMode ? "#001028" : "#D9E5FA",
        }}
      >
        <div>
          {/* HEADER */}
          <div className="flex items-center pl-5 h-20">
            <button
              ref={menuButtonDesktopRef}
              onClick={() => setOpen(!open)}
            >
              <img
                src={open ? "/IconMenuExpandido.svg" : "/IconMenuRecolhido.svg"}
                className="w-6"
              />
            </button>

            {open && (
              <img
                src="/LogoSenaiAzul.png"
                className="h-8 dark:brightness-200"
              />
            )}
          </div>

          {/* LINKS */}
          <nav className="mt-10 flex flex-col gap-6 px-2">
            <MenuItem icon="/iconHome.svg" onClick={() => navigate("/")}  label="Home" open={open} />
            <MenuItem icon="/iconConfig.png" onClick={() => navigate("#")} label="Configurações" open={open} />
            <MenuItem icon="/iconSup.png" onClick={() => navigate("#")} label="Suporte" open={open} />
          </nav>
        </div>

        {/* FOOTER */}
        <div className="p-2 mb-16 flex flex-col gap-6">
          <MenuItem
            icon={darkMode ? <CloudSun /> : <CloudMoon />}
            label={darkMode ? "Modo claro" : "Modo escuro"}
            open={open}
            onClick={() => setDarkMode(!darkMode)}
          />

          <div className="relative">
          <button
            onClick={() => setOpenPerfil(!openPerfil)}
            className="flex items-center px-2 gap-2 text-[#003FC3] dark:text-[#007AF8]"
          >
            <img src="/Perfil.png" className="w-8" />
            {open && (
              <span className="text-[#003FC3] font-semibold dark:text-[#007AF8]">
                {nome}
              </span>
            )}
          </button>

          {openPerfil && (
              <div
                ref={perfilRef}
                className="
                absolute text-center left-[90%] top-1/2 -translate-y-1/2 ml-3
                bg-white dark:text-white dark:bg-[#0b195e]
                shadow-lg  px-2 py-2
                rounded-md flex flex-col min-w-[150px] z-50
                "
              >

                {/* TRIÂNGULO */}
                <div
                  className="
                  absolute -left-2 top-1/2 -translate-y-1/2
                  w-0 h-0
                  border-t-8 border-t-transparent
                  border-b-8 border-b-transparent
                  border-r-8 border-r-white
                  dark:border-r-[#09154e]
                  "
                />

                <a href="#" className="p-2 hover:bg-blue-50 rounded-sm dark:hover:bg-[#040b2e]">
                  Perfil
                </a>

                <a href="#" className="p-2 hover:bg-blue-50 rounded-sm dark:hover:bg-[#040b2e]">
                  Configurações
                </a>

                <a href="#" className="p-2 hover:bg-blue-50 rounded-sm dark:hover:bg-[#040b2e]">
                  Sair
                </a>

              </div>
            )}
        </div>
        </div>
      </aside>
    </>
  );
}

function MenuItem({ icon, label, open, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center w-full gap-4 pl-3 py-2 rounded-lg
      border-none outline-none focus:ring-0
      text-blue-900 hover:bg-blue-200/70 dark:hover:bg-[#000b1b]"
    >
      <div className="w-6 h-6 min-w-[24px] flex items-center justify-center dark:brightness-150">
        {typeof icon === "string" ? (
          <img src={icon} className="w-full h-full " alt="" />
        ) : (
          icon
        )}
      </div>

      <span
      className={`font-semibold text-[#003FC3] dark:text-[#007AF8]
      whitespace-nowrap overflow-hidden
      transition-all duration-300 ease-in-out
      ${open 
        ? "opacity-100 max-w-[200px] ml-0" 
        : "opacity-0 max-w-0 ml-[-8px]"
      }`}
    >
      {label}
    </span>
    </button>
  );
}