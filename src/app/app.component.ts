import {Component} from '@angular/core';

import {PageService} from './page.service';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <md-toolbar>{{title}}</md-toolbar>
        <div class='app-content'>
            <nav>
                <a routerLink='/dashboard'>Dashboard</a>
                <a routerLink='/pages'>Seiten</a>
            </nav>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
    title = 'Aldo';
}

