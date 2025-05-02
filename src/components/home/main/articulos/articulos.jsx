import './articulos.css'
import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ArticulosCarousel = () => {
  const [articulos, setArticulos] = useState([])
  const [index, setIndex] = useState(0)
  const [animacion, setAnimacion] = useState('')

  useEffect(() => {
    fetch('https://slowfashion.onrender.com/articulos/')
      .then(res => res.json())
      .then(data => setArticulos(data.slice(0, 3)))
      .catch(err => console.error('Error cargando artículos:', err))
  }, [])

  const cambiarSlide = (direccion) => {
    setAnimacion(direccion === 'izquierda' ? 'salir-izq' : 'salir-der')

    setTimeout(() => {
      setIndex((prev) =>
        direccion === 'izquierda'
          ? (prev - 1 + articulos.length) % articulos.length
          : (prev + 1) % articulos.length
      )
      setAnimacion(direccion === 'izquierda' ? 'entrar-izq' : 'entrar-der')
    }, 250)

    setTimeout(() => {
      setAnimacion('')
    }, 600)
  }

  if (articulos.length === 0) return <p>Cargando artículos...</p>

  const actual = articulos[index]

  return (
    <section className="articulos-carousel">
      <h2>Artículos de moda sustentable y estilo</h2>

      <div className="carousel-display">
        <button className="flecha izquierdaOut" onClick={() => cambiarSlide('izquierda')}>
          <FaChevronLeft />
        </button>

        <Link
          to={`/articulos/${actual.id}`}
          className={`imagen-contenedor ${animacion}`}
        >
          <img src={actual.imagen_destacada} height={600} alt={actual.titulo} />
          <div className="texto-articulo">
            <h3>{actual.titulo}</h3>
            <p>{actual.bajada}</p>
          </div>
        </Link>

        <button className="flecha derechaOut" onClick={() => cambiarSlide('derecha')}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  )
}

export default ArticulosCarousel
