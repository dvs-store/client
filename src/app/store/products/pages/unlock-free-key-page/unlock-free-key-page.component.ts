import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HandleErrorsFn } from '../../../../shared/functions/HandleErrorsFn';
import { Id } from '../../../../shared/interfaces/api/Id';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unlock-free-key-page',
  imports: [RouterLink],
  templateUrl: './unlock-free-key-page.component.html'
})
export default class UnlockFreeKeyPageComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private productsService:ProductsService = inject(ProductsService);
  protected error = signal<string | null>(null);
  protected getNewKey = signal<boolean | null>(null);


  ngOnInit(): void {
    this.loadProduct();
  }


  protected clearLocalStorage(){
    if( !this.isBrowser ) return;
    localStorage.removeItem("last-product");
  }

  protected loadProduct(){
    const id = localStorage.getItem('last-product');
    if( !id ){
      this.getNewKey.set(false);
      return;
    };

    this.productsService.findById(id)
      .pipe(
        finalize(() => this.clearLocalStorage())
      )
      .subscribe({
        next: (product) => this.getKeyFree(product.id),
        error: (error) => this.error.set(HandleErrorsFn(error)),
      });
  }

  protected getKeyFree(productId:Id){
    return this.productsService.getFreeKey(productId as string)
      .subscribe({
        next: (value) => this.getNewKey.set(value),
        error: (error) => {
          this.error.set(HandleErrorsFn(error));
          this.getNewKey.set(false);
          console.log({error});
        },
      });
  }

}
