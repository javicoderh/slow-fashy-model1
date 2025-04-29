import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './articuloDetalle.css'

const CarouselArticulos = () => {
  const [articulos, setArticulos] = useState([])
  const [index, setIndex] = useState(0)
  const [animacion, setAnimacion] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://slowfashion.onrender.com/articulos/')
      .then(res => res.json())
      .then(data => {
        const lista = data.slice(0, 5)
        setArticulos(lista)
        setIndex(0) // 🔁 asegúrate que el index esté alineado
      })
  }, [])

  // Protección por si los artículos cambian de tamaño
  useEffect(() => {
    if (index >= articulos.length && articulos.length > 0) {
      setIndex(0)
    }
  }, [articulos])

  const avanzar = () => {
    setAnimacion('girar-izquierda')
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % articulos.length)
      setAnimacion('')
    }, 300)
  }

  const retroceder = () => {
    setAnimacion('girar-derecha')
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + articulos.length) % articulos.length)
      setAnimacion('')
    }, 300)
  }

  const leerMas = () => {
    const articulo = articulos[index]
    navigate(`/articulos/${articulo.id}`)
  }

  const verTodos = () => {
    navigate('/lista-articulos')
  }

  if (articulos.length === 0) return <p>Cargando artículos...</p>

  const actual = articulos[index]

  return (
    <section className="carousel-contenedor">
        <h2 className='carouselTit'>Árticulos de moda y estilo sustentables</h2>
      <div className="carousel-3d">
        <button className="flecha izquierda" onClick={retroceder}>◀</button>

        <div className={`tarjeta ${animacion}`}>
          <img src={actual.imagen_destacada} alt={actual.titulo} />
          <div className="info">
            <h3>{actual.titulo}</h3>
            <p>{actual.bajada}</p>
            <button onClick={leerMas}>Leer más</button>
          </div>
        </div>

        <button className="flecha derecha" onClick={avanzar}>▶</button>
      </div>

      {/* 🔵 Indicadores seguros */}
      {articulos.length > 0 && (
        <div className="indicadores-carousel">
          {articulos.map((_, i) => (
            <span
              key={i}
              className={`indicador ${i === index ? 'activo' : ''}`}
            ></span>
          ))}
        </div>
      )}

      {/* 📎 Botón ver todos */}
      <button className="ver-todos-btn" onClick={verTodos}>
        Ver todos los artículos
      </button>
    </section>
  )
}

export default CarouselArticulos
