export default function InputLogin({ text, type, placeholder, dica }) {
    return (
        <div className="w-full">
            <label className="text-white/85 w-full text-sm mb-1 block">{text}</label>
            <input 
                type={type} 
                className="w-full p-3  rounded-lg bg-[#ffffff07] border-[3px] border-[#ffffff07] focus:border-[#ffffff0f] focus:bg-[#ffffff0f] transition-colors duration-300 text-white outline-none"
                placeholder={placeholder}
            />  
            <div className="flex  gap-2">
                <p className="text-[#0fd68ab7] text-xs font-medium mt-1">* Dica:</p>
                 <p className="text-[#0fd68ab7] text-xs mt-1">{dica}</p>
            </div>
        

        </div>
    );
}