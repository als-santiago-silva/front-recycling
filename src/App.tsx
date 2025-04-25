import React, { useEffect, useState } from 'react';
import { connectSocket } from './websocket';
import TapaStatus from './components/TapaStatus';
import HistoryList from './components/HistoryList';
import deleteIcon from '../public/delete.svg';

const App = () => {
  const [tachoSeleccionado, setTachoSeleccionado] = useState<string | null>(null);

  const tiposTachos = [
    'vidrio', 'orgánico', 'plástico', 'papel/cartón', 'metal', 'general', 'otros'
  ];

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <div className="bg-dark-background main-container gap-25">
      <div className="status-main-container" style={{ width: '524px' }}>
        <div className="status-container">
        </div>
        {tiposTachos.map((tipo) => (
          <TapaStatus
            key={tipo}
            tipo={tipo}
            seleccionado={tachoSeleccionado === tipo}
            onSeleccionar={() => setTachoSeleccionado(tipo)}
          />
        ))}
      </div>

      <div className="delete-img-container flex justify-center flex-col items-center gap-2 text-[35px] mt-16">
        <h1 className="text-white">50%</h1>
        <img src={deleteIcon} alt="Delete Icon" className="delete-img" />
      </div>

      {tachoSeleccionado && <HistoryList tipo={tachoSeleccionado} />}
    </div>
  );
};

export default App;
