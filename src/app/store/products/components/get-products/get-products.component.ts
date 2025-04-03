import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProductPreview } from '../../interfaces/IProductPreview';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductComponent } from "../product/product.component";


@Component({
  selector: 'get-products',
  imports: [MatProgressSpinnerModule, ProductComponent],
  templateUrl: './get-products.component.html'
})
export class GetProductsComponent implements OnInit {

  protected products = signal<IProductPreview[] | null>(null);
  private productsService = inject(ProductsService);


  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe(products => {
        this.products.set(products);
      })
  }

}
