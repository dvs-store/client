import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentGift } from '../interfaces/IPaymentGift';
import { AuthService } from '../../auth/services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private httpClient = inject(HttpClient);
  private url = signal<string>("http://localhost:8090/api/shopp");
  private authService = inject(AuthService);


  public onGetLinkPay(dto:IPaymentGift):Observable<{url:string}>{
    const headers = this.authService.getHeaderBearerToken;
    return this.httpClient.post<{url:string}>(`${this.url()}/buy`, {dto}, {headers});
  }

}
