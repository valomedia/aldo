import {Component, ApplicationRef, HostListener} from '@angular/core';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <md-sidenav-container>
            <md-sidenav #nav id='nav' mode='over'>
                <md-toolbar>
                    <span class='app-toolbar-title'>Seiten</span>
                </md-toolbar>
                <div class='pad'>
                    <pages (click)='nav.close()'></pages>
                </div>
            </md-sidenav>
            <md-sidenav #aside align='end' id='aside' [mode]='asideMode()'>
                <md-toolbar>
                    <button
                            md-button
                            class='app-icon-button back-btn'
                            (click)='aside.close()'>
                        <i class='material-icons'>arrow_back</i>
                    </button>
                    <span class='app-toolbar-title'>Details</span>
                    <span class='app-toolbar-filler'></span>
                    <button
                            md-button
                            class='app-icon-button close-btn'
                            (click)='aside.close()'>
                        <i class='material-icons'>close</i>
                    </button>
                </md-toolbar>
            </md-sidenav>
            <md-toolbar>
                <button
                        md-button
                        class='app-icon-button'
                        (click)='nav.open()'>
                    <i class='material-icons'>menu</i>
                </button>
                <span class='app-toolbar-title pad'>{{title}}</span>
                <span class='app-toolbar-filler'></span>
                <button md-button class='app-icon-button' routerLink='/'>
                    <i class='material-icons'>dashboard</i>
                </button>
                <button
                        md-button
                        class='app-icon-button'
                        (click)='aside.toggle()'>
                    <i class='material-icons'>more_vert</i>
                </button>
            </md-toolbar>
            <div class='app-content pad'>
                <router-outlet></router-outlet>
            </div>
        </md-sidenav-container>
    `
})
export class AppComponent {
    constructor(private applicationRef: ApplicationRef) {}

    /*
     * Displayed in the main toolbar.
     */
    title = 'Aldo';

    /*
     * Calculates whether the aside will show as sidebar.
     */
    asideMode() { return window.innerWidth >= 1264 ? 'side' : 'push'; }

    @HostListener('window:resize')
    onResize() {
        this.applicationRef.tick();
    }
}

