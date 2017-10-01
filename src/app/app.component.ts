import {Component, ApplicationRef, HostListener} from '@angular/core';

import 'rxjs/add/operator/mergeScan';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {FbService} from './fb.service';
import {AppRoutingService} from './app-routing.service';
import {AppService} from './app.service';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    templateUrl: './_app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        protected applicationRef: ApplicationRef,
        protected fbService: FbService,
        protected appRoutingService: AppRoutingService,
        protected appService: AppService) {}

    /*
     * Displayed in the main toolbar.
     */
    title = 'Aldo';

    @HostListener('window:resize')
    onResize() {
        this.applicationRef.tick();
    }
}

