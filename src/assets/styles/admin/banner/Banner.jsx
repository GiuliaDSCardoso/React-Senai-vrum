import { useEffect, useState } from "react";
import { Plus, Pencil, X } from "lucide-react";

export default function Banner() {
  const [imagens, setImagens] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const [fileLight, setFileLight] = useState(null);
  const [fileDark, setFileDark] = useState(null);
  const [link, setLink] = useState("");

  // Ajuste estas URLs para o seu backend local
  const API_URL = "http://localhost:3000/Banner";
  const UPLOAD_URL = "http://localhost:3000/upload"; // URL para processar arquivos

  useEffect(() => {
    carregar();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  async function carregar() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setImagens(data);
    } catch (error) {
      console.error("Erro ao carregar dados locais:", error);
    }
  }

  function abrirModal(item = null) {
    setEditando(item);
    setLink(item?.link || "");
    setFileLight(null);
    setFileDark(null);
    setModalAberto(true);
  }

  // Simulação de Upload para Localhost usando FormData
  async function uploadImagem(file) {
    if (!file) return null;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro no upload");

      const data = await response.json();
      // O seu backend deve retornar a URL onde o arquivo foi salvo (ex: http://localhost:3000/uploads/foto.png)
      return data.url;
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar imagem para o servidor local");
      return null;
    }
  }

  async function salvar() {
    let urlLight = editando?.img_light || null;
    let urlDark = editando?.img_dark || null;

    if (!editando && imagens.length >= 6) {
      alert("Máximo de 6 imagens");
      return;
    }

    if (!editando && (!fileLight || !fileDark)) {
      alert("Envie as duas imagens.");
      return;
    }

    // 🔹 Upload para o seu servidor local
    if (fileLight) {
      const upload = await uploadImagem(fileLight);
      if (!upload) return;
      urlLight = upload;
    }

    if (fileDark) {
      const upload = await uploadImagem(fileDark);
      if (!upload) return;
      urlDark = upload;
    }

    const payload = {
      img_light: urlLight,
      img_dark: urlDark,
      link,
    };

    try {
      const method = editando ? "PUT" : "POST";
      const url = editando ? `${API_URL}/${editando.id}` : API_URL;

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setModalAberto(false);
        carregar();
      }
    } catch (error) {
      console.error("Erro ao salvar no servidor local:", error);
    }
  }

  async function excluir(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      carregar();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  }

  return (
    <>
      {/* GRID */}
      <div className="flex-col max-w-6xl gap-4 flex">
        <div className="flex w-full gap-4 flex-wrap">
          {imagens.map((item) => (
            <div
              key={item.id}
              className="relative w-24 h-24 md:w-56 md:h-48 rounded-xl overflow-hidden border-2 shadow"
            >
              <img
                src={isDark ? item.img_dark : item.img_light}
                alt="preview"
                className="w-full h-full object-cover"
              />

              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => abrirModal(item)}
                  className="bg-blue-600 p-1 rounded text-white"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => excluir(item.id)}
                  className="bg-red-600 p-1 rounded text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}

          {imagens.length < 6 && (
            <button
              onClick={() => abrirModal()}
              className="md:w-56 md:h-48 text-textColor/40 dark:text-white/50 w-24 h-24 border-2 border-dashed rounded-xl dark:hover:bg-[#001438] hover:bg-[#d3e3ff] flex items-center justify-center text-gray-400 transition"
            >
              <Plus size={40} />
            </button>
          )}
        </div>
      </div>

      {/* MODAL (O JSX permanece o mesmo, mudando apenas a lógica de fechar e salvar) */}
      {modalAberto && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setModalAberto(false)}
        >
          <div
            className="bg-white dark:bg-[#0b1e3a] p-6 rounded-xl w-[90%] max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              {editando ? "Editar Imagem" : "Adicionar Nova Imagem"}
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-lg font-medium flex gap-1 text-gray-700 dark:text-white">
                  Imagem Light <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFileLight(e.target.files?.[0])}
                  className="w-full h-[50px] flex items-center justify-between rounded-lg cursor-pointer bg-[#f4f8ff] dark:bg-textColor/20 text-blue-800 dark:text-white border border-dashed border-blue-300 dark:border-blue-900 file:mr-4 file:h-[50px] file:px-4 file:bg-blue-600 file:text-white"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-lg font-medium flex gap-1 text-gray-700 dark:text-white">
                  Imagem Dark <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFileDark(e.target.files?.[0])}
                  className="w-full h-[50px] flex items-center justify-between rounded-lg cursor-pointer bg-[#f4f8ff] dark:bg-textColor/20 text-blue-800 dark:text-white border border-dashed border-blue-300 dark:border-blue-900 file:mr-4 file:h-[50px] file:px-4 file:bg-blue-600 file:text-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold dark:text-white">Link da Imagem</label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="border h-[50px] bg-[#f4f8ff] dark:bg-textColor/20 border-blue-300 dark:border-blue-900 rounded-lg px-3"
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-3 mt-6">
              <button
                onClick={() => setModalAberto(false)}
                className="h-[48px] hover:bg-blue-500 w-full bg-blue-400 rounded text-white"
              >
                Cancelar
              </button>
              <button
                onClick={salvar}
                className="h-[50px] hover:bg-[#001438] w-full bg-[#0E4194] text-white rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}