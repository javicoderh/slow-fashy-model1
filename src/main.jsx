import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UserProvider } from './components/contextos/userContext.jsx'
import { CartProvider } from './components/contextos/carritoContext.jsx'
import { ProductProvider } from './components/contextos/productosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <ProductProvider >
    <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CartProvider>
    </ProductProvider>
    </UserProvider>
  </StrictMode>,
)
