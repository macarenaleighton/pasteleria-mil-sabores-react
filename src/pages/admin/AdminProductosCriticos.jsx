import { Link } from 'react-router-dom';
import { obtenerProductosCriticos } from '../../data/productos.js';

// Vista "Listado productos críticos" (Figura 10)
function AdminProductosCriticos() {
    const criticos = obtenerProductosCriticos().sort((a, b) => a.stock - b.stock);

    return (
        <>
            <div className="admin-topbar">
                <h1>Productos críticos</h1>
                <Link to="/admin/productos" className="btn btn-secundario">Volver a productos</Link>
            </div>
            <div className="admin-card">
                <p className="text-secondary">Productos cuyo stock es igual o menor a su stock crítico. Se recomienda reponerlos.</p>
                {criticos.length === 0 ? (
                    <p className="mb-0">Todo el inventario está sobre el nivel crítico 👍</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table admin-tabla align-middle">
                            <thead><tr><th>Código</th><th>Producto</th><th>Stock</th><th>Crítico</th><th>Faltan</th><th></th></tr></thead>
                            <tbody>
                            {criticos.map((p) => (
                                <tr key={p.codigo}>
                                    <td>{p.codigo}</td>
                                    <td>{p.imagen} {p.nombre}</td>
                                    <td><span className="badge-alerta">{p.stock}</span></td>
                                    <td>{p.stockCritico}</td>
                                    <td>{p.stockCritico - p.stock + 1} u. mín.</td>
                                    <td><Link to={`/admin/productos/${p.codigo}/editar`} className="btn btn-primario btn-pequeno">Reponer</Link></td>
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

export default AdminProductosCriticos;
