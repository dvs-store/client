import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidatePasswordFn(): ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null => {
        const value = control.value as string;
        if(!value) return null;

        if(value.includes(' ')){
            return {
                passwordError: 'Must not have spaces',
            }
        }else if(value.trim().length > 80){
            return {
                passwordError: 'Password is too long'
            }
        }else if(value.trim().length < 5){
            return {
                passwordError: 'Password is too short'
            }
        }

        return null;
    }
}
