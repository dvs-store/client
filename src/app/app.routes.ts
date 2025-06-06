import { Routes } from '@angular/router';
import { isNotLogged } from './auth/guards/isNot-logged';
import { isLogged } from './auth/guards/is-logged';
import { checkAdminGuard } from './auth/guards/check-admin.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home-page/home-page.component'),
    },
    {
        path: 'shopp/cart',
        canActivate: [isLogged],
        loadComponent: () => import('./store/shopp/shopping-cart/shopping-cart.component'),
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
        path: 'products/free/:name',
        canActivate: [isLogged],
        loadComponent: () => import('./store/products/pages/free-access-page/free-access-page.component'),
    },
    {
        path: 'products/unlock/key-free',
        canActivate: [isLogged],
        loadComponent: () => import('./store/products/pages/unlock-free-key-page/unlock-free-key-page.component'),
    },
    {
        path: 'admin/products',
        canActivate: [checkAdminGuard],
        loadComponent: () => import('./store/admin/pages/products/products.component'),
    },
    {
        path: 'contact/support',
        canActivate: [isLogged],
        loadComponent: () => import('./pages/support-page/support-page.component'),
    },
    {
        path: 'payment-success',
        loadComponent: () => import('./pages/success-payment/success-payment.component'),
    },


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
        path: '**',
        redirectTo: ''
    }
];

