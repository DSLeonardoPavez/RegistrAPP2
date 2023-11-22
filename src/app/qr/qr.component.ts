import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor/barcode-scanner';
<<<<<<< HEAD
import { Storage } from '@capacitor/storage';

=======
>>>>>>> f7e624cdea1607629fdf5eebd0d9b677577bbcf7
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
<<<<<<< HEAD
export class QrComponent implements OnInit {
  user: any; // Deberías tener una definición para esta propiedad

  constructor() {}

  async ngOnInit() {
    // Get the user data from Capacitor Storage
    const data = await Storage.get({ key: 'user' });

=======
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
  
>>>>>>> f7e624cdea1607629fdf5eebd0d9b677577bbcf7
    // Check if the `user` property is `null`
    if (data.value === null) {
      // Assign `null` to the `user` property
      this.user = null;
    } else {
      // Parse the user data and assign it to the `user` property
      this.user = JSON.parse(data.value);
    }
<<<<<<< HEAD

=======
  
>>>>>>> f7e624cdea1607629fdf5eebd0d9b677577bbcf7
    // Call the `scanQRCode()` method
    this.scanQRCode();
  }

<<<<<<< HEAD
  async scanQRCode() {
    const result = await BarcodeScanner.scan();
    console.log(result);
  }
}
=======
} */
}
>>>>>>> f7e624cdea1607629fdf5eebd0d9b677577bbcf7
