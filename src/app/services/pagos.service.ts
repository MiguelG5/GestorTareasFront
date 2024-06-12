import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  selectedPago: Pago = {
    id: 0,
    user_id: 0,
    plan: '',
    fecha_inicio: '', 
    fecha_finalizacion: ''
  };

  private URL_API = 'https://gestortareasback.onrender.com/api/pagos'; // Reemplazar 'URL_DEL_BACKEND' con la URL real del backend

  pagos: Pago[] = [];

  constructor(private http: HttpClient) {}

  getPagos() {
    return this.http.get<Pago[]>(this.URL_API);
  }

  createPago(pago: Pago) {
    return this.http.post(this.URL_API, pago);
  }

  updatePago(pago: Pago){
    return this.http.put(`${this.URL_API}/${pago.id}`, pago);
  }

  deletePago(id: number){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getPagosByUser(user_id: number) {
    return this.http.get<Pago[]>(`${this.URL_API}/user/${user_id}`);
  }
}
