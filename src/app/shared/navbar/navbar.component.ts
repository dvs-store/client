import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { INavLink } from '../interfaces/navbar/INavLink';

@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
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
