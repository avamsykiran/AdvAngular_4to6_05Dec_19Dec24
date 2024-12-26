import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/contactsList' },
    {
        path: 'contactsList',
        loadComponent: () => import('./contacts/contact-list/contact-list.component').then(m => m.ContactListComponent)
    },
    {
        path: 'addContact',
        loadComponent: () => import('./contacts/contact-form/contact-form.component').then(m => m.ContactFormComponent)
    },
    {
        path: 'editContact/:id',
        loadComponent: () => import('./contacts/contact-form/contact-form.component').then(m => m.ContactFormComponent)
    }
];
