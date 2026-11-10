import { describe, it, expect, beforeEach } from 'vitest';
import {
    crearProducto, actualizarProducto, eliminarProducto, obtenerProductoPorCodigo,
    obtenerProductos, precioFinal, PRODUCTOS_INICIALES
} from '../data/productos.js';

describe('Fuente de datos de productos (CRUD)', () => {
    beforeEach(() => localStorage.clear());

    // Prueba 3
    it('crea, actualiza y elimina un producto persistiéndolo en localStorage', () => {
        const inicial = obtenerProductos().length;
        expect(inicial).toBe(PRODUCTOS_INICIALES.length);

        crearProducto({ codigo: 'TST01', nombre: 'Kuchen de Prueba', precio: 10000, categoria: 'Tortas Especiales', stock: 5 });
        expect(obtenerProductos()).toHaveLength(inicial + 1);

        actualizarProducto('TST01', { precio: 12000, descuento: 50 });
        const editado = obtenerProductoPorCodigo('TST01');
        expect(editado.precio).toBe(12000);
        expect(precioFinal(editado)).toBe(6000);

        expect(eliminarProducto('TST01')).toBe(true);
        expect(obtenerProductoPorCodigo('TST01')).toBeNull();
        expect(() => crearProducto({ codigo: 'TC001', nombre: 'Duplicado' })).toThrow('Ya existe');
    });
});
