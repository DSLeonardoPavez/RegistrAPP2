import { Component } from '@angular/core';
import { GetOptions, Storage } from '@capacitor/storage';
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
      communes: []
    };
  }

  currentUser: user;
  loggedIn: boolean = false;

  async login() {
    // Verifica que el usuario no esté ya conectado
    if (this.loggedIn) {
      return;
    }

    // Verifica que el usuario haya ingresado una contraseña
    if (!this.password) {
      alert('Debes ingresar una contraseña');
      return;
    }

    // Verifica que el usuario exista en el almacenamiento
    const options: GetOptions = {
      key: 'user',
    };

    const userStr = await Storage.get(options);
    if (userStr.value === null || userStr.value === '') {
      alert('El usuario no existe');
      return;
    }

    // Obtiene el usuario del almacenamiento
    const currentUser = JSON.parse(userStr.value);

    // Verifica que la contraseña sea correcta
    if (this.currentUser.user !== currentUser.user || this.password !== currentUser.password) {
      alert('El usuario o la contraseña no son correctos');
      return;
    }

    // Establece el usuario como conectado
    this.loggedIn = true;

    // Redirige al usuario a la página principal
    this.router.navigate(['/main'], { queryParams: { user: this.currentUser } });
  }

  ngOnInit() {
    this.loggedIn = false;
  }
}
