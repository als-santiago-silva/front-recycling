import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../services/historyService';
import { Interaction } from '../types/history';

interface HistoryListProps {
  tipo: string;
}

const HistoryList: React.FC<HistoryListProps> = ({ tipo }) => {
  const [history, setHistory] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      const data = await fetchHistory();
      setHistory(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
    const interval = setInterval(() => {
      loadHistory();
    }, 300);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-dark-background history-container rounded-lg p-4 space-y-2">
        <h2 className="text-white text-sm font-semibold">Cargando historial de: <span className="capitalize">{tipo}</span></h2>
        <div className="flex justify-center items-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-dark-background history-container rounded-lg p-4 space-y-2">
        <h2 className="text-white text-sm font-semibold">Historial de: <span className="capitalize">{tipo}</span></h2>
        <p className="text-red-500">No se pudo cargar el historial en este momento. Intenta de nuevo más tarde.</p>
      </div>
    );
  }

  const historyFiltrado = history.filter((item) => item.contenedor === tipo);

  return (
    <div className="bg-dark-background history-container rounded-lg p-4 space-y-2">
      <h2 className="text-white text-sm font-semibold">Historial de: <span className="capitalize">{tipo}</span></h2>

      {historyFiltrado.length === 0 ? (
        <p className="text-gray-400 text-sm">No hay historial para este tacho.</p>
      ) : (
        historyFiltrado.map((item, index) => (
          <li key={index} className="flex items-center gap-4 py-2 text-white">
            <div className="w-6 h-6 rounded-full bg-dark-background600 flex items-center justify-center">
              <span role="img" aria-label="user" className="text-sm">👤</span>
            </div>
            <span className="font-semibold text-sm">{item.usuario}</span>
            <span className="text-xs text-gray-400">
              {new Date(item.fechaHora).toLocaleString()}
            </span>
          </li>
        ))
      )}
    </div>
  );
};

export default HistoryList;
