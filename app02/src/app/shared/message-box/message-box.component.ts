import { Component } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent {

  constructor(public ms:MessagingService){
    
  }
}
