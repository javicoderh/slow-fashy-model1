import { useState, useEffect } from 'react';
import { useCart } from '../contextos/carritoContext';
import { useUser } from '../contextos/userContext';
import axios from 'axios';
import LoginButton from '../home/loginButton/login';
import BotonConfig from '../home/main/botonConfig/config';
import CarritoFlotante from '../carrito/carrito';
import Isotipo from '../home/isotipo';
import Nav from '../home/nav';
import './checkout.css';

const Checkout = () => {
  const { items: cart, removeItem, clearCart, addItem } = useCart();
  const { usuario } = useUser();
  const fechaActual = new Date().toISOString();
  const fechaEstimada = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [cuponActivo, setCuponActivo] = useState(null);
  const [direccion, setDireccion] = useState("");
  const [recibeCatalogo, setRecibeCatalogo] = useState(false);
  const [usandoCupon, setUsandoCupon] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const descuentoAplicado = subtotal * descuento;
  const subtotalConDescuento = subtotal - descuentoAplicado;
  const iva = subtotalConDescuento * 0.19;
  const total = subtotalConDescuento + iva;

  const aplicarCupon = async () => {
    try {
      const res = await axios.get(`https://slowfashion.onrender.com/cupones/${cupon}`);
      const data = res.data;
      if (!data.activo) throw new Error("Cupón inactivo");
      if (data.limite_uso && data.veces_usado >= data.limite_uso)
        throw new Error("Cupón agotado");

      setDescuento(1 - data.multiplicador);
      setCuponActivo(data);
      alert("Cupón aplicado correctamente");
    } catch (err) {
      alert("Cupón inválido o agotado");
      console.error(err);
    }
  };

  const confirmarCompra = async () => {
    if (!usuario || !usuario.id) {
      alert("Debes iniciar sesión para confirmar la compra");
      return;
    }

    const idPedido = crypto.randomUUID();
    const fecha = new Date().toISOString();

    const pedidoUsuario = {
        id_pedido: idPedido,
        total,
        estado: "pendiente",
        direccion_entrega: direccion,
        descripcion: cart.map(p => `${p.nombre} x${p.cantidad}`).join(", ")
      };

      const pedidoTabla = {
        id: idPedido,
        username: usuario.username,
        nombre: usuario.nombre,
        numero_telefono: usuario.telefono,
        descripcion: cart.map(p => ({
          id_producto: p.id,
          nombre: p.nombre,
          cantidad: p.cantidad
        })),
        total,
        direccion_entrega: direccion,
        estado: "pendiente",
        responsable: "responsable hipotetico"
      };
      

    const factura = {
      fecha_ingreso: fecha,
      total,
      productos: cart.map(p => ({
        nombre: p.nombre,
        precio_unitario: p.precio,
        cantidad: p.cantidad
      })),
      username: usuario.username,
      telefono: usuario.telefono,
      email: usuario.email,
      tienda: cart[0]?.tienda || "sin-tienda"
    };

    try {
        console.log("USUARIO ACTUAL:", usuario);
        console.log(pedidoTabla)
      await axios.post("https://slowfashion.onrender.com/pedidos/", pedidoTabla);
      await axios.post(`https://slowfashion.onrender.com/usuarios/${usuario.id}/pedidos`, pedidoUsuario);
      await axios.post("https://slowfashion.onrender.com/facturas", factura);

      if (cuponActivo) {
        await axios.patch(`https://slowfashion.onrender.com/cupones/${cuponActivo.nombre}`, {
          veces_usado: cuponActivo.veces_usado + 1
        });
      }

      for (const item of cart) {
        await axios.patch(
          `https://slowfashion.onrender.com/productos/${item.id}/veces_comprado?cantidad=${item.cantidad}`
        );
      }

      await axios.patch(`https://slowfashion.onrender.com/usuarios/${usuario.id}/actualizar_catalogo?desea_catalogo=${recibeCatalogo}`);

      clearCart();
      alert("Compra realizada con éxito");
    } catch (err) {
      console.error(err);
      alert("Error al procesar la compra");
    }
  };

  return (
    <div className='homeContainer'>
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
        <div className="checkout-container">
          <h2>Checkout</h2>

          <div className="carrito">
            {cart.map((item) => (
              <div key={item.id} className="carrito-item">
                <img src={item.imagen_portada_url} width={60} alt={item.nombre} />
                <div style={{ flex: 1 }}>
                  <h4>{item.nombre}</h4>
                  <p>{item.precio} x {item.cantidad}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => {
                      const nuevaCantidad = parseInt(e.target.value);
                      if (nuevaCantidad > 0) {
                        addItem(item, nuevaCantidad - item.cantidad); // sumar o restar
                      }
                    }}
                  />
                  <button onClick={() => removeItem(item.id)}>❌</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cupon-section">
            <button onClick={() => setUsandoCupon(!usandoCupon)}>
              {usandoCupon ? "Cancelar cupón" : "Usar cupón"}
            </button>
            {usandoCupon && (
              <div>
                <input
                  type="text"
                  placeholder="Código de cupón"
                  value={cupon}
                  onChange={(e) => setCupon(e.target.value)}
                />
                <button onClick={aplicarCupon}>Aplicar</button>
              </div>
            )}
          </div>

          <div className="resumen">
            <p>Subtotal: ${subtotal.toLocaleString()}</p>
            <p>Descuento: -${descuentoAplicado.toLocaleString()}</p>
            <p>Subtotal con descuento: ${subtotalConDescuento.toLocaleString()}</p>
            <p>IVA (19%): ${iva.toLocaleString()}</p>
            <h3>Total: ${total.toLocaleString()}</h3>
          </div>

          <div className="formulario">
            <input
              type="text"
              placeholder="Dirección de entrega"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={recibeCatalogo}
                onChange={() => setRecibeCatalogo(!recibeCatalogo)}
              />
              Deseo recibir el catálogo mensual
            </label>
            <button onClick={confirmarCompra}>Confirmar compra</button>
          </div>
        </div>
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Checkout;
