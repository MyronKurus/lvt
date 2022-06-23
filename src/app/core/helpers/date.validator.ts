import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateMaxValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(control.errors?.['matDatepickerMax'] ? { invalidMaxDate: true } : null);
    return control.errors?.['matDatepickerMax'] ? { invalidMaxDate: true } : null;
  };
}

export function dateMinValidator(): ValidatorFn {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const minDate = new Date(currentYear - 3, currentMonth, currentDay);
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(control);
    return control.errors?.['matDatepickerMin'] ? { invalidMinDate: true } : null;
  };
}
