import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CampoFormulario from '../../components/CampoFormulario.jsx';
import Alerta from '../../components/Alerta.jsx';
import { actualizarCategoria, crearCategoria, obtenerCategoriaPorId } from '../../data/categorias.js';
import { esFormularioValido, validarCategoria } from '../../utils/validaciones.js';

// Crear (/admin/categorias/nueva) y editar (/admin/categorias/:id/editar)
function AdminCategoriaForm() {
    const { id } = useParams();
    const esEdicion = Boolean(id);
    const navigate = useNavigate();
    const [datos, setDatos] = useState(() => {
        const existente = esEdicion ? obtenerCategoriaPorId(id) : null;
        return existente || { nombre: '', icono: '', descripcion: '' };
    });
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState(null);

    const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

    function manejarEnvio(e) {
        e.preventDefault();
        const nuevosErrores = validarCategoria(datos);
        setErrores(nuevosErrores);
        if (!esFormularioValido(nuevosErrores)) return;
        try {
            const valores = { nombre: datos.nombre, icono: datos.icono.trim() || '🍰', descripcion: datos.descripcion.trim() };
            if (esEdicion) actualizarCategoria(id, valores);
            else crearCategoria(valores);
            navigate('/admin/categorias');
        } catch (error) {
            setMensaje(error.message);
        }
    }

    return (
        <>
            <div className="admin-topbar"><h1>{esEdicion ? 'Editar categoría' : 'Nueva categoría'}</h1></div>
            <div className="admin-card" style={{ maxWidth: 620 }}>
                <Alerta tipo="error" mensaje={mensaje} />
                <form onSubmit={manejarEnvio} noValidate>
                    <div className="row">
                        <CampoFormulario className="col-12 col-md-9" id="nombre" name="nombre" label="Nombre" maxLength={50}
                                         value={datos.nombre} onChange={manejarCambio} error={errores.nombre}
                                         ayuda={esEdicion ? 'Al renombrarla, sus productos se actualizan automáticamente.' : ''} />
                        <CampoFormulario className="col-12 col-md-3" id="icono" name="icono" label="Ícono" maxLength={4} placeholder="🍰"
                                         value={datos.icono} onChange={manejarCambio} />
                    </div>
                    <CampoFormulario como="textarea" id="descripcion" name="descripcion" label="Descripción (opcional)" rows={3} maxLength={200}
                                     value={datos.descripcion} onChange={manejarCambio} error={errores.descripcion} />
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primario">Guardar categoría</button>
                        <Link to="/admin/categorias" className="btn btn-secundario">Cancelar</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AdminCategoriaForm;
