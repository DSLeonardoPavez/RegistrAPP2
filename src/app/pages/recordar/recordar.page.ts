import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { user } from '../../modules/user';
import { Router } from '@angular/router';
const { Preferences } = Plugins;


@Component({
  selector: 'app-recordar',
  templateUrl: './recordar.page.html',
  styleUrls: ['./recordar.page.scss'],
})
export class RecordarPage implements OnInit {
  newPassword: string = '';
  user: user | null = null;
  userInput: string = '';

  constructor(private router: Router) {
    this.newPassword = '';
  }

  ngOnInit() {
    this.getUserFromPreferences();
  }

  async changePassword() {
    // Verifica que el usuario exista en las preferencias
    if (!this.user) {
      alert('El usuario no existe');
      return;
    }

    // Verifica que el usuario haya ingresado una nueva contraseña
    if (!this.newPassword) {
      alert('Debes ingresar una nueva contraseña');
      return;
    }

    // Compara la contraseña ingresada con la contraseña del usuario almacenada
    if (this.newPassword !== this.user.password) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Actualiza la contraseña del usuario
    this.user.password = this.newPassword;

    // Guarda el usuario en las preferencias
    const options: SetOptions = {
      key: 'user',
      value: JSON.stringify(this.user),
    };

    await Preferences.set(options);

    // Redirige al usuario a la página principal
    this.router.navigate(['/main'], { queryParams: { user: this.user } });
  }

  async getUserFromPreferences(): Promise<user | null> {
    // Obtiene el usuario de las preferencias
    const options: GetOptions = {
      key: 'user',
    };
    try {
      const userStr = await Preferences.get(options);
      if (userStr.value !== null) {
        this.user = JSON.parse(userStr.value);
      } else {
        this.user = null;
      }
    } catch (error) {
      console.error('Error al obtener el usuario de las preferencias', error);
      this.user = null;
    }

    return this.user;
  }
}
