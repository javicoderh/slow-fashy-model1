// ListaArticulos.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

const ListaArticulos = ({ onSeleccionar }) => {
  const [articulos, setArticulos] = useState([])

  useEffect(() => {
    axios.get('https://tu-backend.com/articulos') // ajusta URL
      .then(res => setArticulos(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="lista-articulos">
      <h2>Artículos existentes</h2>
      <ul>
        {articulos.map((articulo) => (
          <li key={articulo.id}>
            <button onClick={() => onSeleccionar(articulo)}>
              {articulo.titulo}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaArticulos
