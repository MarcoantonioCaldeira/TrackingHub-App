import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atomos/Button';
import { Input } from '../atomos/Inputs';

interface FormularioLoginProps {
  onLoginSuccess: (usuario: any) => void;
  onLoginFailure: (error: string) => void;
}

const FormularioLogin: React.FC<FormularioLoginProps> = ({ onLoginSuccess, onLoginFailure }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const API_URL = 'http://localhost:4000';
      const response = await axios.post(`${API_URL}/usuario/login`, {
        email: email,
        senha: senha,
      });
  
      if (response.data && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
  
        
        onLoginSuccess(response.data.usuario);
        
        navigate('/home');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      onLoginFailure('Email ou senha inválidos');
    }
  };
  

  useEffect(() => {
   
  }, [onLoginSuccess]);

  return (
    <>
      <Input type="text" placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
      <Button className='btn_login' onClick={handleLogin}>Login</Button>
    </>
  );
};

export default FormularioLogin;
