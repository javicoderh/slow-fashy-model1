import { useState } from "react";
import axios from "axios";
import "../home/home.css";
import Isotipo from "../home/isotipo";
import Nav from "../home/nav";
import LoginButton from "../home/loginButton/login";
import CrearProductoForm from "./crear productos/crearProductosForm";
import EditarProducto from "./editar productos/editarProducto";
import CrearArticuloForm from "../home/main/articulos/crearArticuloForm";

const Dashboardproductos = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarFormularioArticulo, setMostrarFormularioArticulo] = useState(false);

  const handleAbrir = () => setMostrarFormulario(true);
  const handleCerrar = () => setMostrarFormulario(false);

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
    </header>
    <main>
      {!mostrarFormulario ? (
        <button onClick={handleAbrir} className="abrir-form-btn">
          Crear producto
        </button>
      ) : (
        <CrearProductoForm onClose={handleCerrar} />
      )}    
      <EditarProducto /> 
      {!mostrarFormularioArticulo ? (
  <button onClick={() => setMostrarFormularioArticulo(true)} className="abrir-form-btn">
    Crear artículo
  </button>
) : (
  <CrearArticuloForm onClose={() => setMostrarFormularioArticulo(false)} />
)}
    </main>
    <footer>
      <p>Footer</p>
    </footer>
  </div>
  );
};


export default Dashboardproductos;
