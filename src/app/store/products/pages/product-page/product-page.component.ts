import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Id } from '../../../../shared/interfaces/api/Id';
import { ProductsService } from '../../services/products.service';
import { HandleErrorsFn } from '../../../../shared/functions/HandleErrorsFn';
import { IProduct } from '../../interfaces/IProduct';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { Meta, Title } from '@angular/platform-browser';
import { finalize } from 'rxjs';

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
  private title = inject(Title);
  private meta = inject(Meta);


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
      .pipe(
        finalize(() => this.addMetatags())
      )
      .subscribe({
        error: (e) => this.error.set(HandleErrorsFn(e)),
        next: (product) => this.product.set(product),
      });
  }

  private addMetatags(){
    this.title.setTitle(`DVS | ${this.product()?.name ?? 'Products'}`);
    const description = `Get the best ${this.product()?.categories.toString() ?? 'Software Enginer'} service with us, we provide you with security and the best quality`;

    //Metatags
    this.meta.updateTag({name: 'Description', content: description});
    this.meta.updateTag({name: 'og:title', content: `DevComplete Studios | ${this.product()?.name}`});
    this.meta.updateTag({name: 'og:description', content: description});

    if( this.product() ){
      this.meta.updateTag({name: 'og:image', content: `${this.product()!.image}`});
    }
  }

}
