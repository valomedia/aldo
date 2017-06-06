import {Component} from '@angular/core';

import {PageService} from './page.service';

/*
 * The main Component of Aldo.
 */

@Component({
    selector: 'app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a routerLink='/dashboard'>Dashboard</a>
            <a routerLink='/pages'>Seiten</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    title = 'Aldo';
}

