import {Component, ApplicationRef, HostListener} from '@angular/core';
import {Location} from '@angular/common';

import 'rxjs/add/operator/toArray';

import {AppUxService} from './app-ux.service';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <div [class.dark]='dark'>
            <md-sidenav-container id='main'>
                <md-sidenav #nav id='nav' mode='over'>
                    <md-toolbar>
                        <span class='app-toolbar-title'>Seiten</span>
                    </md-toolbar>
                    <pages (click)='nav.close()'></pages>
                </md-sidenav>
                <md-sidenav
                        #aside
                        align='end'
                        id='aside'
                        [mode]='appUxService.asideMode'>
                    <md-toolbar>
                        <button
                                md-button
                                class='app-icon-button back-btn'
                                mdTooltip="Zurück"
                                mdTooltipShowDelay='1500'
                                mdTooltipHideDelay='1500'
                                (click)='aside.close()'>
                            <md-icon>arrow_back</md-icon>
                        </button>
                        <span class='app-toolbar-title'>Details</span>
                        <span class='app-toolbar-filler'></span>
                        <button
                                md-button
                                class='app-icon-button close-btn'
                                mdTooltip="Schließen"
                                mdTooltipShowDelay='1500'
                                mdTooltipHideDelay='1500'
                                (click)='aside.close()'>
                            <md-icon>close</md-icon>
                        </button>
                    </md-toolbar>
                </md-sidenav>
                <md-toolbar>
                    <button
                            md-button
                            class='app-icon-button'
                            mdTooltip="Menü"
                            mdTooltipShowDelay='1500'
                            mdTooltipHideDelay='1500'
                            (click)='nav.open()'>
                        <md-icon>menu</md-icon>
                    </button>
                    <span class='app-toolbar-title'>{{title}}</span>
                    <span class='app-toolbar-filler'></span>
                    <button
                            md-button
                            class='app-icon-button'
                            mdTooltip="Dashboard"
                            mdTooltipShowDelay='1500'
                            mdTooltipHideDelay='1500'
                            routerLink='/'>
                        <md-icon>dashboard</md-icon>
                    </button>
                    <a
                            md-button
                            class='button app-icon-button'
                            mdTooltip="Facebook"
                            mdTooltipShowDelay='1500'
                            mdTooltipHideDelay='1500'
                            href='//facebook.com{{location.path()}}'
                            target='_blank'>
                        <md-icon>open_in_browser</md-icon>
                    </a>
                    <button
                            md-button
                            class='app-icon-button'
                            mdTooltip="Einstellungen"
                            mdTooltipShowDelay='1500'
                            mdTooltipHideDelay='1500'
                            [mdMenuTriggerFor]='settings'>
                        <md-icon>settings</md-icon>
                    </button>
                    <md-menu #settings='mdMenu'>
                        <div md-menu-item>
                            <md-slide-toggle [(ngModel)]='dark'>
                                Dark mode
                                <md-icon>invert_colors</md-icon>
                            </md-slide-toggle>
                        </div>
                    </md-menu>
                    <button
                            md-button
                            class='app-icon-button'
                            mdTooltip="Details"
                            mdTooltipShowDelay='1500'
                            mdTooltipHideDelay='1500'
                            (click)='aside.toggle()'>
                        <md-icon>more_vert</md-icon>
                    </button>
                </md-toolbar>
                <div id='displacer-target'></div>
                <div class='app-content' (scroll)='reDispatchEvent($event)'>
                    <div>
                        <router-outlet></router-outlet>
                    </div>
                </div>
            </md-sidenav-container>
        </div>
    `,
    styleUrls: ['dist/app.component.css']
})
export class AppComponent {
    constructor(
        private applicationRef: ApplicationRef,
        private appUxService: AppUxService,
        private location: Location) {}

    /*
     * Displayed in the main toolbar.
     */
    title = 'Aldo';

    /*
     * Whether the dark-theme is active.
     */
    dark = false;

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

    @HostListener('window:scroll')
    onScroll() { }
}

