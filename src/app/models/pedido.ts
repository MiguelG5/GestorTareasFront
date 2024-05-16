export interface Pedido {
  alimentoconsumir: string;
  cantidad: number;
  precioalimento: number;
  bebida: string;
  cantidadbebida: number;
  preciobebida: number;
  tipopago: string;
  propina: number;
  numeromesa: number;
  estatus: string;
  fechapedido?: Date | undefined;
  horapedido?: number;
  total: number;
}

export interface Platillo {
  id: number;
  nombre_del_platillo: string;
  descripcion_del_platillo: string;
  precio: number;
  categoria: string;
  cantidad: number;
}

export interface Bebida {
  nombre_de_la_bebida: '';
  descripcion_de_bebida: '';
  precio: 0;
  categoria: '';
}

export interface Reservacion {
  fecha_reserva: '';
  numero_mesa: 0;
  numero_personas: 0;
  descripcion: '';
  id_usuario: 0;
}
