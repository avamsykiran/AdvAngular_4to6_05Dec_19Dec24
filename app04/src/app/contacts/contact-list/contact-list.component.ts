import { Component, inject } from '@angular/core';
import { ContactsStore } from '../../services/contact.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {

  cs = inject(ContactsStore);

  ngOnInit(){
    this.cs.loadAll();
  }
  
  del(id:number){
    this.cs.del(id);
  }
}
