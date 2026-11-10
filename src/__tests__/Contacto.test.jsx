import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contacto from '../pages/Contacto.jsx';

describe('<Contacto /> (formulario)', () => {
    // Prueba 11
    it('actualiza el estado del formulario a medida que el usuario escribe', async () => {
        render(<Contacto />);
        const nombre = screen.getByLabelText('Nombre completo');
        const comentario = screen.getByLabelText('Comentario');

        await userEvent.type(nombre, 'Camila Torres');
        await userEvent.type(comentario, 'Hola');

        expect(nombre).toHaveValue('Camila Torres');
        expect(screen.getByText('4/500 caracteres')).toBeInTheDocument(); // contador derivado del estado
    });

    // Prueba 12
    it('muestra errores si se envía vacío y llama a onEnviar cuando los datos son válidos', async () => {
        const onEnviar = vi.fn();
        render(<Contacto onEnviar={onEnviar} />);
        const enviar = screen.getByRole('button', { name: 'Enviar mensaje' });

        await userEvent.click(enviar);
        expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
        expect(screen.getByText('El comentario es obligatorio.')).toBeInTheDocument();
        expect(onEnviar).not.toHaveBeenCalled();

        await userEvent.type(screen.getByLabelText('Nombre completo'), 'Camila');
        await userEvent.type(screen.getByLabelText('Comentario'), 'Quiero cotizar una torta');
        await userEvent.click(enviar);

        expect(onEnviar).toHaveBeenCalledWith({ nombre: 'Camila', correo: '', comentario: 'Quiero cotizar una torta' });
        expect(screen.getByText(/Recibimos tu mensaje/)).toBeInTheDocument();
    });
});
