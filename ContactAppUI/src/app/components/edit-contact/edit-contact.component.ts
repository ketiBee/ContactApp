import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit{


  userForm!:FormGroup;
  contactId!:number;

  contactDetails: Contact = {
    id:0,
    firstname: '',
    lastname: '',
    number:[{
      contactNum:''
    }],
    email:[{
      contactEmail:''
    }],
    adress:'',
    tag:''

  }

  constructor(private route:ActivatedRoute, private contactService: ContactsService, private router: Router){

  }
  ngOnInit(): void {
    this.createFrom();



    this.route.paramMap.subscribe({
      next: (params) => {
        this.contactId = Number(params.get('id'));
        console.log(this.contactId);
        if(this.contactId){
          this.contactService.getContactById(this.contactId)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.editContact(res);
            }
          })

        }
      }
    })
  }

  get numbersControl(){
    return (this.userForm.get('numbers') as FormArray).controls;
  }

  get emailsControl(){
    return (this.userForm.get('emails') as FormArray).controls;
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

    addNumber(contactNum:string){
      const control=new FormControl(contactNum, [Validators.required]);
      (this.userForm.get('numbers') as FormArray).push(control);
    }

    addEmail(contactEmail:string){
      const control=new FormControl(contactEmail);
      (this.userForm.get('emails') as FormArray).push(control);
    }

    addMoreNum(){
      const control=new FormControl('', [Validators.required]);
      (this.userForm.get('numbers') as FormArray).push(control);
    }

    addMoreEmail(){
      const control=new FormControl('');
      (this.userForm.get('emails') as FormArray).push(control);
    }

    editContact(contact:Contact){

    contact.email.map(email => {
      console.log(email.contactEmail);
      this.addEmail(email.contactEmail);
    })

    contact.number.map(num => {
      console.log(num.contactNum);
      this.addNumber(num.contactNum);
    })

      this.userForm.patchValue({
        firstname: contact.firstname,
        lastname: contact.lastname,
        address: contact.adress,
        tag: contact.tag
      });

      console.log(this.userForm.value);




    }


    updateContact(){

      console.log(this.userForm.value);

      this.contactDetails.firstname=this.userForm.value.firstname;
      this.contactDetails.lastname=this.userForm.value.lastname;
      this.contactDetails.adress=this.userForm.value.address;
      this.contactDetails.tag=this.userForm.value.tag;
      this.contactDetails.number.pop();
      for(var num of this.userForm.value.numbers){
        this.contactDetails.number.push({contactNum:num})
      }
      this.contactDetails.email.pop();
      for(var em of this.userForm.value.emails){
        this.contactDetails.email.push({contactEmail:em})
      }

      console.log(this.contactDetails);

      this.contactService.updateContact(this.contactId, this.contactDetails)
      .subscribe({
        next: (response) =>{
          console.log(response);
          this.router.navigate(['']);
        },

        error: (res) => {
          console.log(res);
        }
      })
    }

}
