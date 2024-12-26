import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactsStore } from '../../services/contact.store';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  contactForm:FormGroup;

  cs = inject(ContactsStore); 

  @Input("id")
  idPathParam?:string;

  constructor(private contactService:ContactService,private formBuilder:FormBuilder){
    this.contactForm = formBuilder.group({
      id:[0],
      fullName:['',[Validators.required]],
      mobile:['',[Validators.required,Validators.pattern("[1-9][0-9]{9}")]],
      mailId:['',[Validators.required,Validators.email]] 
    });
  }

  ngOnInit(){
    if(this.idPathParam){
      this.cs.selectContactId(Number(this.idPathParam));
      this.contactForm.reset({...this.cs.selectedContact()});
    }
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
    if(this.idPathParam){
      this.cs.update(this.contactForm.value);
    }else{
      this.cs.add(this.contactForm.value).then(
        () => {
          this.contactForm.reset({id:0,fullName:'',mobile:'',mailId:''});
        }
      );
    }    
  }
}
