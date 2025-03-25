import { useState } from "react";
import axios from "axios";
import "../../home/home.css";

const CrearProductoForm = ({ onClose }) => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    moneda: "USD",
    stock: 0,
    categoria: "",
    etiquetas: "",
    imagen_url: "",
    tienda: "",
    autor: "",
    activo: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...producto,
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock),
      etiquetas: producto.etiquetas.split(",").map(et => et.trim()),
    };

    try {
      const endpoint = "/productos";
      await axios.post(`https://slowfashion.onrender.com${endpoint}`, payload);
      alert("Producto creado correctamente");
      setProducto({
        nombre: "", descripcion: "", precio: "", moneda: "USD", stock: 0,
        categoria: "", etiquetas: "", imagen_url: "", tienda: "", autor: "", activo: true
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al crear producto");
    }
  };

  return (
    <form className="crear-producto-form" onSubmit={handleSubmit}>
      <h2>Crear nuevo producto</h2>
      <input name="nombre" placeholder="Nombre" value={producto.nombre} onChange={handleChange} required />
      <textarea name="descripcion" placeholder="Descripción" value={producto.descripcion} onChange={handleChange} required />
      <input name="precio" type="number" step="0.01" placeholder="Precio" value={producto.precio} onChange={handleChange} required />
      <input name="stock" type="number" placeholder="Stock inicial" value={producto.stock} onChange={handleChange} required />
      <input name="categoria" placeholder="Categoría" value={producto.categoria} onChange={handleChange} required />
      <input name="etiquetas" placeholder="Etiquetas (separadas por coma)" value={producto.etiquetas} onChange={handleChange} />
      <input name="imagen_url" placeholder="URL de la imagen" value={producto.imagen_url} onChange={handleChange} />
      <input name="tienda" placeholder="Tienda" value={producto.tienda} onChange={handleChange} required />
      <input name="autor" placeholder="Autor (opcional)" value={producto.autor} onChange={handleChange} />
      <label className="checkbox-label">
        <input type="checkbox" name="activo" checked={producto.activo} onChange={handleChange} />
        Activo
      </label>
      <div className="form-actions">
        <button type="submit">Crear producto</button>
        <button type="button" onClick={onClose} className="cancel-btn">Cerrar</button>
      </div>
    </form>
  );
};

export default CrearProductoForm;
