import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact.model'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {



  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<Contact[]> {
     return this.http.get<Contact[]>("https://localhost:7181" + '/api/Contact');
  }

  addContact(addContactRequest:any):Observable<Contact>{
   return this.http.post<Contact>("https://localhost:7181" + '/api/Contact', addContactRequest)

  }

  getContactById(id:number): Observable<Contact>{
   return  this.http.get<Contact>("https://localhost:7181" + '/api/Contact/' + id )
  }

  deleteContact(id:number): Observable<Contact>{
    return this.http.delete<Contact>("https://localhost:7181" + '/api/Contact/' + id )
  }

  updateContact(id:number, updateContactRequest:Contact): Observable<Contact>{
    return this.http.put<Contact>("https://localhost:7181" + '/api/Contact/' + id , updateContactRequest)
  }
}
