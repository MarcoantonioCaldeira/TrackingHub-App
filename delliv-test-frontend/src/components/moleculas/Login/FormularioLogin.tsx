import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../organismos/Button';
import { Input } from '../../organismos/Inputs';
import './FormularioLogin.scss';

interface FormularioLoginProps {
  onLoginSuccess: (usuario: any) => void;
  onLoginFailure: (error: string) => void;
}

const FormularioLogin: React.FC<FormularioLoginProps> = ({ onLoginSuccess, onLoginFailure }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const FazerLogin = async () => {
    try {
      const API_URL = 'http://localhost:4000';
      const response = await axios.post(`${API_URL}/usuario/login`, {
        email: email,
        senha: senha,
      });
  
      if (response.data && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        
        navigate('/home');
        onLoginSuccess(response.data.usuario);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      onLoginFailure('Email ou senha inválidos');
    }
  };
  

  return (
    <>
      <div className='CorpoLogin'>

      <img src='../assets/img/logo.png' alt='logo' className='logo'/>

        <div className='Form'>
            <div className='AreaInputLogin'>
              <h2 className='Titulo'>Entrar</h2>
              <Input className="InpuForm"  type="text" placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input className="InpuForm" type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
              <Button className='btn_login' onClick={FazerLogin}>Continuar</Button>
            </div>

        </div>

      </div>
    </>
  );
};

export default FormularioLogin;
