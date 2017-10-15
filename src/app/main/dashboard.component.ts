import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';

import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/finally';

import {Page} from '../page';
import {PageService} from '../page.service';
import {GraphApiError} from '../graph-api-error';
import {AppUxService} from '../app-ux.service';
import {GraphApiErrorComponent} from '../graph-api-error.component';

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
        protected pageService: PageService,
        protected appUxService: AppUxService,
        protected matSnackBar: MatSnackBar) {}

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
                err => GraphApiErrorComponent.show(this.matSnackBar, err));
    }
}

