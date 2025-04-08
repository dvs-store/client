import { Component, effect, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { IShoppProductDto } from '../../interfaces/IShoppProductDto';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { ShoppService } from '../../services/shopp.service';
import { finalize } from 'rxjs';
import { IShoppCartDto } from '../../interfaces/IShoppCartDto';
import { RouterLink } from '@angular/router';
import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { HandleErrorsFn } from '../../../../shared/functions/HandleErrorsFn';

@Component({
  selector: 'product-cart',
  imports: [MatButtonModule, MatIconModule, CurrencyPipe, RouterLink, AlertComponent],
  templateUrl: './product-cart.component.html'
})
export class ProductCartComponent {

  protected isLoading = signal<boolean>(false);
  public product = input.required<IShoppProductDto>();
  private shoppService = inject(ShoppService);
  protected error = signal<string | null>(null);


  @Output()
  public onChangeCart = new EventEmitter<IShoppCartDto>();

  protected removeOneProduct(id:string){
    this.isLoading.set(true);
    this.shoppService.deleteQuantityProduct(id)
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe((data) => {
        this.onChangeCart.emit(data);
        this.error.set(null);
      });
  }

  protected addOneProduct(id:string){
    if( this.error() ) return;
    this.isLoading.set(true);
    this.shoppService.addProduct(id)
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        error: (e) => this.error.set(HandleErrorsFn(e)),
        next: (data) => {
          this.onChangeCart.emit(data);
          this.error.set(null);
        },
      });
  }

}
