// main.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { QrComponent } from '../../qr/qr.component';
import { user } from '../../modules/user';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  providers: [BarcodeScanner],
})
export class MainPage {
  user: user | null = null;
  router: Router;
  barcodeData: string | null = null;

  constructor(router: Router, private barcodeScanner: BarcodeScanner) {
    this.user = null;
    this.router = router;
  }

  async scanBarcode() {
    try {
      const barcodeData = await this.barcodeScanner.scan();

      if (barcodeData.text) {
        this.barcodeData = barcodeData.text;
        console.log('Barcode data', this.barcodeData);
      }
    } catch (err) {
      console.log('Error', err);
    }
  }

  async ngOnInit() {
    const data = await Storage.get({ key: 'user' });

    if (data.value === null) {
      this.user = null;
    } else {
      this.user = JSON.parse(data.value);
    }

    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }

  onScanSuccess(event: any) {
    // Handle the scan success event here
  }
}
