// main.page.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
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

  @ViewChild(QrReaderComponent, { static: false }) qrReaderComponent?: QrReaderComponent;
  @ViewChild('latitudeDiv') private latitudeDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('longitudeDiv') private longitudeDiv!: ElementRef<HTMLDivElement>;

  constructor(private router: Router, private geolocationService: GeolocationService) {}

  async scanBarcode() {
    this.checkQRReaderComponent();
    if (this.qrReaderComponent) {
      this.qrReaderComponent.scanQRCode();
    }
  }

  async obtenerUbicacion() {
    try {
      const ubicacion = await this.geolocationService.solicitarPermisos();
      console.log('Ubicación actual:', ubicacion);

      if (this.latitudeDiv && this.longitudeDiv) {
        this.latitudeDiv.nativeElement.textContent = `Latitude: ${ubicacion.latitude}`;
        this.longitudeDiv.nativeElement.textContent = `Longitude: ${ubicacion.longitude}`;
      }
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
      // Manejar el error según tus necesidades
    }
  }

  async getUser(userData: string) {
    try {
      const userStr = await Preferences.get({ key: 'user' });

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
      const userStr = await Preferences.get({ key: 'user' });

      if (userStr.value) {
        this.user = JSON.parse(userStr.value);
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
    if (!this.qrReaderComponent) {
      console.error('QR Reader Component is not available.');
    }
  }
}
