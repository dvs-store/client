import { Component, inject, PLATFORM_ID } from '@angular/core';
import { PaymentsService } from '../../../store/services/payments.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'btn-pay',
  imports: [],
  templateUrl: './btn-pay.component.html'
})
export class BtnPayComponent {

  private paymentsService = inject(PaymentsService);
  private PLATFORM_ID = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.PLATFORM_ID);


  public onPay(){
    this.paymentsService.onGetLinkPay({})
      .subscribe({
        error: console.log,
        next: data => {
          if( this.isBrowser ){
            window.location.href = data.url;
          }
        },
      })
  }

}
