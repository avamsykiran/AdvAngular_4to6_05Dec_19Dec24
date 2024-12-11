import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'/contactsList'},
    {path:'contactsList', 
        loadComponent: () => import('./contacts/contact-list/contact-list.component').then(m => m.ContactListComponent) }
];
