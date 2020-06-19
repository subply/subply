import { AbstractControl } from '@angular/forms';
export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('password_check').value;

    if (password != confirmPassword) {
      control.get('password_check').setErrors({ password_check: true });
    }
    else {
      return null;
    }
  }
}
