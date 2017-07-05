import {Component, ApplicationRef, HostListener} from '@angular/core';

import 'rxjs/add/operator/toArray';

import {AppUxService} from './app-ux.service';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <div [class.dark]='dark'>
            <md-sidenav-container>
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
                        [mode]='appUxService.asideMode()'>
                    <md-toolbar>
                        <button
                                md-button
                                class='app-icon-button back-btn'
                                (click)='aside.close()'>
                            <md-icon>arrow_back</md-icon>
                        </button>
                        <span class='app-toolbar-title'>Details</span>
                        <span class='app-toolbar-filler'></span>
                        <button
                                md-button
                                class='app-icon-button close-btn'
                                (click)='aside.close()'>
                            <md-icon>close</md-icon>
                        </button>
                    </md-toolbar>
                </md-sidenav>
                <md-toolbar>
                    <button
                            md-button
                            class='app-icon-button'
                            (click)='nav.open()'>
                        <md-icon>menu</md-icon>
                    </button>
                    <span class='app-toolbar-title'>{{title}}</span>
                    <span class='app-toolbar-filler'></span>
                    <button md-button class='app-icon-button' routerLink='/'>
                        <md-icon>dashboard</md-icon>
                    </button>
                    <button
                            md-button
                            class='app-icon-button'
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
                            (click)='aside.toggle()'>
                        <md-icon>more_vert</md-icon>
                    </button>
                </md-toolbar>
                <div class='app-content'>
                    <div>
                        <router-outlet></router-outlet>
                    </div>
                </div>
            </md-sidenav-container>
        </div>
    `
})
export class AppComponent {
    constructor(
        private applicationRef: ApplicationRef,
        private appUxService: AppUxService) {}

    /*
     * Displayed in the main toolbar.
     */
    title = 'Aldo';

    dark = false;

    @HostListener('window:resize')
    onResize() { this.applicationRef.tick(); }
}

