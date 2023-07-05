import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    AddContactComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
