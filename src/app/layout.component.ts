import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';

import {AppUxService} from './app-ux.service';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'layout',
    template: `
        <md-sidenav-container id='main'>
            <md-sidenav #nav id='nav' mode='over'>
                <md-toolbar>
                    <span class='app-toolbar-title'>Seiten</span>
                </md-toolbar>
                <ng-content select='nav' (click)='nav.close'></ng-content>
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
                <span class='app-toolbar-title'>{{title.getTitle()}}</span>
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
    `,
    styleUrls: ['dist/layout.component.css']
})
export class LayoutComponent {
    constructor(
        private appUxService: AppUxService,
        private location: Location,
        private title: Title) {}

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
}

