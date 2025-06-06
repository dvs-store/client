import { Component, inject, OnInit, signal } from '@angular/core';
import { IShoppCartDto } from '../interfaces/IShoppCartDto';
import { ShoppService } from '../services/shopp.service';
import { HandleErrorsFn } from '../../../shared/functions/HandleErrorsFn';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ProductCartComponent } from "../components/product-cart/product-cart.component";
import { BtnPayComponent } from "../../../shared/components/btn-pay/btn-pay.component";
import { finalize } from 'rxjs';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../../shared/components/alert/alert.component";

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterLink, MatButtonModule, MatIconModule, CurrencyPipe, ProductCartComponent, BtnPayComponent, AlertComponent, ReactiveFormsModule],
  templateUrl: './shopping-cart.component.html'
})
export default class ShoppingCartComponent implements OnInit {

  protected cart = signal<IShoppCartDto | null>(null);
  private shoppService = inject(ShoppService);
  protected error = signal<string | null>(null);
  protected isLoading = signal<boolean>(false);
  protected giftTo = new FormControl('', [Validators.email]);


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

  protected clearCart(){
    this.isLoading.set(true);

    this.shoppService.clearShoppCart()
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: () => this.cart.update(this.onUpdateResetCart),
      });
  }

  protected onUpdateResetCart(data:IShoppCartDto | null):IShoppCartDto{
    const newCart:IShoppCartDto = {
      products: [],
      userId: '',
      id: '',
      total: 0,
    }

    return newCart;
  }

}
