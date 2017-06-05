import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {PageComponent} from './page.component';

@NgModule({
  imports:      [BrowserModule, FormsModule],
  declarations: [AppComponent, PageComponent],
  bootstrap:    [AppComponent]
})
export class AppModule {}
