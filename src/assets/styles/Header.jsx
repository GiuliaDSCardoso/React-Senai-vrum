import TextTitle from "./TextTitle";

export default function Header(){
    return(
        <div>
            <header className="flex flex-col items-center justify-center h-[20vh]">
                    <TextTitle>BEM VINDO(a)</TextTitle>
                    <h2 className="hidden  text-[#A1A7AD] dark:text-white md:flex text-center md:text-md">
                      Aqui você pode solicitar  veículos e realizar devoluções!
                    </h2>
                    <h2 className="md:hidden text-[#A1A7AD] dark:text-white text-center text-sm md:text-md">
                      Aqui você pode solicitar veículos <br /> e realizar devoluções!
                    </h2>
            </header>
        </div>
    );

}