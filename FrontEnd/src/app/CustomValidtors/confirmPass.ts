import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function confirmPass(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass = control.get("password")
    const cPass = control.get("confirmPassword");
    if(!cPass || !pass || !cPass.value || !pass.value ) return null
    return pass?.value == cPass?.value ? null: {doesMatch: "doesn't match"}
  }
}