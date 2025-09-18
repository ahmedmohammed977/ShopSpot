import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private storageKey = 'userArray';

  constructor(){}

  register(signupform: User): boolean {
    const userArray = localStorage.getItem(this.storageKey);

    if (!userArray) {
      localStorage.setItem(this.storageKey, JSON.stringify([signupform]));
      return true;
    } else {
      const array: User[] = JSON.parse(userArray);
      const checkUser = array.find((user: User) => user.email === signupform.email);

      if (checkUser) {
        return false; 
      } else {
        array.push(signupform);
        localStorage.setItem(this.storageKey, JSON.stringify(array));
        return true;
      }
    }
  }

  login(signinform: User): User | false {
    const userArray = localStorage.getItem(this.storageKey);

    if (userArray) {
      const array: User[] = JSON.parse(userArray);
      const checkUser = array.find(
        (user: User) => user.email === signinform.email && user.password === signinform.password
      );

      if (checkUser) {
        return checkUser; 
      }
    }

    return false; 
  }
}
