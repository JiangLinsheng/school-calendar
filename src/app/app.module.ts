import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { ScCalComponent } from './components/sc-cal/sc-cal.component';

@NgModule({
  declarations: [
    AppComponent,
    ScCalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
