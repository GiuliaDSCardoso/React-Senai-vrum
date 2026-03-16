import { useEffect, useRef, useState } from "react";
import { CloudMoon, CloudSun } from "lucide-react";

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
            <MenuItem icon="/iconHome.svg" label="Home" open />
            <MenuItem icon="/iconConfig.png" label="Configurações" open />
            <MenuItem icon="/iconSup.png" label="Suporte" open />
            <MenuItem icon="/Perfil.png" label="Perfil" open />

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
        className={`hidden md:flex fixed top-0 left-0 h-screen flex-col justify-between
        overflow-hidden
        transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${open ? "w-64" : "w-16"}`}
        style={{
          backgroundColor: darkMode ? "#001028" : "#D9E5FA",
        }}
      >
        <div>
          {/* HEADER */}
          <div className="flex items-center p-4 h-20">
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
                className="h-10 dark:brightness-200"
              />
            )}
          </div>

          {/* LINKS */}
          <nav className="mt-10 flex flex-col gap-6 px-2">
            <MenuItem icon="/iconHome.svg" label="Home" open={open} />
            <MenuItem icon="/iconConfig.png" label="Configurações" open={open} />
            <MenuItem icon="/iconSup.png" label="Suporte" open={open} />
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

          <button
            onClick={() => setOpenPerfil(!openPerfil)}
            className="flex items-center gap-2"
          >
            <img src="/Perfil.png" className="w-8" />
            {open && <span>{nome}</span>}
          </button>

          {openPerfil && (
            <div
              ref={perfilRef}
              className="bg-white dark:bg-[#020617] shadow-lg border dark:border-gray-700 flex flex-col"
            >
              <a className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                Perfil
              </a>
              <a className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                Configurações
              </a>
              <a className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                Sair
              </a>
            </div>
          )}
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
      <div className="w-6 h-6 min-w-[24px] flex items-center justify-center dark:brightness-200">
        {typeof icon === "string" ? (
          <img src={icon} className="w-full h-full" alt="" />
        ) : (
          icon
        )}
      </div>

      <span
        className={`font-semibold text-[#003FC3] dark:text-[#007AF8]
        whitespace-nowrap transition-all duration-300
        ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
      >
        {label}
      </span>
    </button>
  );
}