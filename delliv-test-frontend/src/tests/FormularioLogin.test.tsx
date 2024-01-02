import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioLogin from '../components/moleculas/Login/FormularioLogin';


test('renderiza FormularioLogin corretamente', async () => {

  render(<FormularioLogin onLoginSuccess={() => {}} onLoginFailure={() => {}} />);

  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Senha')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();


  userEvent.type(screen.getByLabelText('Email'), 'teste@teste.com');
  userEvent.type(screen.getByLabelText('Senha'), 'senha123');


  expect(screen.getByLabelText('Email')).toHaveValue('test@example.com');
  expect(screen.getByLabelText('Senha')).toHaveValue('senha123');

  userEvent.click(screen.getByRole('button', { name: 'Continuar' }));

});
