
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SolicitarViagem from "./Pages/solicitarViagem";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/solicitarViagem" element={<SolicitarViagem />} />

      </Routes>
    </BrowserRouter>
  );
}
