import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contacts:Contact[];
  private nextId:number;

  constructor() { 
    this.contacts=[
      {id:1,fullName:"Vamsy Kiran",mobile:"9052224753",mailId:"vamsy@gmail.com"},
      {id:2,fullName:"KGN Murthy",mobile:"9052224754",mailId:"murthy@gmail.com"},
      {id:3,fullName:"Suresh P",mobile:"9052224755",mailId:"suresh@gmail.com"},
      {id:4,fullName:"Ramesh P",mobile:"9052224756",mailId:"ramesh@gmail.com"}
    ];
    this.nextId=5;
  }

  add(contact:Contact){
    contact.id=++this.nextId;
    this.contacts.push(contact);
  }

  update(contact:Contact){
    var index = this.contacts.findIndex(c => c.id===contact.id);
    if(index){
      this.contacts[index]=contact;
    }
  }

  deleteById(id:number){
    var index = this.contacts.findIndex(c => c.id===id);
    if(index){
      this.contacts.splice(index,1);
    }
  }

  getById(id:number) : Contact | undefined{
    return this.contacts.find(c => c.id===id);    
  }

  getAll():Contact[] {
    return [...this.contacts];
  }
}
