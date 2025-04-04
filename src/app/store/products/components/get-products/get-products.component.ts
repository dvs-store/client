import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProductPreview } from '../../interfaces/IProductPreview';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductComponent } from "../product/product.component";
import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { HandleErrorsFn } from '../../../../shared/functions/HandleErrorsFn';


@Component({
  selector: 'get-products',
  imports: [MatProgressSpinnerModule, ProductComponent, AlertComponent],
  templateUrl: './get-products.component.html'
})
export class GetProductsComponent implements OnInit {

  protected products = signal<IProductPreview[] | null>(null);
  private productsService = inject(ProductsService);
  protected error = signal<string | null>(null);


  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe({
        error: (e) => this.error.set(HandleErrorsFn(e)),
        next: (products) => this.products.set(products),
      });
  }

}
