import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { IProductPreview } from '../../interfaces/IProductPreview';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShoppService } from '../../../shopp/services/shopp.service';
import { finalize, map } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'product',
  imports: [RouterLink, CurrencyPipe, MatButtonModule, MatIconModule, NgClass, TitleCasePipe],
  templateUrl: './product.component.html'
})
export class ProductComponent {

  public product = input.required<IProductPreview>();
  private shoppService = inject(ShoppService);
  protected isLoadingAddProduct = signal(false);
  protected alreadyCart = signal<boolean>(false);


  private result = effect(() => {
    if( this.shoppCartService.cart() ){
      this.loadExists();
    }
  })


  constructor(
    private shoppCartService:ShoppService,
    private authService:AuthService,
    private router:Router,
  ){}


  protected addCart(){
    if( !this.authService.isAuthenticated ){
      this.router.navigate(['/register']);
      return
    }

    if( !this.product() || this.isLoadingAddProduct() ) return;
    this.isLoadingAddProduct.set(true);

    this.shoppService.addProduct(this.product().id as string)
      .pipe(
        finalize(() => this.isLoadingAddProduct.set(false)),
      )
      .subscribe(() => console.log('Product added'));
  }

  protected get isAccesAnticipated():boolean{
    return this.product().status === 'EARLY_ACCESS';
  }

  protected get isNewProduct():boolean {
    return true;
  }

  protected loadExists() {
    const exists = this.shoppCartService.productExists(this.product().id);
    this.alreadyCart.set(exists);
  }


}
