import { useState } from "react";
import axios from "axios";
import { useProducts } from "../../contextos/productosContext";
import "./editarProducto.css";

const EditarProductoForm = ({ producto, onClose }) => {
  const [formData, setFormData] = useState({
    ...producto,
    imagenes_url: producto.imagenes_url?.length ? producto.imagenes_url : [""]
  });

  const { productos, setProductos } = useProducts();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImagenChange = (index, value) => {
    const nuevas = [...formData.imagenes_url];
    nuevas[index] = value;
    setFormData((prev) => ({ ...prev, imagenes_url: nuevas }));
  };

  const agregarImagen = () => {
    setFormData((prev) => ({
      ...prev,
      imagenes_url: [...prev.imagenes_url, ""],
      preferencia: producto.preferencia ?? 0
    }));
  };

  const eliminarImagen = (index) => {
    const nuevas = formData.imagenes_url.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, imagenes_url: nuevas }));
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
      const res = await axios.put(`https://slowfashion.onrender.com/productos/${formData.id}`, payload);
      const productoActualizado = res.data.producto;

      const nuevosProductos = productos.map((p) =>
        p.id === productoActualizado.id ? productoActualizado : p
      );
      setProductos(nuevosProductos);

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
          <label htmlFor="categoria">Categoría</label>
          <input name="categoria" value={formData.categoria} onChange={handleChange} required />
          <label htmlFor="etiquetas">Etiquetas / #hashtags</label>
          <input name="etiquetas" value={Array.isArray(formData.etiquetas) ? formData.etiquetas.join(", ") : formData.etiquetas} onChange={handleChange} />
          
          <label htmlFor="imagen_portada_url">Imagen de portada</label>
          <input name="imagen_portada_url" value={formData.imagen_portada_url} onChange={handleChange} required />

          <label>Imágenes adicionales (URLs)</label>
          {formData.imagenes_url.map((url, index) => (
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

          <label htmlFor="tienda">Nombre tienda</label>
          <input name="tienda" value={formData.tienda} onChange={handleChange} required />
          <label htmlFor="autor">Nombre autor</label>
          <input name="autor" value={formData.autor || ""} onChange={handleChange} />
          <label htmlFor="preferencia">Nivel de preferencia</label>
          <input
            name="preferencia"
            type="number"
            value={formData.preferencia}
            onChange={handleChange}
          />
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
