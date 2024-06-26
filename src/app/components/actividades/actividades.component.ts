import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
import { ActividadColaboradorService } from 'src/app/services/actividad-colaborador.service';
import { Actividad } from 'src/app/models/actividad';
import { ActividadColaborador } from 'src/app/models/actividad_colaborador';
import { UserResponse } from 'src/app/models/Login.model';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  
  actividades: Actividad[] = [];
  user: UserResponse | null = null;
  colaboradorId: number | undefined; // Variable para almacenar el id_colaborador
  
  constructor(
    private actividadesService: ActividadesService,
    private actividadColaboradorService: ActividadColaboradorService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log('Parsed user:', user);
    const id_colaborador = user.id_colaborador;
    console.log('id_colaborador:', id_colaborador);
  
    if (id_colaborador !== undefined) {
      console.log('id_colaborador is defined:', id_colaborador);
    } else {
      console.log('id_colaborador is undefined');
    }
  }
  
  

  getActividadesByColaborador(colaboradorId: number) {
    this.actividadColaboradorService.getEnrolamientosByColaborador(colaboradorId).subscribe(
      (enrolamientos: ActividadColaborador[]) => {
        const actividadIds = enrolamientos.map(enrolamiento => enrolamiento.actividad_id);
        this.getActividadesByIds(actividadIds);
      },
      (err) => console.error(err)
    );
  }

  getActividadesByIds(ids: number[]) {
    ids.forEach(id => {
      this.actividadesService.getActividadById(id).subscribe(
        (actividad: Actividad) => {
          this.actividades.push(actividad);
        },
        (err) => console.error(err)
      );
    });
  }
}
