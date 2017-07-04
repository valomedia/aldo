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
        <h1>Dashboard</h1>
        <md-grid-list
                [cols]='cols()'
                [gutterSize]='gutterSize()'
                rowHeight='2:1'>
            <md-grid-tile *ngFor='let page of pages'>
                <a routerLink='/{{page.id}}'>{{page.name}}</a>
            </md-grid-tile>
        </md-grid-list>
        <graph-api-error [graphApiError]='graphApiError'></graph-api-error>
    `
})
export class DashboardComponent {
    constructor(private pageService: PageService) {}

    /*
     * All pages the user has access to.
     */
    pages: Page[] = [];

    /*
     * The error, if an error occurs.
     */
    graphApiError: GraphApiError;

    ngOnInit() {
        this.pageService
            .getPages()
            .toArray()
            .subscribe(
                pages => this.pages = pages,
                err => this.graphApiError = err);
    }

    cols() {
        if (window.innerWidth < 480) { return 1; }
        if (window.innerWidth < 840) { return 2; }
        return 3;
    }

    gutterSize() {
        return window.innerWidth < 960
            && window.innerHeight < 600
            || window.innerWidth < 600
            ? 16
            : 24;
    }
}

