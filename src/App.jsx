import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import UsuarioForm from './components/usuarios/registro'
import Dashboardproductos from './components/productos/dashboard'
import ProductosComprar from './components/listaProductos/productosComprar'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<UsuarioForm />} />
      <Route path="/productos" element={<Dashboardproductos />} />
      <Route path="/lista-productos" element={<ProductosComprar />} />
    </Routes>
  )
}

export default App
