import { Component, contentChild, inject, OnInit } from '@angular/core';
import { GetProductsComponent } from "../../store/products/components/get-products/get-products.component";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  imports: [GetProductsComponent],
  templateUrl: './home-page.component.html'
})
export default class HomePageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);


  ngOnInit(): void {
    this.addMetatags();
  }


  private addMetatags(){
    const title:string = 'DevComplete Studios';
    const description:string = 'Join us at DevComplete Studios and get the best Roblox services, Web Development, API Development, Machine Learning, everything related to Software Development.';

    this.title.setTitle(title);
    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({name: 'og:description', content: description});
    this.meta.updateTag({name: 'og:title', content: title});
  }

}
