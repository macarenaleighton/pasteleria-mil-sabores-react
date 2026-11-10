import { Link, useParams } from 'react-router-dom';
import ResumenOrden from '../../components/ResumenOrden.jsx';
import { obtenerOrdenPorId } from '../../data/ordenes.js';
import { OPCIONES_ENTREGA } from '../../utils/carrito.js';
import { formatearFecha } from '../../utils/formato.js';

// Vista "Mostrar boleta" (Figura 10)
function AdminBoleta() {
    const { id } = useParams();
    const orden = obtenerOrdenPorId(id);

    if (!orden) return <div className="admin-card">No existe la orden {id}. <Link to="/admin/ordenes">Volver</Link></div>;

    const c = orden.cliente;
    const entrega = OPCIONES_ENTREGA.find((o) => o.valor === c.entrega)?.etiqueta || c.entrega;

    return (
        <>
            <div className="admin-topbar">
                <h1>Boleta {orden.id}</h1>
                <div className="d-flex gap-2">
                    <button className="btn btn-primario" onClick={() => window.print()}>Imprimir</button>
                    <Link to="/admin/ordenes" className="btn btn-secundario">Volver</Link>
                </div>
            </div>
            <div className="admin-card boleta mx-auto" style={{ maxWidth: 760 }}>
                <div className="d-flex justify-content-between flex-wrap border-bottom pb-2 mb-3">
                    <div>
                        <strong className="logo-texto fs-4">Pastelería Mil Sabores</strong>
                        <p className="small mb-0">Boleta electrónica (simulada)</p>
                    </div>
                    <div className="text-end small">
                        <p className="mb-0"><strong>N° {orden.id}</strong></p>
                        <p className="mb-0">{formatearFecha(orden.fecha)}</p>
                        <p className="mb-0">Estado: <span className="chip-rol">{orden.estado}</span></p>
                    </div>
                </div>
                <div className="row mb-3 small">
                    <div className="col-12 col-md-6">
                        <p className="fw-bold mb-1">Cliente</p>
                        <p className="mb-0">{c.nombre} {c.apellidos}</p>
                        <p className="mb-0">{c.correo}</p>
                    </div>
                    <div className="col-12 col-md-6">
                        <p className="fw-bold mb-1">Entrega: {entrega}</p>
                        <p className="mb-0">{c.calle}{c.departamento && `, depto. ${c.departamento}`}</p>
                        <p className="mb-0">{c.comuna}, {c.region}</p>
                    </div>
                </div>
                <ResumenOrden items={orden.items} envio={orden.envio} titulo="Detalle" />
                {orden.motivo && <p className="text-danger small mt-2 mb-0">Motivo de rechazo: {orden.motivo}</p>}
            </div>
        </>
    );
}

export default AdminBoleta;
