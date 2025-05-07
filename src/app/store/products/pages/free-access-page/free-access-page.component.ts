import { Component, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { finalize } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { isPlatformBrowser } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-free-access-page',
  imports: [MatButtonModule, MatProgressBarModule],
  templateUrl: './free-access-page.component.html'
})
export default class FreeAccessPageComponent implements OnInit {

  protected product = signal<IProduct | null>(null);
  private productsService = inject(ProductsService);
  private activatedRouter = inject(ActivatedRoute);
  private title = inject(Title);
  private metaTags = inject(Meta);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  protected isValidFreeAccess = signal<boolean>(this.isBrowser && localStorage.getItem("free-access") != null);


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
    const title = `Free | ${this.product()?.name ?? 'Products'}`;
    this.title.setTitle(title);

    if( !this.product() ) return;
    const product:IProduct = this.product()!;

    const description = `${product.description} - Get the best free ${product.name.toLowerCase().replace("script", "").trim()} script`;

    this.metaTags.updateTag({name: 'description', content: description});
    this.metaTags.updateTag({name: 'og:description', content: description});
    this.metaTags.updateTag({name: 'og:title', content: ""});
  }

  protected getKeyFree(){
    console.log('Obteniendo llave...');
  }

}
