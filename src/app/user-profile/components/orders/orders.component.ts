import { Component, OnInit, signal } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { IOrder } from '../../interfaces/IOrder';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'orders',
  imports: [MatProgressSpinnerModule],
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

  protected orders = signal<null | IOrder[]>(null);

  constructor(
    private ordersService:OrdersService,
  ){}


  ngOnInit(): void {
    this.getOrders();
  }


  private getOrders(){
    this.ordersService.getAllOrders()
      .subscribe((orders) => this.orders.set(orders));
  }


}
