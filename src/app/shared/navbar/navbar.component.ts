import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { INavLink } from '../interfaces/navbar/INavLink';

@Component({
  selector: 'navbar',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  protected authService = inject(AuthService);
  protected links = signal<INavLink[]>([
    {
      name: 'Home',
      path: '/',
      icon: 'home',
    },
    {
      name: 'Ranking',
      path: '/ranking',
      icon: 'ranking',
    },
    {
      name: 'Messages',
      path: '/messages',
      icon: 'messages',
    },
    {
      name: 'Support',
      path: '/support',
      icon: 'support',
    },
  ]);

}
