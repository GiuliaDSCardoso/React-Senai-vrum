import { useState, useRef, useEffect } from "react";
import { 
  User, Phone, MapPin, Building2, BookUser, 
  FileText, Camera, Save, ArrowLeft, CheckCircle2, Briefcase, Mail, Loader2,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase"; // AJUSTE O CAMINHO AQUI SE NECESSÁRIO

// Componente de Input Padronizado
function InputField({ label, id, type = "text", placeholder, icon: Icon, value, onChange, disabled = false }) {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label htmlFor={id} className="text-slate-700 dark:text-gray-300 font-bold text-xs ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={16} />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value || ""} 
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white p-2.5 pl-10 text-sm rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}

export default function DadosPessoais() {
  const navigate = useNavigate();
  const fileCnhRef = useRef(null);
  const filePhotoRef = useRef(null);

  // Estados dos formulários (iniciam vazios)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    vinculo: "",
    area_atuacao: "",
    telefone: "",
    endereco: "",
    lider: "",
  });

  const [userId, setUserId] = useState(null);
  
  // Estados para arquivos
  const [cnhFile, setCnhFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null); // Arquivo real da foto para upload
  const [profilePhoto, setProfilePhoto] = useState(null); // Preview visual da foto
  
  // Estados de UI
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ==========================================
  // 1. CARREGAR DADOS DO BANCO AO ABRIR A TELA
  // ==========================================
  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          navigate("/login"); 
          return;
        }

        const currentUserId = session.user.id;
        setUserId(currentUserId);

        const { data: userData, error: dbError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', currentUserId)
          .single();

        if (dbError) throw dbError;

        if (userData) {
          setFormData({
            nome: userData.nome || "",
            email: userData.email || "",
            vinculo: userData.vinculo || "",
            area_atuacao: userData.area_atuacao || "",
            telefone: userData.telefone || "",
            endereco: userData.endereco || "",
            lider: userData.lider || "",
          });
          
          // Se tiver foto salva no banco, exibe
          if (userData.foto_url) {
            setProfilePhoto(userData.foto_url);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setErrorMsg("Não foi possível carregar seus dados.");
      } finally {
        setLoadingInitial(false);
      }
    }

    fetchUserData();
  }, [navigate]);

  // ==========================================
  // 2. FUNÇÕES DE INTERAÇÃO (IMAGENS E INPUTS)
  // ==========================================
  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCnhChange = (e) => {
    const file = e.target.files[0];
    if (file) setCnhFile(file);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file); // Guarda para mandar pro banco
      const photoUrl = URL.createObjectURL(file);
      setProfilePhoto(photoUrl); // Preview visual imediato
    }
  };

  // ==========================================
  // 3. SALVAR ALTERAÇÕES (DB + STORAGE)
  // ==========================================
  const handleSave = async () => {
    setLoadingSave(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      let fotoFinalUrl = profilePhoto; 
      let cnhFinalUrl = null;

      // PASSO 1: Fazer Upload da FOTO DE PERFIL no Storage
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${userId}-foto.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatares')
          .upload(fileName, photoFile, { upsert: true });

        if (uploadError) throw new Error("Erro ao enviar sua foto de perfil.");

        const { data: publicUrlData } = supabase.storage
          .from('avatares')
          .getPublicUrl(fileName);

        fotoFinalUrl = publicUrlData.publicUrl;
      }

      // PASSO 2: Fazer Upload da CNH no Storage
      if (cnhFile) {
        const fileExt = cnhFile.name.split('.').pop();
        const fileName = `${userId}-cnh-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('documentos')
          .upload(fileName, cnhFile, { upsert: true });

        if (uploadError) throw new Error("Erro ao enviar o documento da CNH.");

        const { data: publicUrlData } = supabase.storage
          .from('documentos')
          .getPublicUrl(fileName);

        cnhFinalUrl = publicUrlData.publicUrl;
      }

      // PASSO 3: Salvar dados na tabela 'usuarios'
      const updates = {
        nome: formData.nome,
        telefone: formData.telefone,
        endereco: formData.endereco,
        lider: formData.lider,
      };

      if (photoFile) updates.foto_url = fotoFinalUrl;
      if (cnhFile) updates.cnh_url = cnhFinalUrl;

      const { error: dbError } = await supabase
        .from('usuarios')
        .update(updates)
        .eq('id', userId);

      if (dbError) throw new Error("Erro ao atualizar o perfil no banco.");

      setSuccessMsg("Perfil e arquivos atualizados com sucesso!");
      
      // Limpa os states de upload pendente
      setPhotoFile(null); 
      setCnhFile(null);

      setTimeout(() => setSuccessMsg(""), 4000);

    } catch (err) {
      console.error("Erro no processo de salvar:", err);
      setErrorMsg(err.message || "Erro inesperado ao salvar.");
    } finally {
      setLoadingSave(false);
    }
  };

  // Tela de carregamento enquanto busca do banco
  if (loadingInitial) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] w-full gap-4 text-[#005EA9] dark:text-blue-400">
        <Loader2 size={32} className="animate-spin" />
        <span className="font-bold animate-pulse">Carregando seus dados...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 p-4 md:p-0">
      
      {/* Cabeçalho */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => navigate("/config")}
          className="p-2 bg-white dark:bg-[#0B111B] text-slate-600 dark:text-gray-300 rounded-full shadow-md hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-black text-[#00337C] dark:text-white uppercase tracking-tighter">
            Dados Pessoais
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
            Mantenha seu perfil institucional atualizado.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0B111B] rounded-2xl shadow-xl border border-slate-100 dark:border-white/5 overflow-hidden p-6 md:p-8">
        
        {/* SESSÃO 1: FOTO DE PERFIL */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative group cursor-pointer" onClick={() => filePhotoRef.current.click()}>
            <div className="w-28 h-28 rounded-full border-4 border-slate-50 dark:border-[#11173a] shadow-lg overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-slate-400" />
              )}
            </div>
            
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={24} className="text-white" />
            </div>

            <div className="absolute bottom-0 right-0 bg-[#00337C] text-white p-2 rounded-full border-2 border-white dark:border-[#0B111B] shadow-sm">
              <Camera size={14} />
            </div>
            
            <input 
              type="file" 
              ref={filePhotoRef} 
              onChange={handlePhotoChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          <span className="mt-3 text-xs font-semibold text-slate-500 dark:text-gray-400 hover:text-[#00337C] transition-colors cursor-pointer" onClick={() => filePhotoRef.current.click()}>
            Alterar foto de perfil
          </span>
        </div>

        {/* SESSÃO 2: FORMULÁRIO DE DADOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          
          {/* Campos editáveis */}
          <div className="md:col-span-2 border-b border-slate-100 dark:border-white/5 pb-2 mb-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Informações Editáveis</h3>
          </div>

          <InputField 
            label="Nome Completo" 
            id="nome" 
            icon={User} 
            value={formData.nome} 
            onChange={(e) => updateForm("nome", e.target.value)} 
            disabled={loadingSave}
          />
          <InputField 
            label="Telefone / WhatsApp" 
            id="telefone" 
            icon={Phone} 
            value={formData.telefone} 
            onChange={(e) => updateForm("telefone", e.target.value)} 
            disabled={loadingSave}
          />
          <div className="md:col-span-2">
            <InputField 
              label="Endereço Completo" 
              id="endereco" 
              icon={MapPin} 
              value={formData.endereco} 
              onChange={(e) => updateForm("endereco", e.target.value)} 
              disabled={loadingSave}
            />
          </div>
          <InputField 
            label="Líder / Gestor Responsável" 
            id="lider" 
            icon={BookUser} 
            value={formData.lider} 
            onChange={(e) => updateForm("lider", e.target.value)} 
            disabled={loadingSave}
          />

          {/* Campos de Leitura (Vem do RH/Cadastro Inicial) */}
          <div className="md:col-span-2 border-b border-slate-100 dark:border-white/5 pb-2 mt-4 mb-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Registros do Sistema</h3>
          </div>

          <InputField 
            label="E-mail Institucional" 
            id="email" 
            icon={Mail} 
            value={formData.email} 
            disabled={true} 
          />
          <InputField 
            label="Vínculo Atual" 
            id="vinculo" 
            icon={Briefcase} 
            value={formData.vinculo.toUpperCase()} 
            disabled={true} 
          />
          <InputField 
            label="Área de Atuação" 
            id="area" 
            icon={Building2} 
            value={formData.area_atuacao} 
            disabled={true} 
          />
        </div>

        {/* SESSÃO 3: ATUALIZAR CNH */}
        <div className="border-t border-slate-100 dark:border-white/5 pt-8 mb-8">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <FileText size={18} className="text-[#00337C] dark:text-blue-400" />
            Documentação de Trânsito
          </h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 mb-3">
            Tirou a CNH recentemente ou renovou o documento? Anexe a nova versão abaixo para atualizar seu cadastro no sistema.
          </p>

          <input 
            type="file" 
            ref={fileCnhRef} 
            onChange={handleCnhChange} 
            accept=".pdf,image/png,image/jpeg" 
            className="hidden" 
          />
          
          <div 
            onClick={() => !loadingSave && fileCnhRef.current.click()}
            className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center justify-center transition-all 
              ${loadingSave ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} 
              ${cnhFile ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-[#00337C]/50'}`}
          >
            {cnhFile ? (
              <>
                <CheckCircle2 size={28} className="text-green-600 dark:text-green-400 mb-2" />
                <span className="text-sm font-bold text-green-700 dark:text-green-400 text-center">
                  {cnhFile.name}
                </span>
                <span className="text-xs text-green-600/70 dark:text-green-400/70 mt-1">Pronto para envio</span>
              </>
            ) : (
              <>
                <div className="p-3 bg-white dark:bg-[#0B111B] rounded-full shadow-sm mb-2 border border-slate-100 dark:border-white/5">
                  <FileText size={24} className="text-slate-400" />
                </div>
                <span className="text-sm font-bold text-slate-600 dark:text-gray-300">
                  Clique para anexar sua nova CNH
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Formatos aceitos: PDF, JPG ou PNG
                </span>
              </>
            )}
          </div>
        </div>

        {/* MENSAGENS DE ERRO E SUCESSO */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-bold flex items-center gap-2">
            <AlertCircle size={18} />
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-lg flex items-center gap-2 text-sm font-bold animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={18} />
            {successMsg}
          </div>
        )}

        {/* SESSÃO 4: BOTÕES DE AÇÃO */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <button 
            onClick={() => navigate("/config")}
            disabled={loadingSave}
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            Voltar
          </button>
          
          <button 
            onClick={handleSave}
            disabled={loadingSave}
            className="w-full sm:flex-1 bg-[#00337C] hover:bg-[#00285e] text-white text-sm font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loadingSave ? (
              <><Loader2 size={16} className="animate-spin" /> Salvando Alterações...</>
            ) : (
              <><Save size={18} /> Atualizar Perfil</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}