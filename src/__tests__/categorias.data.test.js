import { describe, it, expect } from 'vitest';
import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategorias } from '../data/categorias.js';
import { obtenerProductosPorCategoria } from '../data/productos.js';

describe('Fuente de datos de categorías (CRUD)', () => {
    // Prueba 4
    it('crea categorías, renombra en cascada sus productos y no elimina categorías con productos', () => {
        const nueva = crearCategoria({ nombre: 'Kuchenes', icono: '🥧' });
        expect(nueva.id).toBe('CAT09');
        expect(() => crearCategoria({ nombre: 'kuchenes' })).toThrow('Ya existe');

        actualizarCategoria('CAT01', { nombre: 'Tortas Rectangulares' });
        expect(obtenerProductosPorCategoria('Tortas Rectangulares')).toHaveLength(2);
        expect(obtenerProductosPorCategoria('Tortas Cuadradas')).toHaveLength(0);

        expect(() => eliminarCategoria('CAT01')).toThrow('productos asociados');
        expect(eliminarCategoria('CAT09')).toBe(true);
        expect(obtenerCategorias().some((c) => c.id === 'CAT09')).toBe(false);
    });
});
