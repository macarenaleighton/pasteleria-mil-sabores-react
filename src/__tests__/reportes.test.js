import { describe, it, expect } from 'vitest';
import { resumenVentas, ventasPorCategoria, ventasPorProducto } from '../data/ordenes.js';

// Datos de prueba propios: no dependen de localStorage
const ordenes = [
    { id: 'A', estado: 'Pagada', total: 20000, items: [{ codigo: 'P1', nombre: 'Torta', precio: 10000, cantidad: 2 }] },
    { id: 'B', estado: 'Entregada', total: 13000, items: [{ codigo: 'P1', nombre: 'Torta', precio: 10000, cantidad: 1 }, { codigo: 'P2', nombre: 'Galleta', precio: 1000, cantidad: 3 }] },
    { id: 'C', estado: 'Rechazada', total: 99999, items: [{ codigo: 'P2', nombre: 'Galleta', precio: 1000, cantidad: 50 }] }
];
const productos = [{ codigo: 'P1', categoria: 'Tortas' }, { codigo: 'P2', categoria: 'Galletas' }];

describe('Reportes de ventas (panel admin)', () => {
    // Prueba 6
    it('calcula totales, ranking por producto y ventas por categoría ignorando órdenes rechazadas', () => {
        expect(resumenVentas(ordenes)).toEqual({ totalVentas: 33000, cantidadOrdenes: 2, ticketPromedio: 16500, rechazadas: 1 });

        const ranking = ventasPorProducto(ordenes);
        expect(ranking[0]).toEqual({ codigo: 'P1', nombre: 'Torta', unidades: 3, monto: 30000 });
        expect(ranking[1].unidades).toBe(3); // las 50 galletas rechazadas no cuentan

        expect(ventasPorCategoria(ordenes, productos)).toEqual([
            { categoria: 'Tortas', monto: 30000 },
            { categoria: 'Galletas', monto: 3000 }
        ]);
    });
});
