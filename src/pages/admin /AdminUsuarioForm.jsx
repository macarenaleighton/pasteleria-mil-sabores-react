import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CampoFormulario from '../../components/CampoFormulario.jsx';
import SelectorRegionComuna from '../../components/SelectorRegionComuna.jsx';
import Alerta from '../../components/Alerta.jsx';
import { TIPOS_USUARIO, actualizarUsuario, crearUsuario, obtenerUsuarioPorRun } from '../../data/usuarios.js';
import { esFormularioValido, validarUsuarioAdmin } from '../../utils/validaciones.js';

const VACIO = { run: '', nombre: '', apellidos: '', correo: '', clave: '', tipo: 'Cliente', region: '', comuna: '', direccion: '', fechaNacimiento: '' };

function AdminUsuarioForm() {
    const { run } = useParams();
    const esEdicion = Boolean(run);
    const navigate = useNavigate();
    const [datos, setDatos] = useState(() => {
        const existente = esEdicion ? obtenerUsuarioPorRun(run) : null;
        return existente ? { ...VACIO, ...existente, clave: '' } : VACIO;
    });
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState(null);

    const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

    function manejarEnvio(e) {
        e.preventDefault();
        const nuevosErrores = validarUsuarioAdmin(datos, { esEdicion });
        setErrores(nuevosErrores);
        if (!esFormularioValido(nuevosErrores)) {
            setMensaje('Revisa los campos marcados en rojo.');
            return;
        }
        try {
            const { clave, ...resto } = datos;
            if (esEdicion) actualizarUsuario(run, clave ? { ...resto, clave } : resto);
            else crearUsuario({ ...resto, clave, run: resto.run.toUpperCase() });
            navigate('/admin/usuarios');
        } catch (error) {
            setMensaje(error.message);
        }
    }

    return (
        <>
            <div className="admin-topbar"><h1>{esEdicion ? 'Editar usuario' : 'Nuevo usuario'}</h1></div>
            <div className="admin-card" style={{ maxWidth: 760 }}>
                <Alerta tipo="error" mensaje={mensaje} />
                <form onSubmit={manejarEnvio} noValidate>
                    <div className="row">
                        <CampoFormulario className="col-12 col-md-6" id="run" name="run" label="RUN" maxLength={9} disabled={esEdicion}
                                         value={datos.run} onChange={manejarCambio} error={errores.run} />
                        <CampoFormulario className="col-12 col-md-6" como="select" id="tipo" name="tipo" label="Tipo de usuario"
                                         value={datos.tipo} onChange={manejarCambio} error={errores.tipo}>
                            {TIPOS_USUARIO.map((t) => <option key={t}>{t}</option>)}
                        </CampoFormulario>
                    </div>
                    <div className="row">
                        <CampoFormulario className="col-12 col-md-6" id="nombre" name="nombre" label="Nombre" value={datos.nombre} onChange={manejarCambio} error={errores.nombre} />
                        <CampoFormulario className="col-12 col-md-6" id="apellidos" name="apellidos" label="Apellidos" value={datos.apellidos} onChange={manejarCambio} error={errores.apellidos} />
                    </div>
                    <div className="row">
                        <CampoFormulario className="col-12 col-md-6" id="correo" name="correo" label="Correo" value={datos.correo} onChange={manejarCambio} error={errores.correo} />
                        <CampoFormulario className="col-12 col-md-6" id="clave" name="clave" type="password" label="Contraseña" maxLength={10}
                                         ayuda={esEdicion ? 'Déjala vacía para mantener la actual' : 'Entre 4 y 10 caracteres'}
                                         value={datos.clave} onChange={manejarCambio} error={errores.clave} />
                    </div>
                    <SelectorRegionComuna region={datos.region} comuna={datos.comuna} errores={errores} onChange={(c) => setDatos({ ...datos, ...c })} />
                    <CampoFormulario id="direccion" name="direccion" label="Dirección" value={datos.direccion} onChange={manejarCambio} error={errores.direccion} />
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primario">Guardar usuario</button>
                        <Link to="/admin/usuarios" className="btn btn-secundario">Cancelar</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AdminUsuarioForm;

