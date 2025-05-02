import { useState } from "react";
import axios from "axios";
import "./articulos.css";

const EditarArticuloForm = ({ articulo, onClose }) => {
  const [form, setForm] = useState({
    ...articulo,
    gallery: articulo.gallery || [""],
    enlaces: articulo.enlaces || [""],
    etiquetas: articulo.etiquetas || [""],
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const nuevoArray = [...form[field]];
    nuevoArray[index] = value;
    setForm((prev) => ({ ...prev, [field]: nuevoArray }));
  };

  const agregarCampo = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const eliminarCampo = (field, index) => {
    const nuevoArray = form[field].filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, [field]: nuevoArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      preferencia: parseInt(form.preferencia),
      gallery: (form.gallery || []).filter((url) => url.trim() !== ""),
      enlaces: (form.enlaces || []).filter((link) => link.trim() !== ""),
      etiquetas: (form.etiquetas || []).filter((tag) => tag.trim() !== ""),
    };

    try {
      await axios.patch(`https://slowfashion.onrender.com/articulos/${form.id}`, payload);
      setMensaje("✅ Artículo actualizado correctamente");
      setTimeout(() => {
        setMensaje("");
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error al actualizar artículo:", err);
      setMensaje("❌ Error al actualizar el artículo");
    }
  };

  return (
    <form className="crear-producto-form" onSubmit={handleSubmit}>
      <h2>Editar artículo</h2>

      <input
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        placeholder="Título"
        required
      />

      <input
        name="bajada"
        value={form.bajada}
        onChange={handleChange}
        placeholder="Bajada"
        required
      />

      <textarea
        name="contenido"
        value={form.contenido}
        onChange={handleChange}
        placeholder="Contenido"
        required
      />

      <input
        name="imagen_destacada"
        value={form.imagen_destacada || ""}
        onChange={handleChange}
        placeholder="Imagen destacada (URL)"
      />

      <input
        name="fecha_publicacion"
        type="date"
        value={form.fecha_publicacion || ""}
        onChange={handleChange}
      />

      <input
        name="autor"
        value={form.autor}
        onChange={handleChange}
        placeholder="Autor"
      />

      <label>Etiquetas</label>
      {(form.etiquetas || []).map((tag, index) => (
        <div key={index} className="url-input">
          <input
            type="text"
            value={tag}
            onChange={(e) => handleArrayChange("etiquetas", index, e.target.value)}
            placeholder={`Etiqueta ${index + 1}`}
          />
          <button type="button" onClick={() => eliminarCampo("etiquetas", index)}>❌</button>
        </div>
      ))}
      <button type="button" onClick={() => agregarCampo("etiquetas")}>➕ Agregar etiqueta</button>

      {/* Opcionales adicionales si los manejas en tu modelo extendido */}
      <label>Galería de imágenes</label>
      {(form.gallery || []).map((url, index) => (
        <div key={index} className="url-input">
          <input
            type="text"
            value={url}
            onChange={(e) => handleArrayChange("gallery", index, e.target.value)}
            placeholder={`Imagen ${index + 1}`}
          />
          <button type="button" onClick={() => eliminarCampo("gallery", index)}>❌</button>
        </div>
      ))}
      <button type="button" onClick={() => agregarCampo("gallery")}>➕ Agregar imagen</button>

      <label>Enlaces</label>
      {(form.enlaces || []).map((link, index) => (
        <div key={index} className="url-input">
          <input
            type="text"
            value={link}
            onChange={(e) => handleArrayChange("enlaces", index, e.target.value)}
            placeholder={`Enlace ${index + 1}`}
          />
          <button type="button" onClick={() => eliminarCampo("enlaces", index)}>❌</button>
        </div>
      ))}
      <button type="button" onClick={() => agregarCampo("enlaces")}>➕ Agregar enlace</button>

      <div className="form-actions">
        <button type="submit">Guardar cambios</button>
        <button type="button" onClick={onClose} className="cancel-btn">Cerrar</button>
      </div>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default EditarArticuloForm;
