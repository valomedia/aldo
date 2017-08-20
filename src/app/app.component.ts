import {Component, ApplicationRef, HostListener, OnInit} from '@angular/core';

import 'rxjs/add/operator/mergeScan';
import {Observable} from 'rxjs/Observable';

import {FbService} from './fb.service';
import {AppRoutingService} from './app-routing.service';
import {PAGE, POST} from './app';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <layout>
            <nav app-content></nav>
            <aside app-content>
                <post *appRouting='POST'></post>
                <no-detail *appRouting></no-detail>
            </aside>
            <main app-content>
                <dashboard *appRouting='null; conflicts:PAGE'></dashboard>
                <page *appRouting='PAGE'></page>
                <not-found *appRouting></not-found>
            </main>
        </layout>
    `,
    styleUrls: ['dist/app.component.css']
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

