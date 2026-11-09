import { Link } from 'react-router-dom';
import { precioFinal } from '../data/productos.js';
import { formatearCLP } from '../utils/formato.js';

// Tarjeta reutilizable de producto.
// Props: producto (objeto), onAgregar (función opcional), mostrarCategoria (bool)
function ProductCard({ producto, onAgregar, mostrarCategoria = true }) {
    const enOferta = Number(producto.descuento) > 0;
    const sinStock = producto.stock <= 0;

    return (
        <article className="tarjeta-producto card h-100" data-testid="tarjeta-producto">
            {enOferta && <span className="badge-oferta">-{producto.descuento}%</span>}
            <Link to={`/productos/${producto.codigo}`} className="text-decoration-none">
                <div className="imagen-producto" aria-hidden="true">{producto.imagen}</div>
            </Link>
            <div className="card-body d-flex flex-column p-0">
                {mostrarCategoria && <span className="categoria-tag">{producto.categoria}</span>}
                <h3>
                    <Link to={`/productos/${producto.codigo}`} className="text-reset text-decoration-none">
                        {producto.nombre}
                    </Link>
                </h3>
                <p className="precio mb-2">
                    {enOferta && <del className="precio-anterior me-2">{formatearCLP(producto.precio)}</del>}
                    {formatearCLP(precioFinal(producto))}
                </p>
                {onAgregar && (
                    <button
                        className="btn btn-primario btn-pequeno mt-auto"
                        disabled={sinStock}
                        onClick={() => onAgregar(producto.codigo)}
                    >
                        {sinStock ? 'Sin stock' : 'Añadir'}
                    </button>
                )}
            </div>
        </article>
    );
}

export default ProductCard;
