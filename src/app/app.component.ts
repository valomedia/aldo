import {Component, ApplicationRef, HostListener, OnInit} from '@angular/core';

import 'rxjs/add/operator/mergeScan';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {FbService} from './fb.service';
import {AppRoutingService} from './app-routing.service';
import {PAGE, POST} from './app';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    templateUrl: './_app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        private applicationRef: ApplicationRef,
        private fbService: FbService,
        private appRoutingService: AppRoutingService) {}

    private PAGE = PAGE;
    private POST = POST;

    /*
     * Displayed in the main toolbar.
     */
    title = 'Aldo';

    ngOnInit() {
        this.appRoutingService
            .events
            .filter(Boolean)
            .map(params => Object.keys(params).map(k => params[k]))
            .mergeScan(
                ([_, last], next) => Observable.of([last, next]),
                [[],[]],
                1)
            .map(([last, next]) => last.filter(i => next.indexOf(i) + 1))
            .subscribe(ids => this.fbService.clearCache(ids));
    }

    @HostListener('window:resize')
    onResize() {
        this.applicationRef.tick();
    }
}

