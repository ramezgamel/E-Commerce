import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { confirmPass } from 'src/app/CustomValidtors/confirmPass';
import { UserService } from 'src/app/UserModule/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  isEdit: boolean = false;
  registerForm: FormGroup;
  existsEmails: string[] = ['aa@aa.com', 'bb@bb.com', 'cc@cc.com'];

  constructor(private fb: FormBuilder, private auth: UserService) {
    this.registerForm = fb.group(
      {
        userName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        profileImage: [''],
        phoneNumber: fb.array(['']),
        address: fb.array(['']),
        referral: [''],
        referralOther: [''],
      },
      { validators: confirmPass() }
    );
  }

  get userName() {
    return this.registerForm.get('userName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get profileImage() {
    return this.registerForm.get('profileImage');
  }
  get referral() {
    return this.registerForm.get('referral');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber') as FormArray;
  }
  get address() {
    return this.registerForm.get('address') as FormArray;
  }

  addField(fieldName: FormArray) {
    // fieldName.setControl(fieldName.length,new FormControl(''))
    fieldName.push(new FormControl(''));
  }

  removeField(index: number, fieldName: FormArray) {
    fieldName.removeAt(index);
  }

  submit() {
    if (!this.isEdit) {
      // register
      this.auth.register(this.registerForm.value).subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      });
    } else {
      // edit
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  // // Conditional Validators
  // changeValidators() {
  //   if (this.referral?.value == 'other') {
  //     this.registerForm
  //       .get('referralOther')
  //       ?.addValidators([Validators.required]);
  //   } else {
  //     this.registerForm.get('referralOther')?.clearValidators();
  //   }
  //   this.registerForm.get('referralOther')?.updateValueAndValidity;
  // }

  // // custom validator
  // // sync validator function
  // existsEmailValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     let email = control.value;
  //     if (this.existsEmails.includes(email)) {
  //       return { emailIsExist: { value: email } };
  //     }
  //     return null;
  //   };
  // }
  // // async validator function
}
