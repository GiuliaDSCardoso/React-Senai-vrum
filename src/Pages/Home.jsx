import { useEffect } from "react";
import Body from "../assets/styles/Body";
import Cards from "../assets/styles/Cards";

import Header from "../assets/styles/Header";
import MenuLateral from "../assets/styles/MenuLateral";


export default function Home() {
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "=")) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Body>
      <MenuLateral />
      <Header/>
      

      <div className="flex-row md:px-10 md:mx-6 items-center justify-center flex md:justify-center gap-4">
        <div className="flex flex-col gap-4">
          <Cards
            href="/solicitarViagem"
            item={<img className="max-w-full max-h-full" src="/iconOrdem.png" />}
            texto={<>Minhas <br /> Solicitações</>}
          />

          <Cards
            item={<img className="max-w-full max-h-full" src="/iconCarro.png" />}
            texto={<>Solicitar <br /> Viagens</>}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Cards
            item={<img className="max-w-full max-h-full" src="/iconViagem.png" />}
            texto="Viagens Programadas"
          />

          <Cards
            item={<img className="max-w-full max-h-full" src="/iconGasolina.png" />}
            texto="Senha de abastecimento"
          />
        </div>
      </div>
    </Body>
  );
}
