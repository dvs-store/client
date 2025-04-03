import { Component } from '@angular/core';
import { GetProductsComponent } from "../../store/products/components/get-products/get-products.component";

@Component({
  selector: 'app-home-page',
  imports: [GetProductsComponent],
  templateUrl: './home-page.component.html'
})
export default class HomePageComponent {

}
