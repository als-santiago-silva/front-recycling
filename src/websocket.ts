import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';
let socket: Socket;
let statusCallback: ((status: string) => void) | null = null;

export const setStatusCallback = (callback: (status: string) => void) => {
  statusCallback = callback;
};

export const connectSocket = () => {
  socket = io(SERVER_URL, {
    transports: ['websocket'],
    query: { auth: '1234' },
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  socket.on('connect', () => {
    console.log('Conectado al WebSocket');
    statusCallback?.('conectado');
  });

  socket.on('disconnect', (reason) => {
    console.warn('Desconectado del WebSocket:', reason);
    statusCallback?.('desconectado');
  });

  socket.on('reconnect_attempt', (attempt) => {
    console.log(`Intentando reconectar... intento #${attempt}`);
    statusCallback?.(`reconectando intento ${attempt}`);
  });

  socket.on('reconnect', (attempt) => {
    console.log(`Reconectado después de ${attempt} intentos`);
    statusCallback?.('conectado');
  });

  socket.on('reconnect_error', (error) => {
    console.error('Error de reconexión:', error);
    statusCallback?.('error_reconexion');
  });

  socket.on('reconnect_failed', () => {
    console.error('Reconexión fallida. Sin conexión al servidor.');
    statusCallback?.('reconexion_fallida');
  });

  socket.on('connect_error', (error) => {
    console.error('Error de conexión:', error.message);
    statusCallback?.('error_conexion');
  });
};

export const getSocket = () => socket;
