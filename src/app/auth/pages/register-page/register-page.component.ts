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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
  ],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent implements OnInit {

  protected form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, ValidatePasswordFn()]),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
  });
  protected formErrors = signal({
    email: signal<string | null>(null),
    password: signal<string | null>(null),
    name: signal<string | null>(null),
  })
  private authService = inject(AuthService);
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
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

  protected login(){
    this.authService.login();
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

    this.authService.createAccount({email: email.value!, password: password.value!, username: name.value!})
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        error: (error) => {
          this.form.controls.password.reset();
          this.signUpSucces.set(null);
          console.log(error);
          this.signUpError.set('Error');
        },
        next: () => {
          this.form.reset();
          this.signUpError.set(null);
          this.signUpSucces.set('An email has been sent to confirm your account.');
        }
      })
  }

  private handleErrors(){
    const {email, name, password} = this.form.controls;

    if(email.hasError('email')){
      this.formErrors().email.set('Email is not valid');
    }else {
      this.formErrors().email.set(null);
    }

    if(name.hasError('maxlength')){
      this.formErrors().name.set('Name is too long');
    }else if(name.hasError('minlength')){
      this.formErrors().name.set('Name is too short');
    }else {
      this.formErrors().name.set(null);
    }

    if(password.hasError('passwordError')) {
      const field = password.getError('passwordError')
      this.formErrors().password.set(field);
    }else {
      this.formErrors().password.set(null);
    }
  
  }

}
