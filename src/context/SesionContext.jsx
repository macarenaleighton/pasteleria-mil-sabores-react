import { createContext, useContext, useState } from 'react';
import { autenticar } from '../data/usuarios.js';

export const CLAVE_SESION = 'msabores_sesion';

const SesionContext = createContext(null);

function leerSesion() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_SESION));
    } catch {
        return null;
    }
}

export function SesionProvider({ children }) {
    const [usuario, setUsuario] = useState(leerSesion);

    function iniciarSesion(correo, clave) {
        const encontrado = autenticar(correo, clave);
        if (encontrado) {
            setUsuario(encontrado);
            localStorage.setItem(CLAVE_SESION, JSON.stringify(encontrado));
        }
        return encontrado;
    }

    function actualizarSesion(cambios) {
        const actualizado = { ...usuario, ...cambios };
        delete actualizado.clave;
        setUsuario(actualizado);
        localStorage.setItem(CLAVE_SESION, JSON.stringify(actualizado));
    }

    function cerrarSesion() {
        setUsuario(null);
        localStorage.removeItem(CLAVE_SESION);
    }

    const valor = {
        usuario,
        iniciarSesion,
        cerrarSesion,
        actualizarSesion,
        esAdmin: usuario?.tipo === 'Administrador' || usuario?.tipo === 'Vendedor'
    };

    return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

export function useSesion() {
    const contexto = useContext(SesionContext);
    if (!contexto) throw new Error('useSesion debe usarse dentro de <SesionProvider>');
    return contexto;
}