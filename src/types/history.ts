export interface Interaction {
  usuario: string;
  contenedor: 'vidrio' | 'orgánico' | 'plástico' | 'papel/cartón' | 'metal' | 'general' | 'otros';
  fechaHora: string;
}
