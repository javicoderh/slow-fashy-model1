import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get("https://slowfashion.onrender.com/productos");
        setProductos(res.data.productos);
      } catch (err) {
        console.error("Error al obtener productos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  return (
    <ProductContext.Provider value={{ productos, setProductos, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
