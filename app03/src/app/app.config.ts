import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { contactsReducer } from './state/contacts.reducer';
import { ContactsEffects } from './state/contacts.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideStore({ contactsFeature:contactsReducer }), 
    provideEffects([ ContactsEffects ]),
    provideHttpClient()
  ]
};
