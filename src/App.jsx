import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import UsuarioForm from './components/usuarios/registro'
import Dashboardproductos from './components/productos/dashboard'
import ProductosComprar from './components/listaProductos/productosComprar'
import Checkout from './components/checkout/checkout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<UsuarioForm />} />
      <Route path="/productos" element={<Dashboardproductos />} />
      <Route path="/lista-productos" element={<ProductosComprar />} />
      <Route path="/checkout" element={<Checkout/>} />
    </Routes>
  )
}

export default App
