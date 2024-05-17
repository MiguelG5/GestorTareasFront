import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/Login.model';
import { LoginService } from 'src/app/services/login.service';
import { ActividadesService } from 'src/app/services/actividades.service'; 
import { NgForm } from '@angular/forms';
import { Actividad } from 'src/app/models/actividad'; 

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  breadcrumbs = [
  { label: 'Inicio', url: '' },
  { label: 'Reservaciones', url: 'reservaciones' },
];
user: UserResponse | null = null;

constructor(
  public actividadesService: ActividadesService,
  private loginService: LoginService
) {}

ngOnInit(): void {
    this.getActividad();
}

getActividad() {
  this.actividadesService.getActividad().subscribe(
    (res) => {
      this.actividadesService.actividad = res;
    },
    (err) => console.error(err)
  );
}

addActividad(form: NgForm) {
  // Verificar si this.actividadesService.createActividad es null o no está definido
  if (this.actividadesService.createActividad) {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      console.error('No se encontró el usuario en el localStorage.');
      return;
    }

    const usuario = JSON.parse(usuarioString);
    const idUsuario = usuario.id;

    form.value.user_id = idUsuario;

    if (form.value.id) {
      this.actividadesService.putActividad(form.value).subscribe(
        (res) => {
          this.getActividad();
          form.reset();
        },
        (err) => console.error(err)
      );
    } else {
      // Llamar al método createActividad solo si no es null
      this.actividadesService.createActividad(form.value)?.subscribe(
        (res) => {
          this.getActividad();
          form.reset();
        },
        (err) => console.error(err)
      );
    }
  } else {
    console.error('createActividad no está definido en actividadesService.');
  }
}


deleteActividad(id: number){
if(confirm('Estas seguro de querer eliminar tu ACTIVIDAD?')){
  this.actividadesService.deleteActividad(id).subscribe(
    (res)=> {
      this.getActividad();
    },
    (err) => console.error(err)
  );
}
}

editActividad(actividad: Actividad){

  this.actividadesService.selectedAtividad = actividad;
}

resetForm(form: NgForm){
  form.reset();
}
}