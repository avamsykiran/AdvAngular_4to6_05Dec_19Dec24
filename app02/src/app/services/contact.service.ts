import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts : WritableSignal<Contact[]> = signal<Contact[]>([]);

  isContactsEmpty : Signal<boolean> = computed<boolean>( () => !this.contacts() || this.contacts().length===0 );

  private nextId:number; 

  constructor() { 
    this.contacts.set([
      {id:1,fullName:"Vamsy Kiran",mobile:"9052224753",mailId:"vamsy@gmail.com"},
      {id:2,fullName:"KGN Murthy",mobile:"9052224754",mailId:"murthy@gmail.com"},
      {id:3,fullName:"Suresh P",mobile:"9052224755",mailId:"suresh@gmail.com"},
      {id:4,fullName:"Ramesh P",mobile:"9052224756",mailId:"ramesh@gmail.com"}
    ]);
    this.nextId=5;
  }

  add(contact:Contact){
    contact.id=++this.nextId;
    this.contacts.update( list => [...list,contact] )
  }

  update(contact:Contact){   
    this.contacts.update( list => list.map( c => c.id!==contact.id?c:contact ) );
  }

  deleteById(id:number){
    this.contacts.update( list => list.filter( c => c.id!==id) );
  }
}
