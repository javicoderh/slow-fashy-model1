import { useState } from "react";
import ListaProductos from "./listaProductos";
import "./editarProducto.css";

const EditarProducto = () => {
  const [mostrarLista, setMostrarLista] = useState(false);

  return (
    <div className="editar-producto-container">
      {!mostrarLista ? (
        <button onClick={() => setMostrarLista(true)} className="abrir-lista-btn">
          Editar producto
        </button>
      ) : (
        <ListaProductos onClose={() => setMostrarLista(false)} />
      )}
    </div>
  );
};

export default EditarProducto;
