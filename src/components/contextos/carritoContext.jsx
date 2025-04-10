import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        const almacenados = localStorage.getItem('carrito');
        return almacenados ? JSON.parse(almacenados) : [];
      });

  // 🔁 Cargar desde localStorage al montar
  useEffect(() => {
    const almacenados = localStorage.getItem('carrito');
    console.log('Carrito desde localStorage:', almacenados);
    if (almacenados) {
      setItems(JSON.parse(almacenados));
    }
  }, []);
  

  // 💾 Guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    console.log('Guardando en localStorage:', items);
    localStorage.setItem('carrito', JSON.stringify(items));
  }, [items]);

  const addItem = (producto, cantidad = 1) => {
    setItems(prev => {
      const existente = prev.find(item => item.id === producto.id);
      if (existente) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('carrito');
  };

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
