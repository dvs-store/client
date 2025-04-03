import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-succes-login-page',
  imports: [MatProgressSpinnerModule],
  templateUrl: './google-succes-login-page.component.html'
})
export default class GoogleSuccesLoginPageComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);


  ngOnInit(): void {
    this.authService.login();
  }

}
