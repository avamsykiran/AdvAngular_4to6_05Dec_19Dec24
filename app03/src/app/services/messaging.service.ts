import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  messages: WritableSignal<string[]>;

  constructor() {
    this.messages = signal([]);
  }

  clear(){
    this.messages.set([]);
  }

  add(msg:string){
    this.messages.update( msgs => [...msgs,msg] );
  }

  delete(msg:string){
    this.messages.update( msgs => msgs.filter( m => m!=msg ) );
  }
}
