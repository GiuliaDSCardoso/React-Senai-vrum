import TextTitle from "./TextTitle";

export default function Header(){
    return(
        <div>
            <header className="flex flex-col gap-3 items-center justify-center h-[30vh]">
                    <TextTitle>BEM VINDO(a)</TextTitle>
                    <h2 className="hidden text-textColor dark:text-white md:flex text-center md:text-2xl">
                      Aqui você pode solicitar veículos e realizar devoluções!
                    </h2>
                    <h2 className="md:hidden text-textColor dark:text-white text-center text-xl md:text-2xl">
                      Aqui você pode solicitar veículos <br /> e realizar devoluções!
                    </h2>
            </header>
        </div>
    );

}