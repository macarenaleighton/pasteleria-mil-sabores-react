
import { precioFinal } from '../data/productos.js';

export function agregarItem(carrito, producto, cantidad = 1) {
    if (!producto) return { carrito, ok: false, mensaje: 'El producto no existe.' };
    if (cantidad < 1) return { carrito, ok: false, mensaje: 'La cantidad debe ser al menos 1.' };

    const existente = carrito.find((i) => i.codigo === producto.codigo);
    const cantidadActual = existente ? existente.cantidad : 0;

    if (cantidadActual + cantidad > producto.stock) {
        return { carrito, ok: false, mensaje: `No hay suficiente stock de "${producto.nombre}".` };
    }

    const nuevoCarrito = existente
        ? carrito.map((i) => (i.codigo === producto.codigo ? { ...i, cantidad: i.cantidad + cantidad } : i))
        : [
            ...carrito,
            {
                codigo: producto.codigo,
                nombre: producto.nombre,
                precio: precioFinal(producto),
                imagen: producto.imagen,
                stock: producto.stock,
                cantidad
            }
        ];

    return { carrito: nuevoCarrito, ok: true, mensaje: `"${producto.nombre}" se agregó al carrito.` };
}

export function cambiarCantidadItem(carrito, codigo, nuevaCantidad) {
    if (nuevaCantidad <= 0) return quitarItem(carrito, codigo);
    return carrito.map((i) =>
        i.codigo === codigo ? { ...i, cantidad: Math.min(nuevaCantidad, i.stock ?? nuevaCantidad) } : i
    );
}

export function quitarItem(carrito, codigo) {
    return carrito.filter((i) => i.codigo !== codigo);
}

export function calcularTotal(carrito) {
    return carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
}

export function contarUnidades(carrito) {
    return carrito.reduce((suma, i) => suma + i.cantidad, 0);
}


export const OPCIONES_ENTREGA = [
    { valor: 'retiro', etiqueta: 'Retiro en tienda', costo: 0 },
    { valor: 'domicilio', etiqueta: 'Despacho a domicilio', costo: 3990 },
    { valor: 'express', etiqueta: 'Despacho express (mismo día)', costo: 6990 }
];

export function costoEntrega(tipo) {
    return OPCIONES_ENTREGA.find((o) => o.valor === tipo)?.costo ?? 0;
}