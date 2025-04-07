import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IShoppCartDto } from '../interfaces/IShoppCartDto';

@Injectable({
  providedIn: 'root'
})
export class ShoppService {

  private url = signal<string>('http://localhost:8080/api/shopp');
  private httpClient = inject(HttpClient);


  public getShoppCart():Observable<IShoppCartDto>{
    return this.httpClient.get<IShoppCartDto>(this.url());
  }

  public addProduct(productId:string):Observable<Boolean>{
    return this.httpClient.post<Boolean>(`${this.url()}/${productId}`, {});
  }

  public deleteQuantityProduct(productId:string):Observable<Boolean> {
    return this.httpClient.delete<Boolean>(`${this.url()}/${productId}`, {});
  }

}
