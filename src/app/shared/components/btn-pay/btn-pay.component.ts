import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { PaymentsService } from '../../../store/services/payments.service';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'btn-pay',
  imports: [MatButtonModule],
  templateUrl: './btn-pay.component.html'
})
export class BtnPayComponent {

  private paymentsService = inject(PaymentsService);
  private PLATFORM_ID = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.PLATFORM_ID);
  protected isLoading = signal<boolean>(false);


  public onPay(){
    this.isLoading.set(true);

    this.paymentsService.onGetLinkPay({})
      .subscribe({
        next: data => {
          if( this.isBrowser ){
            window.location.href = data.url;
          }
        },
      })
  }

}
