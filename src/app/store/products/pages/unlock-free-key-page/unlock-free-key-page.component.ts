import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-unlock-free-key-page',
  imports: [],
  templateUrl: './unlock-free-key-page.component.html'
})
export default class UnlockFreeKeyPageComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);


  ngOnInit(): void {
    this.getFreeKey();
  }


  protected clearLocalStorage(){
    if( !this.isBrowser ) return;
    localStorage.clear();
  }

  protected getFreeKey(){
    const name = localStorage.getItem('last-product');
    console.log({name});
  }

}
