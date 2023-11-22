import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { user } from '../../modules/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
<<<<<<< HEAD
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../api/api.service';

=======
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { BrowserQRCodeReader } from '@zxing/browser';
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ApiResponse {
  data: any[];
 }
>>>>>>> f7e624cdea1607629fdf5eebd0d9b677577bbcf7
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
<<<<<<< HEAD
  fotoURL: SafeResourceUrl | null = null;
  selectedRegion: number | null = null;
  user: user = { user: '', name: '', lastName: '', email: '', password: '', regions: [], communes: [] };

  constructor(
    private router: Router,
    private http: HttpClient,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer,
    public apiService: ApiService // Asegúrate de que apiService sea público
  ) {}
=======
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
>>>>>>> f7e624cdea1607629fdf5eebd0d9b677577bbcf7

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
<<<<<<< HEAD
    this.apiService.fetchRegions().subscribe((response: any) => {
      const regions = response.data || [];
      this.apiService.regions$ = of(regions);
    });

=======
>>>>>>> f7e624cdea1607629fdf5eebd0d9b677577bbcf7
    const fotoURLFromLocalStorage = localStorage.getItem('foto');
    if (fotoURLFromLocalStorage) {
      this.fotoURL = this.sanitizer.bypassSecurityTrustResourceUrl(fotoURLFromLocalStorage);
    }
<<<<<<< HEAD
=======

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
>>>>>>> f7e624cdea1607629fdf5eebd0d9b677577bbcf7
  }

  fetchCommunes() {
    if (this.selectedRegion) {
<<<<<<< HEAD
      this.apiService.fetchCommunes(this.selectedRegion).subscribe((response: any) => {
        const communes: any[] = response.data || [];
        this.apiService.communes$ = of(communes);
      });
=======
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
>>>>>>> f7e624cdea1607629fdf5eebd0d9b677577bbcf7
    }
  }

  onSelectRegion(regionId: number) {
    this.selectedRegion = regionId;
    this.fetchCommunes();
  }
}
