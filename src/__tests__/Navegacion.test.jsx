import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.jsx';
import { CarritoProvider } from '../context/CarritoContext.jsx';
import { SesionProvider } from '../context/SesionContext.jsx';
import { obtenerOfertas } from '../data/productos.js';

function renderizarEn(ruta) {
    return render(
        <MemoryRouter initialEntries={[ruta]}>
            <SesionProvider><CarritoProvider><App /></CarritoProvider></SesionProvider>
        </MemoryRouter>
    );
}

describe('Navegación con React Router', () => {
    // Prueba 18
    it('la ruta /ofertas muestra solo productos con descuento y /admin sin sesión redirige al login', () => {
        const { unmount } = renderizarEn('/ofertas');
        expect(screen.getByRole('heading', { name: 'Ofertas' })).toBeInTheDocument();
        expect(screen.getAllByTestId('tarjeta-producto')).toHaveLength(obtenerOfertas().length);
        unmount();

        renderizarEn('/admin');
        expect(screen.getByRole('heading', { name: 'Inicio de sesión' })).toBeInTheDocument();
    });
});
