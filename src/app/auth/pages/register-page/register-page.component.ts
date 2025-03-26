import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ValidatePasswordFn } from '../../../shared/functions/ValidatePasswordFn';


@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent {

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


  constructor(){
    merge(this.form.valueChanges, this.form.statusChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.handleErrors())
  }


  protected signUp(){
    if(this.form.invalid) return;
    console.log("Si paso");
  }

  private handleErrors(){
    const controls = this.form.controls;
    const email = controls.email;
    const name = controls.name;
    const password = controls.password;

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
      console.log(field);
    }else {
      this.formErrors().password.set(null);
    }
  }

}
