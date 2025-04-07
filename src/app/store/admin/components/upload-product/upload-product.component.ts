import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IStatusProduct } from '../../../products/interfaces/IStatusProduct';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UploadImageComponent } from "../../../../shared/components/upload-image/upload-image.component";
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from '../../../products/services/products.service';
import { HandleExpectedErrors } from '../../../../shared/functions/HandleExpectedErrors';

@Component({
  selector: 'upload-product',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, UploadImageComponent, MatButtonModule],
  templateUrl: './upload-product.component.html'
})
export class UploadProductComponent {

  protected form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(9223372036854775807)]),
    price: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(10000)]),
    image: new FormControl<File | null>(null, [Validators.required]),
    images: new FormControl<File[]>([]),
    status: new FormControl<IStatusProduct>('ACTIVE', [Validators.required]),

    discordLink: new FormControl<string | null>('', []),
    youtubeLink: new FormControl<string | null>('', []),
    scriptLink: new FormControl<string | null>('', []),
  });

  protected errors = {
    name: signal<string | null>(null),
    description: signal<string | null>(null),
    stock: signal<string | null>(null),
    price: signal<string | null>(null),
    image: signal<string | null>(null),
    images: signal<string | null>(null),
    status: signal<string | null>(null),
    discordLink: signal<string | null>(null),
    youtubeLink: signal<string | null>(null),
    scriptLink: signal<string | null>(null),
  };


  constructor(
    private productService:ProductsService,
  ){
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.handleErrors());
  }


  private handleErrors(){
    const {controls} = this.form;
    type controlsKeys = keyof typeof controls;
    const keys:controlsKeys[] = Object.keys(controls) as controlsKeys[];

    keys.forEach(k => {
      const error = HandleExpectedErrors(controls[k]);
      this.errors[k].set(error);
    });
  }


  protected onUploadProduct(){
    if( this.form.invalid ) return;
    const controls = this.form.controls;
    const {name, price, description, stock, image, images, status, discordLink, youtubeLink, scriptLink} = controls;

    this.productService.addProduct({
      name: name.value!,
      price: price.value!,
      description: description.value!,
      stock: stock.value!,
      image: image.value!,
      images: images.value!,
      status: status.value!,
      discordLink: discordLink.value!,
      youtubeLink: discordLink.value!,
      scriptLink: discordLink.value!,
      catgories: ['API', 'GAME_DEVELOPER', 'ROBLOX', 'SCRIPTS'],
    })
      .subscribe({
        error: (error) => {}, //TODO: manejar el error
        next: () => this.form.reset(),
      });
  }

  protected onChangeImage(data:{file:File, base64:string} | null){
    this.form.controls.image.setValue(data?.file ?? null);
  }

  protected onUploadFile(event:Event){
    const input = event.target as HTMLInputElement;
    if( input.files && input.files.length == 0 ) return;

    this.form.controls.images.setValue([...this.form.controls.images.value!, input.files![0]]);
  }

}
