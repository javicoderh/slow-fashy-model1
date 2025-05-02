// ListaArticulosEdit.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import EditarArticuloForm from "./editarArticulosForm";
import "./articulos.css"; // asegúrate de tener este archivo o crearlo

const ListaArticulosEdit = () => {
  const [articulos, setArticulos] = useState([]);
  const [articuloEditando, setArticuloEditando] = useState(null);
  const [mostrarLista, setMostrarLista] = useState(false);

  useEffect(() => {
    if (!mostrarLista) return;
    const fetchArticulos = async () => {
      try {
        const res = await axios.get("https://slowfashion.onrender.com/articulos");
        setArticulos(res.data);
      } catch (err) {
        console.error("Error al cargar artículos:", err);
      }
    };
    fetchArticulos();
  }, [mostrarLista]);

  const handleEditar = (articulo) => {
    setArticuloEditando(articulo);
  };

  const cerrarModal = () => {
    setArticuloEditando(null);
  };

  return (
    <div className="lista-articulos-edit">
      {!mostrarLista ? (
        <button className="abrir-form-btn" onClick={() => setMostrarLista(true)}>
          Editar artículos
        </button>
      ) : (
        <>
          <h2>Lista de Artículos</h2>
          {articulos.map((art) => (
            <div key={art.id} className="item-articulo">
              <strong>{art.titulo}</strong>
              <button className="editar-btn" onClick={() => handleEditar(art)}>✏️ Editar</button>
            </div>
          ))}
        </>
      )}

      {articuloEditando && (
        <EditarArticuloForm articulo={articuloEditando} onClose={cerrarModal} />
      )}
    </div>
  );
};

export default ListaArticulosEdit;
