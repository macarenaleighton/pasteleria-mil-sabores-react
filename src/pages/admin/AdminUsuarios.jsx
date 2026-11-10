import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../../components/Alerta.jsx';
import { useSesion } from '../../context/SesionContext.jsx';
import { eliminarUsuario, obtenerUsuarios } from '../../data/usuarios.js';

function AdminUsuarios() {
    const { usuario: actual } = useSesion();
    const [usuarios, setUsuarios] = useState(obtenerUsuarios);
    const [filtroTipo, setFiltroTipo] = useState('');
    const [porEliminar, setPorEliminar] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    const visibles = usuarios.filter((u) => !filtroTipo || u.tipo === filtroTipo);

    function confirmarEliminar() {
        eliminarUsuario(porEliminar.run);
        setUsuarios(obtenerUsuarios());
        setMensaje(`Usuario ${porEliminar.nombre} eliminado.`);
        setPorEliminar(null);
    }

    return (
        <>
            <div className="admin-topbar">
                <h1>Usuarios</h1>
                <Link to="/admin/usuarios/nuevo" className="btn btn-primario">+ Nuevo usuario</Link>
            </div>
            <Alerta mensaje={mensaje} onCerrar={() => setMensaje(null)} />
            {porEliminar && (
                <div className="alert alert-warning d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <span>¿Eliminar a <strong>{porEliminar.nombre} {porEliminar.apellidos}</strong>?</span>
                    <span className="d-flex gap-2">
            <button className="btn btn-peligro btn-pequeno" onClick={confirmarEliminar}>Sí, eliminar</button>
            <button className="btn btn-secundario btn-pequeno" onClick={() => setPorEliminar(null)}>Cancelar</button>
          </span>
                </div>
            )}
            <div className="admin-card">
                <select className="form-select mb-3" style={{ maxWidth: 260 }} aria-label="Filtrar por tipo" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                    <option value="">Todos los tipos</option>
                    <option>Administrador</option><option>Vendedor</option><option>Cliente</option>
                </select>
                <div className="table-responsive">
                    <table className="table admin-tabla align-middle">
                        <thead><tr><th>RUN</th><th>Nombre</th><th>Correo</th><th>Región / Comuna</th><th>Tipo</th><th></th></tr></thead>
                        <tbody>
                        {visibles.map((u) => (
                            <tr key={u.run}>
                                <td>{u.run}</td>
                                <td><Link to={`/admin/usuarios/${u.run}`} className="text-reset">{u.nombre} {u.apellidos}</Link></td>
                                <td>{u.correo}</td>
                                <td>{u.region} / {u.comuna}</td>
                                <td><span className="chip-rol">{u.tipo}</span></td>
                                <td className="text-nowrap">
                                    <Link className="btn btn-secundario btn-pequeno me-1" to={`/admin/usuarios/${u.run}`}>Ver</Link>
                                    <Link className="btn btn-secundario btn-pequeno me-1" to={`/admin/usuarios/${u.run}/editar`}>Editar</Link>
                                    <button className="btn btn-peligro btn-pequeno" disabled={u.run === actual?.run}
                                            title={u.run === actual?.run ? 'No puedes eliminar tu propia cuenta' : ''} onClick={() => setPorEliminar(u)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AdminUsuarios;
