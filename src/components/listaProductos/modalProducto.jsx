import { useState } from 'react';
import './listaProductos.css';

const ModalProducto = ({ producto, onClose, onAgregar }) => {
  if (!producto) return null;

  const imagenes = producto.imagenes_url || [];
  const [index, setIndex] = useState(0);

  const siguiente = () => setIndex((prev) => (prev + 1) % imagenes.length);
  const anterior = () => setIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        {imagenes.length > 0 && (
          <div className="carousel">
            <img className="carousel-img" src={imagenes[index]} alt={`Imagen ${index + 1}`} />
            {imagenes.length > 1 && (
              <>
                <button className="btn-carrusel izq" onClick={anterior}>‹</button>
                <button className="btn-carrusel der" onClick={siguiente}>›</button>
              </>
            )}
          </div>
        )}
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p className="producto-precio">{producto.precio} CLP</p>
        <p className="producto-autor">
          {producto.autor ? `Diseñado por ${producto.autor}` : 'Autor desconocido'}
        </p>
        <button className="boton-agregar" onClick={() => onAgregar(producto)}>
          Agregar al carrito
        </button>
        <button className="boton-cerrar" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalProducto;
