// Mensaje de retroalimentación (éxito / error) con Bootstrap
function Alerta({ tipo = 'exito', mensaje, onCerrar }) {
    if (!mensaje) return null;
    const clase = tipo === 'exito' ? 'alert-success' : 'alert-danger';
    return (
        <div className={`alert ${clase} d-flex justify-content-between align-items-center`} role="status">
            <span>{mensaje}</span>
            {onCerrar && <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar} />}
        </div>
    );
}

export default Alerta;
