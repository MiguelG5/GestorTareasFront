import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colaborador } from '../models/colaboradores';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  private URL_API = 'https://gestortareasback.onrender.com/api/colaboradores'; // Reemplaza con la URL real del backend

  constructor(private http: HttpClient) {}

  getColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.URL_API);
  }

  getColaboradoresByUser(userId: number): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.URL_API}/user/${userId}`);
  }

  enrolarColaboradorEnProyecto(colaboradorId: number, proyectoId: number): Observable<any> {
    return this.http.post(`${this.URL_API}/enrolar`, { colaborador_id: colaboradorId, proyecto_id: proyectoId });
  }

  deleteColaboradorFromProyecto(colaboradorId: number, proyectoId: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/enrolar/${colaboradorId}/${proyectoId}`);
  }

}
