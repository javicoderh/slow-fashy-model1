import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import UsuarioForm from './components/usuarios/registro'
import Dashboardproductos from './components/productos/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<UsuarioForm />} />
      <Route path="/productos" element={<Dashboardproductos />} />
    </Routes>
  )
}

export default App
