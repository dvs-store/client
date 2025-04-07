import { Component, inject, OnInit, signal } from '@angular/core';
import { IShoppCartDto } from '../interfaces/IShoppCartDto';
import { ShoppService } from '../services/shopp.service';
import { HandleErrorsFn } from '../../../shared/functions/HandleErrorsFn';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterLink, MatButtonModule, MatIconModule, CurrencyPipe],
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

  protected removeOneProduct(id:string){
    this.isLoading.set(true);
    this.shoppService.deleteQuantityProduct(id)
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe((data) => console.log(data)); //TODO: agregar el nuevo carrito de compras
  }

  protected addOneProduct(id:string){
    this.isLoading.set(true);
    this.shoppService.addProduct(id)
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe((data) => console.log(data)); //TODO: agregar el nuevo carrito de compras
  }

}
