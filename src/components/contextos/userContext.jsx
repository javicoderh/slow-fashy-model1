import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tipoUsuario, setTipoUsuario] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUsuario(parsed)
      setIsLoggedIn(true)
      setTipoUsuario(parsed.tipo_usuario || null)
    }
  }, [])

  const login = (data) => {
    setUsuario(data)
    setIsLoggedIn(true)
    setTipoUsuario(data.tipo_usuario || null)
    localStorage.setItem('usuario', JSON.stringify(data))
  }

  const logout = () => {
    setUsuario(null)
    setIsLoggedIn(false)
    setTipoUsuario(null)
    localStorage.removeItem('usuario')
  }

  return (
    <UserContext.Provider value={{ usuario, isLoggedIn, tipoUsuario, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
