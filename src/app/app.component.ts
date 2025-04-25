import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { merge } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShoppService } from './store/shopp/services/shopp.service';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinnerModule, NavbarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private authService = inject(AuthService);
  private shoppService = inject(ShoppService);


  ngOnInit(): void {
    this.loadData();
  }

  private loadData(){
    merge(this.authService.getUserAuthenticated(), this.shoppService.getShoppCart())
      .subscribe({
        error: (e) => {
          if(e.status === 401){
            this.authService.logout();
          }
        },
      });
  }

}
