import { inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../helpers/AuthConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oauthService = inject(OAuthService);


  constructor(){
    this.config();
  }


  private config(){
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }


  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

}
