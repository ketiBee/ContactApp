import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';
import { Num } from 'src/app/models/number.model';
import { Email } from 'src/app/models/email.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, convertToParamMap } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

userForm!:FormGroup;

addContactRequest: Contact = {
  id:0,
 firstname: '',
  lastname: '',
  number: [{
    contactNum:''
  }],
  email: [{
    contactEmail:''
  }],
  adress:'',
  tag:''
}


constructor(private contactService: ContactsService, private router:Router){
}

get numbersControl(){
  return (this.userForm.get('numbers') as FormArray).controls;
}

get emailsControl(){
  return (this.userForm.get('emails') as FormArray).controls;
}

  ngOnInit(): void {
    this.createFrom();

  }

  createFrom(){
    this.userForm=new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      tag: new FormControl(''),
      numbers: new FormArray([]),
      emails: new FormArray([])
    })
  }

  addNumber(){
    const control=new FormControl('', [Validators.required]);
    (this.userForm.get('numbers') as FormArray).push(control);
  }

  addEmail(){
    const control=new FormControl('');
    (this.userForm.get('emails') as FormArray).push(control);
  }


  addContact(){

    console.log(this.userForm.value);
    this.addContactRequest.firstname=this.userForm.value.firstname;
    this.addContactRequest.lastname=this.userForm.value.lastname;
    this.addContactRequest.adress=this.userForm.value.address;
    this.addContactRequest.tag=this.userForm.value.tag;
    this.addContactRequest.number.pop();
    for(var num of this.userForm.value.numbers){
      this.addContactRequest.number.push({contactNum:num})
    }
    this.addContactRequest.email.pop();
    for(var em of this.userForm.value.emails){
      this.addContactRequest.email.push({contactEmail:em})
    }
    console.log(this.addContactRequest);

    this.contactService.addContact(this.addContactRequest)
    .subscribe({
      next: (contact) => {
        console.log(contact);
        this.router.navigate(['']);

      },
      error: (response) => {
        console.log(response);
      }
    })
  }


}
