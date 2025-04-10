import { useState } from "react";
import axios from "axios";
import "../../home/home.css";

const CrearProductoForm = ({ onClose }) => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    moneda: "CLP", // por consistencia con el backend
    stock: 0,
    categoria: "",
    etiquetas: "",
    imagen_portada_url: "",
    imagenes_url: [""],
    tienda: "",
    autor: "",
    preferencia: "",
    activo: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImagenChange = (index, value) => {
    const nuevas = [...producto.imagenes_url];
    nuevas[index] = value;
    setProducto((prev) => ({ ...prev, imagenes_url: nuevas }));
  };

  const agregarImagen = () => {
    setProducto((prev) => ({
      ...prev,
      imagenes_url: [...prev.imagenes_url, ""],
    }));
  };

  const eliminarImagen = (index) => {
    const nuevas = producto.imagenes_url.filter((_, i) => i !== index);
    setProducto((prev) => ({ ...prev, imagenes_url: nuevas }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...producto,
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock),
      etiquetas: producto.etiquetas.split(",").map((et) => et.trim()),
    };

    try {
      const endpoint = "/productos";
      await axios.post(`https://slowfashion.onrender.com${endpoint}`, payload);
      alert("Producto creado correctamente");
      setProducto({
        nombre: "", descripcion: "", precio: "", moneda: "CLP", stock: 0,
        categoria: "", etiquetas: "", imagen_portada_url: "", imagenes_url: [""],
        tienda: "", autor: "", activo: true
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
      <input name="imagen_portada_url" placeholder="URL de la imagen de portada" value={producto.imagen_portada_url} onChange={handleChange} required />

      <label>Imágenes adicionales (URLs)</label>
      {producto.imagenes_url.map((url, index) => (
        <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder={`Imagen ${index + 1}`}
            value={url}
            onChange={(e) => handleImagenChange(index, e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="button" onClick={() => eliminarImagen(index)}>❌</button>
        </div>
      ))}
      <button type="button" onClick={agregarImagen}>
        ➕ Agregar imagen
      </button>

      <input name="tienda" placeholder="Tienda" value={producto.tienda} onChange={handleChange} required />
      <input name="autor" placeholder="Autor (opcional)" value={producto.autor} onChange={handleChange} />
      <input
        name="preferencia"
        type="number"
        placeholder="Nivel de preferencia (opcional)"
        value={producto.preferencia}
        onChange={handleChange}
      />
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
