import { useEffect, useState } from 'react'
import '../../home.css'
import LoginButton from '../../loginButton/login'
import BotonConfig from '../botonConfig/config'
import CarritoFlotante from '../../../carrito/carrito'
import Isotipo from '../../isotipo'
import Nav from '../../nav'
import { useNavigate } from 'react-router-dom'
import '../../home.css'

const ListaArticulos = () => {
  const [articulos, setArticulos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://slowfashion.onrender.com/articulos/')
      .then(res => res.json())
      .then(data => setArticulos(data))
  }, [])

  const irAlArticulo = (slug) => {
    navigate(`/articulos/${slug}`)
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
        <h2 className="titulo-lista">Todos los artículos</h2>
        <div className="grid-articulos">
          {articulos.map((articulo) => (
            <div
              key={articulo.id}
              className="card-articulo"
              onClick={() => irAlArticulo(articulo.id)}
            >
              <img src={articulo.imagen_destacada} alt={articulo.titulo} />
              <h3>{articulo.titulo}</h3>
              <p>{articulo.bajada}</p>
              <button>Leer más</button>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  )
}

export default ListaArticulos
