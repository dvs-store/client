import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HandleErrorsFn } from '../../../../shared/functions/HandleErrorsFn';
import { Id } from '../../../../shared/interfaces/api/Id';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { MatButtonModule } from '@angular/material/button';
import { CopyContentComponent } from "../../../../shared/components/copy-content/copy-content.component";

@Component({
  selector: 'app-unlock-free-key-page',
  imports: [RouterLink, MatProgressSpinnerModule, AlertComponent, MatButtonModule, CopyContentComponent],
  templateUrl: './unlock-free-key-page.component.html'
})
export default class UnlockFreeKeyPageComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private productsService:ProductsService = inject(ProductsService);
  protected error = signal<string | null>(null);
  protected key = signal<string | null>(null);
  protected isLoading = signal<boolean>(true);


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
      this.key.set(null);
      this.isLoading.set(false);
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
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (value) => {
          this.key.set(value.key);
        },
        error: (error) => {
          this.error.set(HandleErrorsFn(error));
          this.key.set(null);
          console.log({error});
        },
      });
  }

}
