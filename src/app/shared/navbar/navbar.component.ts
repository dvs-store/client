import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  protected authService = inject(AuthService);

}
