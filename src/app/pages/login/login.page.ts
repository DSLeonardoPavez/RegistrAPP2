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
    // Verifica que el usuario haya ingresado una contraseña
   /*  if (!this.password) {
      alert('Debes ingresar una contraseña');
      return;
    }
    */
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
    const user = JSON.parse(userStr.value);
  
    // Verifica que la contraseña sea correcta
    /*if (user.password !== this.password) {
      alert('La contraseña es incorrecta');
      return;
    }
   */
    // Redirige al usuario a la página principal
    this.router.navigate(['/main'], { queryParams: { user: this.user } });
  }

  ngOnInit() {
    this.loggedIn = false;
  }
}