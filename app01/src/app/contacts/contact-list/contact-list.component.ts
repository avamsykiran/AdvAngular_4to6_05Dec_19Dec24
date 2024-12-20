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

  contacts:Contact[];

  constructor(private contactService:ContactService){
    this.contacts=[];
  }

  ngOnInit(){
    this.contacts=this.contactService.getAll();
  }

  del(id:number){
    this.contactService.deleteById(id);
    this.contacts=this.contactService.getAll();
  }
}
