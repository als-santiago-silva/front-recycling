import { Interaction } from '../types/history';

const mapContainerType = (bucketId: string): Interaction['contenedor'] => {
  switch (bucketId) {
    case 'vidrio':
      return 'vidrio';
    case 'otros':
      return 'otros';
    case 'organico':
      return 'orgánico';
    case 'plastico':
      return 'plástico';
    case 'carton':  
    case 'papel':
      return 'papel/cartón';
    default:
      return 'papel/cartón';
  }
};

export const fetchHistory = async (): Promise<Interaction[]> => {
  const response = await fetch('http://localhost:5000/recycling-service/history', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`Error al obtener el historial: ${response.statusText}`);
  }

  const json = await response.json();

  if (!Array.isArray(json.docs)) {
    throw new Error('La respuesta no contiene datos válidos.');
  }

  return json.docs.map((item: any) => ({
    usuario: item.userId,
    contenedor: mapContainerType(item.bucketId),
    fechaHora: item.timestamp
  }));
};
