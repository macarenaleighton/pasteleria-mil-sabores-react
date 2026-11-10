import { useState } from 'react';
import CampoFormulario from '../../components/CampoFormulario.jsx';
import SelectorRegionComuna from '../../components/SelectorRegionComuna.jsx';
import Alerta from '../../components/Alerta.jsx';
import { useSesion } from '../../context/SesionContext.jsx';
import { actualizarUsuario, obtenerUsuarioPorRun } from '../../data/usuarios.js';
import { esFormularioValido, validarPerfil } from '../../utils/validaciones.js';

// Vista "Perfil" (Figura 10): el usuario edita sus propios datos
function AdminPerfil() {
    const { usuario, actualizarSesion } = useSesion();
    const [datos, setDatos] = useState(() => {
        const guardado = obtenerUsuarioPorRun(usuario.run) || usuario;
        return { nombre: guardado.nombre, apellidos: guardado.apellidos, region: guardado.region, comuna: guardado.comuna, direccion: guardado.direccion, clave: '', clave2: '' };
    });
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState(null);

    const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

    function manejarEnvio(e) {
        e.preventDefault();
        const nuevosErrores = validarPerfil(datos);
        setErrores(nuevosErrores);
        if (!esFormularioValido(nuevosErrores)) {
            setMensaje({ tipo: 'error', texto: 'Revisa los campos marcados en rojo.' });
            return;
        }
        // eslint-disable-next-line no-unused-vars
        const { clave, clave2, ...cambios } = datos;
        actualizarUsuario(usuario.run, clave ? { ...cambios, clave } : cambios);
        actualizarSesion(cambios);
        setDatos({ ...datos, clave: '', clave2: '' });
        setMensaje({ tipo: 'exito', texto: 'Perfil actualizado correctamente.' });
    }

    return (
        <>
            <div className="admin-topbar">
                <h1>Mi perfil</h1>
                <span className="chip-rol">{usuario.tipo}</span>
            </div>
            <div className="admin-card" style={{ maxWidth: 760 }}>
                <p className="text-secondary">RUN {usuario.run} · {usuario.correo} (no editables)</p>
                <Alerta tipo={mensaje?.tipo} mensaje={mensaje?.texto} onCerrar={() => setMensaje(null)} />
                <form onSubmit={manejarEnvio} noValidate>
                    <div className="row">
                        <CampoFormulario className="col-12 col-md-6" id="nombre" name="nombre" label="Nombre" value={datos.nombre} onChange={manejarCambio} error={errores.nombre} />
                        <CampoFormulario className="col-12 col-md-6" id="apellidos" name="apellidos" label="Apellidos" value={datos.apellidos} onChange={manejarCambio} error={errores.apellidos} />
                    </div>
                    <SelectorRegionComuna region={datos.region} comuna={datos.comuna} errores={errores} onChange={(c) => setDatos({ ...datos, ...c })} />
                    <CampoFormulario id="direccion" name="direccion" label="Dirección" value={datos.direccion} onChange={manejarCambio} error={errores.direccion} />
                    <h2 className="h6 mt-3">Cambiar contraseña (opcional)</h2>
                    <div className="row">
                        <CampoFormulario className="col-12 col-md-6" id="clave" name="clave" type="password" label="Nueva contraseña" maxLength={10} value={datos.clave} onChange={manejarCambio} error={errores.clave} />
                        <CampoFormulario className="col-12 col-md-6" id="clave2" name="clave2" type="password" label="Repetir contraseña" maxLength={10} value={datos.clave2} onChange={manejarCambio} error={errores.clave2} />
                    </div>
                    <button type="submit" className="btn btn-primario">Guardar cambios</button>
                </form>
            </div>
        </>
    );
}

export default AdminPerfil;
