import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  selectedPedido: Pedido={
    alimentoconsumir: '',
    cantidad:0,
    precioalimento:0,
    bebida: '', 
    cantidadbebida: 0,
    preciobebida:0,
    tipopago: '',
    propina: 0,
    numeromesa: 0,
    estatus: '',
    total: 0
  }

  URL_API = 'http://localhost:3200/api/pedido'

pedidos: Pedido[]=[];
  constructor( private http: HttpClient) { }
 
getPedido(){
  return this.http.get<Pedido[]>(this.URL_API); 
}

createPedido(pedido:Pedido){
  return this.http.post(this.URL_API,pedido)
}




}
