import { FormControl } from "@angular/forms";


export function HandleExpectedErrors(control: FormControl):string | null {
  const { errors } = control;
  if( !errors ) return null;

  if( control.hasError('minlength') ){
    const length = control.getError('minlength')['requiredLength'];
    return `Must be greater than: ${length} characters`;

  }else if(control.hasError('maxlength')){
    const length = control.getError('maxlength')['requiredLength'];
    return `Must be less than: ${length} characters`;
  }

  return 'Unexpected error!.';
}


