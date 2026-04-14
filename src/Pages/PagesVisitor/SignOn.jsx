import { useState, useRef } from "react";
import { 
  User, Mail, Lock, Eye, EyeOff, Hash, 
  Phone, MapPin, BookUser, Building2, 
  FileText, CheckCircle2, ChevronRight, ArrowLeft,
  Briefcase, ChevronDown, AlertCircle, Layers, CreditCard, Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase"; // SEU ARQUIVO DO SUPABASE AQUI!

// Componente de Input Padronizado
function InputField({ label, id, type, placeholder, icon: Icon, value, onChange, required = true, disabled }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label htmlFor={id} className="text-slate-700 dark:text-gray-300 font-bold text-xs ml-1">
        {label} {required && <span className="text-red-500">*</span>}
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

// Componente de Select Padronizado
function SelectField({ label, id, icon: Icon, value, onChange, options, required = true, disabled }) {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label htmlFor={id} className="text-slate-700 dark:text-gray-300 font-bold text-xs ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={16} />
        </div>
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white p-2.5 pl-10 pr-8 text-sm rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
        >
          <option value="" disabled className="text-slate-500 dark:bg-[#0B111B]">Selecione...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="dark:bg-[#0B111B] text-slate-900 dark:text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
}

export default function SignOn() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento do banco
  
  const [formData, setFormData] = useState({
    name: "", email: "", role: "", area: "", mat: "", pass: "",
    tel: "", end: "", lider: "", hasCnh: "", file: null
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  const steps = [
    { name: "Pessoal", icon: User },
    { name: "Contato", icon: Phone },
    { name: "Extras", icon: Building2 },
    { name: "Fim", icon: CheckCircle2 }
  ];

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(""); 
  };

  // Lógica de Cadastro no Supabase
  const handleRegisterToSupabase = async () => {
    setLoading(true);
    setError("");

    try {
      // 1. Cria o usuário no Auth (Cofre de senhas do Supabase)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.pass,
      });

      if (authError) throw new Error(authError.message);

      // 2. Salva o resto dos dados na tabela 'usuarios'
      const { error: dbError } = await supabase
        .from('usuarios')
        .insert([
          {
            id: authData.user.id, // Amarra a tabela pública ao Auth
            nome: formData.name,
            email: formData.email,
            vinculo: formData.role,
            area_atuacao: formData.area,
            matricula: formData.mat || null,
            telefone: formData.tel,
            endereco: formData.end || null,
            lider: formData.lider,
            // Aqui estamos salvando um simples texto ou booleano para a CNH
            documento_url: formData.hasCnh === "sim" ? "Pendente de upload" : "Não possui"
          }
        ]);

      if (dbError) throw new Error("Erro ao salvar perfil: " + dbError.message);

      // Tudo deu certo! Avança para a tela de Sucesso
      setStep(3);

    } catch (err) {
      // Traduz erro comum
      if (err.message.includes("User already registered")) {
        setError("Este e-mail já está cadastrado.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 0) {
      if (!formData.name || !formData.email || !formData.role || !formData.area || !formData.pass) {
        return setError("Por favor, preencha todos os campos obrigatórios.");
      }
      if (!["terceirizado", "estagiario"].includes(formData.role) && !formData.mat) {
        return setError("O número da matrícula é obrigatório para este vínculo.");
      }
      setStep(1);
    } else if (step === 1) {
      if (!formData.tel) {
        return setError("Por favor, informe seu telefone de contato.");
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.lider || !formData.hasCnh) {
        return setError("Informe o líder e se possui CNH.");
      }
      // Aqui, em vez de só mudar de tela, enviamos pro banco!
      handleRegisterToSupabase();
    }
  };

  const handleBack = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) updateForm("file", selectedFile);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full py-6">
      <div className="bg-white dark:bg-[#0B111B] p-6 md:p-10 rounded-[2rem] shadow-2xl w-full max-w-xl border border-slate-100 dark:border-white/5 transition-all">
        
        {/* STEPPER */}
        <div className="flex items-center justify-between mb-8 relative">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 
                ${step >= i ? "bg-[#00337C] text-white shadow-md shadow-blue-900/20" : "bg-slate-100 text-slate-400 dark:bg-white/5"}`}>
                <s.icon size={14} />
              </div>
              <span className={`text-[9px] mt-2 font-bold uppercase tracking-wider 
                ${step >= i ? "text-[#00337C] dark:text-blue-400" : "text-slate-400"}`}>{s.name}</span>
            </div>
          ))}
          <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 dark:bg-white/5 -z-0" />
        </div>

        {/* TÍTULO */}
        {step < 3 && (
          <div className="mb-6 text-left">
            <h1 className="text-2xl font-black text-[#00337C] dark:text-white uppercase tracking-tighter">Cadastro</h1>
            <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">Preencha os dados abaixo.</p>
          </div>
        )}

        {/* MENSAGEM DE ERRO */}
        {error && (
          <div className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 p-3 rounded-lg text-xs font-semibold">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* CONTEÚDO DINÂMICO */}
        <div className="flex flex-col gap-4">
          {step === 0 && (
            <>
              <InputField label="Nome Completo" id="name" type="text" placeholder="Seu nome completo" icon={User} value={formData.name} onChange={(e) => updateForm("name", e.target.value)} disabled={loading} />
              <InputField label="E-mail Institucional" id="email" type="email" placeholder="email@senai.br" icon={Mail} value={formData.email} onChange={(e) => updateForm("email", e.target.value)} disabled={loading} />
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <SelectField 
                    label="Vínculo" 
                    id="role" 
                    icon={Briefcase} 
                    value={formData.role}
                    onChange={(e) => updateForm("role", e.target.value)}
                    disabled={loading}
                    options={[
                      { value: "efetivo", label: "Efetivo" },
                      { value: "horista", label: "Horista" },
                      { value: "terceirizado", label: "Terceirizado" },
                      { value: "estagiario", label: "Estagiário" },
                      { value: "gestor", label: "Gestor" },
                      { value: "coordenador", label: "Coordenador" },
                      { value: "administrador", label: "Administrador" }
                    ]}
                  />
                </div>
                <div className="w-full">
                  <InputField label="Área de Atuação" id="area" type="text" placeholder="Ex: TI, RH, Mecânica" icon={Layers} value={formData.area} onChange={(e) => updateForm("area", e.target.value)} disabled={loading} />
                </div>
              </div>

              {!["terceirizado", "estagiario"].includes(formData.role) && (
                <InputField label="Matrícula" id="mat" type="text" placeholder="000000" icon={Hash} value={formData.mat} onChange={(e) => updateForm("mat", e.target.value)} disabled={loading} />
              )}

              <InputField label="Defina uma Senha" id="pass" type="password" placeholder="••••••••" icon={Lock} value={formData.pass} onChange={(e) => updateForm("pass", e.target.value)} disabled={loading} />
            </>
          )}

          {step === 1 && (
            <>
              <InputField label="Telefone / WhatsApp" id="tel" type="tel" placeholder="(00) 00000-0000" icon={Phone} value={formData.tel} onChange={(e) => updateForm("tel", e.target.value)} disabled={loading} />
              <InputField label="Endereço Residencial (Opcional)" id="end" type="text" placeholder="Rua, Número, Bairro" icon={MapPin} value={formData.end} onChange={(e) => updateForm("end", e.target.value)} required={false} disabled={loading} />
            </>
          )}

          {step === 2 && (
            <>
              <InputField label="Líder Responsável" id="lider" type="text" placeholder="Nome do coordenador/líder" icon={BookUser} value={formData.lider} onChange={(e) => updateForm("lider", e.target.value)} disabled={loading} />
              
              <SelectField 
                label="Possui CNH?" 
                id="hasCnh" 
                icon={CreditCard} 
                value={formData.hasCnh}
                onChange={(e) => updateForm("hasCnh", e.target.value)}
                disabled={loading}
                options={[
                  { value: "sim", label: "Sim, possuo CNH" },
                  { value: "nao", label: "Não possuo" }
                ]}
              />
              
              {formData.hasCnh === "sim" && (
                <div className="flex flex-col gap-1 mt-2">
                  <label className="text-slate-700 font-bold text-xs ml-1 dark:text-gray-300">
                    Anexar CNH (Opcional)
                  </label>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,image/png,image/jpeg" className="hidden" disabled={loading} />
                  <div 
                    onClick={() => !loading && fileInputRef.current.click()}
                    className={`border-2 border-dashed rounded-lg p-4 flex items-center justify-center transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${formData.file ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-blue-500'}`}
                  >
                    <div className={`flex items-center gap-2 ${formData.file ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                      {formData.file ? <CheckCircle2 size={20} /> : <FileText size={20} />}
                      <span className="text-sm font-medium">
                        {formData.file ? formData.file.name : "Clique aqui para anexar seu documento"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Conta Criada!</h2>
              <p className="text-slate-500 text-sm mb-6">Seus dados foram registrados com sucesso no sistema.</p>
              <button 
                onClick={() => navigate("/login")}
                className="w-full bg-[#00337C] hover:bg-[#00285e] text-white text-sm font-bold py-3 rounded-lg transition-all shadow-lg"
              >
                IR PARA O LOGIN
              </button>
            </div>
          )}
        </div>

        {/* BOTÕES DE AÇÃO */}
        {step < 3 && (
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex gap-2">
              {step > 0 && (
                <button 
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white text-sm font-bold py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <ArrowLeft size={16} /> VOLTAR
                </button>
              )}
              <button 
                onClick={handleNext}
                disabled={loading}
                className="flex-[2] bg-[#00337C] hover:bg-[#00285e] text-white text-sm font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-1 shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> SALVANDO...</>
                ) : (
                  <>{step === 2 ? "CONCLUIR CADASTRO" : "AVANÇAR"} <ChevronRight size={16} /></>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-slate-500 dark:text-gray-400 mt-2">
              Já tem uma conta?{" "}
              <button 
                onClick={() => navigate("/login")} 
                disabled={loading}
                className="text-[#00337C] dark:text-blue-400 font-black hover:underline underline-offset-4 disabled:opacity-50"
              >
                ENTRAR AQUI
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}