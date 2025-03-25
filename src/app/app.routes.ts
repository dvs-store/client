import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home-page/home-page.component'),
    },
    {
        path: 'user/profile',
        loadComponent: () => import('./user-profile/profile-page/profile-page.component'),
    },
    {
        path: 'verify-account/:token',
        loadComponent: () => import('./auth/pages/verify-account/verify-account.component'),
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/pages/register-page/register-page.component'),
    },
    {
        path: '**',
        redirectTo: ''
    },
];
