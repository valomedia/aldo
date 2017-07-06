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
        <md-spinner color='accent' *ngIf='!pages && !graphApiError'>
        </md-spinner>
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
    `,
    styleUrls: ['dist/pages.component.css']
})
export class PagesComponent implements OnInit {
    constructor(
        private pageService: PageService,
        private mdSnackBar: MdSnackBar) {};

    /*
     * All pages of the user.
     */
    pages: Page[];

    ngOnInit() {
        this.pageService
            .getPages()
            .toArray()
            .subscribe(
                pages => this.pages = pages,
                err => showGraphApiError(this.mdSnackBar, err));
    }
}

