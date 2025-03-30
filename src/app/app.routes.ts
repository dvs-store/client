import { Routes } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

export const routes: Routes = [
    {
        path: 'register',
        loadComponent: () => import('./auth/pages/register-page/register-page.component'),
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/pages/login-page/login-page.component'),
    },
    {
        path: 'verify-account/:token',
        loadComponent: () => import('./auth/pages/verify-account/verify-account.component'),
    },
    {
        path: 'google',
        loadComponent: () => import('./auth/pages/google-succes-login-page/google-succes-login-page.component'),
    },
    {path: '', component: NavbarComponent, children: [
        {
            path: '',
            loadComponent: () => import('./pages/home-page/home-page.component'),
        },
        {
            path: 'user/profile',
            loadComponent: () => import('./user-profile/profile-page/profile-page.component'),
        },
    ]},
    {
        path: '**',
        redirectTo: ''
    }
];
