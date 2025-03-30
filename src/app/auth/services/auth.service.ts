import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../helpers/AuthConfig';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { IAuthUser } from '../interfaces/IAuthUser';
import { HttpClient } from '@angular/common/http';
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { ILoginUser } from '../interfaces/ILoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oauthService = inject(OAuthService);
  private platformId = inject(PLATFORM_ID);
  private httpClient = inject(HttpClient)
  private isBrowser = isPlatformBrowser(this.platformId);
  private SERVER_URL = signal<string>("http://localhost:8080/api");
  private user = signal<IAuthUser | null>(null);

  constructor(){
    if(this.isBrowser){
      this.config();
    }
  }


  private config() {
    this.oauthService.setStorage(localStorage);
    this.oauthService.configure(authConfig());
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  signIn(data: ILoginUser):Observable<IAuthUser>{
    const url:string = 'http://localhost:8080/api/users/login';
    return this.httpClient.post<IAuthUser>(url, data)
      .pipe(
        tap(user => this.user.set(user)),
        tap(user => {
          if( this.isBrowser ){
            localStorage.setItem('access_token', user.token!);
          }
        })
      );
  }

  login(){
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

  public get getUser():IAuthUser | null{
    return this.user();
  }

  public verifyAccount(token:string):Observable<IAuthUser>{
    return this.httpClient.get<IAuthUser>(`${this.SERVER_URL()}/users/verify/${token}`)
      .pipe(
        tap(usr => this.user.set(usr)),
      );
  }

  public createAccount(user:IRegisterUser):Observable<IAuthUser>{
    return this.httpClient.post<IAuthUser>(`${this.SERVER_URL()}/users`, user)
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

}
