// Tarjeta del dashboard. Props: icono, titulo, valor, detalle, variante
function TarjetaEstadistica({ icono, titulo, valor, detalle, variante = '' }) {
    return (
        <div className={`admin-card tarjeta-estadistica h-100 ${variante}`}>
            <div className="fs-2">{icono}</div>
            <p className="mb-0 text-secondary">{titulo}</p>
            <p className="valor mb-0">{valor}</p>
            {detalle && <small>{detalle}</small>}
        </div>
    );
}

export default TarjetaEstadistica;
