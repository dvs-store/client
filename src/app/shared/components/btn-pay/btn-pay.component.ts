import { Component, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { PaymentsService } from '../../../store/services/payments.service';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { IPaymentGift } from '../../../store/interfaces/IPaymentGift';
import { HandleErrorsFn } from '../../functions/HandleErrorsFn';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'btn-pay',
  imports: [MatButtonModule, AlertComponent],
  templateUrl: './btn-pay.component.html'
})
export class BtnPayComponent {

  private paymentsService = inject(PaymentsService);
  private PLATFORM_ID = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.PLATFORM_ID);
  protected isLoading = signal<boolean>(false);
  public emailGift = input<string>();
  protected error = signal<string | null>(null);


  public onPay(){
    this.isLoading.set(true);

    const dto:IPaymentGift = {
      email: this.emailGift()
    };

    this.paymentsService.onGetLinkPay(dto)
      .subscribe({
        next: data => {
          if( this.isBrowser ){
            window.location.href = data.url;
          }
        },
        error: e => {
          this.error.set(HandleErrorsFn(e));
          this.isLoading.set(false);
        },
      })
  }

}
