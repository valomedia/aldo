import {Component, ApplicationRef, HostListener, OnInit} from '@angular/core';

import 'rxjs/add/operator/mergeScan';
import {Observable} from 'rxjs/Observable';

import {FbService} from './fb.service';
import {AppRoutingService} from './app-routing.service';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <router-outlet></router-outlet>
    `,
    styleUrls: ['dist/app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        private applicationRef: ApplicationRef,
        private fbService: FbService,
        private appRoutingService: AppRoutingService) {}

    /*
     * Displayed in the main toolbar.
     */
    title = 'Aldo';

    ngOnInit() {
        this.appRoutingService
            .events
            .map(params => Object.keys(params).map(k => params[k]))
            .mergeScan(
                ([_, last], next) => Observable.of([last, next]),
                [[],[]],
                1)
            .map(([last, next]) => last.filter(i => next.indexOf(i) + 1))
            .do(console.warn)
            .subscribe(ids => this.fbService.clearCache(ids));
    }

    @HostListener('window:resize')
    onResize() {
        this.applicationRef.tick();
    }
}

