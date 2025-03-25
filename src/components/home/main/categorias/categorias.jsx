import './categorias.css'

const categorias = [
  { nombre: 'Vestidos', clipClass: 'papel1', imgSrc: 'https://icons.veryicon.com/png/o/clothes-accessories/spring-is-as-beautiful-as-you/dress-25.png' },
  { nombre: 'Abrigos', clipClass: 'papel2', imgSrc: 'https://icons.veryicon.com/png/o/clothes-accessories/spring-is-as-beautiful-as-you/dress-25.png' },
  { nombre: 'Pantalones', clipClass: 'papel3', imgSrc: 'https://icons.veryicon.com/png/o/clothes-accessories/spring-is-as-beautiful-as-you/dress-25.png' },
  { nombre: 'Blusas', clipClass: 'papel4', imgSrc: 'https://icons.veryicon.com/png/o/clothes-accessories/spring-is-as-beautiful-as-you/dress-25.png' },
  { nombre: 'Camisas', clipClass: 'papel5', imgSrc: 'https://icons.veryicon.com/png/o/clothes-accessories/spring-is-as-beautiful-as-you/dress-25.png' },
  { nombre: 'Faldas', clipClass: 'papel1', imgSrc: 'https://icons.veryicon.com/png/o/clothes-accessories/spring-is-as-beautiful-as-you/dress-25.png' },
  { nombre: 'Accesorios', clipClass: 'papel2', imgSrc: 'https://icons.veryicon.com/png/o/clothes-accessories/spring-is-as-beautiful-as-you/dress-25.png' },
  { nombre: 'Zapatos', clipClass: 'papel3', imgSrc: 'https://icons.veryicon.com/png/o/clothes-accessories/spring-is-as-beautiful-as-you/dress-25.png' },
  { nombre: 'Eco Bags', clipClass: 'papel4', imgSrc: 'https://icons.veryicon.com/png/o/clothes-accessories/spring-is-as-beautiful-as-you/dress-25.png' }
]



const CategoriasNav = () => {
  return (
    <div className="categoriasNav">
     {categorias.map((cat, i) => (
  <div key={i} className={`categoriaItem categoriaItem--${cat.clipClass}`}>
    <img src={cat.imgSrc} height={100} alt={cat.nombre} />
    <p>{cat.nombre}</p>
  </div>
      ))}
    </div>
  )
}

export default CategoriasNav
