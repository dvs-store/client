import { Routes } from '@angular/router';
import { isNotLogged } from './auth/guards/isNot-logged';
import { isLogged } from './auth/guards/is-logged';
import { checkAdminGuard } from './auth/guards/check-admin.guard';

export const routes: Routes = [
    {
        path: 'register',
        canActivate: [isNotLogged],
        loadComponent: () => import('./auth/pages/register-page/register-page.component'),
    },
    {
        path: 'verify-account/:token',
        canActivate: [isNotLogged],
        loadComponent: () => import('./auth/pages/verify-account/verify-account.component'),
    },
    {
        path: 'google',
        canActivate: [isNotLogged],
        loadComponent: () => import('./auth/pages/google-succes-login-page/google-succes-login-page.component'),
    },

    {
        path: '',
        loadComponent: () => import('./pages/home-page/home-page.component'),
    },
    {
        path: 'user/profile',
        canActivate: [isLogged],
        loadComponent: () => import('./user-profile/profile-page/profile-page.component'),
    },
    {
        path: 'products/:name',
        loadComponent: () => import('./store/products/pages/product-page/product-page.component'),
    },
    {
        path: 'admin/products',
        canActivate: [checkAdminGuard],
        loadComponent: () => import('./store/admin/pages/products/products.component'),
    },
    {
        path: '**',
        redirectTo: ''
    }
];

