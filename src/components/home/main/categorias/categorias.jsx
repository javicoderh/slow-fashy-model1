import { Link } from 'react-router-dom';
import './categorias.css';

const categorias = [
  { nombre: 'Abrigos', clipClass: 'papel2', imgSrc: 'https://cdn3d.iconscout.com/3d/premium/thumb/abrigo-mujer-5463384-4551871.png?f=webp' },
  { nombre: 'Vestidos', clipClass: 'papel1', imgSrc: 'https://svgsilh.com/svg_v2/307808.svg' },  ,
  { nombre: 'Pantalones', clipClass: 'papel3', imgSrc: 'https://icons.veryicon.com/png/o/clothes-accessories/girlish-icon/trousers-64.png' },
  { nombre: 'Blusas', clipClass: 'papel4', imgSrc: 'https://svgsilh.com/svg_v2/39388.svg' },
  { nombre: 'Camisas', clipClass: 'papel5', imgSrc: 'https://png.pngtree.com/png-clipart/20230914/original/pngtree-purple-shirt-vector-png-image_11244029.png' },
  { nombre: 'Faldas', clipClass: 'papel1', imgSrc: 'https://www.svgrepo.com/show/290847/skirt.svg' },
  { nombre: 'Accesorios', clipClass: 'papel2', imgSrc: 'https://images.vexels.com/media/users/3/157495/isolated/preview/95429115318d24e147d2dbc60c2bf25b-vector-de-pendientes-colgantes-octangon.png' },
  { nombre: 'Zapatos', clipClass: 'papel3', imgSrc: 'https://www.svgrepo.com/show/999/platform-shoes-with-thin-heels.svg' },
  { nombre: 'Eco Bags', clipClass: 'papel4', imgSrc: 'https://images.vexels.com/media/users/3/212803/isolated/preview/87b946b047c6c7d2d2a7e8f37562c86b-go-green-reusable-shopping-bag-flat-symbol.png' }
];

const CategoriasNav = () => {
  return (
    <div className="categoriasNav">
      {categorias.map((cat, i) => (
        <Link 
          key={i} 
          to={`/categorias/${cat.nombre.toLowerCase().replace(/\s+/g, '-')}`} 
          className={`categoriaItem categoriaItem--${cat.clipClass}`}
        >
          <img src={cat.imgSrc} height={100} alt={cat.nombre} />
          <p>{cat.nombre}</p>
        </Link>
      ))}
    </div>
  );
};

export default CategoriasNav;
