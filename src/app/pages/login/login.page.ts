import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { user } from '../../modules/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  password: string;
  router: Router;

  constructor(router: Router) {
    this.router = router;
    this.password = '';

    this.currentUser = {
      user: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      regions: [],
      communes: [],
    };
  }

  currentUser: user;
  loggedIn: boolean = false;

  async login() {
    // Verify that the user is not already logged in
    if (this.loggedIn) {
      return;
    }

    // Verify that the user has entered a password
    if (!this.password) {
      alert('Debes ingresar una contraseña');
      return;
    }

    // Get the user from storage
    const userStr = await Preferences.get({ key: 'user' });
    if (!userStr.value) {
      alert('El usuario no existe');
      return;
    }

    const currentUser = JSON.parse(userStr.value);

    // Verify that the password is correct
    if (this.currentUser.user !== currentUser.user || this.password !== currentUser.password) {
      alert('El usuario o la contraseña no son correctos');
      return;
    }

    // Set the user as logged in
    this.loggedIn = true;

    // Redirect the user to the main page
    this.router.navigate(['/main'], { queryParams: { user: this.currentUser } });
  }

  ngOnInit() {
    this.loggedIn = false;
  }
}
