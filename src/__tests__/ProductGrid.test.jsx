import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import { PRODUCTOS_INICIALES } from '../data/productos.js';

describe('<ProductGrid />', () => {
    // Prueba 9
    it('renderiza una tarjeta por cada producto y un mensaje cuando la lista está vacía', () => {
        const { rerender } = render(<MemoryRouter><ProductGrid productos={PRODUCTOS_INICIALES} /></MemoryRouter>);
        expect(screen.getAllByTestId('tarjeta-producto')).toHaveLength(PRODUCTOS_INICIALES.length);

        rerender(<MemoryRouter><ProductGrid productos={[]} mensajeVacio="Sin resultados" /></MemoryRouter>);
        expect(screen.queryAllByTestId('tarjeta-producto')).toHaveLength(0);
        expect(screen.getByText('Sin resultados')).toBeInTheDocument();
    });
});
