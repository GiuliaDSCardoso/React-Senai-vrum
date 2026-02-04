
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Públicas */}
        <Route path="/" element={<Home />} />
      

      </Routes>
    </BrowserRouter>
  );
}
