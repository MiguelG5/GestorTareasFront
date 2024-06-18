import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagoService } from 'src/app/services/pagos.service';
import { LoginService } from 'src/app/services/login.service'; 
import { Paquete } from 'src/app/models/paquetes';
import { Pago } from 'src/app/models/pago';
import { UserResponse } from 'src/app/models/Login.model';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  paquete: Paquete | null = null;
  userId: number | null = null;

  constructor(private router: Router, private pagoService: PagoService, private loginService: LoginService) {
    const navigation = this.router.getCurrentNavigation();
    this.paquete = navigation?.extras.state?.['paquete'] || null;
  }

  ngOnInit(): void {
    // Obtener el ID del usuario logueado desde el localStorage
    const userLoggedIn = localStorage.getItem('usuario');
    if (userLoggedIn) {
      this.userId = JSON.parse(userLoggedIn).id;
    }
  }

  pagar(): void {
    if (!this.paquete || this.userId === null) {
      alert('Error: no se ha podido obtener la información necesaria.');
      return;
    }

    const fechaInicio = new Date();
    const fechaFinalizacion = new Date();
    fechaFinalizacion.setDate(fechaFinalizacion.getDate() + this.paquete.duracion);

    const nuevoPago: Pago = {
      id: 0,
      user_id: this.userId,
      paquete_id: this.paquete.id,
      fecha_inicio: fechaInicio.toISOString().split('T')[0], // Formato YYYY-MM-DD
      fecha_finalizacion: fechaFinalizacion.toISOString().split('T')[0] // Formato YYYY-MM-DD
    };

    this.pagoService.createPago(nuevoPago).subscribe(
      (res) => {
        alert('Pago realizado con éxito');
        this.router.navigate(['']);
        // Actualizar el rol del usuario a Admin en el frontend
        if (this.userId !== null) {
          this.loginService.updateUserRoleToAdmin(this.userId).subscribe(
            (updateRes) => {
              if (updateRes && updateRes.success) {
                alert('Rol de usuario actualizado a Admin');
                // Aquí puedes redirigir a una página específica si es necesario
              } else {
                console.error('Error al actualizar rol del usuario:', updateRes?.error);
              }
            },
            (updateErr) => console.error('Error al actualizar rol del usuario:', updateErr)
          );
        }
      },
      (err) => console.error(err)
    );
  }
}
