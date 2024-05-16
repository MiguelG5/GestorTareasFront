import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservacion } from '../models/pedido';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root',
})
export class ReservacionesService {
  selectedReservacion: Reservacion = {
    fecha_reserva: '',
    numero_mesa: 0,
    numero_personas: 0,
    descripcion: '',
    id_usuario: 0,
  };

  private URL_API = 'http://localhost:3200/api/reservacion';

  reservacion: Reservacion[] = [];
  constructor(private http: HttpClient) {}

  getReservaciones() {
    return this.http.get<Reservacion[]>(this.URL_API);
  }

  createReservacion(reservacion: Reservacion) {
    return this.http.post(this.URL_API, reservacion);
  }

  getReservacionByUser(idUser: number) {
    return this.http.get<Reservacion[]>(`${this.URL_API}?idUser=${idUser}`);
  }


}
