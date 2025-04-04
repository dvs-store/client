import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Id } from '../../../../shared/interfaces/api/Id';
import { ProductsService } from '../../services/products.service';
import { HandleErrorsFn } from '../../../../shared/functions/HandleErrorsFn';
import { IProduct } from '../../interfaces/IProduct';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'product-page',
  imports: [TitleCasePipe, CurrencyPipe, DatePipe, MatTabsModule, MatExpansionModule],
  templateUrl: './product-page.component.html'
})
export default class ProductPageComponent implements OnInit {

  private router = inject(ActivatedRoute);
  protected error = signal<string | null>(null);
  private productsService = inject(ProductsService);
  protected product = signal<IProduct | null>(null);


  ngOnInit(): void {
    this.findProduct();
  }


  private findProduct(){
    const id:Id | null = this.router.snapshot.paramMap.get('id');
    if( !id ){
      this.error.set('Unexpected error, reload page');
      return;
    }

    this.productsService.findById(id)
      .subscribe({
        error: (e) => this.error.set(HandleErrorsFn(e)),
        next: (product) => this.product.set(product),
      });
  }

  private addMetatags(){}

}
