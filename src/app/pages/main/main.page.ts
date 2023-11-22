import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetOptions, Storage } from '@capacitor/storage';
import { user } from '../../modules/user';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  providers: [
    BarcodeScanner
  ]
})
export class MainPage implements OnInit {
  user: user | null = null;
  router: Router;

  barcodeData: string | null = null; // Declare the barcodeData property as a string type

  constructor(router: Router, private barcodeScanner: BarcodeScanner) {
    this.user = null;
    this.router = router;
  }

  async scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Store the barcode data in the barcodeData property
      this.barcodeData = barcodeData.text;
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async getUser(userData: string) {
    // Obtiene el usuario del almacenamiento
    const options: GetOptions = {
      key: 'user',
    };
    const userStr = await Storage.get(options);
    if (userStr.value === null || userStr.value === '') {
      return null;
    }

    const user = JSON.parse(userStr.value);

    // Verifica que el usuario coincida con el parámetro de consulta
    if (user.user === userData) {
      return user;
    } else {
      return null;
    }
  }

  async ngOnInit() {
    // Get the user data from Capacitor Storage
    const data = await Storage.get({ key: 'user' });

    // Check if the user data is `null`
    if (data.value === null) {
      // Assign `null` to the `user` property
      this.user = null;
    } else {
      // Parse the user data and assign it to the `user` property
      this.user = JSON.parse(data.value);
    }

    // If the `user` property is `null`, redirect the user to the login page
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
