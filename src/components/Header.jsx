import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext.jsx';
import { useSesion } from '../context/SesionContext.jsx';

const ENLACES = [
    { ruta: '/', texto: 'Home' },
    { ruta: '/productos', texto: 'Productos' },
    { ruta: '/categorias', texto: 'Categorías' },
    { ruta: '/ofertas', texto: 'Ofertas' },
    { ruta: '/nosotros', texto: 'Nosotros' },
    { ruta: '/blogs', texto: 'Blogs' },
    { ruta: '/contacto', texto: 'Contacto' }
];

// Barra de navegación responsiva (Bootstrap navbar).
// El menú colapsable se controla con estado de React en vez de bootstrap.js
function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { unidades } = useCarrito();
    const { usuario, cerrarSesion, esAdmin } = useSesion();
    const navigate = useNavigate();

    const cerrarMenu = () => setMenuAbierto(false);

    function salir() {
        cerrarSesion();
        cerrarMenu();
        navigate('/');
    }

    return (
        <header className="site-header sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light container-xl px-3">
                <Link to="/" className="navbar-brand logo" onClick={cerrarMenu}>
                    <img src="/img/logo.png" alt="Logo Pastelería Mil Sabores" width="36" height="36" />
                    <span className="logo-texto">Mil Sabores</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-label="Abrir menú"
                    aria-expanded={menuAbierto}
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        {ENLACES.map((enlace) => (
                            <li className="nav-item" key={enlace.ruta}>
                                <NavLink to={enlace.ruta} end={enlace.ruta === '/'} className="nav-link" onClick={cerrarMenu}>
                                    {enlace.texto}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex flex-wrap align-items-center gap-2 nav-acciones">
                        {usuario ? (
                            <>
                                <span className="small">Hola, <strong>{usuario.nombre}</strong></span>
                                {esAdmin && (
                                    <Link to="/admin" className="btn btn-sm btn-outline-success" onClick={cerrarMenu}>
                                        Panel admin
                                    </Link>
                                )}
                                <button className="btn btn-sm btn-link" onClick={salir}>Cerrar sesión</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="enlace-secundario" onClick={cerrarMenu}>Iniciar sesión</Link>
                                <Link to="/registro" className="enlace-secundario" onClick={cerrarMenu}>Registrarse</Link>
                            </>
                        )}
                        <Link to="/carrito" className="carrito-link" onClick={cerrarMenu}>
                            🛒 Carrito <span className="carrito-contador" data-testid="contador-carrito">{unidades}</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
