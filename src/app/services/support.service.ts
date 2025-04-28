import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IContactEmailSupport } from './interfaces/support/IContactEmailSupport';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  private url = signal<string>(`http://localhost:8090/api/contact`);

  constructor(
    private httpClient:HttpClient,
    private authService:AuthService,
  ){}


  public email(body:IContactEmailSupport):Observable<boolean>{
    const headers = this.authService.getHeaderBearerToken;
    return this.httpClient.post<boolean>(`${this.url()}/email`, body, {headers});
  }

}
