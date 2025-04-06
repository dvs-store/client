import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IStatusProduct } from '../../../products/interfaces/IStatusProduct';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UploadImageComponent } from "../../../../shared/components/upload-image/upload-image.component";

@Component({
  selector: 'upload-product',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, UploadImageComponent],
  templateUrl: './upload-product.component.html'
})
export class UploadProductComponent {

  protected form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(9223372036854775807)]),
    price: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(10000)]),
    image: new FormControl('', [Validators.required]),
    images: new FormControl([], [Validators.required]),
    status: new FormControl(IStatusProduct.ACTIVE, [Validators.required]),
  });

  constructor(){
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => console.log('Ha cambiado'));
  }

}
