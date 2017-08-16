import {Component, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';

import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/finally';

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
    templateUrl: './_dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(
        private pageService: PageService,
        private appUxService: AppUxService,
        private mdSnackBar: MdSnackBar) {}

    loaded = false;

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
            .finally(() => this.loaded = true)
            .subscribe(
                pages => this.pages = pages,
                err => showGraphApiError(this.mdSnackBar, err));
    }
}

