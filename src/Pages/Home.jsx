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
             <header className="flex flex-col gap-3 items-center justify-center mt-[10%]  h-[20vh] ">
                <TextTitle>BEM VINDO(a)</TextTitle>
                <h2 className="text-xl text-center md:text-2xl">
                    Aqui você pode solicitar veículos e realizar devoluções!
                </h2>
             </header>
             {/* Main Content Area */}
             <div className="md:flex-row flex-col flex md:justify-center items-center gap-6">
                <Cards>
                    <FileTextIcon className="w-12 h-12 text-[#0055dd71]"/>
                    <h3 className="text-2xl text-[#0055dd71] font-bold"> Minhas Solicitações</h3>
                </Cards>
                <Cards>
                    <CarFrontIcon className="w-12 h-12 text-[#0055dd71]"/>
                    <h3 className="text-2xl text-[#0055dd71] font-bold"> Minhas Solicitações</h3>
                </Cards>
                <Cards>
                    <img src="../public/ViagensProgramadas.svg"  className="w-12 h-12 text-[#0055dd71]"/>
                    <h3 className="text-2xl text-[#0055dd71] font-bold"> Minhas Solicitações</h3>
                </Cards>
                <Cards>
                    <FuelIcon className="w-12 h-12 text-[#0055dd71]"/>
                    <h3 className="text-2xl text-[#0055dd71] font-bold"> Minhas Solicitações</h3>
                </Cards>
             </div>
             
        </Body>
           
        
    )
}