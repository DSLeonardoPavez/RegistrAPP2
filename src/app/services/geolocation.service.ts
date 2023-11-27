// geolocation.service.ts
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async obtenerUbicacionActual(): Promise<{ latitude: number, longitude: number }> {
    if (this.esPlataformaWeb()) {
      return this.obtenerUbicacionWeb();
    } else {
      return this.obtenerUbicacionCapacitor();
    }
  }

  

  private async obtenerUbicacionWeb(): Promise<{ latitude: number, longitude: number }> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
        error => reject(error)
      );
    });
  }

  private async obtenerUbicacionCapacitor(): Promise<{ latitude: number, longitude: number }> {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return { latitude: coordinates.coords.latitude, longitude: coordinates.coords.longitude };
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
      throw error;
    }
  }

  async solicitarPermisos(): Promise<{ latitude: number, longitude: number }> {
    if (this.esPlataformaWeb()) {
      return this.obtenerUbicacionWeb();
    } else {
      try {
        const permisos = await Geolocation.requestPermissions();
        if (permisos.location === 'granted') {
          return this.obtenerUbicacionCapacitor();
        } else {
          console.error('Permisos de ubicación no concedidos');
          throw new Error('Permisos no concedidos');
        }
      } catch (error) {
        console.error('Error al solicitar permisos', error);
        throw error;
      }
    }
  }

  private esPlataformaWeb(): boolean {
    return !Capacitor.isNative;
  }
}
