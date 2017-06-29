import {Component} from '@angular/core';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <md-toolbar>
            {{title}}
            <span class='app-toolbar-filler'></span>
            <button md-button routerLink='/dashboard'>Dashboard</button>
            <button md-button routerLink='/pages'>Seiten</button>
        </md-toolbar>
        <div class='app-content'>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
    title = 'Aldo';
}

