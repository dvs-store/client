import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IShoppCartDto } from '../interfaces/IShoppCartDto';
import { AuthService } from '../../../auth/services/auth.service';
import { Id } from '../../../shared/interfaces/api/Id';

@Injectable({
  providedIn: 'root'
})
export class ShoppService {

  private url = signal<string>('http://localhost:8090/api/shopp');
  private httpClient = inject(HttpClient);
  public cart = signal<IShoppCartDto | null>(null);
  private authService:AuthService = inject(AuthService);


  public getShoppCart():Observable<IShoppCartDto | null>{
    if( !this.authService.isAuthenticated ) return of(null);
    const headers = this.authService.getHeaderBearerToken;

    return this.httpClient.get<IShoppCartDto>(this.url(), {headers})
      .pipe(
        tap(data => this.cart.set(data)),
      );
  }

  public addProduct(productId:string):Observable<IShoppCartDto> {
    const headers = this.authService.getHeaderBearerToken;

    return this.httpClient.post<IShoppCartDto>(`${this.url()}/${productId}`, {}, {headers})
      .pipe(
        tap(data => this.cart.set(data)),
      );
  }

  public deleteQuantityProduct(productId:string):Observable<IShoppCartDto> {
    const headers = this.authService.getHeaderBearerToken;

    return this.httpClient.delete<IShoppCartDto>(`${this.url()}/${productId}`, {headers})
      .pipe(
        tap(data => this.cart.set(data)),
      );
  }

  public clearShoppCart(){
    const headers = this.authService.getHeaderBearerToken;

    return this.httpClient.delete<boolean>(`${this.url()}`, {headers})
      .pipe(
        tap(value => {
          if( value ){
            this.cart.set(null);
          };
        }),
      );
  }

  public productExists(id:Id):boolean {
    if( !this.cart() ) return false;
    return !!this.cart()!.products.find(p => p.product.id === id);
  }

}
