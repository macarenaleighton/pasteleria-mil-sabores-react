import { useState } from 'react';
import { Link } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario.jsx';
import SelectorRegionComuna from '../components/SelectorRegionComuna.jsx';
import Alerta from '../components/Alerta.jsx';
import { crearUsuario } from '../data/usuarios.js';
import { esFormularioValido, validarRegistro } from '../utils/validaciones.js';

const VACIO = { run: '', nombre: '', apellidos: '', correo: '', clave: '', clave2: '', fechaNacimiento: '', region: '', comuna: '', direccion: '' };

function Registro() {
    const [datos, setDatos] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState(null);

    const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

    function manejarEnvio(e) {
        e.preventDefault();
        const nuevosErrores = validarRegistro(datos);
        setErrores(nuevosErrores);
        if (!esFormularioValido(nuevosErrores)) {
            setMensaje({ tipo: 'error', texto: 'Revisa los campos marcados en rojo.' });
            return;
        }
        try {
            // eslint-disable-next-line no-unused-vars
            const { clave2, ...usuario } = datos;
            crearUsuario({ ...usuario, run: usuario.run.toUpperCase(), tipo: 'Cliente' });
            setMensaje({ tipo: 'exito', texto: '¡Cuenta creada correctamente! Ya puedes iniciar sesión.' });
            setDatos(VACIO);
        } catch (error) {
            setMensaje({ tipo: 'error', texto: error.message });
        }
    }

    return (
        <div className="tarjeta-formulario tarjeta-ancha">
            <h2>Crear cuenta</h2>
            <Alerta tipo={mensaje?.tipo} mensaje={mensaje?.texto} />
            <form onSubmit={manejarEnvio} noValidate>
                <CampoFormulario id="run" name="run" label="RUN (sin puntos ni guion)" placeholder="Ej: 190110229" maxLength={9}
                                 value={datos.run} onChange={manejarCambio} error={errores.run} />
                <div className="row">
                    <CampoFormulario className="col-12 col-md-6" id="nombre" name="nombre" label="Nombre" maxLength={50}
                                     value={datos.nombre} onChange={manejarCambio} error={errores.nombre} />
                    <CampoFormulario className="col-12 col-md-6" id="apellidos" name="apellidos" label="Apellidos" maxLength={100}
                                     value={datos.apellidos} onChange={manejarCambio} error={errores.apellidos} />
                </div>
                <CampoFormulario id="correo" name="correo" label="Correo electrónico" maxLength={100}
                                 ayuda="Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com"
                                 value={datos.correo} onChange={manejarCambio} error={errores.correo} />
                <div className="row">
                    <CampoFormulario className="col-12 col-md-6" id="clave" name="clave" type="password" label="Contraseña" maxLength={10}
                                     ayuda="Entre 4 y 10 caracteres" value={datos.clave} onChange={manejarCambio} error={errores.clave} />
                    <CampoFormulario className="col-12 col-md-6" id="clave2" name="clave2" type="password" label="Confirmar contraseña" maxLength={10}
                                     value={datos.clave2} onChange={manejarCambio} error={errores.clave2} />
                </div>
                <CampoFormulario id="fechaNacimiento" name="fechaNacimiento" type="date" label="Fecha de nacimiento (opcional)"
                                 value={datos.fechaNacimiento} onChange={manejarCambio} />
                <SelectorRegionComuna region={datos.region} comuna={datos.comuna} errores={errores}
                                      onChange={(cambio) => setDatos({ ...datos, ...cambio })} />
                <CampoFormulario id="direccion" name="direccion" label="Dirección" maxLength={300}
                                 value={datos.direccion} onChange={manejarCambio} error={errores.direccion} />
                <button type="submit" className="btn btn-primario w-100">Registrar</button>
            </form>
            <p className="text-center mt-3 mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
    );
}

export default Registro;
