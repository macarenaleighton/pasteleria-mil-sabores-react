import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CampoFormulario from '../components/CampoFormulario.jsx';

describe('<CampoFormulario />', () => {
    // Prueba 10
    it('muestra el mensaje de error solo cuando recibe la prop error', () => {
        const { rerender } = render(<CampoFormulario id="correo" label="Correo" value="" onChange={() => {}} />);
        expect(screen.getByLabelText('Correo')).not.toHaveClass('is-invalid');
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();

        rerender(<CampoFormulario id="correo" label="Correo" value="" onChange={() => {}} error="El correo es obligatorio." />);
        expect(screen.getByRole('alert')).toHaveTextContent('El correo es obligatorio.');
        expect(screen.getByLabelText('Correo')).toHaveClass('is-invalid');
    });
});
