import {Component, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';

import 'rxjs/add/operator/finally';

import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';
import {GraphApiErrorComponent} from './graph-api-error.component';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'pages',
    templateUrl: './_pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
    constructor(
        protected pageService: PageService,
        protected mdSnackBar: MdSnackBar) {};

    loaded = false;

    /*
     * All pages of the user.
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
                err => GraphApiErrorComponent.show(this.mdSnackBar, err));
    }
}

