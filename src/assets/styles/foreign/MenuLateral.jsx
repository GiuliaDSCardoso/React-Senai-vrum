import React, { useEffect, useRef, useState } from "react";
import { GoGear } from "react-icons/go";
import { IoLogInOutline } from "react-icons/io5";
import { PiMoonStarsDuotone, PiSunHorizonDuotone } from "react-icons/pi";
import { RiHomeLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

export default function MenuLateral() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const menuMobileRef = useRef(null);
  const menuDesktopRef = useRef(null);
  const menuButtonMobileRef = useRef(null);
  const menuButtonDesktopRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Função para verificar se a rota está ativa
  const isActive = (path) => location.pathname === path;

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (menuButtonMobileRef.current && menuButtonMobileRef.current.contains(event.target)) ||
        (menuButtonDesktopRef.current && menuButtonDesktopRef.current.contains(event.target))
      ) {
        return;
      }

      if (
        open &&
        ((menuMobileRef.current && !menuMobileRef.current.contains(event.target)) &&
        (menuDesktopRef.current && !menuDesktopRef.current.contains(event.target)))
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Dark Mode
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  return (
    <>
      {/* ================= MOBILE NAV ================= */}
      <header
        className="md:hidden fixed top-6 left-0 w-full h-16 z-50 flex items-center justify-between px-4 shadow-md transition-colors duration-300"
        style={{ backgroundColor: darkMode ? "#020617" : "#f8fbff" }}
      >
        <img src="/LogoSenaiAzul.png" className="h-8 dark:brightness-0 dark:invert" />

        <button ref={menuButtonMobileRef} onClick={() => setOpen(!open)}>
          <img
            src={open ? "/IconMenuExpandido.svg" : "/IconMenuRecolhido.svg"}
            className="w-5 dark:invert"
          />
        </button>
      </header>

      {/* ================= OVERLAY MOBILE ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MENU MOBILE ================= */}
      {open && (
        <>
        <div
          ref={menuMobileRef}
          className="md:hidden fixed top-20 right-0 bottom-0 w-64 shadow-lg flex flex-col justify-between p-6 z-50 transition-colors duration-300"
          style={{ backgroundColor: darkMode ? "#020617" : "#f8fbff" }}
        >
          <div className="flex flex-col gap-4">
            <MenuItem icon={<RiHomeLine />} onClick={() => { navigate("/"); setOpen(false); }} label="Home" open active={isActive("/")} />
            <MenuItem icon={<GoGear />} onClick={() => { navigate("/config"); setOpen(false); }} label="Configurações" open active={isActive("/config")} />
            <MenuItem icon={<IoLogInOutline />} onClick={() => navigate("/login")} label="Login" open active={isActive("/login")} />

            <MenuItem
              icon={darkMode ? <PiSunHorizonDuotone /> : <PiMoonStarsDuotone />}
              label={darkMode ? "Modo claro" : "Modo escuro"}
              open
              onClick={() => setDarkMode(!darkMode)}
            />
            
          </div>
          
        </div>
        
        </>
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        ref={menuDesktopRef}
        className={`hidden md:flex fixed top-8 left-0 h-screen flex-col justify-between
        z-[999] transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${open ? "w-56" : "w-16"}`}
        style={{ backgroundColor: darkMode ? "#020617" : "#f8fbff" }}
      >
        <div>
          {/* HEADER */}
          <div className="flex items-center pl-5 h-20">
            <button ref={menuButtonDesktopRef} onClick={() => setOpen(!open)}>
              <img
                src={open ? "/IconMenuExpandido.svg" : "/IconMenuRecolhido.svg"}
                className="w-5 opacity-60 dark:opacity-100 dark:invert"
              />
            </button>
            {open }
          </div>

          {/* LINKS */}
          <nav className="mt-10 flex flex-col gap-3 px-2">
            <MenuItem icon={<RiHomeLine />} onClick={() => navigate("/")} label="Home" open={open} active={isActive("/")} />
            
          </nav>
        </div>

        {/* FOOTER */}
        <div className="p-2 mb-24 flex flex-col gap-3">
          
          <MenuItem
            icon={darkMode ? <PiSunHorizonDuotone /> : <PiMoonStarsDuotone />}
            label={darkMode ? "Modo claro" : "Modo escuro"}
            open={open}
            onClick={() => setDarkMode(!darkMode)}
          />
          <MenuItem icon={<IoLogInOutline />} onClick={() => navigate("/login")} label="Login" open={open} active={isActive("/login")} />
        </div>
      </aside>

      {/* BARRA DIVISÓRIA DO MENU */}
      <div
        className="hidden md:block fixed top-4 h-screen w-[1px] bg-blue-100 dark:bg-[#2c356169] opacity-70 z-[998] transition-all duration-500"
        style={{ left: open ? "224px" : "64px" }}
      />
    </>
  );
}

function MenuItem({ icon, label, open, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex items-center w-full gap-4 pl-3 py-3 rounded-lg
        border-none outline-none focus:ring-0 transition-all duration-300
        text-black dark:text-white hover:bg-[#237bff07] dark:hover:bg-[#010411]
        ${active ? "bg-[#63a1ff25] dark:bg-[#041352e3] border-l-4 !border-blue-600" : "border-l-4 border-transparent"}
      `}
    >
      {/* LINHA ANIMADA EMBAIXO (HOVER) */}
      <span className={`
        absolute bottom-0 left-1/2 h-[2px] opacity-20 dark:opacity-80 w-0
        -translate-x-1/2 bg-gradient-to-r from-transparent via-current to-transparent
        transition-all duration-700 ease-in-out group-hover:w-full
      `} />

      {/* ÍCONE */}
      <div className="w-6 h-6 min-w-[24px] flex items-center justify-center">
        {typeof icon === "string" ? (
          <img
            src={icon}
            className="w-full h-full grayscale brightness-0 dark:invert transition-all duration-300"
            alt=""
          />
        ) : (
          React.cloneElement(icon, {
            className: "w-5 h-6 flex-shrink-0 transition-all duration-300",
            color: "currentColor" // Isso faz o ícone herdar o text-black ou text-white
          })
        )}
      </div>

      {/* TEXTO */}
      <span
        className={`font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
        ${open ? "opacity-100 max-w-[200px] ml-0" : "opacity-0 max-w-0 ml-[-8px]"}`}
      >
        {label}
      </span>
    </button>
  );
}