import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';

const torta = { codigo: 'TC001', nombre: 'Torta Cuadrada de Chocolate', categoria: 'Tortas Cuadradas', precio: 45000, descuento: 10, stock: 12, imagen: '🍫' };

function renderizar(props) {
    return render(<MemoryRouter><ProductCard producto={torta} {...props} /></MemoryRouter>);
}

describe('<ProductCard />', () => {
    // Prueba 7
    it('muestra los datos recibidos por props y el badge de oferta solo si hay descuento', () => {
        const { rerender } = renderizar();
        expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument();
        expect(screen.getByText('$40.500')).toBeInTheDocument(); // 45.000 con 10% dcto.
        expect(screen.getByText('-10%')).toBeInTheDocument();

        rerender(<MemoryRouter><ProductCard producto={{ ...torta, descuento: 0 }} /></MemoryRouter>);
        expect(screen.queryByText('-10%')).not.toBeInTheDocument();
        expect(screen.getByText('$45.000')).toBeInTheDocument();
    });

    // Prueba 8
    it('al hacer clic en "Añadir" llama a onAgregar con el código del producto', async () => {
        const onAgregar = vi.fn(); // mock de la función que recibe por props
        renderizar({ onAgregar });

        await userEvent.click(screen.getByRole('button', { name: 'Añadir' }));

        expect(onAgregar).toHaveBeenCalledTimes(1);
        expect(onAgregar).toHaveBeenCalledWith('TC001');
    });
});
