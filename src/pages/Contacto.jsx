import { useState } from 'react';
import CampoFormulario from '../components/CampoFormulario.jsx';
import Alerta from '../components/Alerta.jsx';
import { esFormularioValido, validarContacto } from '../utils/validaciones.js';

const VACIO = { nombre: '', correo: '', comentario: '' };

// onEnviar es opcional: permite inyectar qué hacer con el mensaje (útil en pruebas)
function Contacto({ onEnviar }) {
    const [datos, setDatos] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState(null);

    const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

    function manejarEnvio(e) {
        e.preventDefault();
        const nuevosErrores = validarContacto(datos);
        setErrores(nuevosErrores);
        if (!esFormularioValido(nuevosErrores)) {
            setMensaje({ tipo: 'error', texto: 'Revisa los campos marcados en rojo.' });
            return;
        }
        if (onEnviar) onEnviar(datos);
        setMensaje({ tipo: 'exito', texto: '¡Gracias! Recibimos tu mensaje y te contactaremos pronto.' });
        setDatos(VACIO);
    }

    return (
        <div className="tarjeta-formulario">
            <h2>Formulario de contacto</h2>
            <Alerta tipo={mensaje?.tipo} mensaje={mensaje?.texto} />
            <form onSubmit={manejarEnvio} noValidate>
                <CampoFormulario id="nombre" name="nombre" label="Nombre completo" maxLength={100}
                                 value={datos.nombre} onChange={manejarCambio} error={errores.nombre} />
                <CampoFormulario id="correo" name="correo" label="Correo" placeholder="opcional" maxLength={100}
                                 ayuda="Si lo ingresas, debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com"
                                 value={datos.correo} onChange={manejarCambio} error={errores.correo} />
                <CampoFormulario como="textarea" id="comentario" name="comentario" label="Comentario" rows={5} maxLength={500}
                                 value={datos.comentario} onChange={manejarCambio} error={errores.comentario}
                                 ayuda={`${datos.comentario.length}/500 caracteres`} />
                <button type="submit" className="btn btn-primario w-100">Enviar mensaje</button>
            </form>
        </div>
    );
}

export default Contacto;
