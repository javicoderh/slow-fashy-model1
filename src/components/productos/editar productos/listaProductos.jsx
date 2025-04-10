import { useState } from "react";
import { useProducts } from "../../contextos/productosContext"; // Usamos el contexto
import EditarProductoForm from "./editarProductoForm";
import "./editarProducto.css";

const ListaProductos = ({ onClose }) => {
  const { productos, loading } = useProducts(); // productos globales
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="lista-productos-wrapper">
      <div className="top-bar">
        <h2>Editar productos</h2>
        <button className="cerrar-btn" onClick={onClose}>Cerrar</button>
      </div>
      <label htmlFor="Buscar Producto">Buscar Producto:</label>
      <input
        name="Buscar Producto"
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="grilla-productos">
          {productosFiltrados.map((producto) => (
            <div className="producto-card" key={producto.id}>
              <img src={producto.imagen_url} alt={producto.nombre} />
              <p>{producto.nombre}</p>
              <button onClick={() => setProductoSeleccionado(producto)}>
                Editar
              </button>
            </div>
          ))}
        </div>
      )}

      {productoSeleccionado && (
        <EditarProductoForm 
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default ListaProductos;
