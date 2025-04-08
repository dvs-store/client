import { Component, inject, OnInit, signal } from '@angular/core';
import { IShoppCartDto } from '../interfaces/IShoppCartDto';
import { ShoppService } from '../services/shopp.service';
import { HandleErrorsFn } from '../../../shared/functions/HandleErrorsFn';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { ProductCartComponent } from "../components/product-cart/product-cart.component";

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterLink, MatButtonModule, MatIconModule, CurrencyPipe, ProductCartComponent],
  templateUrl: './shopping-cart.component.html'
})
export default class ShoppingCartComponent implements OnInit {

  protected cart = signal<IShoppCartDto | null>(null);
  private shoppService = inject(ShoppService);
  protected error = signal<string | null>(null);
  protected isLoading = signal<boolean>(false);


  ngOnInit(): void {
    this.shoppService.getShoppCart()
      .subscribe({
        next: (data) => this.cart.set(data),
        error: (err) => this.error.set(HandleErrorsFn(err)),
      })
  }

  protected onChangeCart(data:IShoppCartDto){
    this.cart.set(data);
  }

}
