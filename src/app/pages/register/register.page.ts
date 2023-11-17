import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { user } from '../../modules/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface ApiResponse {
  data: any[];
 }
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  regions: any[] = [];
  communes$: Observable<any[]> = of([]); // Initialize an empty observable
  selectedRegion: number | null = null;
  router: Router;

  constructor(router: Router, private http: HttpClient) {
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
  

  onSelectRegion(regionId: number) {
    this.selectedRegion = regionId;
    this.fetchCommunes();
  }
}
