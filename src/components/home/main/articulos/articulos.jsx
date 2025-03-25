import './articulos.css'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const articulos = [
  {
    img: 'https://static.vecteezy.com/system/resources/previews/041/462/876/non_2x/ai-generated-clothes-on-hangers-in-a-modern-boutique-blurred-background-photo.jpg',
    titulo: 'Moda Circular en el Siglo XXI',
    descripcion: 'Descubre cómo las marcas están reinventando el ciclo de vida de la ropa.'
  },
  {
    img: 'https://static.vecteezy.com/system/resources/previews/041/462/876/non_2x/ai-generated-clothes-on-hangers-in-a-modern-boutique-blurred-background-photo.jpg',
    titulo: 'Textiles Orgánicos',
    descripcion: 'Beneficios de elegir algodón orgánico y fibras recicladas.'
  },
  {
    img: 'https://static.vecteezy.com/system/resources/previews/041/462/876/non_2x/ai-generated-clothes-on-hangers-in-a-modern-boutique-blurred-background-photo.jpg',
    titulo: 'El Renacer de lo Usado',
    descripcion: 'Cómo el upcycling está transformando el estilo urbano.'
  }
]

const ArticulosCarousel = () => {
  const [index, setIndex] = useState(0)
  const [animacion, setAnimacion] = useState('')

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

  const actual = articulos[index]

  return (
    <section className="articulos-carousel">
      <h2>Artículos de moda sustentable y estilos</h2>

      <div className="carousel-display">
        <button className="flecha izquierda" onClick={() => cambiarSlide('izquierda')}>
          <FaChevronLeft />
        </button>

        <div className={`imagen-contenedor ${animacion}`}>
          <img src={actual.img} alt={actual.titulo} />
          <div className="texto-articulo">
            <h3>{actual.titulo}</h3>
            <p>{actual.descripcion}</p>
          </div>
        </div>

        <button className="flecha derecha" onClick={() => cambiarSlide('derecha')}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  )
}

export default ArticulosCarousel
