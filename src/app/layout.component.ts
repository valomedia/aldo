import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MdSidenav} from '@angular/material';

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
                    <nav app-content (click)='nav.close()'></nav>
                </md-sidenav>
                <md-sidenav
                        #aside
                        align='end'
                        id='aside'
                        [mode]='appUxService.asideMode'
                        (close)='goUp()'>
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
                    <aside app-content>
                        <router-outlet name='detail'></router-outlet>
                    </aside>
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
                <main app-content>
                    <router-outlet></router-outlet>
                </main>
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
        private router: Router) {}

    /*
     * The route parameters.
     */
    private params: Params = {};

    /*
     * Whether the dark-theme is active.
     */
    dark = false;

    /*
     * Navigate one level up.
     */
    goUp() {
        this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    }

    @ViewChild('aside')
    aside: MdSidenav;

    ngOnInit() {
        this.activatedRoute
            .params
            .do(params => params.post && setTimeout(() => this.aside.open()))
            .subscribe(params => this.params = params);
    }
}
