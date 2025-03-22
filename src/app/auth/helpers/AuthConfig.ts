import { AuthConfig } from 'angular-oauth2-oidc';




export const authConfig:AuthConfig = {
    issuer: 'http://127.0.0.1:9100',
    clientId: 'angular-client',
    redirectUri: 'http://localhost:4200/user/profile',
    responseType: 'code',
    scope: 'openid profile',
    showDebugInformation: true,
    dummyClientSecret: '12345',
    strictDiscoveryDocumentValidation: false, //TODO: cambiar
    requireHttps: false, //TODO: cambiar
}
