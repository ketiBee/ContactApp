import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { Email } from 'src/app/models/email.model';
import { Num } from 'src/app/models/number.model';
import { ContactsService } from 'src/app/services/contacts.service';
import { DOCUMENT } from '@angular/common';
import { } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{


contacts: Contact[]=[];
filterCon: Contact[]=[];
allContacts: Contact[]=[];
conatctId!:number;
filterOption!:any;
optionList!:any;
contactList!:any;

searchValue!:string;

conNumbers:Num[]=[];
conEmails:Email[]=[];

constructor(private contactService: ContactsService, private router: Router,@Inject(DOCUMENT) private document: Document, private changeDetector: ChangeDetectorRef){}

  ngOnInit(): void {
    this.contactService.getAllContacts()
    .subscribe({
      next: (contact) => {


       this.contacts=contact;
       this.contacts.sort(function(a, b) {
         return a.firstname.localeCompare(b.firstname);
       })
       this.allContacts=contact;
        console.log(this.contacts);

        this.contacts.map(elem => {
          console.log(elem.number);
        })



        },


      error: (response) => {
        console.log(response);
      }
    })
  }

  onClick(){
    this.router.navigate(['/addContact']);
  }

  onEdit(id:number){
    this.router.navigate(['/editContact', id]);
  }

  onDelete(id:number){
    this.contactService.deleteContact(id)
    .subscribe({
      next:(response) => {
        console.log(response);
        this.document.location.reload();
      }
    })
  }

  onSelect(option:any){
    console.log(option);
    this.filterOption=option;

    if(option)
    {
      this.contacts=this.contacts.filter(con => con.tag === option)
      this.changeDetector.markForCheck();
    }



  }


onSearch(){
  console.log(this.searchValue);
  if(this.searchValue)
  {
    this.contacts=this.contacts.filter(con => con.firstname === this.searchValue || con.lastname === this.searchValue || con.tag === this.searchValue)
    this.changeDetector.markForCheck();
  }
}
  ngOnDestroy(){

  }
}
