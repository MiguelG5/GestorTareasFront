import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserResponse } from 'src/app/models/Login.model'; // Asegúrate de importar correctamente tu modelo

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  usuario: UserResponse | null = null; // Variable para almacenar el usuario

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.obtenerUsuarioActual();
  }

  obtenerUsuarioActual() {
    this.loginService.user$.subscribe(
      user => {
        this.usuario = user;
      }
    );
  }
}
