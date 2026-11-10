import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../../components/Alerta.jsx';
import { eliminarProducto, obtenerProductos } from '../../data/productos.js';
import { formatearCLP } from '../../utils/formato.js';

function AdminProductos() {
    const [productos, setProductos] = useState(obtenerProductos);
    const [busqueda, setBusqueda] = useState('');
    const [soloCriticos, setSoloCriticos] = useState(false);
    const [porEliminar, setPorEliminar] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    const visibles = productos.filter(
        (p) =>
            (p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.codigo.toLowerCase().includes(busqueda.toLowerCase())) &&
            (!soloCriticos || p.stock <= p.stockCritico)
    );

    function confirmarEliminar() {
        eliminarProducto(porEliminar.codigo);
        setProductos(obtenerProductos());
        setMensaje(`Producto "${porEliminar.nombre}" eliminado.`);
        setPorEliminar(null);
    }

    return (
        <>
            <div className="admin-topbar">
                <h1>Productos</h1>
                <div className="d-flex flex-wrap gap-2">
                    <Link to="/admin/productos/criticos" className="btn btn-secundario">⚠️ Productos críticos</Link>
                    <Link to="/admin/reportes" className="btn btn-secundario">📊 Reportes</Link>
                    <Link to="/admin/productos/nuevo" className="btn btn-primario">+ Nuevo producto</Link>
                </div>
            </div>
            <Alerta mensaje={mensaje} onCerrar={() => setMensaje(null)} />

            {porEliminar && (
                <div className="alert alert-warning d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <span>¿Eliminar <strong>{porEliminar.nombre}</strong>? Esta acción no se puede deshacer.</span>
                    <span className="d-flex gap-2">
            <button className="btn btn-peligro btn-pequeno" onClick={confirmarEliminar}>Sí, eliminar</button>
            <button className="btn btn-secundario btn-pequeno" onClick={() => setPorEliminar(null)}>Cancelar</button>
          </span>
                </div>
            )}

            <div className="admin-card">
                <div className="row g-2 mb-3">
                    <div className="col-12 col-md-8">
                        <input type="search" className="form-control" placeholder="Buscar por nombre o código..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <div className="form-check">
                            <input id="soloCriticos" type="checkbox" className="form-check-input" checked={soloCriticos} onChange={(e) => setSoloCriticos(e.target.checked)} />
                            <label htmlFor="soloCriticos" className="form-check-label">Solo stock crítico</label>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table admin-tabla align-middle">
                        <thead>
                        <tr><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Oferta</th><th>Stock</th><th>Estado</th><th></th></tr>
                        </thead>
                        <tbody>
                        {visibles.map((p) => (
                            <tr key={p.codigo}>
                                <td>{p.codigo}</td>
                                <td><Link to={`/admin/productos/${p.codigo}`} className="text-reset">{p.imagen} {p.nombre}</Link></td>
                                <td>{p.categoria}</td>
                                <td>{formatearCLP(p.precio)}</td>
                                <td>{p.descuento > 0 ? `-${p.descuento}%` : '—'}</td>
                                <td>{p.stock}</td>
                                <td>{p.stock <= p.stockCritico ? <span className="badge-alerta">Stock bajo</span> : <span className="badge-ok">OK</span>}</td>
                                <td className="text-nowrap">
                                    <Link className="btn btn-secundario btn-pequeno me-1" to={`/admin/productos/${p.codigo}`}>Ver</Link>
                                    <Link className="btn btn-secundario btn-pequeno me-1" to={`/admin/productos/${p.codigo}/editar`}>Editar</Link>
                                    <button className="btn btn-peligro btn-pequeno" onClick={() => setPorEliminar(p)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {visibles.length === 0 && <p className="text-center text-secondary mb-0">Sin resultados.</p>}
            </div>
        </>
    );
}

export default AdminProductos;
