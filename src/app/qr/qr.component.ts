import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor/barcode-scanner';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent  implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
/*
  constructor() { }
  
  async scanQRCode() {
    const result = await BarcodeScanner.scan();
    console.log(result);
  }

  ngOnInit() {
    // Get the user data from Capacitor Storage
    const data = await Storage.get({ key: 'user' });
  
    // Check if the `user` property is `null`
    if (data.value === null) {
      // Assign `null` to the `user` property
      this.user = null;
    } else {
      // Parse the user data and assign it to the `user` property
      this.user = JSON.parse(data.value);
    }
  
    // Call the `scanQRCode()` method
    this.scanQRCode();
  }

} */
}