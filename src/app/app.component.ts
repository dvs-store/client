import { Component, effect, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadUser();
  }


  private loadUser(){
    this.authService.getUserAuthenticated()
    .subscribe({
      error: () => this.authService.logout(),
      next: (user) => {
        if( typeof user !== 'boolean' ){
          console.log('Welcome: ' + user.email.substring(0, user.email.indexOf('@')));
        }
      },
    });
  }

}
