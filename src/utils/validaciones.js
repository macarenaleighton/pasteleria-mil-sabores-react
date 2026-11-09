
export const DOMINIOS_CORREO_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

export function formatoCorreoValido(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

export function dominioCorreoPermitido(correo) {
    const dominio = correo.split('@')[1]?.toLowerCase();
    return DOMINIOS_CORREO_PERMITIDOS.includes(dominio);
}

export function validarRun(run) {
    const limpio = run.trim().toUpperCase();
    if (limpio.length < 7 || limpio.length > 9) return false;
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);
    return /^[0-9]+$/.test(cuerpo) && /^[0-9K]$/.test(dv);
}

export function esFormularioValido(errores) {
    return Object.keys(errores).length === 0;
}

function validarCorreo(correo, obligatorio = true) {
    const valor = (correo || '').trim();
    if (!valor) return obligatorio ? 'El correo es obligatorio.' : null;
    if (valor.length > 100 || !formatoCorreoValido(valor)) return 'Ingresa un correo válido.';
    if (!dominioCorreoPermitido(valor)) return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    return null;
}

function validarClave(clave) {
    if (!clave) return 'La contraseña es obligatoria.';
    if (clave.length < 4 || clave.length > 10) return 'Debe tener entre 4 y 10 caracteres.';
    return null;
}

function texto(valor) {
    return (valor ?? '').toString().trim();
}

export function validarLogin({ correo, clave }) {
    const errores = {};
    const errorCorreo = validarCorreo(correo);
    if (errorCorreo) errores.correo = errorCorreo;
    const errorClave = validarClave(clave);
    if (errorClave) errores.clave = errorClave;
    return errores;
}

export function validarRegistro(datos) {
    const errores = {};
    if (!texto(datos.run)) errores.run = 'El RUN es obligatorio.';
    else if (!validarRun(datos.run)) errores.run = 'El RUN ingresado no es válido.';

    if (!texto(datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
    else if (texto(datos.nombre).length > 50) errores.nombre = 'Máximo 50 caracteres.';

    if (!texto(datos.apellidos)) errores.apellidos = 'Los apellidos son obligatorios.';
    else if (texto(datos.apellidos).length > 100) errores.apellidos = 'Máximo 100 caracteres.';

    const errorCorreo = validarCorreo(datos.correo);
    if (errorCorreo) errores.correo = errorCorreo;

    const errorClave = validarClave(datos.clave);
    if (errorClave) errores.clave = errorClave;
    if (datos.clave2 !== datos.clave) errores.clave2 = 'Las contraseñas no coinciden.';

    if (!datos.region) errores.region = 'Selecciona una región.';
    if (!datos.comuna) errores.comuna = 'Selecciona una comuna.';

    if (!texto(datos.direccion)) errores.direccion = 'La dirección es obligatoria.';
    else if (texto(datos.direccion).length > 300) errores.direccion = 'Máximo 300 caracteres.';
    return errores;
}

export function validarContacto({ nombre, correo, comentario }) {
    const errores = {};
    if (!texto(nombre)) errores.nombre = 'El nombre es obligatorio.';
    else if (texto(nombre).length > 100) errores.nombre = 'Máximo 100 caracteres.';

    const errorCorreo = validarCorreo(correo, false);
    if (errorCorreo) errores.correo = errorCorreo;

    if (!texto(comentario)) errores.comentario = 'El comentario es obligatorio.';
    else if (texto(comentario).length > 500) errores.comentario = 'Máximo 500 caracteres.';
    return errores;
}

export function validarCheckout(datos) {
    const errores = {};
    if (!texto(datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
    if (!texto(datos.apellidos)) errores.apellidos = 'Los apellidos son obligatorios.';
    const errorCorreo = validarCorreo(datos.correo);
    if (errorCorreo) errores.correo = errorCorreo;
    if (!datos.region) errores.region = 'Selecciona una región.';
    if (!datos.comuna) errores.comuna = 'Selecciona una comuna.';
    if (!texto(datos.calle)) errores.calle = 'La calle y número son obligatorios.';
    if (texto(datos.indicaciones).length > 200) errores.indicaciones = 'Máximo 200 caracteres.';
    if (!datos.entrega) errores.entrega = 'Selecciona un tipo de entrega.';
    return errores;
}

export function validarProducto(datos, { esEdicion = false, codigoExiste = () => false } = {}) {
    const errores = {};
    const codigo = texto(datos.codigo);
    if (!codigo) errores.codigo = 'El código es obligatorio.';
    else if (codigo.length < 3) errores.codigo = 'Mínimo 3 caracteres.';
    else if (!esEdicion && codigoExiste(codigo)) errores.codigo = 'Ya existe un producto con ese código.';

    if (!texto(datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
    else if (texto(datos.nombre).length > 100) errores.nombre = 'Máximo 100 caracteres.';

    if (texto(datos.descripcion).length > 500) errores.descripcion = 'Máximo 500 caracteres.';

    if (texto(datos.precio) === '' || isNaN(Number(datos.precio))) errores.precio = 'El precio es obligatorio.';
    else if (Number(datos.precio) < 0) errores.precio = 'El precio no puede ser negativo.';

    if (!datos.categoria) errores.categoria = 'Selecciona una categoría.';

    const stock = texto(datos.stock);
    if (stock === '') errores.stock = 'El stock es obligatorio.';
    else if (!Number.isInteger(Number(stock)) || Number(stock) < 0) errores.stock = 'Debe ser un número entero mayor o igual a 0.';

    const critico = texto(datos.stockCritico);
    if (critico !== '' && (!Number.isInteger(Number(critico)) || Number(critico) < 0)) {
        errores.stockCritico = 'Debe ser un número entero mayor o igual a 0.';
    }

    const descuento = texto(datos.descuento);
    if (descuento !== '' && (isNaN(Number(descuento)) || Number(descuento) < 0 || Number(descuento) > 90)) {
        errores.descuento = 'El descuento debe estar entre 0 y 90%.';
    }
    return errores;
}

export function validarUsuarioAdmin(datos, { esEdicion = false } = {}) {
    const base = { ...datos, clave2: datos.clave };
    const errores = validarRegistro(base);
    delete errores.clave2;
    if (esEdicion && !datos.clave) delete errores.clave;
    if (!datos.tipo) errores.tipo = 'Selecciona un tipo de usuario.';
    return errores;
}

export function validarCategoria({ nombre, descripcion }) {
    const errores = {};
    if (!texto(nombre)) errores.nombre = 'El nombre es obligatorio.';
    else if (texto(nombre).length < 3) errores.nombre = 'Mínimo 3 caracteres.';
    else if (texto(nombre).length > 50) errores.nombre = 'Máximo 50 caracteres.';
    if (texto(descripcion).length > 200) errores.descripcion = 'Máximo 200 caracteres.';
    return errores;
}

export function validarPerfil(datos) {
    const errores = {};
    if (!texto(datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
    if (!texto(datos.apellidos)) errores.apellidos = 'Los apellidos son obligatorios.';
    if (!datos.region) errores.region = 'Selecciona una región.';
    if (!datos.comuna) errores.comuna = 'Selecciona una comuna.';
    if (!texto(datos.direccion)) errores.direccion = 'La dirección es obligatoria.';
    if (datos.clave || datos.clave2) {
        const errorClave = validarClave(datos.clave);
        if (errorClave) errores.clave = errorClave;
        if (datos.clave !== datos.clave2) errores.clave2 = 'Las contraseñas no coinciden.';
    }
    return errores;
}