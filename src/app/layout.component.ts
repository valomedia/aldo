import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MdSidenav} from '@angular/material';
import {Location} from '@angular/common';

import 'rxjs/add/operator/pluck';

import {AppUxService} from './app-ux.service';
import {FbService} from './fb.service';
import {AppRoutingService} from './app-routing.service';

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
                        (close)='appRoutingService.params = {post: null}'>
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
                                class='app-icon-button'
                                mdTooltip="Neu laden"
                                mdTooltipShowDelay='1500'
                                mdTooltipHideDelay='1500'
                                (click)='refresh()'>
                            <md-icon>refresh</md-icon>
                        </button>
                        <a
                                md-button
                                class='button app-icon-button'
                                mdTooltip="Facebook"
                                mdTooltipShowDelay='1500'
                                mdTooltipHideDelay='1500'
                                href='//facebook.com/{{params.post}}'
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
                            *ngIf='params.page'
                            md-button
                            class='app-icon-button'
                            mdTooltip="Neu laden"
                            mdTooltipShowDelay='1500'
                            mdTooltipHideDelay='1500'
                            (click)='refresh()'>
                        <md-icon>refresh</md-icon>
                    </button>
                    <button
                            md-button
                            class='app-icon-button'
                            mdTooltip="Dashboard"
                            mdTooltipShowDelay='1500'
                            mdTooltipHideDelay='1500'
                            [appLink]='{page: null}'>
                        <md-icon>dashboard</md-icon>
                    </button>
                    <a
                            md-button
                            class='button app-icon-button'
                            mdTooltip="Facebook"
                            mdTooltipShowDelay='1500'
                            mdTooltipHideDelay='1500'
                            href='//facebook.com/{{params.page}}'
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
                <router-outlet></router-outlet>
            </md-sidenav-container>
        </div>
    `,
    styleUrls: ['dist/layout.component.css']
})
export class LayoutComponent implements OnInit {
    constructor(
        private appUxService: AppUxService,
        private title: Title,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fbService: FbService,
        private location: Location,
        private appRoutingService: AppRoutingService) {}

    /*
     * The route parameters.
     */
    private params: Params = {};

    /*
     * Whether the dark-theme is active.
     */
    dark = false;

    /*
     * Refresh the view.
     */
    refresh() {
        this.fbService.clearCache();
        const path = this.location.path();
        this.router.navigateByUrl('/');
        setTimeout(() => this.router.navigateByUrl(path));
    }

    @ViewChild('aside')
    aside: MdSidenav;

    ngOnInit() {
        this.appRoutingService
            .events
            .filter(Boolean)
            .do(params => params.post && setTimeout(() => this.aside.open()))
            .subscribe(params => this.params = params);
    }
}
