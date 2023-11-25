import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { user } from '../../modules/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
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
    this.apiService.fetchRegions().subscribe((response: any) => {
      const regions = response.data || [];
      this.apiService.regions$ = of(regions);
    });

    const fotoURLFromLocalStorage = localStorage.getItem('foto');
    if (fotoURLFromLocalStorage) {
      this.fotoURL = this.sanitizer.bypassSecurityTrustResourceUrl(fotoURLFromLocalStorage);
    }
  }

  fetchCommunes() {
    if (this.selectedRegion) {
      this.apiService.fetchCommunes(this.selectedRegion).subscribe((response: any) => {
        const communes: any[] = response.data || [];
        this.apiService.communes$ = of(communes);
      });
    }
  }

  onSelectRegion(regionId: number) {
    this.selectedRegion = regionId;
    this.fetchCommunes();
  }
}
