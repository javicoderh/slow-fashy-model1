import './categorias.css'

const categorias = [
  'Vestidos', 'Abrigos', 'Pantalones', 'Blusas', 'Camisas',
  'Faldas', 'Accesorios', 'Zapatos', 'Eco Bags'
]

const CategoriasNav = () => {
  return (
    <div className="categoriasNav">
      {categorias.map((nombre, index) => (
        <div className="categoriaItem" key={index}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209897.png"
            alt={nombre}
            height={80}
          />
          <p>{nombre}</p>
        </div>
      ))}
    </div>
  )
}

export default CategoriasNav
