
import InputLogin from "../../assets/styles/foreign/Input/InputLogin";

export default function Login() {
  return (
    <div 
      className="justify-center w-full items-center flex h-screen bg-no-repeat bg-cover" 
      style={{ backgroundImage: "url('/bgLogin/right-image.png')" }}
    >
      <div className="
        w-[50%] h-3/5 
        /* GRADIENTE E VIDRO */
        bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.15)_100%)] 
        backdrop-blur-md 
        rounded-2xl
        /* PRIMEIRA BORDA (Interna) - Mais sólida */
        border-[3px] border-[#ffffff07]

       
                
        /* EFEITO DE LUZ E SOMBRA COMBINADOS */
        /* Sombra: 10px direita, 10px baixo | Luz: -5px esquerda, -5px cima */
        shadow-[10px_10px_30px_rgba(0,0,40,0.6)]
        
        flex items-start py-24 justify-center
      ">
        <div className="w-[80%] px-16 justify-center items-center flex-col  flex gap-6">
            <div className=" flex-col flex ">
               <h1 className="text-white  font-semibold text-2xl tracking-widest">Bem vindo(a)!</h1> 
               <p className="text-white/75 ">Faça login para continuar</p> 
            </div>
           <div className="w-full  items-center gap-4 flex flex-col ">
            <div className="w-full ">
                <div className="w-full  flex flex-col gap-4">
                    <InputLogin
                    text="E-mail :"
                    type="email"
                    placeholder="Digite seu e-mail"
                    dica="Insira seu e-mail institucional para acessar o sistema"
                    />
                    <InputLogin
                    text="Senha :"
                    type="password"
                    placeholder="Digite sua senha"
                    dica="Insira sua senha cadastrada para acessar o sistema"
                    />
                </div>
                <a href="#" className="text-[#ffffffbb] text-[13px] hover:underline">
                  Esqueceu sua senha?
                </a>
            </div>
            
            <div className="w-full gap-2 flex  justify-center items-center flex-col">
                
                <button className="bg-[#4754ce] w-full hover:bg-[#2249d6]/20 border-2 border-white/10 text-white font-bold py-2 rounded-lg transition-colors duration-300">
                Entrar
                </button>
                <a href="#" className="text-white/75 text-[12px] hover:underline">
                  Não tem uma conta? Cadastre-se
                </a>
            </div>
            
           </div>
          
        </div>
       
        
      </div>
    </div>
  );
}