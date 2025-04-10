import { useState } from 'react';
import { useCart } from '../contextos/carritoContext';
import { useProducts } from '../contextos/productosContext';
import './listaProductos.css';
import Isotipo from '../home/isotipo';
import Nav from '../home/nav';
import LoginButton from '../home/loginButton/login';
import CarritoFlotante from '../carrito/carrito';
import ModalProducto from './modalProducto';

const ProductosComprar = () => {
  const { addItem } = useCart();
  const { productos, loading } = useProducts();
  const [productoActivo, setProductoActivo] = useState(null);

  return (
    <div className="homeContainer">
      <header>
        <div className="nestIsoTit">
          <a href="/" className="logo-link">
            <Isotipo />
          </a>
          <h1 style={{ fontFamily: 'Georgia, serif', letterSpacing: '2px', fontWeight: 'bold' }}>
            SLOW<span style={{ color: '#888' }}>FASHION</span>
          </h1>
        </div>
        <Nav />
        <LoginButton />
        <CarritoFlotante />
      </header>
      <main>
        <h1>Lista de Productos</h1>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="productos-grid">
            {productos.map(producto => (
              <div
                key={producto.id}
                className="producto-card"
                onClick={() => setProductoActivo(producto)}
                style={{ cursor: 'pointer' }}
              >
                <img className='cardImg' src={producto.imagen_portada_url} alt={producto.nombre} />
                <h2>{producto.nombre}</h2>
              </div>
            ))}
          </div>
        )}
        <ModalProducto
          producto={productoActivo}
          onClose={() => setProductoActivo(null)}
          onAgregar={addItem}
        />
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default ProductosComprar;
