import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user/profile',
        loadComponent: () => import('./user-profile/profile-page/profile-page.component'),
    }
];
