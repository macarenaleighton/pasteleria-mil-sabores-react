import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import Alerta from '../components/Alerta.jsx';
import { obtenerProductoPorCodigo, obtenerProductosPorCategoria, precioFinal } from '../data/productos.js';
import { useCarrito } from '../context/CarritoContext.jsx';
import { formatearCLP } from '../utils/formato.js';

function ProductoDetalle() {
    const { codigo } = useParams();
    const { agregar } = useCarrito();
    const [cantidad, setCantidad] = useState(1);
    const [aviso, setAviso] = useState(null);
    const producto = obtenerProductoPorCodigo(codigo);

    if (!producto) {
        return (
            <div className="text-center py-5">
                <p>No encontramos ese producto.</p>
                <Link to="/productos" className="btn btn-primario">Volver al catálogo</Link>
            </div>
        );
    }

    const relacionados = obtenerProductosPorCategoria(producto.categoria)
        .filter((p) => p.codigo !== producto.codigo)
        .slice(0, 4);

    function manejarAgregar() {
        const r = agregar(producto.codigo, Number(cantidad) || 1);
        setAviso({ tipo: r.ok ? 'exito' : 'error', mensaje: r.mensaje });
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
                </ol>
            </nav>

            <div className="row g-4 detalle-producto">
                <div className="col-12 col-md-5">
                    <div className="detalle-imagen">{producto.imagen}</div>
                </div>
                <div className="col-12 col-md-7 detalle-info">
                    <span className="categoria-tag">{producto.categoria}</span>
                    <h1>{producto.nombre}</h1>
                    <p className="precio">
                        {producto.descuento > 0 && <del className="precio-anterior fs-5 me-2">{formatearCLP(producto.precio)}</del>}
                        {formatearCLP(precioFinal(producto))}
                    </p>
                    <p>{producto.descripcion}</p>
                    <p><small>Stock disponible: {producto.stock} unidades</small></p>

                    <div className="d-flex align-items-center gap-2 mb-3">
                        <label htmlFor="cantidad" className="fw-bold">Cantidad:</label>
                        <input id="cantidad" type="number" className="form-control" style={{ maxWidth: 100 }}
                               min="1" max={producto.stock} value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                    </div>
                    <button className="btn btn-primario" onClick={manejarAgregar} disabled={producto.stock <= 0}>
                        Añadir al carrito
                    </button>
                    <div className="mt-3">
                        <Alerta tipo={aviso?.tipo} mensaje={aviso?.mensaje} onCerrar={() => setAviso(null)} />
                    </div>
                </div>
            </div>

            <section className="mt-5">
                <h2>Productos relacionados</h2>
                <ProductGrid productos={relacionados} mensajeVacio="No hay productos relacionados." />
            </section>
        </>
    );
}

export default ProductoDetalle;
