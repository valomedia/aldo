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
        <div>
            <h2>Seiten</h2>
            <ul class='pages'>
                <a *ngFor='let page of pages' routerLink='/page/{{page.id}}'>
                    <li>
                        <span class='badge'>{{page.fan_count}}</span>
                        {{page.name}}
                    </li>
                </a>
            </ul>
        </div>
        <graph-api-error [graphApiError]='graphApiError'></graph-api-error>
    `
})
export class PagesComponent implements OnInit {
    constructor(private pageService: PageService) {};

    /*
     * All pages of the user.
     */
    pages: Page[];

    /*
     * The error, if an error occurs.
     */
    graphApiError: GraphApiError;

    ngOnInit(): void {
        this.pageService
            .getPages()
            .then(pages => this.pages = pages)
            .catch(err => this.graphApiError = new GraphApiError(err));
    }
}

