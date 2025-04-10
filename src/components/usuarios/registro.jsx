import { useState } from 'react'
import { useUser } from '../contextos/userContext'
import { useNavigate } from 'react-router-dom'

const UsuarioForm = () => {
  const { login } = useUser()
  const navigate = useNavigate()
  const [modo, setModo] = useState('login')
  const [mensaje, setMensaje] = useState('')

  const [formData, setFormData] = useState({
    nombre: '',
    username: '',
    email: '',
    telefono: '',
    edad: '',
    ciudad: '',
    pais: '',
    genero: '',
    tipo_usuario: 'cliente',
    token: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endpoint = modo === 'registro' ? '/usuarios' : '/login'

    const body = modo === 'registro'
      ? { ...formData, edad: formData.edad ? parseInt(formData.edad) : undefined }
      : { username: formData.username, token: formData.token }

    try {
      const response = await fetch(`https://slowfashion.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (response.ok) {
        setMensaje(`✅ ${modo === 'registro' ? 'Usuario creado' : 'Login exitoso'}`)
        login(data.usuario || data)
        setTimeout(() => {
          setMensaje('')
          navigate('/')
        }, 1500)
      } else {
        setMensaje(`❌ ${data.detail || 'Error inesperado'}`)
        setTimeout(() => setMensaje(''), 3000)
      }
    } catch (err) {
      console.error(err)
      setMensaje('❌ Error de conexión con el servidor')
      setTimeout(() => setMensaje(''), 3000)
    }
  }

  return (
    <div>
      {mensaje && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          backgroundColor: '#00BFFF',
          color: '#000',
          padding: '0.6rem 1rem',
          borderRadius: '1rem',
          boxShadow: '0 0 10px rgba(0, 191, 255, 0.6)',
          zIndex: 9999,
          fontWeight: 'bold',
          transition: 'opacity 0.3s ease',
        }}>
          {mensaje}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => setModo('login')}>Login</button>
        <button onClick={() => setModo('registro')}>Registrarse</button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {modo === 'registro' && (
          <>
            <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
            <input name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} />
            <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} />
            <input name="pais" placeholder="País" value={formData.pais} onChange={handleChange} />
            <input name="genero" placeholder="Género" value={formData.genero} onChange={handleChange} />
            <input type="hidden" name="tipo_usuario" value="cliente" />
          </>
        )}

        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="password" name="token" placeholder="Contraseña" value={formData.token} onChange={handleChange} required />

        <button type="submit">
          {modo === 'registro' ? 'Crear cuenta' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  )
}

export default UsuarioForm
