import './miscelaneo.css'

const Miscelaneo = () => {
  return (
    <section className="miscelaneo-grid">
      <a href="/accesorios" className="grid-item">
        <img src="https://source.unsplash.com/600x400/?accessories" alt="Accesorios" />
        <span className="texto-inferior">Blog</span>
      </a>

      <a href="/editorial" className="grid-item">
        <img src="https://source.unsplash.com/600x400/?editorial" alt="Editorial" />
        <span className="texto-inferior">Destacados</span>
      </a>

      <a href="/historia" className="grid-item grid-full">
        <img src="https://source.unsplash.com/1200x400/?slowfashion,story" alt="Historia" />
        <span className="texto-inferior">Nuestra historia</span>
      </a>
    </section>
  )
}

export default Miscelaneo
