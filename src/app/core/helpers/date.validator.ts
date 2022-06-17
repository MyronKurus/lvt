import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return(
      control.errors?.['matDatepickerMax'] ||
      control.errors?.['matDatepickerMin']
    ) ? { invalidDate: true } : null;
  };



}
