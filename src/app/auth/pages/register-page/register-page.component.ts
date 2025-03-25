import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroupDirective,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './register-page.component.html'
})
export default class RegisterPageComponent {

  private form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(70)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
  });

  private authService = inject(AuthService);


  protected signUp(){}

}
