import { useState } from 'react';
import ProductGrid from '../components/ProductGrid.jsx';
import Alerta from '../components/Alerta.jsx';
import { obtenerOfertas } from '../data/productos.js';
import { useCarrito } from '../context/CarritoContext.jsx';

// Vista nueva EP2: todos los productos con descuento
function Ofertas() {
    const { agregar } = useCarrito();
    const [aviso, setAviso] = useState(null);
    const ofertas = obtenerOfertas().sort((a, b) => b.descuento - a.descuento);

    function manejarAgregar(codigo) {
        const r = agregar(codigo, 1);
        setAviso({ tipo: r.ok ? 'exito' : 'error', mensaje: r.mensaje });
    }

    return (
        <>
            <div className="banner-ofertas mb-4">
                <h1 className="mb-1">Ofertas</h1>
                <p className="mb-0">Descuentos especiales por nuestro 50° aniversario 🎉</p>
            </div>
            <Alerta tipo={aviso?.tipo} mensaje={aviso?.mensaje} onCerrar={() => setAviso(null)} />
            <ProductGrid productos={ofertas} onAgregar={manejarAgregar} mensajeVacio="No hay ofertas vigentes por ahora." />
        </>
    );
}

export default Ofertas;
