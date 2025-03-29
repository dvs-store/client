import { Component, forwardRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';



@Component({
  selector: 'input-email',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatFormField, MatInputModule],
  templateUrl: './input-email.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputEmailComponent),
    multi: true,
  }]
})
export class InputEmailComponent implements ControlValueAccessor {

  protected error = signal<string | null>(null);
  protected email = new FormControl<string>('', [Validators.required, Validators.email]);

  private onChange: (value:string) => void = () => {};
  private onTouched: () => void = () => {}


  constructor(){
    merge(this.email.valueChanges, this.email.statusChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.onChangedValue());
  }

  private onChangedValue(){
    this.onChange(this.email.value || '');

    if( this.email.hasError('email') ){
      this.error.set('Email is not valid');
    }else {
      this.error.set(null);
    }
  }


  writeValue(obj: any): void {
    this.email.setValue(obj || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    (isDisabled)
    ? this.email.disable()
    : this.email.enable();
  }

  onBlur() {
    this.onTouched();
  }

}
