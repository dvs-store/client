import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-google',
  imports: [],
  templateUrl: './login-google.component.html'
})
export class LoginGoogleComponent {

  private authService = inject(AuthService);


  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

}
