
import { CLAVE_PRODUCTOS, obtenerProductos } from './productos.js';

export const CLAVE_CATEGORIAS = 'msabores_categorias';

export const CATEGORIAS_INICIALES = [
    { id: 'CAT01', nombre: 'Tortas Cuadradas', icono: '🟫', descripcion: 'Tortas de formato cuadrado para grandes celebraciones.' },
    { id: 'CAT02', nombre: 'Tortas Circulares', icono: '🎂', descripcion: 'Tortas clásicas de formato redondo.' },
    { id: 'CAT03', nombre: 'Postres Individuales', icono: '🍮', descripcion: 'Porciones individuales listas para disfrutar.' },
    { id: 'CAT04', nombre: 'Productos Sin Azúcar', icono: '🍊', descripcion: 'Endulzados naturalmente.' },
    { id: 'CAT05', nombre: 'Pastelería Tradicional', icono: '🥧', descripcion: 'Recetas de siempre.' },
    { id: 'CAT06', nombre: 'Productos Sin Gluten', icono: '🌾', descripcion: 'Aptos para personas celíacas.' },
    { id: 'CAT07', nombre: 'Productos Vegana', icono: '🌱', descripcion: 'Sin ingredientes de origen animal.' },
    { id: 'CAT08', nombre: 'Tortas Especiales', icono: '💍', descripcion: 'Cumpleaños, matrimonios y eventos.' }
];

function guardarCategorias(categorias) {
    localStorage.setItem(CLAVE_CATEGORIAS, JSON.stringify(categorias));
}

export function obtenerCategorias() {
    const guardadas = localStorage.getItem(CLAVE_CATEGORIAS);
    if (guardadas) {
        try {
            return JSON.parse(guardadas);
        } catch {
        }
    }
    guardarCategorias(CATEGORIAS_INICIALES);
    return [...CATEGORIAS_INICIALES];
}

export function nombresCategorias() {
    return obtenerCategorias().map((c) => c.nombre);
}

export function obtenerCategoriaPorId(id) {
    return obtenerCategorias().find((c) => c.id === id) || null;
}

export function iconoCategoria(nombre) {
    return obtenerCategorias().find((c) => c.nombre === nombre)?.icono || '🍰';
}

export function crearCategoria({ nombre, icono = '🍰', descripcion = '' }) {
    const categorias = obtenerCategorias();
    if (categorias.some((c) => c.nombre.toLowerCase() === nombre.trim().toLowerCase())) {
        throw new Error('Ya existe una categoría con ese nombre.');
    }
    const mayor = categorias.reduce((max, c) => Math.max(max, Number(c.id.replace('CAT', '')) || 0), 0);
    const nueva = { id: `CAT${String(mayor + 1).padStart(2, '0')}`, nombre: nombre.trim(), icono, descripcion };
    guardarCategorias([...categorias, nueva]);
    return nueva;
}

export function actualizarCategoria(id, cambios) {
    const categorias = obtenerCategorias();
    const actual = categorias.find((c) => c.id === id);
    if (!actual) throw new Error('La categoría no existe.');
    const nuevoNombre = cambios.nombre?.trim() || actual.nombre;
    if (categorias.some((c) => c.id !== id && c.nombre.toLowerCase() === nuevoNombre.toLowerCase())) {
        throw new Error('Ya existe una categoría con ese nombre.');
    }
    const actualizada = { ...actual, ...cambios, nombre: nuevoNombre, id };
    guardarCategorias(categorias.map((c) => (c.id === id ? actualizada : c)));

    if (nuevoNombre !== actual.nombre) {
        const productos = obtenerProductos().map((p) => (p.categoria === actual.nombre ? { ...p, categoria: nuevoNombre } : p));
        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
    }
    return actualizada;
}

export function eliminarCategoria(id) {
    const categoria = obtenerCategoriaPorId(id);
    if (!categoria) return false;
    if (obtenerProductos().some((p) => p.categoria === categoria.nombre)) {
        throw new Error('No se puede eliminar: la categoría tiene productos asociados.');
    }
    guardarCategorias(obtenerCategorias().filter((c) => c.id !== id));
    return true;
}