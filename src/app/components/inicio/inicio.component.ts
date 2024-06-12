import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaqueteService } from 'src/app/services/paquetes.service';
import { Paquete } from 'src/app/models/paquetes';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  breadcrumbs = [
    { label: 'Inicio', url: '/' }
  ];

  constructor(private router: Router, public paqueteServices: PaqueteService) { }

  ngOnInit(): void {
    // Verifica si hay un usuario logeado
    const userLoggedIn = localStorage.getItem('usuario');
    if (userLoggedIn) {
      // Inicia el temporizador de sesión si hay un usuario logeado
      this.startSessionTimer();
    }
    this.getPaquetes();
  }

  getPaquetes() {
    this.paqueteServices.getPaquetes().subscribe(
      (res) => {
        this.paqueteServices.paquetes = res;
      },
      (err) => console.error(err)
    );
  }

  // Función para iniciar el temporizador de sesión
  startSessionTimer() {
    setTimeout(() => {
      // Muestra una alerta preguntando al usuario si desea continuar con la sesión
      const confirmLogout = confirm('¿Desea continuar con la sesión?');

      // Maneja la respuesta del usuario
      if (confirmLogout) {
        // El usuario desea continuar con la sesión
        console.log('Continuar con la sesión');
        // No es necesario hacer nada
      } else {
        // El usuario desea cerrar la sesión
        console.log('Cerrar la sesión');
        this.logout();
      }
    }, .2 * 60 * 1000); // 5 minutos en milisegundos
  }

  // Función para hacer logout
  logout() {
    // Lógica para hacer logout
    console.log('Logout realizado');
    // Por ejemplo, limpiar el localStorage y recargar la página
    localStorage.clear();
    window.location.reload();
  }

}
