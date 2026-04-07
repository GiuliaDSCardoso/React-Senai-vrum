import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/PagesVisitor/Home";
import SolicitarViagem from "./Pages/PagesUser/funcionalidade/solicitarViagem";
import ConfigIndex from "./Pages/PagesUser/configpages/ConfigIndex";
import Login from "./Pages/PagesVisitor/Login";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/solicitarViagem" element={<SolicitarViagem />} />
          <Route path="/config" element={<ConfigIndex />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
