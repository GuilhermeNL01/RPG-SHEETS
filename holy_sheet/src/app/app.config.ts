
// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './data/auth.interceptor';
import { AuthGuard } from './data/auth.guard';
import { AuthService } from './data/auth.service';
import { JwtModule } from '@auth0/angular-jwt';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: []
      }
    }))
  ]
};

