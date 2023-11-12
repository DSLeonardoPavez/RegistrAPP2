import { Component } from '@angular/core';
import { GetOptions, Storage } from '@capacitor/storage';
import { user } from 'src/app/modules/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  password: string;
  router: any;
  
  constructor(router: Router) {
    this.router = router;
    this.password = '';

    this.user = {
      user: '',
      name: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  user: user;
  loggedIn: boolean = false;

  async login() {
    // Obtiene el usuario del almacenamiento
    const options: GetOptions = {
      key: 'user',
    };

    const userStr = await Storage.get(options);

    if (userStr.value !== null) {
      const user = JSON.parse(userStr.value);

      if (user) {
          this.loggedIn = true;

        if (this.user.password === this.password) {
          
          this.loggedIn = true;
          this.router.navigate(['/main'], { queryParams: { user: this.user } });

        } else {
          this.loggedIn = false;
        }
      }
    } else {
      alert('El usuario no existe');
    }
  }

  ngOnInit() {
    this.loggedIn = false;
  }
}