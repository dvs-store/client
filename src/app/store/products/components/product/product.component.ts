import { Component, inject, input, signal } from '@angular/core';
import { IProductPreview } from '../../interfaces/IProductPreview';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShoppService } from '../../../shopp/services/shopp.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'product',
  imports: [RouterLink, CurrencyPipe, MatButtonModule, MatIconModule, NgClass, TitleCasePipe],
  templateUrl: './product.component.html'
})
export class ProductComponent {

  public product = input.required<IProductPreview>();
  private shoppService = inject(ShoppService);
  protected isLoadingAddProduct = signal(false);


  protected addCart(){
    if( !this.product() || this.isLoadingAddProduct() ) return;
    this.isLoadingAddProduct.set(true);

    this.shoppService.addProduct(this.product().id as string)
      .pipe(
        finalize(() => this.isLoadingAddProduct.set(false)),
      )
      .subscribe({
        next: (data) => console.log(data),
        error: (e) => console.log(e),
      });
  }

  protected get isAccesAnticipated():boolean{
    return this.product().status === 'EARLY_ACCESS';
  }

  protected get isNewProduct():boolean {
    return true;
  }


}
