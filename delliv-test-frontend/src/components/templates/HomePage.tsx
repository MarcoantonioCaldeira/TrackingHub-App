import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  isAuthenticated: boolean;
  usuario: any;
  onLogout: () => void;
}


const HomePage: React.FC<HomePageProps> = ({ isAuthenticated, usuario, onLogout }) => {
  const navigate = useNavigate();

  const LogoutPage = () => {
   
    localStorage.removeItem('accessToken');
    
    navigate('/');
    
    onLogout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>Bem-vindo</h1>
          <button onClick={LogoutPage}>Logout</button>
        </>
      ) : (
        <p>Você não está logado. Faça login para acessar.</p>
      )}
    </div>
  );
};

export default HomePage;
function onLogout() {
  throw new Error('Função não implementada.');
}

