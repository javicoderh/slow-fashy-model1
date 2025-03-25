import { useState, useEffect } from "react";
import axios from "axios";
import EditarProductoForm from "./editarProductoForm";
import "./editarProducto.css";

const ListaProductos = ({ onClose }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get("https://slowfashion.onrender.com/productos");
        setProductos(res.data.productos);
      } catch (err) {
        console.error("Error al obtener productos", err);
      }
    };
    fetchProductos();
  }, []);

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

      <div className="grilla-productos">
      {productos
  .filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )
  .map((producto) => (
    <div className="producto-card" key={producto.id}>
      <img src={producto.imagen_url} alt={producto.nombre} />
      <p>{producto.nombre}</p>
      <button onClick={() => setProductoSeleccionado(producto)}>
        Editar
      </button>
    </div>
))}
      </div>
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
