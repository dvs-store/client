import { Component, inject, OnInit, signal } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-free-access-page',
  imports: [],
  templateUrl: './free-access-page.component.html'
})
export default class FreeAccessPageComponent implements OnInit {

  protected product = signal<IProduct | null>(null);
  private productsService = inject(ProductsService);
  private activatedRouter = inject(ActivatedRoute);
  private title = inject(Title);
  private metaTags = inject(Meta);



  ngOnInit(): void {
    const name:string | null = this.activatedRouter.snapshot.paramMap.get("name");
    if( !name ) return;

    this.loadProduct(name);
  }


  private loadProduct(name:string){
    this.productsService.findByName(name)
      .pipe(
        finalize(() => this.loadMetatags())
      )
      .subscribe({
        next: (product) => this.product.set(product),
        error: (error) => console.log({error}),
      })
  }

  private loadMetatags(){
    if( !this.product() ) return;
  }

}
