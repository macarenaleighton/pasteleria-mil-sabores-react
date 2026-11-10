import { Link, useParams } from 'react-router-dom';
import ResumenOrden from '../components/ResumenOrden.jsx';
import { obtenerOrdenPorId } from '../data/ordenes.js';
import { formatearFecha } from '../utils/formato.js';

function CompraExitosa() {
    const { id } = useParams();
    const orden = obtenerOrdenPorId(id);

    if (!orden) return <p>No encontramos la orden {id}. <Link to="/">Volver al inicio</Link></p>;

    const c = orden.cliente;
    return (
        <div className="mx-auto" style={{ maxWidth: 820 }}>
            <div className="alert alert-success text-center">
                <div className="display-4">✅</div>
                <h1 className="h3">¡Compra realizada con éxito!</h1>
                <p className="mb-0">Orden <strong>{orden.id}</strong> · {formatearFecha(orden.fecha)}</p>
            </div>
            <div className="row g-4">
                <div className="col-12 col-md-6">
                    <div className="bg-white rounded p-3 h-100">
                        <h2 className="h5">Datos de entrega</h2>
                        <p className="mb-1">{c.nombre} {c.apellidos}</p>
                        <p className="mb-1">{c.correo}</p>
                        <p className="mb-1">{c.calle}{c.departamento && `, depto. ${c.departamento}`}</p>
                        <p className="mb-1">{c.comuna}, {c.region}</p>
                        {c.indicaciones && <p className="small text-secondary">“{c.indicaciones}”</p>}
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <ResumenOrden items={orden.items} envio={orden.envio} titulo="Detalle de la compra" />
                </div>
            </div>
            <div className="text-center mt-4 d-flex gap-2 justify-content-center flex-wrap">
                <button className="btn btn-secundario" onClick={() => window.print()}>Imprimir boleta</button>
                <Link to="/productos" className="btn btn-primario">Seguir comprando</Link>
            </div>
        </div>
    );
}

export default CompraExitosa;
