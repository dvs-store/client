import { Component, inject, OnInit, signal } from '@angular/core';
import { IShoppCartDto } from '../interfaces/IShoppCartDto';
import { ShoppService } from '../services/shopp.service';
import { HandleErrorsFn } from '../../../shared/functions/HandleErrorsFn';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterLink],
  templateUrl: './shopping-cart.component.html'
})
export default class ShoppingCartComponent implements OnInit {

  protected cart = signal<IShoppCartDto | null>(null);
  private shoppService = inject(ShoppService);
  protected error = signal<string | null>(null);


  ngOnInit(): void {
    this.shoppService.getShoppCart()
      .subscribe({
        next: (data) => this.cart.set(data),
        error: (err) => this.error.set(HandleErrorsFn(err)),
      })
  }

}
