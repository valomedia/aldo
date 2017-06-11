import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PageComponent} from './page.component';
import {PagesComponent} from './pages.component';
import {PageService} from './page.service';
import {DashboardComponent} from './dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {FbService} from './fb.service';

/*
 * The Module definitions for AppComponent.
 */

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        PageComponent,
        PagesComponent,
        DashboardComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        PageService,
        FbService
    ]
})
export class AppModule {}

