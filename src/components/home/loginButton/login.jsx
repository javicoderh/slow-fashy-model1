import { useUser } from '../../contextos/userContext'
import '../home.css'
import { useNavigate } from 'react-router-dom'

const LoginButton = () => {
  const { isLoggedIn, logout, tipoUsuario } = useUser()
  const navigate = useNavigate()

  // Previene renderizado antes de que el contexto esté listo
  if (isLoggedIn === null) return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return isLoggedIn ? (
    <button className="login-button" onClick={handleLogout}>
      Logout
    </button>
  ) : (
    <a href="/registro" className="login-button">
      Login
    </a>
  )
}

export default LoginButton
