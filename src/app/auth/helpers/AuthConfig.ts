import { AuthConfig } from 'angular-oauth2-oidc';




export const authConfig = ():AuthConfig => {
    return {
        issuer: 'http://127.0.0.1:9100',
        clientId: 'angular-client',
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        responseType: 'code',
        scope: 'openid profile',
        showDebugInformation: true,
        dummyClientSecret: '12345',
        useHttpBasicAuth: true,
        useSilentRefresh: true,
        strictDiscoveryDocumentValidation: false, //TODO: cambiar
        requireHttps: false, //TODO: cambiar
    }
}
