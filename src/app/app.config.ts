import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions, withInMemoryScrolling, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',  
        anchorScrolling: 'enabled'         
      }),
      withViewTransitions(),
      withHashLocation()   
    ),
    provideAnimations(),
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 300,
      newestOnTop: true,
      toastClass: 'ngx-toastr custom-toast',
    }),
    importProvidersFrom(HttpClientModule), 
  ]
};
