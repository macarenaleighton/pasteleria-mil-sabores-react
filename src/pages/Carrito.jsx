import { Link, useNavigate } from 'react-router-dom';
import ItemCarrito from '../components/ItemCarrito.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { formatearCLP } from '../utils/formato.js';

function Carrito() {
    const { carrito, cambiarCantidad, quitar, vaciar, total, unidades } = useCarrito();
    const navigate = useNavigate();

    if (carrito.length === 0) {
        return (
            <div className="carrito-vacio">
                <div className="icono-grande">🛒</div>
                <p>Tu carrito está vacío.</p>
                <Link to="/productos" className="btn btn-primario">Ver productos</Link>
            </div>
        );
    }

    return (
        <>
            <h1>Mi carrito de compras</h1>
            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <div className="bg-white rounded p-3">
                        {carrito.map((item) => (
                            <ItemCarrito key={item.codigo} item={item} onCambiarCantidad={cambiarCantidad} onQuitar={quitar} />
                        ))}
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="resumen-carrito">
                        <p className="mb-1">{unidades} producto(s)</p>
                        <div className="total"><span>Total:</span><span>{formatearCLP(total)}</span></div>
                        <button className="btn btn-primario w-100" onClick={() => navigate('/checkout')}>Ir a pagar</button>
                        <button className="btn btn-secundario w-100 mt-2" onClick={vaciar}>Vaciar carrito</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Carrito;
