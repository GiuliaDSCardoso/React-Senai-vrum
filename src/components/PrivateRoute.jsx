import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";


export default function PrivateRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Busca a sessão atual no Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Fica "escutando" caso o usuário faça logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Enquanto o Supabase pensa, mostra um aviso em vez da tela em branco
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[#f6fbff] dark:bg-[#000620f8]">
        <span className="text-[#005EA9] font-bold animate-pulse">Carregando sistema...</span>
      </div>
    );
  }

  // Se não tem sessão ativa, chuta pro login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Se tem sessão, renderiza a tela (HomeUser, etc)
  return children;
}