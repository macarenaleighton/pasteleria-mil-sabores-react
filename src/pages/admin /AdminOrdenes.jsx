import { useState } from 'react';
import { Link } from 'react-router-dom';
import { actualizarEstadoOrden, obtenerOrdenes } from '../../data/ordenes.js';
import { formatearCLP, formatearFecha } from '../../utils/formato.js';

export const ESTADOS_ORDEN = ['Pendiente', 'Pagada', 'En preparación', 'Despachada', 'Entregada', 'Rechazada'];

function AdminOrdenes() {
    const [ordenes, setOrdenes] = useState(() => obtenerOrdenes().reverse());
    const [filtro, setFiltro] = useState('');

    function cambiarEstado(id, estado) {
        actualizarEstadoOrden(id, estado);
        setOrdenes(obtenerOrdenes().reverse());
    }

    const visibles = ordenes.filter((o) => !filtro || o.estado === filtro);

    return (
        <>
            <div className="admin-topbar"><h1>Órdenes / Boletas</h1></div>
            <div className="admin-card">
                <select className="form-select mb-3" style={{ maxWidth: 240 }} aria-label="Filtrar por estado" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="">Todos los estados</option>
                    {ESTADOS_ORDEN.map((e) => <option key={e}>{e}</option>)}
                </select>
                {visibles.length === 0 ? (
                    <p className="mb-0">No hay órdenes para mostrar.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table admin-tabla align-middle">
                            <thead><tr><th>N°</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th><th></th></tr></thead>
                            <tbody>
                            {visibles.map((o) => (
                                <tr key={o.id}>
                                    <td>{o.id}</td>
                                    <td>{formatearFecha(o.fecha)}</td>
                                    <td>{o.cliente.nombre} {o.cliente.apellidos}</td>
                                    <td>{formatearCLP(o.total)}</td>
                                    <td>
                                        <select className="form-select form-select-sm" aria-label={`Estado ${o.id}`} value={o.estado} onChange={(e) => cambiarEstado(o.id, e.target.value)}>
                                            {ESTADOS_ORDEN.map((e) => <option key={e}>{e}</option>)}
                                        </select>
                                    </td>
                                    <td><Link className="btn btn-secundario btn-pequeno" to={`/admin/ordenes/${o.id}`}>Ver boleta</Link></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default AdminOrdenes;
