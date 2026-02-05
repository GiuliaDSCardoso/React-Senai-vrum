import { CarFrontIcon, FileTextIcon, FuelIcon } from "lucide-react";
import Body from "../assets/styles/Body";
import Cards from "../assets/styles/Cards";
import Nav from "../assets/styles/Nav";
import TextTitle from "../assets/styles/TextTitle";

export default function Home() {
    return(
        <Body>
            {/* Navigation Bar */}
             <Nav />
             {/* Header Section */}
             <header className="flex flex-col gap-3 items-center justify-center   h-[30vh] ">
                <TextTitle>BEM VINDO(a)</TextTitle>
                <h2 className="hidden md:flex text-center md:text-2xl">
                    Aqui você pode solicitar veículos e realizar devoluções!
                </h2>
                <h2 className=" md:hidden text-center text-xl md:text-2xl">
                    Aqui você pode solicitar veículos <br/> e realizar devoluções!
                </h2>
             </header>
             {/* Main Content Area */}
             <div className="flex-row  md:px-4  justify-center flex md:justify-center items-center gap-2">
                <div className="flex flex-col gap-4 md:flex-row">
                    <Cards
                        item={<FileTextIcon className="md:w-12 md:h-12 w-8 h-8 text-[#0055dd71]" />}
                        texto="Minhas Solicitações"
                        />

                    <Cards
                        item = {<CarFrontIcon className="md:w-12 md:h-12 w-8 h-8 text-[#0055dd71]"/>}
                        texto="Minhas Solicitações"
                    />
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                    <Cards
                        item = {<img src="../public/ViagensProgramadas.svg"  className="md:w-12 md:h-12 w-8 h-8 text-[#0055dd71]"/>}
                        texto ="Minhas Solicitações"
                    />
                    <Cards
                        item = {<FuelIcon className="md:w-12 md:h-12 w-8 h-8 text-[#0055dd71]"/>}
                        texto = " Minhas Solicitações"
                    />
                </div>
             </div>
             
        </Body>
    
        
    )
}