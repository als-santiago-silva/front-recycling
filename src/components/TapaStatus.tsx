import React, { useEffect, useState } from 'react';
import { getSocket } from '../websocket';
import trashOpen from '../assets/deletegreen.svg';
import trashClosed from '../assets/deletered.svg';


interface TapaStatusProps {
  tipo: string;
}

const TapaStatus: React.FC<TapaStatusProps> = ({ tipo }) => {
  const [estadoTapa, setEstadoTapa] = useState<string>('cerrada');


useEffect(() => {
    const estadoGuardado = localStorage.getItem(`estadoTapa-${tipo}`);
    if (estadoGuardado) {
      setEstadoTapa(estadoGuardado);
    }
  
    const socket = getSocket();
  
    const handleMessage = (data: any) => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.contenedor === tipo && parsed.estado) {
          setEstadoTapa(parsed.estado);
          localStorage.setItem(`estadoTapa-${tipo}`, parsed.estado); // Guardalo
        }
      } catch (err) {
        console.warn('Mensaje no procesado:', data);
      }
    };
  
    if (socket) {
      socket.on('message', handleMessage);
    }
  
    return () => {
      if (socket) {
        socket.off('message', handleMessage);
      }
    };
  }, [tipo]);
  

  return (
<div
  className="tapa-status flex items-center justify-between gap-4 p-[10px] rounded-xl bg-dark-background700 border border-dark-background600 cursor-pointer"
  onClick={() => console.log('Tapa clickeada:', tipo)}
>
  <h2 className="text-white capitalize text-xs">{tipo}</h2>

  <div className="flex items-center gap-2">
    <img
      src={estadoTapa === 'abierta' ? trashOpen : trashClosed}
      alt="Icono de papelera"
      className="w-5 h-5"
    />
    {(estadoTapa === 'abierta' || estadoTapa === 'cerrada') && (
      <span
        className={`capitalize text-[12px] rounded border text-white text-center w-12 text-xs ${
          estadoTapa === 'abierta'
            ? 'bg-green-600 border-green-700'
            : 'bg-red-600 border-red-700'
        }`}
      >
        {estadoTapa}
      </span>
    )}
  </div>
</div>

  );
  
};

export default TapaStatus;
