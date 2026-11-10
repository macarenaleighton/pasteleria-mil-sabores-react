import { Link } from 'react-router-dom';
import TarjetaEstadistica from '../../components/admin/TarjetaEstadistica.jsx';
import { MODULOS_ADMIN } from '../../components/admin/AdminLayout.jsx';
import { useSesion } from '../../context/SesionContext.jsx';
import { obtenerProductos, obtenerProductosCriticos } from '../../data/productos.js';
import { obtenerUsuarios } from '../../data/usuarios.js';
import { obtenerOrdenes, resumenVentas } from '../../data/ordenes.js';
import { formatearCLP } from '../../utils/formato.js';

function AdminDashboard() {
    const { usuario } = useSesion();
    const productos = obtenerProductos();
    const criticos = obtenerProductosCriticos();
    const ordenes = obtenerOrdenes();
    const usuarios = obtenerUsuarios();
    const resumen = resumenVentas(ordenes);
    const esAdministrador = usuario?.tipo === 'Administrador';
    const inventario = productos.reduce((s, p) => s + p.stock, 0);

    return (
        <>
            <div className="admin-topbar">
                <div>
                    <h1 className="mb-0">Dashboard</h1>
                    <p className="text-secondary mb-0">¡Hola, {usuario?.nombre}! Resumen de las actividades de la tienda.</p>
                </div>
                <span className="chip-rol">Rol: {usuario?.tipo}</span>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3 mb-4">
                <div className="col"><TarjetaEstadistica icono="🛒" titulo="Compras" valor={resumen.cantidadOrdenes} detalle={`Ventas: ${formatearCLP(resumen.totalVentas)}`} variante="kpi-azul" /></div>
                <div className="col"><TarjetaEstadistica icono="📦" titulo="Productos" valor={productos.length} detalle={`Inventario actual: ${inventario} u.`} variante="kpi-verde" /></div>
                <div className="col"><TarjetaEstadistica icono="👥" titulo="Usuarios" valor={usuarios.length} detalle={`${usuarios.filter((u) => u.tipo === 'Cliente').length} clientes`} variante="kpi-amarillo" /></div>
                <div className="col">
                    <Link to="/admin/productos/criticos" className="text-decoration-none">
                        <TarjetaEstadistica icono="⚠️" titulo="Stock crítico" valor={criticos.length} detalle="Ver listado →" variante={criticos.length ? 'alerta' : ''} />
                    </Link>
                </div>
            </div>

            <h2 className="h5 mb-3">Accesos rápidos</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3">
                {MODULOS_ADMIN.filter((m) => m.ruta !== '/admin' && (esAdministrador || !m.soloAdmin)).map((m) => (
                    <div className="col" key={m.ruta}>
                        <Link to={m.ruta} className="admin-card modulo-acceso d-block h-100 text-decoration-none text-center">
                            <div className="fs-2">{m.icono}</div>
                            <p className="fw-bold mb-1">{m.texto}</p>
                            <small className="text-secondary">{m.descripcion}</small>
                        </Link>
                    </div>
                ))}
                <div className="col">
                    <Link to="/" className="admin-card modulo-acceso d-block h-100 text-decoration-none text-center">
                        <div className="fs-2">🛍️</div>
                        <p className="fw-bold mb-1">Tienda</p>
                        <small className="text-secondary">Visualiza la tienda como la ven los clientes.</small>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
