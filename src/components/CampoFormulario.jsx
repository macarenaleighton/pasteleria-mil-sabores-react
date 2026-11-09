// Campo de formulario reutilizable con etiqueta, ayuda y mensaje de error.
// El mensaje de error solo se muestra cuando la prop "error" tiene contenido.
function CampoFormulario({ id, label, error, ayuda, como = 'input', children, className = '', ...props }) {
    const claseControl = como === 'select' ? 'form-select' : 'form-control';
    const clases = `${claseControl} ${error ? 'is-invalid' : ''}`;

    let control;
    if (como === 'textarea') control = <textarea id={id} className={clases} {...props} />;
    else if (como === 'select') control = <select id={id} className={clases} {...props}>{children}</select>;
    else control = <input id={id} className={clases} {...props} />;

    return (
        <div className={`mb-3 ${className}`}>
            <label htmlFor={id} className="form-label fw-bold">{label}</label>
            {control}
            {ayuda && <div className="form-text">{ayuda}</div>}
            {error && <div className="invalid-feedback d-block" role="alert">{error}</div>}
        </div>
    );
}

export default CampoFormulario;
