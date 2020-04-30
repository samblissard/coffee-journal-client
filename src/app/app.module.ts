import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './header/header.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { JournalEntryListComponent } from './journal-entry-list/journal-entry-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CoffeeListComponent,
    JournalEntryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
