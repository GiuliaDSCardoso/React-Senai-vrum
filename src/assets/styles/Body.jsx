

export default function Body(props){
    return(
        <div className="flex flex-col  items-center min-h-screen w-screen mx-0 ">
            <div className="flex-grow items-center  w-full ">
                {props.children}
            </div>
            <footer className="w-full bg-[#b3d0ff42] mb-[-15%] ">
                <h3 className="pt-2 pb-2 text-md md:text-2xl text-center">
                    LIGUE <b>MOVIDA 0800-7222212</b>  PARA REBOQUE
                </h3>
            </footer>
        </div>
        
        
    )
}