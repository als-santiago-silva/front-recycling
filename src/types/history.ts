export interface Interaction {
  usuario: string;
  tipoContenedor: 'vidrio' | 'orgánico' | 'plástico' | 'papel/cartón';
  fechaHora: string;
}
