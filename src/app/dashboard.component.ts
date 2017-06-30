import {Component, OnInit} from '@angular/core';

import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';

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
                    *ngFor='let page of biggestPages'
                    routerLink='/{{page.id}}'
                    class='col-1-4'>
                <div class='module page'>
                    <h4>{{page.name}}</h4>
                </div>
            </a>
        </div>
        <graph-api-error [graphApiError]='graphApiError'></graph-api-error>
    `
})
export class DashboardComponent {
    constructor(private pageService: PageService) {}

    /*
     * The four pages with the most likes.
     */
    biggestPages: Page[] = [];

    /*
     * The error, if an error occurs.
     */
    graphApiError: GraphApiError;

    ngOnInit() {
        this.pageService
            .getPages()
            .subscribe(
                page => this.biggestPages = this.biggestPages
                    .concat([page])
                    .sort((a,b) => b.fan_count - a.fan_count)
                    .slice(0, 4),
                err => this.graphApiError = err);
    }
}

