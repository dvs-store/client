import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IOrder } from '../interfaces/IOrder';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private url = signal<string>("http://localhost:8090/api/orders");
  private orders = signal<null | IOrder[]>(null);


  constructor(
    private httpClient:HttpClient,
    private authService:AuthService,
  ){}


  public getAllOrders():Observable<IOrder[]>{
    if( this.orders() ) return of(this.orders()!);
    const headers = this.authService.getHeaderBearerToken;

    return this.httpClient.get<IOrder[]>(`${this.url()}`, {headers})
      .pipe(
        tap(orders => this.orders.set(orders)),
      );
  }

}
