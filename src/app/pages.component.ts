import {Component, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';

import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'pages',
    template: `
        <md-spinner color='accent' *ngIf='!loaded'></md-spinner>
        <md-nav-list>
            <a
                    md-list-item
                    *ngFor='let page of pages'
                    routerLink='/{{page.id}}'>
                {{page.name}}
            </a>
        </md-nav-list>
    `,
    styleUrls: ['dist/pages.component.css']
})
export class PagesComponent implements OnInit {
    constructor(
        private pageService: PageService,
        private mdSnackBar: MdSnackBar) {};

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
                err => showGraphApiError(this.mdSnackBar, err));
    }
}

