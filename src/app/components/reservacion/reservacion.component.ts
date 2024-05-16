import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/Login.model';
import { LoginService } from 'src/app/services/login.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css'],
})
export class ReservacionComponent implements OnInit {
  breadcrumbs = [
    { label: 'Inicio', url: '' },
    { label: 'Reservaciones', url: 'reservaciones' },
  ];
  user: UserResponse | null = null;
 

  constructor(
    public reservacionesService: ReservacionesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.user$.subscribe((user) => {
      this.user = user;
    });

    if (this.user === null) {
      this.user = JSON.parse(localStorage.getItem('usuario')!);
    }

    if (this.user?.role !== 'admin') {
      this.getReservacionByUser(this.user?.id!);
    } else {
      this.getReservacion();
    }
  }

  getUserName(): string | null {
    return this.user?.username || null;
  }


  getReservacion() {
    this.reservacionesService.getReservaciones().subscribe(
      (res) => {
        this.reservacionesService.reservacion = res;
      },
      (err) => console.error(err)
    );
  }

  getReservacionByUser(idUser: number) {
    this.reservacionesService.getReservacionByUser(idUser).subscribe(
      (res) => {
        this.reservacionesService.reservacion = res;
      },
      (err) => console.error(err)
    );
  }
}
