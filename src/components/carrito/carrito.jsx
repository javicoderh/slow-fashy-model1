import { useState } from 'react';
import { useCart } from '../contextos/carritoContext';
import './carrito.css';

const CarritoFlotante = () => {
  const [abierto, setAbierto] = useState(false);
  const { items, total, removeItem } = useCart();

  const toggleCarrito = () => setAbierto(!abierto);

  return (
    <>
      {/* Botón flotante */}
      <button className="carrito-boton" onClick={toggleCarrito}>
        🛒
        {items.length > 0 && <span className="carrito-cantidad">{items.length}</span>}
      </button>

      {/* Modal desplegable */}
      <div className={`carrito-modal ${abierto ? 'abierto' : ''}`}>
        <h2>Carrito de compras</h2>
        {items.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div className="carrito-items">
            {items.map((item, i) => (
              <div key={i} className="carrito-item">                
                <p>{item.nombre}</p>
                <div className="carritoNest">
                    <img className='productCarritoImg' src={item.imagen_portada_url} height={100} alt="" />
                    <div className="botonBorrarNest">
                        <p>{item.cantidad} unidad{item.cantidad > 1 ? 'es' : ''}</p>
                        <button className="carrito-eliminar" onClick={() => removeItem(item.id)}>
                        🗑️
                        </button>
                    </div>

                </div>
              </div>
            ))}
            <hr />
            <p className="carrito-total">Total: {total.toLocaleString()} CLP</p>
            <button className="carrito-pagar" onClick={() => window.location.href = '/checkout'}>
              Ir a pagar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CarritoFlotante;
