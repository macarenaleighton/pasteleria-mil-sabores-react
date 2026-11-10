import { Link, useParams } from 'react-router-dom';
import { obtenerProductoPorCodigo, precioFinal } from '../../data/productos.js';
import { obtenerOrdenes, ventasPorProducto } from '../../data/ordenes.js';
import { formatearCLP } from '../../utils/formato.js';

// Vista "Mostrar producto" del panel (Figura 10)
function AdminProductoDetalle() {
    const { codigo } = useParams();
    const producto = obtenerProductoPorCodigo(codigo);

    if (!producto) {
        return <div className="admin-card">No existe el producto {codigo}. <Link to="/admin/productos">Volver</Link></div>;
    }

    const ventas = ventasPorProducto(obtenerOrdenes()).find((v) => v.codigo === codigo);
    const critico = producto.stock <= producto.stockCritico;

    return (
        <>
            <div className="admin-topbar">
                <h1>{producto.nombre}</h1>
                <div className="d-flex gap-2">
                    <Link to={`/admin/productos/${codigo}/editar`} className="btn btn-primario">Editar producto</Link>
                    <Link to="/admin/productos" className="btn btn-secundario">Volver</Link>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-12 col-md-4">
                    <div className="admin-card text-center h-100">
                        <div className="display-1">{producto.imagen}</div>
                        <span className="categoria-tag">{producto.categoria}</span>
                        <p className="mt-2 mb-0">{critico ? <span className="badge-alerta">Stock bajo</span> : <span className="badge-ok">Stock OK</span>}</p>
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <div className="admin-card h-100">
                        <table className="table mb-0">
                            <tbody>
                            <tr><th>Código</th><td>{producto.codigo}</td></tr>
                            <tr><th>Descripción</th><td>{producto.descripcion || '—'}</td></tr>
                            <tr><th>Precio</th><td>{formatearCLP(producto.precio)}</td></tr>
                            <tr><th>Descuento</th><td>{producto.descuento > 0 ? `${producto.descuento}% → ${formatearCLP(precioFinal(producto))}` : 'Sin oferta'}</td></tr>
                            <tr><th>Stock</th><td>{producto.stock} u. (crítico: {producto.stockCritico})</td></tr>
                            <tr><th>Vendido</th><td>{ventas ? `${ventas.unidades} u. · ${formatearCLP(ventas.monto)}` : 'Sin ventas registradas'}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminProductoDetalle;
