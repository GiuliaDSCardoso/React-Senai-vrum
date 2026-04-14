import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/PagesVisitor/Home";
import SolicitarViagem from "./Pages/PagesUser/funcionalidade/solicitarViagem";
import ConfigIndex from "./Pages/PagesUser/configpages/ConfigIndex";
import Login from "./Pages/PagesVisitor/Login";
import SignOn from "./Pages/PagesVisitor/SignOn";
import PrivateRoute from "./components/PrivateRoute";
import DadosPessoais from "./Pages/PagesUser/configpages/DadosPessoais";
import HomeUser from "./Pages/PagesUser/HomeUser";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === ROTAS PÚBLICAS === */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signon" element={<SignOn />} />
        <Route path="/solicitarViagem" element={<SolicitarViagem />} />
        <Route path="/config" element={<ConfigIndex />} />

        {/* === ROTAS PRIVADAS === */}
        {/* Devem estar dentro de <Routes> para funcionar */}
     
        <Route
          path="/homeuser"
          element={
            <PrivateRoute>
              <HomeUser />
            </PrivateRoute>
          }
        />
         <Route
          path="/configindex"
          element={
            <PrivateRoute>
              <ConfigIndex />
            </PrivateRoute>
          }
        />
        <Route
          path="/dadospessoaisuser"
          element={
            <PrivateRoute>
              <DadosPessoais />
            </PrivateRoute>
          }
        />
        
        {/* Rota de Fallback (Opcional: redireciona se a página não existir) */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}