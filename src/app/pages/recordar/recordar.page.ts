import { Component, OnInit } from '@angular/core';
import { GetOptions, SetOptions, Storage } from '@capacitor/storage';
import { user } from '../../modules/user';
import { Router } from '@angular/router';

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
    this.getUserFromStorage();
  }

  async changePassword() {
    // Verifica que el usuario exista en el almacenamiento local
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

    // Guarda el usuario en el almacenamiento
    const options: SetOptions = {
      key: 'user',
      value: JSON.stringify(this.user),
    };

    await Storage.set(options);

    // Redirige al usuario a la página principal
    this.router.navigate(['/main'], { queryParams: { user: this.user } });
  }

  async getUserFromStorage(): Promise<user | null> {
    // Obtiene el usuario del almacenamiento local
    const options: GetOptions = {
      key: 'user',
    };
    const userStr = await Storage.get(options);
    if (userStr.value !== null) {
      return JSON.parse(userStr.value);
    } else {
      return null;
    }
  }
}
