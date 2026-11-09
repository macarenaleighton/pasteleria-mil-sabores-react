import { Navigate } from 'react-router-dom';
import { useSesion } from '../context/SesionContext.jsx';

// Protege las rutas del panel.
// - Sin sesión: redirige a /login
// - Cliente: redirige a la tienda
// - soloAdmin: además exige el tipo "Administrador" (el Vendedor vuelve al dashboard)
function RutaAdmin({ children, soloAdmin = false }) {
    const { usuario, esAdmin } = useSesion();
    if (!usuario) return <Navigate to="/login" replace state={{ desde: '/admin' }} />;
    if (!esAdmin) return <Navigate to="/" replace />;
    if (soloAdmin && usuario.tipo !== 'Administrador') return <Navigate to="/admin" replace />;
    return children;
}

export default RutaAdmin;
