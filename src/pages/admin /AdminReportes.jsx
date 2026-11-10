import TarjetaEstadistica from '../../components/admin/TarjetaEstadistica.jsx';
import { obtenerOrdenes, resumenVentas, ventasPorCategoria, ventasPorProducto } from '../../data/ordenes.js';
import { obtenerProductos } from '../../data/productos.js';
import { formatearCLP } from '../../utils/formato.js';

// Barra horizontal simple con Bootstrap (progress)
function BarraDato({ etiqueta, valor, maximo, texto }) {
    const porcentaje = maximo ? Math.round((valor / maximo) * 100) : 0;
    return (
        <div className="mb-2">
            <div className="d-flex justify-content-between small"><span>{etiqueta}</span><strong>{texto}</strong></div>
            <div className="progress" role="progressbar" aria-label={etiqueta} aria-valuenow={porcentaje} aria-valuemin="0" aria-valuemax="100" style={{ height: 10 }}>
                <div className="progress-bar barra-reporte" style={{ width: `${porcentaje}%` }} />
            </div>
        </div>
    );
}

function AdminReportes() {
    const ordenes = obtenerOrdenes();
    const resumen = resumenVentas(ordenes);
    const porProducto = ventasPorProducto(ordenes).slice(0, 8);
    const porCategoria = ventasPorCategoria(ordenes, obtenerProductos());
    const estados = ordenes.reduce((acc, o) => ({ ...acc, [o.estado]: (acc[o.estado] || 0) + 1 }), {});

    return (
        <>
            <div className="admin-topbar">
                <h1>Reportes</h1>
                <button className="btn btn-secundario" onClick={() => window.print()}>Imprimir reporte</button>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3 mb-4">
                <div className="col"><TarjetaEstadistica icono="💰" titulo="Ventas totales" valor={formatearCLP(resumen.totalVentas)} /></div>
                <div className="col"><TarjetaEstadistica icono="🧾" titulo="Órdenes válidas" valor={resumen.cantidadOrdenes} /></div>
                <div className="col"><TarjetaEstadistica icono="🎯" titulo="Ticket promedio" valor={formatearCLP(resumen.ticketPromedio)} /></div>
                <div className="col"><TarjetaEstadistica icono="❌" titulo="Pagos rechazados" valor={resumen.rechazadas} /></div>
            </div>
            <div className="row g-3">
                <div className="col-12 col-lg-6">
                    <div className="admin-card h-100">
                        <h2 className="h5">Productos más vendidos (monto)</h2>
                        {porProducto.length === 0 && <p className="mb-0">Sin ventas registradas.</p>}
                        {porProducto.map((v) => (
                            <BarraDato key={v.codigo} etiqueta={`${v.nombre} (${v.unidades} u.)`} valor={v.monto} maximo={porProducto[0].monto} texto={formatearCLP(v.monto)} />
                        ))}
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="admin-card mb-3">
                        <h2 className="h5">Ventas por categoría</h2>
                        {porCategoria.map((c) => (
                            <BarraDato key={c.categoria} etiqueta={c.categoria} valor={c.monto} maximo={porCategoria[0].monto} texto={formatearCLP(c.monto)} />
                        ))}
                    </div>
                    <div className="admin-card">
                        <h2 className="h5">Órdenes por estado</h2>
                        <div className="d-flex flex-wrap gap-2">
                            {Object.entries(estados).map(([estado, n]) => (
                                <span key={estado} className="chip-rol">{estado}: {n}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminReportes;
