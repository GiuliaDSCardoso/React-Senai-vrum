import { useState } from "react";
import Body from "../../../assets/styles/user/Body";
import { 
  User, Bell, Shield, Headset, LogOut, 
  ChevronRight, MessageCircle, Mail, HelpCircle, Moon 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase"; // Ajuste o caminho se necessário

// Componente reutilizável para as opções da lista
function SettingsItem({ icon: Icon, title, description, onClick, rightElement, danger }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-4 cursor-pointer transition-colors border-b border-slate-100 dark:border-white/5 last:border-0
        ${danger ? 'hover:bg-red-50 dark:hover:bg-red-900/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${danger ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-gray-300'}`}>
          <Icon size={20} />
        </div>
        <div className="flex flex-col text-left">
          <span className={`text-sm font-bold ${danger ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>
            {title}
          </span>
          {description && (
            <span className="text-xs text-slate-500 dark:text-gray-400">
              {description}
            </span>
          )}
        </div>
      </div>
      <div>
        {rightElement ? rightElement : <ChevronRight size={18} className={danger ? 'text-red-400' : 'text-slate-400'} />}
      </div>
    </div>
  );
}

// Componente de Toggle (Interruptor Liga/Desliga)
function ToggleSwitch({ isOn, onToggle }) {
  return (
    <div 
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-[#00337C]' : 'bg-slate-300 dark:bg-slate-700'}`}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );
}

export default function ConfigIndex() {
  const navigate = useNavigate();
  
  // Estados para simular preferências (você pode conectar isso ao banco depois)
  const [notificacoes, setNotificacoes] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false); // Idealmente ligado ao Contexto de Tema da aplicação

  // Função de Logout conectada ao Supabase
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <Body>
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Cabeçalho da Página */}
        <div className="text-left mb-2">
          <h1 className="text-2xl md:text-3xl font-black text-[#00337C] dark:text-white uppercase tracking-tighter">
            Configurações
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
            Gerencie sua conta, preferências e suporte.
          </p>
        </div>

        {/* BLOCO 1: Conta */}
        <div className="bg-white dark:bg-[#0B111B] rounded-2xl shadow-xl border border-slate-100 dark:border-white/5 overflow-hidden">
          <div className="p-4 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
            <h2 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
              Minha Conta
            </h2>
          </div>
          <div className="flex flex-col">
            <SettingsItem 
              icon={User} 
              title="Dados Pessoais" 
              description="Atualize seu nome, telefone e endereço"
              onClick={() => navigate("/dadospessoaisuser")}
            />
            <SettingsItem 
              icon={Shield} 
              title="Segurança" 
              description="Altere sua senha ou configure autenticação"
              onClick={() => alert("Abrir página de segurança")}
            />
          </div>
        </div>

        {/* BLOCO 2: Preferências */}
        <div className="bg-white dark:bg-[#0B111B] rounded-2xl shadow-xl border border-slate-100 dark:border-white/5 overflow-hidden">
          <div className="p-4 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
            <h2 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
              Preferências
            </h2>
          </div>
          <div className="flex flex-col">
            <SettingsItem 
              icon={Bell} 
              title="Notificações" 
              description="Receber alertas sobre viagens e solicitações"
              onClick={() => setNotificacoes(!notificacoes)}
              rightElement={<ToggleSwitch isOn={notificacoes} onToggle={() => setNotificacoes(!notificacoes)} />}
            />
            <SettingsItem 
              icon={Moon} 
              title="Modo Escuro" 
              description="Iniciar o aplicativo com tema escuro"
              onClick={() => setModoEscuro(!modoEscuro)}
              rightElement={<ToggleSwitch isOn={modoEscuro} onToggle={() => setModoEscuro(!modoEscuro)} />}
            />
          </div>
        </div>

        {/* BLOCO 3: SUPORTE (Destacado) */}
        <div className="bg-gradient-to-br from-[#00337C] to-[#005EA9] dark:from-[#0B111B] dark:to-[#11173a] rounded-2xl shadow-xl border border-[#005EA9] dark:border-white/10 overflow-hidden text-white relative">
          {/* Elemento visual de fundo */}
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Headset size={120} />
          </div>
          
          <div className="p-6 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <HelpCircle size={24} className="text-white" />
              </div>
              <h2 className="text-lg font-bold">Precisa de Ajuda?</h2>
            </div>
            <p className="text-white/80 text-sm mb-6 max-w-md">
              Nossa equipe de suporte está disponível para tirar dúvidas ou resolver problemas com suas solicitações.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Botão WhatsApp */}
              <a 
                href="https://wa.me/5571999999999" // Substitua pelo número real do suporte
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 bg-white hover:bg-slate-100 text-[#00337C] font-bold py-3 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>

              {/* Botão E-mail */}
              <a 
                href="mailto:suporte@senai.br?subject=Dúvida%20Portal%20Senai%20On" // Substitua pelo e-mail real
                className="flex items-center justify-center gap-2 flex-1 bg-transparent hover:bg-white/10 border-2 border-white/30 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98]"
              >
                <Mail size={18} />
                Enviar E-mail
              </a>
            </div>
          </div>
        </div>

        {/* BLOCO 4: Zona de Perigo / Logout */}
        <div className="bg-white dark:bg-[#0B111B] rounded-2xl shadow-xl border border-slate-100 dark:border-white/5 overflow-hidden mb-10">
          <SettingsItem 
            icon={LogOut} 
            title="Sair da Conta" 
            description="Encerrar sua sessão atual de forma segura"
            danger={true} // Aplica estilos vermelhos
            onClick={handleLogout}
          />
        </div>

      </div>
    </Body>
  );
}