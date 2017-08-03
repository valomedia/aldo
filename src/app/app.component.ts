import {Component, ApplicationRef, HostListener, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

import {FbService} from './fb.service';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <div [class.dark]='dark'>
            <layout>
                <nav></nav>
                <aside></aside>
            </layout>
        </div>
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

    /*
     * Whether the dark-theme is active.
     */
    dark = false;

    ngOnInit() {
        this.router
            .events
            .filter((event) => event instanceof NavigationStart)
            .subscribe(this.fbService.clearCache);
    }

    @HostListener('window:resize')
    onResize() { this.applicationRef.tick(); }
}

