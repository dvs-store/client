import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private authService = inject(AuthService);
  protected isLoading = signal(true);


  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(){
    this.authService.getUserAuthenticated()
    .pipe(
      finalize(() => this.isLoading.set(false)),
    )
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
