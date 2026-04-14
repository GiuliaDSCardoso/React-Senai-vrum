import React, { useEffect, useRef, useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { PiMoonStarsDuotone, PiSunHorizonDuotone } from "react-icons/pi";
import { RiHomeLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

export default function MenuLateral({ openExternal, setOpenExternal }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openExternal !== undefined ? openExternal : internalOpen;
  const setOpen = setOpenExternal !== undefined ? setOpenExternal : setInternalOpen;

  const [darkMode, setDarkMode] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuButtonRef.current && menuButtonRef.current.contains(event.target)) return;
      if (open && menuRef.current && !menuRef.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  const bgStyle = { backgroundColor: darkMode ? "#000000" : "#00337C" };

  return (
    <aside
      ref={menuRef}
      className={`fixed left-0 z-[999] transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
      shadow-2xl border-r border-white/5 flex flex-col justify-between
      /* POSICIONAMENTO: Abaixo do header (8) e acima do footer (8) */
      top-8 bottom-8
      ${open ? "w-48" : "w-14"}`}
      style={bgStyle}
    >
      <div>
        <div className="flex items-center px-2 h-16 gap-3 border-b border-white/5">
          <button ref={menuButtonRef} onClick={() => setOpen(!open)} className="hover:bg-white/10 p-2 rounded-lg transition-colors flex-shrink-0">
            <img src={open ? "/IconMenuExpandido.svg" : "/IconMenuRecolhido.svg"} className="w-4 invert opacity-80" alt="Menu" />
          </button>
          <div className={`flex flex-col leading-tight transition-all gap-1 duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <img className="w-16 h-full" src="/LogoSenaiWhite.svg" alt="" />
             <span className="text-gray-400 text-[10px] font-medium whitespace-nowrap uppercase tracking-wider">Gestão de Frotas</span>
          </div>
        </div>

        <nav className="mt-6 flex flex-col gap-1 px-3">
          <MenuItem icon={<RiHomeLine />} onClick={() => navigate("/")} label="Início" open={open} active={isActive("/")} />

        </nav>
      </div>

      <div className="p-3 mb-4 flex flex-col gap-1 border-t border-white/5">
        <MenuItem icon={darkMode ? <PiSunHorizonDuotone /> : <PiMoonStarsDuotone />} label={darkMode ? "Modo Claro" : "Modo Escuro"} open={open} onClick={() => setDarkMode(!darkMode)} />
        <MenuItem icon={<IoLogInOutline />} onClick={() => navigate("/login")} label="Login" open={open} active={isActive("/login")} />
      </div>
    </aside>
    
  );
}

function MenuItem({ icon, label, open, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex items-center w-full gap-4 pl-2  py-1 rounded-xl
        border-none outline-none focus:ring-0 transition-all duration-200
        text-white/80 hover:text-white
        ${active 
          ? "bg-white/15 text-white shadow-sm" 
          : "hover:bg-white/5"}
      `}
    >
      {/* ÍCONE */}
      <div className={`w-4 h-4 flex items-center justify-center transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {typeof icon === "string" ? (
          <img src={icon} className="w-full h-full invert" alt="" />
        ) : (
          React.cloneElement(icon, {
            className: "w-4 h-4 flex-shrink-0",
            color: "currentColor"
          })
        )}
      </div>

      {/* LABEL (SOME QUANDO FECHADO) */}
      <span
        className={`font-medium text-[15px] whitespace-nowrap transition-all duration-300
        ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none w-0"}`}
      >
        {label}
      </span>

      {/* TOOLTIP (APARECE NO HOVER QUANDO FECHADO) */}
      {!open && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[1000] shadow-xl border border-white/10">
          {label}
        </div>
      )}
    </button>
  );
}