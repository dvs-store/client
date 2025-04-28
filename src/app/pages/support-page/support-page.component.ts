import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategorySupportType } from './interfaces/CategorySupportEnum';
import { SupportService } from '../../services/support.service';
import { IContactEmailSupport } from '../../services/interfaces/support/IContactEmailSupport';
import { finalize } from 'rxjs';
import { AlertComponent } from "../../shared/components/alert/alert.component";



@Component({
  selector: 'app-support-page',
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatSelectModule, MatButtonModule, AlertComponent],
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
  protected emailSend = signal<boolean>(false);


  constructor(
    private contactService:SupportService,
  ){}


  protected onSubmit(){
    if( this.contact.invalid ) return;
    this.isLoading.set(true);
    const { category, description } = this.contact.controls;

    const body:IContactEmailSupport = {
      description: description.value!,
      category: category.value!,
    }

    this.contactService.email(body)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe(() => {
        this.contact.reset();
        this.emailSend.set(true);
      });
  }

}
