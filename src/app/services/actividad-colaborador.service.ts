import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActividadColaborador } from '../models/actividad_colaborador';

@Injectable({
  providedIn: 'root',
})
export class ActividadColaboradorService {
  selectedActividadColaborador: ActividadColaborador = {
    id: 0,
    actividad_id: 0,
    colaborador_id: 0,
    fecha_asignacion: new Date(),
  };

  private URL_API = 'https://gestortareasback.onrender.com/api/actividad_colaborador';

  actividadColaborador: ActividadColaborador[] = [];

  constructor(private http: HttpClient) {}

  getEnrolamientos() {
    return this.http.get<ActividadColaborador[]>(this.URL_API);
  }

  getEnrolamientosByActividad(actividad_id: number) {
    return this.http.get<ActividadColaborador[]>(`${this.URL_API}/actividad/${actividad_id}`);
  }

  getEnrolamientosByColaborador(colaborador_id: number) {
    return this.http.get<ActividadColaborador[]>(`${this.URL_API}/colaborador/${colaborador_id}`);
  }

  enrolarColaboradorEnActividad(actividadColaborador: ActividadColaborador) {
    return this.http.post(this.URL_API + '/enrolar', actividadColaborador);
  }
}
