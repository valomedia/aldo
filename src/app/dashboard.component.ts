import {Component, OnInit} from '@angular/core';

import {Page} from './page';
import {PageService} from './page.service';

/*
 * The Component showing the dashboard.
 */

@Component({
    selector: 'dashboard',
    template: `
        <h2>Dashboard</h2>
        <h3>Deine Seiten mit den meisten Likes</h3>
        <div class='grid grid-pad'>
            <a
                    *ngFor='let page of pages'
                    routerLink='/page/{{page.id}}'
                    class='col-1-4'>
                <div class='module page'>
                    <h4>{{page.name}}</h4>
                </div>
            </a>
        </div>
    `
})
export class DashboardComponent {
    constructor(private pageService: PageService) {}

    pages: Page[];

    ngOnInit(): void {
        this.pageService.getPages().then(pages => this.pages = pages.slice(0, 4));
    }
}

