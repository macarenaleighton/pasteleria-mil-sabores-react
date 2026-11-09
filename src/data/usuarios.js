
export const CLAVE_USUARIOS = 'msabores_usuarios';

export const TIPOS_USUARIO = ['Administrador', 'Vendedor', 'Cliente'];

export const USUARIOS_INICIALES = [
    { run: '190110229', nombre: 'Macarena', apellidos: 'Pérez Soto', correo: 'macarena@duoc.cl', clave: 'admin123', tipo: 'Administrador', region: 'Región Metropolitana de Santiago', comuna: 'Santiago', direccion: 'Av. Siempre Viva 123', fechaNacimiento: '1999-05-14' },
    { run: '152030057', nombre: 'Javier', apellidos: 'Muñoz Rojas', correo: 'javier.munoz@gmail.com', clave: 'vende123', tipo: 'Vendedor', region: 'Región de Ñuble', comuna: 'Chillán', direccion: 'Calle Las Rosas 456', fechaNacimiento: '1995-11-02' },
    { run: '178965038', nombre: 'Camila', apellidos: 'Torres Díaz', correo: 'camila.torres@gmail.com', clave: 'cliente1', tipo: 'Cliente', region: 'Región de la Araucanía', comuna: 'Temuco', direccion: 'Pasaje Los Aromos 789', fechaNacimiento: '2000-02-20' }
];

function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

export function obtenerUsuarios() {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);
    if (guardados) {
        try {
            return JSON.parse(guardados);
        } catch {
            // datos corruptos: se reinicia
        }
    }
    guardarUsuarios(USUARIOS_INICIALES);
    return [...USUARIOS_INICIALES];
}

export function obtenerUsuarioPorRun(run) {
    return obtenerUsuarios().find((u) => u.run === run) || null;
}

export function obtenerUsuarioPorCorreo(correo) {
    const buscado = correo.trim().toLowerCase();
    return obtenerUsuarios().find((u) => u.correo.toLowerCase() === buscado) || null;
}

export function crearUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    if (usuarios.some((u) => u.run === usuario.run)) {
        throw new Error('Ya existe un usuario con ese RUN.');
    }
    if (usuarios.some((u) => u.correo.toLowerCase() === usuario.correo.toLowerCase())) {
        throw new Error('Ya existe un usuario con ese correo.');
    }
    const nuevo = { tipo: 'Cliente', ...usuario };
    guardarUsuarios([...usuarios, nuevo]);
    return nuevo;
}

export function actualizarUsuario(run, cambios) {
    const usuarios = obtenerUsuarios();
    const indice = usuarios.findIndex((u) => u.run === run);
    if (indice === -1) throw new Error('El usuario no existe.');
    usuarios[indice] = { ...usuarios[indice], ...cambios, run };
    guardarUsuarios(usuarios);
    return usuarios[indice];
}

export function eliminarUsuario(run) {
    const usuarios = obtenerUsuarios();
    const filtrados = usuarios.filter((u) => u.run !== run);
    guardarUsuarios(filtrados);
    return filtrados.length < usuarios.length;
}

export function autenticar(correo, clave) {
    const usuario = obtenerUsuarioPorCorreo(correo);
    if (!usuario || usuario.clave !== clave) return null;
    // eslint-disable-next-line no-unused-vars
    const { clave: _omitida, ...publico } = usuario;
    return publico;
}