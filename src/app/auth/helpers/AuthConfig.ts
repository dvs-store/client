import { AuthConfig } from 'angular-oauth2-oidc';




export const authConfig:AuthConfig = {
    issuer: 'http://localhost:8080/',
    clientId: 'oidc-client',
    responseType: 'code',
    scope: 'openid profile',
    showDebugInformation: true,
}
