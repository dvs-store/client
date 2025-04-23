import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { OrdersComponent } from "../components/orders/orders.component";
import { KeysComponent } from "../components/keys/keys.component";


@Component({
  selector: 'profile-page',
  imports: [MatTabsModule, OrdersComponent, KeysComponent],
  templateUrl: './profile-page.component.html'
})
export default class ProfilePageComponent {


}
