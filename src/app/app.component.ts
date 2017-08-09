import {Component, ApplicationRef, HostListener, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/mergeScan';
import {Observable} from 'rxjs/Observable';

import {FbService} from './fb.service';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <layout>
            <nav app-content></nav>
            <aside app-content>
                <router-outlet name='detail'></router-outlet>
            </aside>
            <main app-content>
                <router-outlet></router-outlet>
            </main>
        </layout>
    `,
    styleUrls: ['dist/app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        private applicationRef: ApplicationRef,
        private router: Router,
        private fbService: FbService,
        private location: Location) {}

    /*
     * Displayed in the main toolbar.
     */
    title = 'Aldo';

    ngOnInit() {
        this.router
            .events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.location.path().split('/').slice(1))
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

