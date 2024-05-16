import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/Login.model';
import { LoginService } from 'src/app/services/login.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  breadcrumbs = [
    { label: 'Inicio', url: '' },
    { label: 'Reservaciones', url: 'reservaciones' },
  ];
  user: UserResponse | null = null;
  proyectosDelUsuario: Proyecto[] = [];

  constructor(
    public proyectoService: ProyectoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      this.user = JSON.parse(usuarioString);
      if (this.user !== null) {
        this.getProyectoByUser(this.user.id);
      }
    } else {
      console.error('No se encontró el usuario en el localStorage.');
    }
  }

  getProyectoByUser(user_id: number) {
    this.proyectoService.getProyectoByUser(user_id).subscribe(
      (res) => {
        this.proyectosDelUsuario = res;
      },
      (err) => console.error(err)
    );
  }

  addProyecto(form: NgForm){
    const idUsuario = this.user?.id;
    if (idUsuario !== undefined && idUsuario !== null) {
      form.value.user_id = idUsuario;
      
      if (form.value.id){
        this.proyectoService.putProyecto(form.value).subscribe(
          (res)=> {
            this.getProyectoByUser(idUsuario);
            form.reset();
          },
          (err) => console.error(err)
        );
      } else {
        this.proyectoService.createProyecto(form.value).subscribe(
          (res)=> {
            this.getProyectoByUser(idUsuario);
            form.reset();
          },
          (err) => console.error(err)
        )
      }
    } else {
      console.error('No se encontró el usuario en el localStorage o el ID de usuario es inválido.');
    }
  }

  deleteProyecto(id: number){
    if(confirm('Estas seguro de querer eliminar tu proyecto?')){
      const idUsuario = this.user?.id;
      if (idUsuario !== undefined && idUsuario !== null) {
        this.proyectoService.deleteProyecto(id).subscribe(
          (res)=> {
            this.getProyectoByUser(idUsuario);
          },
          (err) => console.error(err)
        );
      } else {
        console.error('No se encontró el usuario en el localStorage o el ID de usuario es inválido.');
      }
    }
  }

  editProyecto(proyecto: Proyecto){
    this.proyectoService.selectedProyecto = proyecto;
  }

  resetForm(form: NgForm){
    form.reset();
  }
}
