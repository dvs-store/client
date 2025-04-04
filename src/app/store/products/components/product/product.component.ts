import { Component, input } from '@angular/core';
import { IProductPreview } from '../../interfaces/IProductPreview';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IStatusProduct } from '../../interfaces/IStatusProduct';

@Component({
  selector: 'product',
  imports: [RouterLink, CurrencyPipe, MatButtonModule, MatIconModule, NgClass, TitleCasePipe],
  templateUrl: './product.component.html'
})
export class ProductComponent {

  public product = input.required<IProductPreview>();


  protected addCart(){
    console.log('Agregando al carrito el producto con el id: ' + this.product().id);
  }

  protected get isAccesAnticipated():boolean{
    return this.product().status === IStatusProduct.EARLY_ACCESS;
  }

  protected get isNewProduct():boolean {
    return true;
  }


}
