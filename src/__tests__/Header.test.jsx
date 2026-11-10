import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { CarritoProvider } from '../context/CarritoContext.jsx';
import { SesionProvider } from '../context/SesionContext.jsx';

describe('<Header />', () => {
    // Prueba 17
    it('muestra la cantidad del carrito (contexto) y abre/cierra el menú móvil (estado)', async () => {
        localStorage.setItem('msabores_carrito', JSON.stringify([
            { codigo: 'A', nombre: 'A', precio: 1000, cantidad: 2 },
            { codigo: 'B', nombre: 'B', precio: 1000, cantidad: 3 }
        ]));
        render(<MemoryRouter><SesionProvider><CarritoProvider><Header /></CarritoProvider></SesionProvider></MemoryRouter>);

        expect(screen.getByTestId('contador-carrito')).toHaveTextContent('5');

        const boton = screen.getByRole('button', { name: 'Abrir menú' });
        expect(boton).toHaveAttribute('aria-expanded', 'false');
        await userEvent.click(boton);
        expect(boton).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeInTheDocument(); // sin sesión
    });
});
