import { formatearCLP } from '../utils/formato.js';

// Resumen reutilizado en Checkout, Compra exitosa y Compra fallida
function ResumenOrden({ items, envio = 0, titulo = 'Resumen del pedido' }) {
    const subtotal = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
    return (
        <div className="resumen-carrito">
            <h2 className="h5">{titulo}</h2>
            <table className="table table-sm mb-2">
                <tbody>
                {items.map((i) => (
                    <tr key={i.codigo}>
                        <td>{i.imagen} {i.nombre} × {i.cantidad}</td>
                        <td className="text-end">{formatearCLP(i.precio * i.cantidad)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between"><span>Subtotal</span><span>{formatearCLP(subtotal)}</span></div>
            <div className="d-flex justify-content-between"><span>Envío</span><span>{envio === 0 ? 'Gratis' : formatearCLP(envio)}</span></div>
            <div className="total"><span>Total:</span><span data-testid="total-orden">{formatearCLP(subtotal + envio)}</span></div>
        </div>
    );
}

export default ResumenOrden;
