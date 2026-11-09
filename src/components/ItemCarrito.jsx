import { formatearCLP } from '../utils/formato.js';

// Fila del carrito. Recibe el item y las funciones para modificarlo.
function ItemCarrito({ item, onCambiarCantidad, onQuitar }) {
    return (
        <div className="item-carrito d-flex flex-wrap align-items-center gap-3 py-3 border-bottom">
            <span className="fs-1" aria-hidden="true">{item.imagen}</span>
            <div className="flex-grow-1">
                <p className="fw-bold mb-0">{item.nombre}</p>
                <small className="text-secondary">{formatearCLP(item.precio)} c/u</small>
            </div>
            <div className="control-cantidad">
                <button aria-label={`Disminuir ${item.nombre}`} onClick={() => onCambiarCantidad(item.codigo, item.cantidad - 1)}>−</button>
                <span>{item.cantidad}</span>
                <button
                    aria-label={`Aumentar ${item.nombre}`}
                    disabled={item.stock !== undefined && item.cantidad >= item.stock}
                    onClick={() => onCambiarCantidad(item.codigo, item.cantidad + 1)}
                >+</button>
            </div>
            <strong className="subtotal-item">{formatearCLP(item.precio * item.cantidad)}</strong>
            <button className="btn btn-peligro btn-pequeno" onClick={() => onQuitar(item.codigo)}>Eliminar</button>
        </div>
    );
}

export default ItemCarrito;
