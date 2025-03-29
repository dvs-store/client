import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatePasswordFn } from '../../../shared/functions/ValidatePasswordFn';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'input-password',
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './input-password.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputPasswordComponent),
    multi: true,
  }]
})
export class InputPasswordComponent implements ControlValueAccessor {

  protected password = new FormControl<string>('', [Validators.required, ValidatePasswordFn()]);
  protected error = signal<string | null>(null);
  protected hide = signal(true);

  private onChange: (value:string) => void = () => {};
  private onTouched: () => void = () => {};


  constructor(){
    merge(this.password.valueChanges, this.password.statusChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.onChangeValue());
  }

  protected onChangeValue(){
    this.onChange(this.password.value || '')
    if(this.password.hasError('passwordError')) {
      const field = this.password.getError('passwordError')
      this.error.set(field);
    }else {
      this.error.set(null);
    }
  }


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  writeValue(obj: any): void {
    this.password.setValue(obj || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    (isDisabled)
    ? this.password.disable()
    : this.password.enable();
  }

  onBlur(){
    this.onTouched();
  }

}
