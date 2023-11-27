// main.page.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GetOptions, Storage } from '@capacitor/storage';
import { user } from '../../modules/user';
import { QrReaderComponent } from '../../qr-reader/qr-reader.component';
import { GeolocationService } from '../../services/geolocation.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: user | null = null;
  barcodeData: string | null = null;

  @ViewChild(QrReaderComponent, { static: false }) qrReaderComponent?: QrReaderComponent; // Propiedad puede ser undefined

  constructor(private router: Router, private geolocationService: GeolocationService) {}

  async scanBarcode() {
    // Llama al método del componente lector de QR si está definido
    this.checkQRReaderComponent();
    if (this.qrReaderComponent) {
      this.qrReaderComponent.scanQRCode();
    }
  }
  async obtenerUbicacion() {
    try {
      const ubicacion = await this.geolocationService.solicitarPermisos();
      console.log('Ubicación actual:', ubicacion);
    } catch (error) {
      // Manejar el error según tus necesidades
    }
  }

  async getUser(userData: string) {
    try {
      const options: GetOptions = {
        key: 'user',
      };
      const userStr = await Storage.get(options);

      if (!userStr.value || userStr.value === '') {
        return null;
      }

      const user = JSON.parse(userStr.value);

      if (user.user === userData) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user data', error);
      return null;
    }
  }

  async ngOnInit() {
    try {
      const data = await Storage.get({ key: 'user' });

      if (data.value) {
        this.user = JSON.parse(data.value);
      } else {
        this.user = null;
      }

      if (!this.user) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error in ngOnInit', error);
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }

  private checkQRReaderComponent() {
    // Realiza la comprobación de si el componente existe
    if (!this.qrReaderComponent) {
      console.error('QR Reader Component is not available.');
    }
  }
}
