import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import UsuarioForm from './components/usuarios/registro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<UsuarioForm />} />
      <Route path="/productos" element={<h1>Productos</h1>} />
    </Routes>
  )
}

export default App
