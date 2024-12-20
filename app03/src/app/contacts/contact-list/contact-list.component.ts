import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectContacts, selectErrMsg } from '../../state/contacts.selectors';
import { ContactActions } from '../../state/contacts.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {

  contacts$ : Observable<Contact[]>;
  errMsg$ : Observable<string|null>;

  constructor(private store:Store){
    this.contacts$ = store.select(selectContacts);
    this.errMsg$ = store.select(selectErrMsg);
  }

  ngOnInit(){
    this.store.dispatch(ContactActions.load());
  }
  
  del(id:number){
    this.store.dispatch(ContactActions.delete({id}));
  }
}
