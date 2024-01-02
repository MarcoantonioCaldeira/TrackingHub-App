import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesContainer from './config/routes';
import './components/atomos/estilo.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RoutesContainer />
    </BrowserRouter>
  );
};

export default App;
