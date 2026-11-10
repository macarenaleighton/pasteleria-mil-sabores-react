import { Link, useLocation } from 'react-router-dom';
import ResumenOrden from '../components/ResumenOrden.jsx';
import { obtenerOrdenPorId } from '../data/ordenes.js';

function CompraFallida() {
    const { state } = useLocation();
    const orden = state?.ordenId ? obtenerOrdenPorId(state.ordenId) : null;

    return (
        <div className="mx-auto" style={{ maxWidth: 820 }}>
            <div className="alert alert-danger text-center">
                <div className="display-4">❌</div>
                <h1 className="h3">No se pudo realizar el pago</h1>
                <p className="mb-0">{orden?.motivo || 'Ocurrió un problema al procesar tu pago.'} Tu carrito se mantiene intacto.</p>
                {orden && <p className="small mb-0">Referencia: {orden.id}</p>}
            </div>
            {orden && <ResumenOrden items={orden.items} envio={orden.envio} titulo="Pedido no procesado" />}
            <div className="text-center mt-4 d-flex gap-2 justify-content-center flex-wrap">
                <Link to="/checkout" className="btn btn-primario">Volver a intentar el pago</Link>
                <Link to="/carrito" className="btn btn-secundario">Volver al carrito</Link>
            </div>
        </div>
    );
}

export default CompraFallida;
