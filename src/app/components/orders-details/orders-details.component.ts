import { Component, input } from '@angular/core';
import { IOrder } from '../../user-profile/interfaces/IOrder';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'orders-details',
  imports: [DatePipe, CurrencyPipe, NgClass, MatButtonModule],
  templateUrl: './orders-details.component.html'
})
export class OrdersDetailsComponent {

  public order = input.required<IOrder>();


  protected continuePaymnt(){
    console.log(`Continuando pago de la orden: ${this.order().id}`);
  }

}
