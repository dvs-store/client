import { Component, inject, signal } from '@angular/core';
import { InputEmailComponent } from "../../components/input-email/input-email.component";
import { InputPasswordComponent } from "../../components/input-password/input-password.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatePasswordFn } from '../../../shared/functions/ValidatePasswordFn';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { LoginGoogleComponent } from "../../components/login-google/login-google.component";

@Component({
  selector: 'app-login-page',
  imports: [InputEmailComponent, InputPasswordComponent, MatProgressSpinnerModule, MatButtonModule, ReactiveFormsModule, RouterLink, LoginGoogleComponent],
  templateUrl: './login-page.component.html'
})
export default class LoginPageComponent {

  protected form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, ValidatePasswordFn()]),
  });

  protected error = signal<string | null>(null);
  protected isLoading = signal<boolean>(false);
  private authService = inject(AuthService); 
  private router = inject(Router);


  protected signIn(){
    if(this.form.invalid) return;
    if(this.authService.isAuthenticated){
      this.router.navigate(['/']);
      return;
    }

    const email = this.form.controls.email.value!;
    const password = this.form.controls.password.value!;

    this.isLoading.set(true);
    this.authService.signIn({email, password})
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.error.set('Bad credentials or account not exists');
          this.form.controls.password.reset();
        },
        next: () => this.router.navigate(['/']),
      });
  }

}
