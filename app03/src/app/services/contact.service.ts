import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  private api : string;

  constructor(private httpClient:HttpClient) { 
    this.api = environment.api;
  }

  getAll() : Observable<Contact[]>{
    return this.httpClient.get<Contact[]>(this.api);
  }
  
  getById(id:number) : Observable<Contact>{
    return this.httpClient.get<Contact>(this.api + "/" + id);
  }

  deleteById(id:number) : Observable<void>{
    return this.httpClient.delete<void>(this.api + "/" + id);
  }

  addContact(contact:Contact):Observable<Contact>{
    return this.httpClient.post<Contact>(this.api,contact);
  }
  
  updateContact(contact:Contact):Observable<Contact>{
    return this.httpClient.put<Contact>(this.api + "/" + contact.id,contact);
  }
}
