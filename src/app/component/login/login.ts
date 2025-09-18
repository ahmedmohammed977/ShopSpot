import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  showPassword = false;

  constructor(
    private _authService: Auth,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  loginform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/),
    ]),
  });

  async handleLogin(form: FormGroup) {
  const storedUser = localStorage.getItem('userData');
  const toastConfig = { positionClass: 'toast-top-right' };

  if (!storedUser) {
    this.toastr.error('User does not exist', '', toastConfig);
    positionClass: 'toast-top-right'
    await this._router.navigate(['/signup']);
    return;
  }

  const user: any = JSON.parse(storedUser);

  if (form.value.email === user.email && form.value.password === user.password) {
    this.toastr.success('Logged In Successfully', '', toastConfig);
    positionClass: 'toast-top-right'
    await this._router.navigate(['/home']);
  } else {
    this.toastr.error('Email or Password is incorrect', '', toastConfig);
    positionClass: 'toast-top-right'
    await this._router.navigate(['/signup']); 
  }
}



  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
