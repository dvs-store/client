import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinnerModule, NavbarComponent],
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
      error: () => this.authService.logout()
    });
  }

}
