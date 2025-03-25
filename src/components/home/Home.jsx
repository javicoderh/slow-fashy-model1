import React from 'react'
import './home.css'
import Isotipo from './isotipo'
import Nav from './nav'
import { useEffect, useRef } from 'react'
import CategoriasNav from './main/categorias/categorias'
import DisplayScreen from './main/displayScreen/displayScreen'
import { useUser } from '../contextos/userContext'
import LoginButton from './loginButton/login'
import Miscelaneo from './main/miscelaneo/miscelaneo'
import ArticulosCarousel from './main/articulos/articulos'
import Manifiesto from './main/manifiesto/manifiesto'



const Home = () => {

  const { isLoggedIn, tipoUsuario, usuario, logout } = useUser()

useEffect(() => {
  console.log('¿Está logueado?', isLoggedIn)
  console.log('Tipo de usuario:', tipoUsuario)
  console.log('Usuario:', usuario)
}, [isLoggedIn, tipoUsuario])
  
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
        <DisplayScreen />
        <CategoriasNav />
        <Manifiesto/> 
        <ArticulosCarousel/>
        <Miscelaneo/>        
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  )
}

export default Home
