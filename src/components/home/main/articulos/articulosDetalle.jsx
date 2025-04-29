import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../../home.css'
import LoginButton from '../../loginButton/login'
import BotonConfig from '../botonConfig/config'
import CarritoFlotante from '../../../carrito/carrito'
import Isotipo from '../../isotipo'
import Nav from '../../nav'
import CarouselArticulos from './carouselArticulos'

const ArticuloDetalle = () => {
  const { slug } = useParams()
  const [articulo, setArticulo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://slowfashion.onrender.com/articulos/${slug}`)
      .then(res => res.json())
      .then(data => {
        setArticulo(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error al cargar el artículo:', err)
        setLoading(false)
      })
  }, [slug])

  if (loading) return <p>Cargando artículo...</p>
  if (!articulo) return <p>Artículo no encontrado.</p>

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
    <CarouselArticulos setArticulo={setArticulo} />
    {articulo && (
        <div className="detalle-articulo">
          <h1>{articulo.titulo}</h1>
          <img src={articulo.imagen_destacada} alt={articulo.titulo} className="imagen-detalle" />
          <p className="bajada"><i>{articulo.bajada}</i></p>
          <div className="contenido">{articulo.contenido}</div>
          <p className="etiquetas">
            {articulo.etiquetas?.map((etiqueta, i) => (
              <span key={i} className="etiqueta">#{etiqueta}</span>
            ))}
          </p>
        </div>
      )}
    </main>
    <footer>
      <p>Footer</p>
    </footer>
  </div>
  )
}

export default ArticuloDetalle
