import {Component, OnInit} from '@angular/core';

import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'pages',
    template: `
        <nav>
            <md-nav-list>
                <a
                        md-list-item
                        *ngFor='let page of pages'
                        routerLink='/{{page.id}}'>
                    {{page.name}}
                </a>
            </md-nav-list>
        </nav>
        <graph-api-error [graphApiError]='graphApiError'></graph-api-error>
    `
})
export class PagesComponent implements OnInit {
    constructor(private pageService: PageService) {};

    /*
     * All pages of the user.
     */
    pages: Page[] = [];

    /*
     * The error, if an error occurs.
     */
    graphApiError: GraphApiError;

    ngOnInit() {
        this.pageService
            .getPages()
            .subscribe(
                page => this.pages.push(page),
                err => this.graphApiError = err);
    }
}

