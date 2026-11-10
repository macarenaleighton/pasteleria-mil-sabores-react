import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario.jsx';
import Alerta from '../components/Alerta.jsx';
import { useSesion } from '../context/SesionContext.jsx';
import { esFormularioValido, validarLogin } from '../utils/validaciones.js';

function Login() {
    const [datos, setDatos] = useState({ correo: '', clave: '' });
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState(null);
    const { iniciarSesion } = useSesion();
    const navigate = useNavigate();
    const location = useLocation();

    function manejarCambio(e) {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    }

    function manejarEnvio(e) {
        e.preventDefault();
        const nuevosErrores = validarLogin(datos);
        setErrores(nuevosErrores);
        if (!esFormularioValido(nuevosErrores)) {
            setMensaje({ tipo: 'error', texto: 'Revisa los campos marcados en rojo.' });
            return;
        }
        const usuario = iniciarSesion(datos.correo, datos.clave);
        if (!usuario) {
            setMensaje({ tipo: 'error', texto: 'Correo o contraseña incorrectos.' });
            return;
        }
        const esStaff = usuario.tipo === 'Administrador' || usuario.tipo === 'Vendedor';
        navigate(location.state?.desde || (esStaff ? '/admin' : '/'));
    }

    return (
        <div className="tarjeta-formulario">
            <h2>Inicio de sesión</h2>
            <Alerta tipo={mensaje?.tipo} mensaje={mensaje?.texto} />
            <form onSubmit={manejarEnvio} noValidate>
                <CampoFormulario id="correo" name="correo" label="Correo" value={datos.correo} onChange={manejarCambio} error={errores.correo} maxLength={100} />
                <CampoFormulario id="clave" name="clave" type="password" label="Contraseña" value={datos.clave} onChange={manejarCambio} error={errores.clave} maxLength={10} />
                <button type="submit" className="btn btn-primario w-100">Iniciar sesión</button>
            </form>
            <p className="text-center mt-3 mb-1">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
            <p className="text-center small text-secondary mb-0">Demo admin: macarena@duoc.cl / admin123</p>
        </div>
    );
}

export default Login;
