import {Component, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';

import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';
import {AppUxService} from './app-ux.service';
import {showGraphApiError} from './graph-api-error.component';

/*
 * The Component showing the dashboard.
 */

@Component({
    selector: 'dashboard',
    template: `
        <h1>Dashboard</h1>
        <md-spinner color='accent' *ngIf='!pages && !graphApiError'>
        </md-spinner>
        <md-grid-list
                [cols]='appUxService.cols / 3 | ceil'
                [gutterSize]='appUxService.gutterSize'
                rowHeight='2:1'>
            <md-grid-tile
                    *ngFor='let page of pages'
                    routerLink='/{{page.id}}'>
                {{page.name}}
            </md-grid-tile>
        </md-grid-list>
    `,
    styleUrls: ['dist/dashboard.component.css']
})
export class DashboardComponent {
    constructor(
        private pageService: PageService,
        private appUxService: AppUxService,
        private mdSnackBar: MdSnackBar) {}

    /*
     * All pages the user has access to.
     */
    pages: Page[];

    /*
     * The error that occured, if any.
     */
    graphApiError: GraphApiError;

    ngOnInit() {
        this.pageService
            .pages()
            .toArray()
            .subscribe(
                pages => this.pages = pages,
                err =>
                    this.graphApiError
                        = showGraphApiError(this.mdSnackBar, err));
    }
}

