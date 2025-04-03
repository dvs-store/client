import { Component, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { INavLink } from '../../interfaces/navbar/INavLink';
import { ProfileImageComponent } from "../profile-image/profile-image.component";
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { NavbarSkeletonComponent } from "../navbar-skeleton/navbar-skeleton.component";


@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatMenuModule, ProfileImageComponent, MatIconModule, NavbarSkeletonComponent, NgClass],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  protected authService:AuthService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  protected isBrowser = isPlatformBrowser(this.platformId);
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

  protected logout(){
    this.authService.logout();
  }

  protected login(){
    this.authService.login();
  }

}
