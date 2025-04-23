import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import App from './App';

let listeners: Record<string, Function> = {};
const mockSocket = {
  on: (event: string, callback: Function) => {
    listeners[event] = callback;
  },
  emit: vi.fn(),
  disconnect: vi.fn(),
};

vi.mock('socket.io-client', () => {
  return {
    io: vi.fn(() => mockSocket),
  };
});

describe('App Component', () => {
  beforeEach(() => {
    listeners = {};  
    cleanup();    
  });

  it('debería mostrar estado de conexión "conectado" y mensaje recibido', async () => {
    render(<App />);


    listeners['connect']?.();

    await waitFor(() => {
      expect(screen.getByText(/Conexión: conectado/i)).toBeInTheDocument();
    });

    listeners['message']?.('Tapa Abierta');

    await waitFor(() => {
      expect(screen.getByText('Tapa Abierta')).toBeInTheDocument();
    });
  });

  it('debería mostrar mensaje de espera cuando no hay conexión', () => {
    render(<App />);
    expect(screen.getByText(/Esperando conexión/i)).toBeInTheDocument();
  });
});
