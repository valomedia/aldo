import {Component} from '@angular/core';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <md-toolbar>
            <button md-button class='app-icon-button'>
                <i class='material-icons'>menu</i>
            </button>
            <span class='app-title'>{{title}}</span>
            <span class='app-toolbar-filler'></span>
            <button md-button class='app-icon-button' routerLink='/dashboard'>
                <i class='material-icons'>dashboard</i>
            </button>
            <button md-button class='app-icon-button' routerLink='/pages'>
                <i class='material-icons'>list</i>
            </button>
        </md-toolbar>
        <div class='app-content'>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
    title = 'Aldo';
}

