import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user/profile',
        loadComponent: () => import('./user-profile/profile-page/profile-page.component'),
    },
    {
        path: 'verify-account/:token',
        loadComponent: () => import('./auth/pages/verify-account/verify-account.component'),
    },
];
