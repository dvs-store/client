import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HandleErrorsFn } from '../../../../shared/functions/HandleErrorsFn';
import { Id } from '../../../../shared/interfaces/api/Id';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-unlock-free-key-page',
  imports: [],
  templateUrl: './unlock-free-key-page.component.html'
})
export default class UnlockFreeKeyPageComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  protected key = signal<string | null>(null);
  private productsService:ProductsService = inject(ProductsService);
  protected error = signal<string | null>(null);


  ngOnInit(): void {
    this.loadProduct();
  }


  protected clearLocalStorage(){
    if( !this.isBrowser ) return;
    localStorage.clear();
  }

  protected loadProduct(){
    const id = localStorage.getItem('last-product');
    if( !id ) return;

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
        next: console.log,
        error: console.log,
      });
  }

}
