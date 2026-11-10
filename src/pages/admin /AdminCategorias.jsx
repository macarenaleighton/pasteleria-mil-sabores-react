import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../../components/Alerta.jsx';
import { eliminarCategoria, obtenerCategorias } from '../../data/categorias.js';
import { obtenerProductos } from '../../data/productos.js';

function AdminCategorias() {
    const [categorias, setCategorias] = useState(obtenerCategorias);
    const [mensaje, setMensaje] = useState(null);
    const productos = obtenerProductos();
    const contar = (nombre) => productos.filter((p) => p.categoria === nombre).length;

    function eliminar(c) {
        try {
            eliminarCategoria(c.id);
            setCategorias(obtenerCategorias());
            setMensaje({ tipo: 'exito', texto: `Categoría "${c.nombre}" eliminada.` });
        } catch (error) {
            setMensaje({ tipo: 'error', texto: error.message });
        }
    }

    return (
        <>
            <div className="admin-topbar">
                <h1>Categorías</h1>
                <Link to="/admin/categorias/nueva" className="btn btn-primario">+ Nueva categoría</Link>
            </div>
            <Alerta tipo={mensaje?.tipo} mensaje={mensaje?.texto} onCerrar={() => setMensaje(null)} />
            <div className="admin-card">
                <div className="table-responsive">
                    <table className="table admin-tabla align-middle">
                        <thead><tr><th>ID</th><th>Categoría</th><th>Descripción</th><th>Productos</th><th></th></tr></thead>
                        <tbody>
                        {categorias.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.icono} {c.nombre}</td>
                                <td className="small">{c.descripcion || '—'}</td>
                                <td>{contar(c.nombre)}</td>
                                <td className="text-nowrap">
                                    <Link className="btn btn-secundario btn-pequeno me-1" to={`/admin/categorias/${c.id}/editar`}>Editar</Link>
                                    <button className="btn btn-peligro btn-pequeno" disabled={contar(c.nombre) > 0}
                                            title={contar(c.nombre) > 0 ? 'Tiene productos asociados' : ''} onClick={() => eliminar(c)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <p className="small text-secondary mb-0">Solo se pueden eliminar categorías sin productos asociados.</p>
            </div>
        </>
    );
}

export default AdminCategorias;
