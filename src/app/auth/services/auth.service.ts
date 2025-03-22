import { getPlatform, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../helpers/AuthConfig';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oauthService = inject(OAuthService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(){
    if(this.isBrowser){
      this.config();
    }
  }


  private config(){
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }


  login() {    
    if(this.isAuthenticated){
      console.log("Already user logged");
      console.log(this.getAccessToken);
      return;
    }
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  get isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

}
