import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  showConfirmPassword = false;
  showPassword = false;

  constructor(
    private _authService: Auth,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  signupform: FormGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/),
      ]),
      confirmPassword: new FormControl(''),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.validateConfirmPassword] } as FormControlOptions
  );

  validateConfirmPassword(form: FormGroup): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (confirmPassword && confirmPassword.value === '') {
      confirmPassword.setErrors({ required: true });
      return { required: true };
    } else if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  async handleSubmit() {
  if (this.signupform.valid) {
    const newUser = this.signupform.value;
    localStorage.clear();
    localStorage.setItem('userData', JSON.stringify(newUser));

    const toastConfig = { positionClass: 'toast-top-right' };
    this.toastr.success('Registered Successfully', '', toastConfig);
    positionClass: 'toast-top-right'

    await this._router.navigate(['/home']);
  }
}


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
