import { AuthConfig } from 'angular-oauth2-oidc';




export const authConfig:AuthConfig = {
    issuer: 'http://127.0.0.1:9100',
    clientId: 'angular-client',
    redirectUri: 'http://localhost:4200/',
    responseType: 'code',
    scope: 'openid profile',
    showDebugInformation: true,
    strictDiscoveryDocumentValidation: false, //TODO: cambiar
    requireHttps: false, //TODO: cambiar
}
