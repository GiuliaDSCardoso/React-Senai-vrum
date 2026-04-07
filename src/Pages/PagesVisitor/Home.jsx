import { useEffect } from "react";
import Body from "../../assets/styles/foreign/Body";

import Header from "../../assets/styles/Header";
import Banner from "../../assets/styles/foreign/banner/banner";


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
      <Header />
      <div className="flex flex-col px-6">
        <h1 className="text-black border-l-2 text-xl border-black/60 pl-4">Notícias</h1>
        <Banner/>
      </div>
      
    </Body>
  );
}
