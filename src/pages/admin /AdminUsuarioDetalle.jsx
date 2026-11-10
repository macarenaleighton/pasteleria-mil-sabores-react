import { Link, useParams } from 'react-router-dom';
import { obtenerUsuarioPorRun } from '../../data/usuarios.js';
import { obtenerOrdenesDeUsuario } from '../../data/ordenes.js';
import { formatearCLP, formatearFecha } from '../../utils/formato.js';

// Vista "Mostrar usuario" + "Historial de compras" (Figura 10)
function AdminUsuarioDetalle() {
    const { run } = useParams();
    const usuario = obtenerUsuarioPorRun(run);

    if (!usuario) return <div className="admin-card">No existe el usuario {run}. <Link to="/admin/usuarios">Volver</Link></div>;

    const historial = obtenerOrdenesDeUsuario(usuario).reverse();
    const totalComprado = historial.filter((o) => o.estado !== 'Rechazada').reduce((s, o) => s + o.total, 0);

    return (
        <>
            <div className="admin-topbar">
                <h1>{usuario.nombre} {usuario.apellidos}</h1>
                <div className="d-flex gap-2">
                    <Link to={`/admin/usuarios/${run}/editar`} className="btn btn-primario">Editar usuario</Link>
                    <Link to="/admin/usuarios" className="btn btn-secundario">Volver</Link>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-12 col-lg-5">
                    <div className="admin-card h-100">
                        <h2 className="h5">Datos del usuario</h2>
                        <table className="table table-sm mb-0">
                            <tbody>
                            <tr><th>RUN</th><td>{usuario.run}</td></tr>
                            <tr><th>Correo</th><td>{usuario.correo}</td></tr>
                            <tr><th>Tipo</th><td><span className="chip-rol">{usuario.tipo}</span></td></tr>
                            <tr><th>Dirección</th><td>{usuario.direccion}</td></tr>
                            <tr><th>Comuna</th><td>{usuario.comuna}, {usuario.region}</td></tr>
                            <tr><th>Nacimiento</th><td>{usuario.fechaNacimiento || '—'}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-12 col-lg-7">
                    <div className="admin-card h-100">
                        <h2 className="h5">Historial de compras</h2>
                        <p className="small text-secondary">{historial.length} orden(es) · Total comprado: {formatearCLP(totalComprado)}</p>
                        {historial.length === 0 ? (
                            <p className="mb-0">Este usuario aún no registra compras.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-sm align-middle mb-0">
                                    <thead><tr><th>N°</th><th>Fecha</th><th>Total</th><th>Estado</th><th></th></tr></thead>
                                    <tbody>
                                    {historial.map((o) => (
                                        <tr key={o.id}>
                                            <td>{o.id}</td>
                                            <td>{formatearFecha(o.fecha)}</td>
                                            <td>{formatearCLP(o.total)}</td>
                                            <td>{o.estado}</td>
                                            <td><Link to={`/admin/ordenes/${o.id}`}>Boleta</Link></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminUsuarioDetalle;
