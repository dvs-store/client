import { Injectable, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { IKey } from '../interfaces/IKey';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class KeysService {

  private keys = signal<null | IKey[]>(null);


  constructor(
    private authService:AuthService,
    private httpClient:HttpClient,
  ){}


  public getKeys():Observable<IKey[]>{
    if( this.keys() ) return of(this.keys()!);
    const headers = this.authService.getHeaderBearerToken;

    return this.httpClient.get<IKey[]>(`http://localhost:8090/api/products-keys`, {headers})
      .pipe(
        tap((keys) => this.keys.set(keys)),
      );
  }

}
