import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioLogin from '../components/moleculas/Login/FormularioLogin';


test('renderiza FormularioLogin corretamente', () => {
  render(<FormularioLogin onLoginSuccess={() => {}} onLoginFailure={() => {}} />);
  
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Senha')).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
});
