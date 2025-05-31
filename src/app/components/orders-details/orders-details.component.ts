import { Component, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { IOrder } from '../../user-profile/interfaces/IOrder';
import { CurrencyPipe, DatePipe, isPlatformBrowser, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PaymentsService } from '../../store/services/payments.service';
import { HandleErrorsFn } from '../../shared/functions/HandleErrorsFn';
import { AlertComponent } from "../../shared/components/alert/alert.component";
import { finalize } from 'rxjs';


@Component({
  selector: 'orders-details',
  imports: [DatePipe, CurrencyPipe, NgClass, MatButtonModule, RouterLink, AlertComponent],
  templateUrl: './orders-details.component.html'
})
export class OrdersDetailsComponent {

  public order = input.required<IOrder>();
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  protected error = signal<string | null>(null);
  protected isLoading = signal<boolean>(false);


  constructor(
    private paymentsService:PaymentsService,
  ){}


  protected continuePaymnt(){
    this.isLoading.set(true);

    this.paymentsService.onContinuePay(this.order().id)
      // .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          if( this.isBrowser ) location.href = res.url
          else console.log('No esta en el navegador');
        },
        error: (e) => {
          this.error.set(HandleErrorsFn(e));
          this.isLoading.set(false);
        },
      });
  }

}
