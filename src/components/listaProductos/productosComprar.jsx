import { useState } from 'react';
import { useCart } from '../contextos/carritoContext';
import { useProducts } from '../contextos/productosContext';
import './listaProductos.css';
import Isotipo from '../home/isotipo';
import Nav from '../home/nav';
import LoginButton from '../home/loginButton/login';
import CarritoFlotante from '../carrito/carrito';
import ModalProducto from './modalProducto';
import BotonConfig from '../home/main/botonConfig/config';

const ProductosComprar = () => {
  const { addItem } = useCart();
  const { productos, loading } = useProducts();
  const [productoActivo, setProductoActivo] = useState(null);
  const [orden, setOrden] = useState("ponderacion");

  const calcularPonderacion = (producto) =>
    (producto.preferencia ?? 0) * 5 +
    (producto.veces_comprado ?? 0) * 4 +
    (producto.veces_visto ?? 0) * 2;

  let productosOrdenados = [...productos];

  if (orden === "ponderacion") {
    productosOrdenados.sort((a, b) => calcularPonderacion(b) - calcularPonderacion(a));
  } else if (orden === "fecha") {
    productosOrdenados.sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en));
  } else if (orden === "descuento") {
    productosOrdenados.sort((a, b) => (b.descuento ?? 0) - (a.descuento ?? 0));
  }

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
        <BotonConfig />
        <CarritoFlotante />
      </header>
      <main>
        <h1>Lista de Productos</h1>

        <div className="orden-tabs">
          <button onClick={() => setOrden("ponderacion")} className={orden === "ponderacion" ? "active" : ""}>
            Recomendados
          </button>
          <button onClick={() => setOrden("fecha")} className={orden === "fecha" ? "active" : ""}>
            Más reciente
          </button>
          <button onClick={() => setOrden("descuento")} className={orden === "descuento" ? "active" : ""}>
            Mayor descuento
          </button>
        </div>

        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="productos-grid">
            {productosOrdenados.map(producto => (
              <div
                key={producto.id}
                className="producto-card"
                onClick={() => setProductoActivo(producto)}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                {producto.descuento !== null && producto.descuento !== undefined && producto.descuento > 0 && (
                  <div className="badge-descuento">
                    -{Math.round(producto.descuento * 100)}%
                  </div>
                )}
                <img className='cardImg' src={producto.imagen_portada_url} alt={producto.nombre} />
                <h2>{producto.nombre}</h2>
                {producto.descuento !== null && producto.descuento !== undefined && producto.descuento > 0 ? (
                  <p>
                    <span className="precio-original">${producto.precio.toLocaleString()}</span><br />
                    <span className="precio-con-descuento">
                      ${(producto.precio * (1 - producto.descuento)).toLocaleString()}
                    </span>
                  </p>
                ) : (
                  <p className="precio-normal">${producto.precio.toLocaleString()}</p>
                )}
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
