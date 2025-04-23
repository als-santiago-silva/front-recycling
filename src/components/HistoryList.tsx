import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../services/historyService';
import { Interaction } from '../types/history';

const HistoryList = () => {
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

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='bg-dark-background history-container rounded-lg'>
      <h2 className='text-white'>Historial de: {}</h2>
      <ul className="divide-y divide-dark-background600">
  {history.map((item, index) => (
    <li key={index} className="flex items-center gap-3 py-2 text-white">
      {}
      <div className="w-6 h-6 rounded-full bg-dark-background600 flex items-center justify-center">
        {}
        {}
        {}
        <span role="img" aria-label="user" className="text-sm">👤</span>
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-sm">{item.usuario}</span>
        <span className="text-xs text-gray-400">{new Date(item.fechaHora).toLocaleString()}</span>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
};

export default HistoryList;
