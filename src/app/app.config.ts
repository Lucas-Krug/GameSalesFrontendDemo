import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideHttpClient(), provideAnimationsAsync(), provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
};
