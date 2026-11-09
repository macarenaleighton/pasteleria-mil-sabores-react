import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSesion } from '../../context/SesionContext.jsx';

// Enlaces del menú lateral. soloAdmin = no visible para el Vendedor
export const MODULOS_ADMIN = [
    { ruta: '/admin', texto: 'Dashboard', icono: '🏠', end: true, descripcion: 'Visión general de métricas y estadísticas.' },
    { ruta: '/admin/ordenes', texto: 'Órdenes', icono: '🧾', descripcion: 'Gestión de órdenes de compra y boletas.' },
    { ruta: '/admin/productos', texto: 'Productos', icono: '🎂', descripcion: 'Inventario, precios y stock de productos.' },
    { ruta: '/admin/categorias', texto: 'Categorías', icono: '🗂️', soloAdmin: true, descripcion: 'Organiza los productos en categorías.' },
    { ruta: '/admin/usuarios', texto: 'Usuarios', icono: '👤', soloAdmin: true, descripcion: 'Cuentas, roles e historial de compras.' },
    { ruta: '/admin/reportes', texto: 'Reportes', icono: '📊', descripcion: 'Ventas por producto y por categoría.' },
    { ruta: '/admin/perfil', texto: 'Perfil', icono: '⚙️', descripcion: 'Tus datos personales y contraseña.' }
];

// Layout del panel: menú lateral fijo en escritorio y desplegable en móvil
function AdminLayout() {
    const { usuario, cerrarSesion } = useSesion();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();
    const esAdministrador = usuario?.tipo === 'Administrador';
    const enlaces = MODULOS_ADMIN.filter((m) => esAdministrador || !m.soloAdmin);

    return (
        <div className="admin-wrapper">
            <aside className="admin-sidebar">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/admin" className="logo-admin">🧁 Mil Sabores</Link>
                    <button className="btn btn-sm text-white d-lg-none" aria-label="Menú admin" aria-expanded={menuAbierto}
                            onClick={() => setMenuAbierto(!menuAbierto)}>☰</button>
                </div>
                <nav className={menuAbierto ? 'd-block mt-3' : 'd-none d-lg-block'}>
                    {enlaces.map((e) => (
                        <NavLink key={e.ruta} to={e.ruta} end={e.end} onClick={() => setMenuAbierto(false)}>
                            {e.icono} {e.texto}
                        </NavLink>
                    ))}
                    <div className="separador" />
                    <Link to="/" className="enlace-tienda">🛍️ Ver tienda</Link>
                    <button className="btn text-start w-100 enlace-salir" onClick={() => { cerrarSesion(); navigate('/'); }}>
                        ⏻ Cerrar sesión
                    </button>
                </nav>
            </aside>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
