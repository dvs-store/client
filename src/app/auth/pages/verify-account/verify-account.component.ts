import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';


@Component({
  selector: 'app-verify-account',
  imports: [MatButtonModule],
  templateUrl: './verify-account.component.html'
})
export default class VerifyAccountComponent implements OnInit {

  private router = inject(ActivatedRoute);
  protected error = signal<string | null>('Token expired');
  private authService = inject(AuthService);
  private navigate = inject(Router);


  ngOnInit(): void {
    const token = this.router.snapshot.paramMap.get('token')!;

    this.authService.verifyAccount(token)
      .pipe(
        tap(() => this.authService.login()),
      )
      .subscribe(() => {
        this.error.set(null);
      });
  }

}
