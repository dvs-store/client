import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { HandleErrorsFn } from '../../../../shared/functions/HandleErrorsFn';
import { IProduct } from '../../interfaces/IProduct';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { Meta, Title } from '@angular/platform-browser';
import { finalize } from 'rxjs';
import { IFaq } from '../../interfaces/IFaq';
import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { ProductSkeletonComponent } from "../../components/product-skeleton/product-skeleton.component";

@Component({
  selector: 'product-page',
  imports: [TitleCasePipe, CurrencyPipe, DatePipe, MatTabsModule, MatExpansionModule, AlertComponent, ProductSkeletonComponent],
  templateUrl: './product-page.component.html'
})
export default class ProductPageComponent implements OnInit {

  private router = inject(ActivatedRoute);
  protected error = signal<string | null>(null);
  private productsService = inject(ProductsService);
  protected product = signal<IProduct | null>(null);
  private title = inject(Title);
  private meta = inject(Meta);
  protected questions = signal<IFaq[]>([
    {
      content: 'Access is immediate, once your purchase is made, you will receive an email with your invoice, details of your purchase and the content to be able to access, you will also be able to see more details in your profile on our website',
      title: 'When will I get access after I make the purchase?',
    },
    {
      content: 'Yes, access is permanent, you should not lose access to our content unless you cancel your payment or there are problems with the content and it is evaluated by us, but you should keep in mind that after 6 months, our sellers have the option to leave it Legacy, this does not mean that you will lose access, but that they may stop updating it.',
      title: 'Is it permanent?',
    },
    {
      content: 'Refund is not available on our services, no refund will be given for any situation, our payments are safe and secure by Stripe and PayPal, so in case of wrong payments or any problem with them, please contact them first.',
      title: 'Can I ask for a refund?',
    },
    {
      content: 'The consumer is responsible for what they buy and what they use, we are not responsible in case they misuse our scripts, if the user is banned we are not responsible.',
      title: 'Is there a risk of in-game banning?',
    }
  ]);


  ngOnInit(): void {
    this.findProduct();
  }


  private findProduct(){
    const name:string | null = this.router.snapshot.paramMap.get('name');
    if( !name ){
      this.error.set('Unexpected error, reload page');
      return;
    }

    this.productsService.findByName(name)
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
    const description = this.product()?.description
      ??
    `Get the best Software Enginer service with us, we provide you with security and the best quality`;

    //Metatags
    this.meta.updateTag({name: 'Description', content: description});
    this.meta.updateTag({name: 'og:title', content: `DevComplete Studios | ${this.product()?.name}`});
    this.meta.updateTag({name: 'og:description', content: description});

    if( this.product() ){
      this.meta.updateTag({name: 'og:image', content: `${this.product()!.image}`});
    }
  }

}
