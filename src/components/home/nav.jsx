import { useState } from 'react'
import './home.css'

const Nav = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav">
      <div className={`nav-links ${open ? 'open' : ''}`}>
        <a href="/">Inicio</a>
        <a href="/lista-productos">Productos</a>
        <a href="/novedades">Novedades</a>
        <a href="/nosotros">Nosotros</a>
        <a href="/contacto">Contacto</a>
      </div>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </div>
    </nav>
  )
}

export default Nav