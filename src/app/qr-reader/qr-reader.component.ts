// qr-reader.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-reader',
  template: `
    <zxing-scanner
      #scanner
      [(device)]="currentDevice"
      [formats]="formats"
      [torch]="torch"
      (camerasFound)="camerasFoundHandler($event)"
      (scanSuccess)="onScanSuccess($event)"
    ></zxing-scanner>

    <div *ngIf="scannedValue">
      <p>QR escaneado: {{ scannedValue }}</p>
    </div>
    <button (click)="startScan()">Iniciar escaneo</button>
    <button (click)="stopScan()">Detener escaneo</button>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class QrReaderComponent implements OnInit {
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent | undefined;

  currentDevice: MediaDeviceInfo | undefined;
  formats: string[] = ['QR_CODE'];
  torch = false;
  scannedValue: string | undefined;

  ngOnInit(): void {}

  camerasFoundHandler(devices: MediaDeviceInfo[]): void {
    // Selecciona la primera cámara encontrada (puedes ajustar la lógica según tus necesidades)
    this.currentDevice = devices[0];
  }

  onScanSuccess(result: string): void {
    // Se llama cuando se escanea un código QR con éxito
    this.scannedValue = result;
  }

  startScan(): void {
    // Iniciar escaneo
    this.scanner?.restart();
    this.scannedValue = undefined; // Reinicia el valor escaneado
  }

  stopScan(): void {
    // Detener escaneo
    this.scanner?.reset();
    this.scannedValue = undefined; // Reinicia el valor escaneado
  }

  // Método para simular el escaneo de un código QR
  scanQRCode(): void {
    // Simulación del escaneo (puedes ajustar esta lógica)
    const simulatedQRCode = 'Este es un QR simulado';
    this.onScanSuccess(simulatedQRCode);
  }
}