import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Rodape  from '../moleculas/Rodape/Rodape';
import './HomePage.scss';
import '../atomos/estilo.scss';


interface Pedido{
  id: number;
  nome_cliente: string;
  endereco_cliente: string;
  status: string;
  // usuarioId: number;
}

interface HomePageProps {
  isAuthenticated: boolean;
  usuario: any;
  onLogout: () => void;
}

function onLogout() {
  throw new Error('Função não implementada.');
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated, usuario, onLogout }) => {
  const [pedido, setPedidos] = useState<Pedido[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const API_URL = 'http://localhost:4000'; 
        const response = await axios.get(`${API_URL}/pedidos/listar`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
          },
        });

        setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao obter lista de pedidos:', error);
      }
    };

    fetchPedidos();
  }, []); 


  const MudarStatus = async (pedidoId: number, novoStatus: string) => {
    try {
      const API_URL = `http://localhost:4000/pedidos/${pedidoId}/status`;
      await axios.patch(API_URL, { status: novoStatus });

      console.log(`Status do Pedido ${pedidoId} atualizado para ${novoStatus}`);

      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === pedidoId ? { ...pedido, status: novoStatus } : pedido
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o status do pedido:', error);
    }
  };


  const LogoutPage = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
    onLogout();
  };


  return (
    <>
    {isAuthenticated ? (
      <>
        <div className='Corpo'>    
        
            
              <img  className='logo' src="../../assets/img/logo.png" alt="Logo" />

              <button  className='btn_logout' onClick={LogoutPage}>Logout</button>

            <div className='Conteudo'>
              <ul>
                  {pedido.map((pedido) => (
                    <li key={pedido.id}>
                      {`Cliente: ${pedido.nome_cliente}  |  Endereço: ${pedido.endereco_cliente}  |  Status:`}
                        <select
                          value={pedido.status}
                          onChange={(e) => MudarStatus(pedido.id, e.target.value)}
                        >
                        <option value="1">Em separação</option>
                        <option value="2">Enviado</option>
                        <option value="3">Entregue</option>
                      </select>
                    </li>
                  ))}
                </ul>
            </div>

      
        </div>
        <Rodape />
      </>
      ) : (
        <p>Você não está logado. Faça login para acessar.</p>
      )}
    </>
  

 
  );
};


export default HomePage;





