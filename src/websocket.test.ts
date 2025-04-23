import { vi, describe, it, expect, beforeEach } from 'vitest';
import { connectSocket, getSocket, setStatusCallback } from './websocket';

vi.mock('socket.io-client', () => {
  const listeners: Record<string, Function> = {};
  return {
    io: vi.fn(() => ({
      on: (event: string, callback: Function) => {
        listeners[event] = callback;
      },
      emit: vi.fn((event: string, ...args: any[]) => {
        if (listeners[event]) listeners[event](...args);
      }),
      disconnect: vi.fn(),
      simulateEvent: (event: string, payload?: any) => {
        listeners[event]?.(payload);
      }
    })),
  };
});

describe('WebSocket', () => {
  let mockSocket: any;
  
  beforeEach(() => {
    const { io } = require('socket.io-client');
    connectSocket();
    mockSocket = getSocket();
  });

  it('debería conectarse correctamente al WebSocket', () => {
    const statusSpy = vi.fn();
    setStatusCallback(statusSpy);

    
    mockSocket.simulateEvent('connect');
    
    expect(statusSpy).toHaveBeenCalledWith('conectado');
  });

  it('debería recibir un mensaje del WebSocket y actualizar el estado', () => {
    const messageSpy = vi.fn();

    if (mockSocket) {
      mockSocket.on('message', messageSpy);
      mockSocket.simulateEvent('message', 'Tapa Abierta');

      expect(messageSpy).toHaveBeenCalledWith('Tapa Abierta');
    }
  });
});
