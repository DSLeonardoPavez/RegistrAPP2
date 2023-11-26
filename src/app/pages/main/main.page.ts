import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetOptions, Storage } from '@capacitor/storage';
import { user } from '../../modules/user';
import { BarcodeScanner, BarcodeScanResult } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  providers: [BarcodeScanner],
})
export class MainPage implements OnInit {
  user: user | null = null;
  barcodeData: string | null = null;

  constructor(private router: Router, private barcodeScanner: BarcodeScanner) {}

  async scanBarcode() {
    try {
      const barcodeResult: BarcodeScanResult = await this.barcodeScanner.scan();
      this.barcodeData = barcodeResult.text;
      console.log('Barcode data', barcodeResult);
    } catch (error) {
      console.error('Error scanning barcode', error);
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
}
