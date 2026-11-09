import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nombresCategorias } from '../data/categorias.js';
import { formatoCorreoValido } from '../utils/validaciones.js';

function Footer() {
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');

    function suscribir(e) {
        e.preventDefault();
        setMensaje(formatoCorreoValido(correo) ? '¡Gracias por suscribirte!' : 'Ingresa un correo válido.');
        if (formatoCorreoValido(correo)) setCorreo('');
    }

    return (
        <footer className="site-footer mt-5">
            <div className="container-xl">
                <div className="row g-4">
                    <div className="col-12 col-md-4">
                        <strong className="logo-texto fs-4">Mil Sabores</strong>
                        <p className="mb-0">Repostería chilena desde hace 50 años.</p>
                    </div>
                    <div className="col-12 col-md-4">
                        <p className="fw-bold mb-2">Categorías</p>
                        <div className="d-flex flex-wrap gap-2 categorias-footer">
                            {nombresCategorias().slice(0, 4).map((c) => (
                                <Link key={c} to={`/categorias?c=${encodeURIComponent(c)}`}>{c}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <p className="mb-2">Suscríbete a nuestras novedades:</p>
                        <form className="d-flex gap-2" onSubmit={suscribir} noValidate>
                            <input
                                type="email"
                                className="form-control form-control-sm"
                                placeholder="Tu correo"
                                aria-label="Correo para suscripción"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                            <button className="btn btn-primario btn-sm" type="submit">Suscribir</button>
                        </form>
                        {mensaje && <small className="d-block mt-1">{mensaje}</small>}
                    </div>
                </div>
                <p className="footer-copy">© 2026 Pastelería Mil Sabores. Proyecto académico DuocUC - DSY1104.</p>
            </div>
        </footer>
    );
}

export default Footer;
