import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../contextos/userContext';// ✅ Hook personalizado
import { FiSettings } from 'react-icons/fi';
import './botonConfig.css';

const BotonConfig = () => {
    const { usuario: user } = useUser();
  const navigate = useNavigate();

  if (user?.tipo_usuario !== 'admin') return null;

  return (
    <button
      className="config-boton"
      onClick={() => navigate('/productos')}
      title="Configuración"
    >
      <FiSettings size={22} />
    </button>
  );
};

export default BotonConfig;
