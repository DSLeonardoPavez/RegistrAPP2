import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { user } from '../../modules/user';
import { Router } from '@angular/router';
import { of } from 'rxjs';
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
    private sanitizer: DomSanitizer,
    public apiService: ApiService // Asegúrate de que apiService sea público
  ) {}

  // Verifica si el usuario ya está registrado
  isUserRegistered = async (): Promise<boolean> => {
    try {
      const userStr = await Preferences.get({ key: 'user' });
      return userStr.value !== null;
    } catch (error) {
      console.error('Error al verificar el registro del usuario', error);
      return false;
    }
  };

  saveUser = async (): Promise<void> => {
    try {
      await Preferences.set({ key: 'user', value: JSON.stringify(this.user) });
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al guardar el usuario', error);
    }
  };

  ngOnInit() {
    this.apiService.fetchRegions().subscribe((response: any) => {
      const regions = response.data || [];
      this.apiService.regions$ = of(regions);
    });

    // Utiliza Capacitor Preferences en lugar de localStorage
    Preferences.get({ key: 'foto' }).then((result) => {
      const fotoURLFromPreferences = result.value;
      if (fotoURLFromPreferences) {
        this.fotoURL = this.sanitizer.bypassSecurityTrustResourceUrl(fotoURLFromPreferences);
      }
    });
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
