import { describe, it, expect } from 'vitest';
import { agregarItem, calcularTotal, cambiarCantidadItem } from '../utils/carrito.js';

const producto = { codigo: 'X1', nombre: 'Torta X', precio: 10000, descuento: 0, stock: 3, imagen: '🎂' };

describe('Lógica del carrito', () => {
    // Prueba 5
    it('acumula cantidades, respeta el stock y calcula el total', () => {
        let r = agregarItem([], producto, 2);
        expect(r.ok).toBe(true);
        expect(r.carrito[0].cantidad).toBe(2);

        r = agregarItem(r.carrito, producto, 2); // 2 + 2 = 4 > stock 3
        expect(r.ok).toBe(false);
        expect(r.mensaje).toMatch(/No hay suficiente stock/);
        expect(r.carrito[0].cantidad).toBe(2); // no cambió

        expect(calcularTotal(r.carrito)).toBe(20000);
        expect(cambiarCantidadItem(r.carrito, 'X1', 0)).toEqual([]); // cantidad 0 elimina el item
    });
});
