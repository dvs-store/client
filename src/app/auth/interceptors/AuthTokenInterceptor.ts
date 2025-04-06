import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { Observable } from "rxjs";



export function AuthTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
    const authService = inject(OAuthService);
    const token = authService.getAccessToken();

    if( token && req.url.includes('api/') && !req.url.includes('/users') ){
        console.log('Enviando token: ' + req.url);
        const newReq = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + token),
        });
        return next(newReq);
    }

    return next(req);
};


