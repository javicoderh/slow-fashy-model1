// crearArticulosForm.jsx
import { useState } from "react";
import axios from "axios";
import "./articulos.css";

const CrearArticuloForm = ({ onClose }) => {
  const [articulo, setArticulo] = useState({
    titulo: "",
    contenido: "",
    autor: "",
    preferencia: "",
    gallery: [""],
    enlaces: [""],
    activo: true
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArticulo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const nuevoArray = [...articulo[field]];
    nuevoArray[index] = value;
    setArticulo((prev) => ({ ...prev, [field]: nuevoArray }));
  };

  const agregarCampo = (field) => {
    setArticulo((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const eliminarCampo = (field, index) => {
    const nuevoArray = articulo[field].filter((_, i) => i !== index);
    setArticulo((prev) => ({ ...prev, [field]: nuevoArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      ...articulo,
      preferencia: parseInt(articulo.preferencia),
      gallery: articulo.gallery.filter((url) => url.trim() !== ""),
      enlaces: articulo.enlaces.filter((link) => link.trim() !== ""),
    };
  
    try {
      await axios.post("https://slowfashion.onrender.com/articulos", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMensaje("✅ Artículo creado correctamente");
      setTimeout(() => {
        setMensaje("");
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error al crear artículo:", err.response?.data || err.message);
      setMensaje("❌ Error al crear el artículo");
    }
  };
  

  return (
    <form className="crear-producto-form" onSubmit={handleSubmit}>
      <h2>Crear nuevo artículo</h2>
      <input name="titulo" placeholder="Título" value={articulo.titulo} onChange={handleChange} required />
      <textarea name="contenido" placeholder="Contenido" value={articulo.contenido} onChange={handleChange} required />
      <input name="autor" placeholder="Autor" value={articulo.autor} onChange={handleChange} />
      <input name="preferencia" type="number" placeholder="Preferencia" value={articulo.preferencia} onChange={handleChange} />

      <label>Galería de imágenes</label>
      {articulo.gallery.map((url, index) => (
        <div key={index} className="url-input">
          <input
            type="text"
            placeholder={`Imagen ${index + 1}`}
            value={url}
            onChange={(e) => handleArrayChange("gallery", index, e.target.value)}
          />
          <button type="button" onClick={() => eliminarCampo("gallery", index)}>❌</button>
        </div>
      ))}
      <button type="button" onClick={() => agregarCampo("gallery")}>➕ Agregar imagen</button>

      <label>Enlaces (opcional)</label>
      {articulo.enlaces.map((link, index) => (
        <div key={index} className="url-input">
          <input
            type="text"
            placeholder={`Enlace ${index + 1}`}
            value={link}
            onChange={(e) => handleArrayChange("enlaces", index, e.target.value)}
          />
          <button type="button" onClick={() => eliminarCampo("enlaces", index)}>❌</button>
        </div>
      ))}
      <button type="button" onClick={() => agregarCampo("enlaces")}>➕ Agregar enlace</button>

      <label className="checkbox-label">
        <input type="checkbox" name="activo" checked={articulo.activo} onChange={handleChange} />
        Activo
      </label>

      <div className="form-actions">
        <button type="submit">Crear artículo</button>
        <button type="button" onClick={onClose} className="cancel-btn">Cerrar</button>
      </div>
    </form>
  );
};

export default CrearArticuloForm;
