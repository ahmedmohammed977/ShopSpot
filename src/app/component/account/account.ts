import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrls: ['./account.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class Account implements OnInit {
  userData!: User | null;
  accountForm!: FormGroup;
  editMode: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    const user = localStorage.getItem('userData');
    this.userData = user ? JSON.parse(user) : null;

    this.accountForm = this.fb.group({
      name: [this.userData?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [this.userData?.email || '', [Validators.required, Validators.email]],
      password: [this.userData?.password || '', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [this.userData?.confirmPassword || '', [Validators.required, Validators.minLength(6)]],
      phoneNumber: [this.userData?.phoneNumber || '', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
    });
  }

  get name() { return this.accountForm.get('name'); }
  get email() { return this.accountForm.get('email'); }
  get password() { return this.accountForm.get('password'); }
  get confirmPassword() { return this.accountForm.get('confirmPassword'); }
  get phoneNumber() { return this.accountForm.get('phoneNumber'); }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
  if (this.accountForm.valid) {
    const updatedUser = this.accountForm.value;
    localStorage.clear();
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    this.userData = updatedUser;
    this.editMode = false;
  }
}


  logout() {
    this.router.navigateByUrl('/login'); 
  }
}
