import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { Store } from '@ngrx/store';
import { ContactActions } from '../../state/contacts.actions';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  contactForm:FormGroup;

  constructor(private store:Store,private formBuilder:FormBuilder){
    this.contactForm = formBuilder.group({
      id:[0],
      fullName:['',[Validators.required]],
      mobile:['',[Validators.required,Validators.pattern("[1-9][0-9]{9}")]],
      mailId:['',[Validators.required,Validators.email]] 
    });
  }

  get fullName(){
    return this.contactForm.get('fullName');
  }
  
  get mobile(){
    return this.contactForm.get('mobile');
  }
  get mailId(){
    return this.contactForm.get('mailId');
  }

  formSubmitted(){
    this.store.dispatch(ContactActions.add(this.contactForm.value));
    this.contactForm.reset({id:0,fullName:'',mobile:'',mailId:''});
  }
}
