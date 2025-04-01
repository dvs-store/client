import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize, merge} from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ValidatePasswordFn } from '../../../shared/functions/ValidatePasswordFn';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InputEmailComponent } from "../../components/input-email/input-email.component";
import { InputPasswordComponent } from "../../components/input-password/input-password.component";
import { LoginGoogleComponent } from "../../components/login-google/login-google.component";
import { HandleErrorsFn } from '../../../shared/functions/HandleErrorsFn';


@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    InputEmailComponent,
    InputPasswordComponent,
    RouterLink,
    LoginGoogleComponent
],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent implements OnInit {

  protected form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    password: new FormControl<string>('', [Validators.required, ValidatePasswordFn()]),
  });

  protected formErrors = signal({
    name: signal<string | null>(null),
  });

  private authService = inject(AuthService);


  protected isLoading = signal<boolean>(false);
  protected signUpError = signal<string | null>(null);
  protected signUpSucces = signal<string | null>(null);


  constructor(
    private title:Title,
    private meta:Meta,
    private route:Router,
  ){
    merge(this.form.valueChanges, this.form.statusChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.handleErrors())
  }

  ngOnInit(): void {
    this.title.setTitle('DVS | Register');

    this.meta.updateTag({ 
      name: 'description', 
      content: 'Registro rápido y seguro en nuestra tienda online. Crea tu cuenta en segundos y disfruta de beneficios exclusivos.' 
    });

    this.meta.addTag({ 
      property: 'og:title', 
      content: 'DevComplete Studios' 
    });
    this.meta.addTag({ 
      property: 'og:description', 
      content: 'Easy and secure registration. Access the best products and services.' 
    });
  }

  protected loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

  protected signUp(){
    console.log(this.authService.isAuthenticated);
    if(this.form.invalid || this.isLoading()) return;
    if(this.authService.isAuthenticated){
      this.route.navigate(['/']);
      return;
    };

    const {email, name, password} = this.form.controls;
    this.isLoading.set(true);

    this.authService.createAccount({email: email.value!, password: password.value!, name: name.value!})
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        error: (error) => {
          this.signUpError.set(HandleErrorsFn(error));
          this.form.controls.password.reset();
        },
        next: () => {
          this.form.reset();
          this.signUpError.set(null);
          this.signUpSucces.set('An email has been sent to confirm your account.');
        }
      })
  }

  private handleErrors(){
    const {name} = this.form.controls;

    if(name.hasError('maxlength')){
      this.formErrors().name.set('Name is too long');
    }else if(name.hasError('minlength')){
      this.formErrors().name.set('Name is too short');
    }else {
      this.formErrors().name.set(null);
    }
  
  }

  protected login(){
    this.authService.login();
  }

}
