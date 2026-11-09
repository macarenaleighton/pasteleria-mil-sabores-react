import { createContext, useContext, useEffect, useState } from 'react';
import { obtenerProductoPorCodigo } from '../data/productos.js';
import {
    agregarItem,
    calcularTotal,
    cambiarCantidadItem,
    contarUnidades,
    quitarItem
} from '../utils/carrito.js';

export const CLAVE_CARRITO = 'msabores_carrito';

const CarritoContext = createContext(null);

function leerCarritoGuardado() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    } catch {
        return [];
    }
}

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState(leerCarritoGuardado);

    useEffect(() => {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    }, [carrito]);

    function agregar(codigo, cantidad = 1) {
        const producto = obtenerProductoPorCodigo(codigo);
        const resultado = agregarItem(carrito, producto, cantidad);
        if (resultado.ok) setCarrito(resultado.carrito);
        return resultado;
    }

    const valor = {
        carrito,
        agregar,
        cambiarCantidad: (codigo, cantidad) => setCarrito((c) => cambiarCantidadItem(c, codigo, cantidad)),
        quitar: (codigo) => setCarrito((c) => quitarItem(c, codigo)),
        vaciar: () => setCarrito([]),
        total: calcularTotal(carrito),
        unidades: contarUnidades(carrito)
    };

    return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
    const contexto = useContext(CarritoContext);
    if (!contexto) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
    return contexto;
}