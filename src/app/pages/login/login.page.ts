import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export class LoginPage implements OnInit {

  constructor() { }
  
  async login(user: string, password: string) {
      await Preferences.set('login_user', user); // Saves user in preferences
      await Preferences.set('login_password', password); // Saves password in preferences
     }
     
     async getUserAndPassword() {
       const user = await Preferences.get('login_user'); // Retrieves user from preferences
       const password = await Preferences.get('login_password'); // Retrieves password from preferences
      
       console.log('User:', user); // Logs user to console
       console.log('Password:', password); // Logs password to console
      }
  
  ngOnInit() {
 
  }
  
  }
