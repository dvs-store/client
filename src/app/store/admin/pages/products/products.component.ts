import { Component } from '@angular/core';
import { UploadProductComponent } from "../../components/upload-product/upload-product.component";

@Component({
  selector: 'app-products',
  imports: [UploadProductComponent],
  templateUrl: './products.component.html'
})
export default class ProductsComponent {

}
