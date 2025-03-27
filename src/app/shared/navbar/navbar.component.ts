import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { INavLink } from '../interfaces/navbar/INavLink';
import { ProfileImageComponent } from "../components/profile-image/profile-image.component";
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatMenuModule, ProfileImageComponent, MatIconModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  protected authService = inject(AuthService);
  protected links = signal<INavLink[]>([
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Products',
      path: '/products'
    },
    {
      name: 'Services',
      path: '/services'
    },
    {
      name: 'Subscriptions',
      path: '/subscriptions'
    },
    {
      name: 'Support',
      path: '/support'
    },
  ]);


}
