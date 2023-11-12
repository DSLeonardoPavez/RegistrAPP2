import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { user } from 'src/app/modules/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
   router: Router;
 
   constructor(router: Router) {
     this.router = router;
   }
 
   // Verifica si el usuario ya está registrado
   isUserRegistered = async () => {
     const userStr = await Storage.get({ key: 'user' });
     if (userStr.value !== null) {
       return true;
     } else {
       return false;
     }
   };
 
   user: user = {user: '', name: '', lastName: '', email: '', password: ''};
 
   async saveUser() {
     await Storage.set({ key: 'user', value: JSON.stringify(this.user) });
 
     this.router.navigate(['/login']);
   }
 
   ngOnInit() {}
 }