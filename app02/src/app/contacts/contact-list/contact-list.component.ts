import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {

  constructor(public contactService:ContactService){
  
  }
  
  del(id:number){
    this.contactService.deleteById(id);
  }
}
