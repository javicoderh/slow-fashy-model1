import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import UsuarioForm from './components/usuarios/registro'
import Dashboardproductos from './components/productos/dashboard'
import ProductosComprar from './components/listaProductos/productosComprar'
import Checkout from './components/checkout/checkout'
import ArticuloDetalle from './components/home/main/articulos/articulosDetalle'
import ListaArticulos from './components/home/main/articulos/listaArticulos'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<UsuarioForm />} />
      <Route path="/productos" element={<Dashboardproductos />} />
      <Route path="/lista-productos" element={<ProductosComprar />} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/articulos/:slug" element={<ArticuloDetalle />} />
      <Route path="/lista-articulos" element={<ListaArticulos />} />
    </Routes>
  )
}

export default App
