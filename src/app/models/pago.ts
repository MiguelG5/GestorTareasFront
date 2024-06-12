export interface Pago {
  id: number;
  user_id: number;
  plan: string;
  fecha_inicio: string; // Nueva propiedad agregada
  fecha_finalizacion: string; // Nueva propiedad agregada
}
