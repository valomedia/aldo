import {Component, ApplicationRef, HostListener, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

import {FbService} from './fb.service';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <layout>
            <nav class='app-content' (scroll)='reDispatchEvent($event)'></nav>
            <aside class='app-content' (scroll)='reDispatchEvent($event)'>
                <router-outlet name='detail'></router-outlet>
            </aside>
            <main class='app-content' (scroll)='reDispatchEvent($event)'>
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
        private fbService: FbService) {}

    /*
     * Displayed in the main toolbar.
     */
    title = 'Aldo';

    ngOnInit() {
        this.router
            .events
            .filter((event) => event instanceof NavigationStart)
            .subscribe(this.fbService.clearCache);
    }

    /*
     * Take an already dispatched Event and dispatch a copy of it on window.
     *
     * This is used to redispatch scroll events from the main content, so 
     * browser chrome will hide correctly on mobile.
     */
    reDispatchEvent(
        event: Event & {
            constructor: new (typeArg: string, eventInit?: EventInit) => Event
        }
    ) {
        dispatchEvent(new event.constructor(event.type, event));
    }

    @HostListener('window:resize')
    onResize() { this.applicationRef.tick(); }
}

