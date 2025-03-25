import { useState } from "react";
import axios from "axios";
import "./editarProducto.css";

const EditarProductoForm = ({ producto, onClose }) => {
  const [formData, setFormData] = useState({ ...producto });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      etiquetas: typeof formData.etiquetas === "string"
        ? formData.etiquetas.split(",").map((et) => et.trim())
        : formData.etiquetas,
    };

    try {
      await axios.put(`https://slowfashion.onrender.com/productos/${formData.id}`, payload);
      alert("Producto actualizado correctamente");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar producto");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-form">
        <h2>Editar producto</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input name="nombre" value={formData.nombre} onChange={handleChange} required />
          <label htmlFor="descripcion">Descripción</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
          <label htmlFor="precio">Precio</label>
          <input name="precio" type="number" step="0.01" value={formData.precio} onChange={handleChange} required />
          <label htmlFor="stock">Stock</label>
          <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
          <label htmlFor="categoria">Categoria</label>
          <input name="categoria" value={formData.categoria} onChange={handleChange} required />
          <label htmlFor="etiquetas">Etiquetas / #hashtags</label>
          <input name="etiquetas" value={Array.isArray(formData.etiquetas) ? formData.etiquetas.join(", ") : formData.etiquetas} onChange={handleChange} />
          <label htmlFor="imagen_url">Imagen Url</label>
          <input name="imagen_url" value={formData.imagen_url} onChange={handleChange} />
          <label htmlFor="tienda">Nombre tienda</label>
          <input name="tienda" value={formData.tienda} onChange={handleChange} required />
          <label htmlFor="autor">Nombre autor</label>
          <input name="autor" value={formData.autor || ""} onChange={handleChange} />
          <label className="checkbox-label">
            <input type="checkbox" name="activo" checked={formData.activo} onChange={handleChange} />
            Activo
          </label>
          <div className="form-actions">
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarProductoForm;
