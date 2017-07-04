import {Component, OnInit} from '@angular/core';

import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';
import {AppUxService} from './app-ux.service';

/*
 * The Component showing the dashboard.
 */

@Component({
    selector: 'dashboard',
    template: `
        <h1>Dashboard</h1>
        <md-grid-list
                [cols]='appUxService.cols() / 4'
                [gutterSize]='appUxService.gutterSize()'
                rowHeight='2:1'>
            <md-grid-tile *ngFor='let page of pages'>
                <a routerLink='/{{page.id}}'>{{page.name}}</a>
            </md-grid-tile>
        </md-grid-list>
        <graph-api-error [graphApiError]='graphApiError'></graph-api-error>
    `
})
export class DashboardComponent {
    constructor(
        private pageService: PageService,
        private appUxService: AppUxService) {}

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
}

