import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../helpers/AuthConfig';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, tap } from 'rxjs';
import { IAuthUser } from '../interfaces/IAuthUser';
import { HttpClient } from '@angular/common/http';
import { IRegisterUser } from '../interfaces/IRegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oauthService = inject(OAuthService);
  private platformId = inject(PLATFORM_ID);
  private httpClient = inject(HttpClient)
  private isBrowser = isPlatformBrowser(this.platformId);
  private SERVER_URL = signal<string>("http://localhost:8080/api/users");
  public user = signal<IAuthUser | null>(null);

  constructor(){
    if(this.isBrowser){
      this.config();
    }
  }

  private config() {
    this.oauthService.configure(authConfig());
    this.oauthService.setStorage(localStorage);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(data => console.log(data));
  }

  login(){
    if( this.isAuthenticated ) return;
    this.oauthService.initLoginFlow();
  }

  logout() {
    if( !this.isAuthenticated ) return;
    this.oauthService.logOut();
  }

  get getAccessToken():string {
    return this.oauthService.getAccessToken();
  }

  get isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public get getUser():IAuthUser | null {
    return this.user();
  }

  public verifyAccount(token:string):Observable<IAuthUser>{
    return this.httpClient.get<IAuthUser>(`${this.SERVER_URL()}/verify/${token}`)
      .pipe(
        tap(usr => this.user.set(usr)),
      );
  }

  public createAccount(user:IRegisterUser):Observable<IAuthUser>{
    return this.httpClient.post<IAuthUser>(`${this.SERVER_URL()}`, user)
      .pipe(
        tap(user => this.user.set(user)),
      );
  }

  public loginWithGoogle(){
    if(this.isBrowser){
      window.location.href = `http://127.0.0.1:9100/oauth2/authorization/google`;
    }
  }

  public get getUserLogged():IAuthUser | null {
    return this.user();
  }

  public getUserAuthenticated():Observable<IAuthUser | boolean> {
    if(!this.getAccessToken) return of(false);
    return this.httpClient.get<IAuthUser>(`${this.SERVER_URL()}/authenticated`, {headers: {'Authorization': 'Bearer ' + this.getAccessToken}})
      .pipe(
        tap(user => this.user.set(user)),
      );
  }

}
