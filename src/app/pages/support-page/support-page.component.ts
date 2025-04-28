import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategorySupportType } from './interfaces/CategorySupportEnum';



@Component({
  selector: 'app-support-page',
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './support-page.component.html'
})
export default class SupportPageComponent {

  protected contact = new FormGroup({
    category: new FormControl<CategorySupportType>('Website', []),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
  });

  protected contactCategories:CategorySupportType[] = [
    'Payments and subscriptions',
    'Products purchased',
    'Website',
    'Others (Describe which)'
  ];

  protected isLoading = signal<boolean>(false);


  protected onSubmit(){
    console.log(this.contact.invalid);
  }

}
