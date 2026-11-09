
export const CLAVE_ORDENES = 'msabores_ordenes';

const camila = { nombre: 'Camila', apellidos: 'Torres Díaz', correo: 'camila.torres@gmail.com', region: 'Región de la Araucanía', comuna: 'Temuco', calle: 'Pasaje Los Aromos 789', departamento: '', indicaciones: '', entrega: 'domicilio' };
const javier = { nombre: 'Javier', apellidos: 'Muñoz Rojas', correo: 'javier.munoz@gmail.com', region: 'Región de Ñuble', comuna: 'Chillán', calle: 'Calle Las Rosas 456', departamento: '', indicaciones: 'Tocar timbre', entrega: 'retiro' };

export const ORDENES_INICIALES = [
    {
        id: 'ORD-0001', fecha: '2026-10-05T15:20:00.000Z', estado: 'Entregada', usuarioRun: '178965038', cliente: camila,
        items: [
            { codigo: 'TT002', nombre: 'Torta Circular de Manjar', precio: 35700, imagen: '🍰', cantidad: 1 },
            { codigo: 'PI002', nombre: 'Tiramisú Clásico', precio: 4400, imagen: '🍮', cantidad: 4 }
        ],
        subtotal: 53300, envio: 3990, total: 57290, motivo: null
    },
    {
        id: 'ORD-0002', fecha: '2026-10-10T19:05:00.000Z', estado: 'Despachada', usuarioRun: '152030057', cliente: javier,
        items: [
            { codigo: 'TE001', nombre: 'Torta Especial de Cumpleaños', precio: 55000, imagen: '🎂', cantidad: 1 },
            { codigo: 'PT001', nombre: 'Empanada de Manzana', precio: 3000, imagen: '🥟', cantidad: 6 }
        ],
        subtotal: 73000, envio: 0, total: 73000, motivo: null
    },
    {
        id: 'ORD-0003', fecha: '2026-10-15T13:40:00.000Z', estado: 'Pagada', usuarioRun: '178965038', cliente: camila,
        items: [{ codigo: 'PV002', nombre: 'Galletas Veganas de Avena', precio: 3375, imagen: '🍪', cantidad: 3 }],
        subtotal: 10125, envio: 3990, total: 14115, motivo: null
    }
];

export function obtenerOrdenes() {
    const guardadas = localStorage.getItem(CLAVE_ORDENES);
    if (guardadas) {
        try {
            return JSON.parse(guardadas);
        } catch {
        }
    }
    guardarOrdenes(ORDENES_INICIALES);
    return [...ORDENES_INICIALES];
}

function guardarOrdenes(ordenes) {
    localStorage.setItem(CLAVE_ORDENES, JSON.stringify(ordenes));
}

export function obtenerOrdenPorId(id) {
    return obtenerOrdenes().find((o) => o.id === id) || null;
}

export function obtenerOrdenesDeUsuario(usuario) {
    if (!usuario) return [];
    return obtenerOrdenes().filter(
        (o) => o.usuarioRun === usuario.run || o.cliente?.correo?.toLowerCase() === usuario.correo?.toLowerCase()
    );
}

export function crearOrden(datos) {
    const ordenes = obtenerOrdenes();
    const mayor = ordenes.reduce((max, o) => Math.max(max, Number(o.id.replace('ORD-', '')) || 0), 0);
    const orden = {
        id: `ORD-${String(mayor + 1).padStart(4, '0')}`,
        fecha: new Date().toISOString(),
        estado: 'Pendiente',
        ...datos
    };
    guardarOrdenes([...ordenes, orden]);
    return orden;
}

export function actualizarEstadoOrden(id, estado) {
    guardarOrdenes(obtenerOrdenes().map((o) => (o.id === id ? { ...o, estado } : o)));
}

export function eliminarOrden(id) {
    guardarOrdenes(obtenerOrdenes().filter((o) => o.id !== id));
}

export function ordenesValidas(ordenes) {
    return ordenes.filter((o) => o.estado !== 'Rechazada' && o.estado !== 'Pendiente');
}

export function resumenVentas(ordenes) {
    const validas = ordenesValidas(ordenes);
    const total = validas.reduce((s, o) => s + o.total, 0);
    return {
        totalVentas: total,
        cantidadOrdenes: validas.length,
        ticketPromedio: validas.length ? Math.round(total / validas.length) : 0,
        rechazadas: ordenes.filter((o) => o.estado === 'Rechazada').length
    };
}

export function ventasPorProducto(ordenes) {
    const mapa = {};
    ordenesValidas(ordenes).forEach((o) =>
        o.items.forEach((i) => {
            mapa[i.codigo] ??= { codigo: i.codigo, nombre: i.nombre, unidades: 0, monto: 0 };
            mapa[i.codigo].unidades += i.cantidad;
            mapa[i.codigo].monto += i.precio * i.cantidad;
        })
    );
    return Object.values(mapa).sort((a, b) => b.monto - a.monto);
}

export function ventasPorCategoria(ordenes, productos) {
    const categoriaDe = Object.fromEntries(productos.map((p) => [p.codigo, p.categoria]));
    const mapa = {};
    ventasPorProducto(ordenes).forEach((v) => {
        const cat = categoriaDe[v.codigo] || 'Sin categoría';
        mapa[cat] = (mapa[cat] || 0) + v.monto;
    });
    return Object.entries(mapa).map(([categoria, monto]) => ({ categoria, monto })).sort((a, b) => b.monto - a.monto);
}