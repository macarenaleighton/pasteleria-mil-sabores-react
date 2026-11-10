import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductGrid from '../components/ProductGrid.jsx';
import Alerta from '../components/Alerta.jsx';
import { obtenerOfertas, obtenerProductos } from '../data/productos.js';
import { useCarrito } from '../context/CarritoContext.jsx';

function Home() {
    const { agregar } = useCarrito();
    const [aviso, setAviso] = useState(null);
    const destacados = obtenerProductos().slice(0, 4);
    const ofertas = obtenerOfertas().slice(0, 4);

    function manejarAgregar(codigo) {
        const r = agregar(codigo, 1);
        setAviso({ tipo: r.ok ? 'exito' : 'error', mensaje: r.mensaje });
    }

    return (
        <>
            <section className="hero row align-items-center g-4">
                <div className="col-12 col-md-6 hero-texto">
                    <h1>Pastelería Mil Sabores</h1>
                    <p>Celebrando 50 años de dulzura y tradición. Descubre tortas, postres y repostería hechos con historia, creatividad y mucho cariño.</p>
                    <div className="d-flex flex-wrap gap-2">
                        <Link to="/productos" className="btn btn-primario">Ver productos</Link>
                        <Link to="/ofertas" className="btn btn-secundario">Ver ofertas</Link>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <img src="/img/hero-banner.png" alt="Torta especial de Pastelería Mil Sabores" className="img-fluid rounded" />
                </div>
            </section>

            <Alerta tipo={aviso?.tipo} mensaje={aviso?.mensaje} onCerrar={() => setAviso(null)} />

            <section className="my-5">
                <h2>Nuestros favoritos</h2>
                <ProductGrid productos={destacados} onAgregar={manejarAgregar} />
            </section>

            <section className="my-5">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h2>Ofertas de la semana</h2>
                    <Link to="/ofertas">Ver todas →</Link>
                </div>
                <ProductGrid productos={ofertas} onAgregar={manejarAgregar} />
            </section>

            <section className="my-5">
                <h2>Conócenos en video</h2>
                <div className="ratio ratio-16x9 mx-auto video-institucional">
                    <video controls poster="/img/hero-banner.png">
                        <source src="/img/video-institucional.mp4" type="video/mp4" />
                        Tu navegador no soporta video HTML5.
                    </video>
                </div>
            </section>
        </>
    );
}

export default Home;
