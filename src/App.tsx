import React, { useEffect, useState } from 'react';
import { connectSocket, setStatusCallback } from './websocket';
import TapaStatus from './components/TapaStatus';
import HistoryList from './components/HistoryList';
import deleteIcon from '../public/delete.svg';

const App = () => {
  const [conexion, setConexion] = useState<string>('Conectando...');

  const tiposTachos = [
    'vidrio', 'orgánico', 'plástico', 'papel/cartón', 'metal', 'general', 'otros'
  ];

  useEffect(() => {
    setStatusCallback(setConexion);
    connectSocket();
  }, []);

  return (
    <div className="bg-dark-background main-container gap-6">
      <div className="status-main-container" style={{ width: '524px' }}>
      <div className="status-container">
        <h1 className="text-brand-primary">Estado de las tapas</h1>
        <p className="text-brand-primary">Conexión: {conexion}</p>
      </div>

      {tiposTachos.map((tipo) => (
        <TapaStatus key={tipo} tipo={tipo} />
      ))}
      </div>
      
      <div className="delete-img-container flex justify-center">
        <img src={deleteIcon} alt="Delete Icon" className="delete-img" />
      </div>

      <HistoryList />
    </div>
  );
};

export default App;