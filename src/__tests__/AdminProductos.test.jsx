import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AdminProductos from '../pages/admin/AdminProductos.jsx';
import { obtenerProductoPorCodigo } from '../data/productos.js';

describe('<AdminProductos /> (panel administrativo)', () => {
    // Prueba 19
    it('pide confirmación antes de eliminar y luego quita el producto de la tabla y de los datos', async () => {
        render(<MemoryRouter><AdminProductos /></MemoryRouter>);
        const fila = screen.getByText(/Torta Especial de Boda/).closest('tr');

        await userEvent.click(within(fila).getByRole('button', { name: 'Eliminar' }));
        expect(screen.getByText(/Esta acción no se puede deshacer/)).toBeInTheDocument();
        expect(obtenerProductoPorCodigo('TE002')).not.toBeNull(); // aún no se elimina

        await userEvent.click(screen.getByRole('button', { name: 'Sí, eliminar' }));
        const tabla = screen.getByRole('table');
        expect(within(tabla).queryByText(/Torta Especial de Boda/)).not.toBeInTheDocument();
        expect(obtenerProductoPorCodigo('TE002')).toBeNull();
        expect(screen.getByText(/eliminado/)).toBeInTheDocument();
    });
});
