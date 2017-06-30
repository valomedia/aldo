import {Component} from '@angular/core';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <md-sidenav-container (window:resize)='setSidennavMode()'>
            <md-sidenav #nav id='nav' [mode]='sidenavMode'>
                <md-toolbar>
                    <button
                            md-button
                            class='app-icon-button back-btn'
                            (click)='nav.close()'>
                        <i class='material-icons'>arrow_back</i>
                    </button>
                    <span class='app-toolbar-title'>Seiten</span>
                    <span class='app-toolbar-filler'></span>
                    <button
                            md-button
                            class='app-icon-button close-btn'
                            (click)='nav.close()'>
                        <i class='material-icons'>close</i>
                    </button>
                </md-toolbar>
            </md-sidenav>
            <md-toolbar>
                <button
                        md-button
                        class='app-icon-button'
                        (click)='nav.toggle()'>
                    <i class='material-icons'>menu</i>
                </button>
                <span class='app-toolbar-title'>{{title}}</span>
                <span class='app-toolbar-filler'></span>
                <button
                        md-button
                        class='app-icon-button'
                        routerLink='/dashboard'>
                    <i class='material-icons'>dashboard</i>
                </button>
                <button md-button class='app-icon-button' routerLink='/pages'>
                    <i class='material-icons'>list</i>
                </button>
            </md-toolbar>
            <div class='app-content'>
                <router-outlet></router-outlet>
            </div>
        </md-sidenav-container>
    `
})
export class AppComponent {
    title = 'Aldo';
    sidenavMode: String;

    constructor() {
        this.setSidennavMode();
    }

    setSidennavMode() {
        this.sidenavMode = 'over';
        if (window.innerWidth >= 840) {
            this.sidenavMode = window.innerWidth >= 1264 ? 'side' : 'push';
        }
    }
}

