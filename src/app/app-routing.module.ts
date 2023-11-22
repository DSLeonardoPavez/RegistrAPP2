import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Error404Page } from './error404/error404.page';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',  canActivate: [authGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login', canActivate: [authGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register', canActivate: [authGuard],
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recordar',    canActivate: [authGuard],

    loadChildren: () => import('./pages/recordar/recordar.module').then( m => m.RecordarPageModule)
  },

  {
    path: 'error404', canActivate: [authGuard],
    loadChildren: () => import('./error404/error404.module').then( m => m.Error404PageModule)
  },
 
  {
    path: 'main', canActivate: [authGuard],
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: '**', loadComponent: () => import('./error404/error404.page').then(comp => comp.Error404Page)}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
