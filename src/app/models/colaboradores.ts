export interface Colaborador {
    id: number;
    usuario_id: number; // ID del usuario que creó el colaborador
    correo: string;
    contrasena: string;
    pago_id: number; // ID del pago asociado
  }
  