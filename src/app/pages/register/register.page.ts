import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { user } from '../../modules/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { BrowserQRCodeReader } from '@zxing/browser';
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ApiResponse {
  data: any[];
 }
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  currentLocation: string = '';
  scannedQRCode: string = '';
  fotoURL: SafeResourceUrl | null = null;
  regions: any[] = [];
  communes$: Observable<any[]> = of([]); // Initialize an empty observable
  selectedRegion: number | null = null;
  router: Router;

  constructor(router: Router, private http: HttpClient,  private navCtrl: NavController,private sanitizer: DomSanitizer) {
    
    this.router = router;
  }

  user: user = { user: '', name: '', lastName: '', email: '', password: '', regions: [], communes: [] };

  // Verifica si el usuario ya está registrado
  isUserRegistered = async () => {
    const userStr = await Storage.get({ key: 'user' });
    return userStr.value !== null;
  };

  saveUser = async () => {
    await Storage.set({ key: 'user', value: JSON.stringify(this.user) });
    this.router.navigate(['/login']);
  };

  ngOnInit() {
    const fotoURLFromLocalStorage = localStorage.getItem('foto');
    if (fotoURLFromLocalStorage) {
      this.fotoURL = this.sanitizer.bypassSecurityTrustResourceUrl(fotoURLFromLocalStorage);
    }

    const codeReader = new BrowserQRCodeReader();
    const videoElement = document.getElementById('videoElement') as HTMLVideoElement;

    codeReader
      .decodeFromVideoDevice(undefined, videoElement, (result, err) => {
        if (result) {
          this.scannedQRCode = result.getText();
          console.log('Código QR escaneado:', this.scannedQRCode);
        }
        if (err) {
          console.error('Error al escanear:', err);
        }
      })
      .catch((err) => {
        console.error('Error al iniciar la cámara:', err);
      });

    this.getCurrentLocation();


    this.fetchRegions();

    // Fetch communes initially and update the observable
    this.fetchCommunes();
  }

  fetchRegions() {
    this.http
      .get('https://dev.matiivilla.cl/duoc/location/region')
      .subscribe((data: Object) => {
        // Extract first object from array
        const region = Object.values(data)[0];
        this.regions = region;
      });
  }
  async getCurrentLocation() {
    try {
      const coordinates: GeolocationPosition = await Geolocation.getCurrentPosition();
      this.currentLocation = `Latitud: ${coordinates.coords.latitude}, Longitud: ${coordinates.coords.longitude}`;
      console.log('Ubicación actual:', this.currentLocation);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  fetchCommunes() {
    if (this.selectedRegion) {
       this.http
         .get(`https://dev.matiivilla.cl/duoc/location/comuna?regionId=${this.selectedRegion}`)
         .subscribe((data: any) => {
           const communes: any[] = data.data || [];
           this.communes$ = of(communes); // Update the observable
         });
    }
   }
   navigateLeft() {
    this.navCtrl.back();
  }

  openLink(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  onSelectRegion(regionId: number) {
    this.selectedRegion = regionId;
    this.fetchCommunes();
  }
}
