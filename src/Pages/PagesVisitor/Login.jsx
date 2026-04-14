import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase"; // Importe o cliente do Supabase
// IMPORTANTE: Importe o seu cliente do Supabase aqui. Exemplo:
// import { supabase } from "../../lib/supabase"; 

// Componente de Input Padronizado
function InputField({ label, id, type, placeholder, icon: Icon, value, onChange, disabled }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label htmlFor={id} className="text-slate-700 font-bold text-xs ml-1 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={16} />
        </div>
        <input
          id={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white p-2.5 pl-10 text-sm rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all disabled:opacity-50"
        />
        {isPassword && (
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 disabled:opacity-50"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  
  // Estados para capturar os dados do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Novo estado de carregamento

  // Função Real de Login com Supabase
  const handleLogin = async () => {
    // Validação básica
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setError(""); 
    setLoading(true);

    try {
      /* * 1. TENTA FAZER LOGIN NO AUTH DO SUPABASE 
       */
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) {
        // Traduzindo os erros mais comuns do Supabase
        if (authError.message === "Invalid login credentials") {
          throw new Error("E-mail ou senha incorretos.");
        }
        throw authError;
      }

      /* * 2. BUSCA O VÍNCULO NA TABELA PÚBLICA PARA REDIRECIONAR 
       */
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('vinculo')
        .eq('id', authData.user.id)
        .single(); // Espera apenas 1 resultado

      if (userError) {
        throw new Error("Erro ao buscar dados do perfil. Contate o suporte.");
      }

      /* * 3. REDIRECIONAMENTO COM BASE NO VÍNCULO 
       */
      if (userData.vinculo === 'administrador') {
        navigate("/homeadmin");
      } else {
        navigate("/homeuser");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-slate-50 dark:bg-[#020617] p-4 md:p-8">
      
      <div className="bg-white dark:bg-[#0B111B] p-6 md:p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-slate-100 dark:border-white/5 transition-all">
        
        {/* TÍTULO */}
        <div className="mb-6 text-left">
          <h1 className="text-2xl font-black text-[#00337C] dark:text-white uppercase tracking-tighter">
            Login
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">
            Acesse sua conta institucional para continuar.
          </p>
        </div>

        {/* MENSAGEM DE ERRO */}
        {error && (
          <div className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 p-3 rounded-lg text-xs font-semibold">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* FORMULÁRIO */}
        <div className="flex flex-col gap-4">
          <InputField 
            label="E-mail Institucional" 
            id="email" 
            type="email" 
            placeholder="email@senai.br" 
            icon={Mail} 
            value={email}
            disabled={loading}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          
          <div className="flex flex-col gap-1">
            <InputField 
              label="Sua Senha" 
              id="pass" 
              type="password" 
              placeholder="••••••••" 
              icon={Lock}
              value={password}
              disabled={loading}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <div className="flex justify-end mt-1">
              <button disabled={loading} className="text-[11px] font-bold text-[#00337C] dark:text-blue-400 hover:underline disabled:opacity-50">
                Esqueceu a senha?
              </button>
            </div>
          </div>
        </div>

        {/* BOTÕES E LINKS */}
        <div className="mt-8 flex flex-col gap-4">
          <button 
            onClick={handleLogin} 
            disabled={loading}
            className="w-full bg-[#00337C] hover:bg-[#00285e] text-white text-sm font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> ACESSANDO...
              </>
            ) : (
              <>
                ENTRAR NO SISTEMA <ChevronRight size={16} />
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500 dark:text-gray-400 mt-2">
            Ainda não tem conta?{" "}
            <button 
              onClick={() => navigate("/signon")} 
              disabled={loading}
              className="text-[#00337C] dark:text-blue-400 font-black hover:underline underline-offset-4 disabled:opacity-50"
            >
              CADASTRE-SE
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}