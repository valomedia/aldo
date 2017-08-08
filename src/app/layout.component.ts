import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd} from '@angular/router';
import {MdSidenav} from '@angular/material';
import {Location} from '@angular/common';

import 'rxjs/add/operator/pluck';

import {AppUxService} from './app-ux.service';

/*
 * The Component containing the layout everything else goes into.
 */

@Component({
    selector: 'layout',
    template: `
        <div [class.dark]='dark'>
            <md-sidenav-container id='main'>
                <md-sidenav #nav id='nav' mode='over'>
                    <md-toolbar>
                        <span class='app-toolbar-title'>Seiten</span>
                    </md-toolbar>
                    <div (click)='nav.close()'>
                        <ng-content select='nav'></ng-content>
                    </div>
                </md-sidenav>
                <md-sidenav
                        #aside
                        align='end'
                        id='aside'
                        [mode]='appUxService.asideMode'
                        (close)='router.navigateByUrl(page)'>
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
                        <a
                                md-button
                                class='button app-icon-button'
                                mdTooltip="Facebook"
                                mdTooltipShowDelay='1500'
                                mdTooltipHideDelay='1500'
                                href='//facebook.com/{{post}}'
                                target='_blank'>
                            <md-icon>open_in_browser</md-icon>
                        </a>
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
                    <ng-content select='aside'></ng-content>
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
                            href='//facebook.com/{{page}}'
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
                </md-toolbar>
                <div id='displacer-target'></div>
                <ng-content select='main'></ng-content>
            </md-sidenav-container>
        </div>
    `,
    styleUrls: ['dist/layout.component.css']
})
export class LayoutComponent implements OnInit {
    constructor(
        private appUxService: AppUxService,
        private title: Title,
        private router: Router,
        private location: Location) {}

    @ViewChild('aside')
    private aside: MdSidenav;

    /*
     * Whether the dark-theme is active.
     */
    dark = false;

    /*
     * The id of the page the user has open, or empty string.
     */
    page = '';

    /*
     * The id of the post the user has open, or empty string.
     */
    post = '';

    ngOnInit() {
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.location.path().split('/').slice(1))
            .do(path => path[1] ? this.aside.open() : this.aside.close())
            .subscribe(path => {
                this.page = path[0] || '';
                this.post = path[1] ? this.page + '_' + path[1] : '';
            });
    }
}
