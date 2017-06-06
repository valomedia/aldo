import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {PageComponent} from './page.component';
import {PagesComponent} from './pages.component';
import {PageService} from './page.service';
import {DashboardComponent} from './dashboard.component';
import {AppRoutingModule} from './app-routing.module';

/*
 * The Module definitions for AppComponent.
 */

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PageComponent,
        PagesComponent,
        DashboardComponent
    ],
    bootstrap: [AppComponent],
    providers: [PageService]
})
export class AppModule {}

