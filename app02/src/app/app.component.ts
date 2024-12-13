import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { environment } from '../environments/environment';
import { Link } from './models/link';
import { MessageBoxComponent } from './shared/message-box/message-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, MessageBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string;

  links:Link[];

  constructor(){
    this.title=environment.apptitle;

    this.links=[
      {label:"Contacts",target:"/contactsList"},
      {label:"New Contact",target:"/addContact"}
    ];
  }
}
