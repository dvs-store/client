import { Component, input } from '@angular/core';
import { IOrder } from '../../user-profile/interfaces/IOrder';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'orders-details',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './orders-details.component.html'
})
export class OrdersDetailsComponent {

  public order = input.required<IOrder>();

}
