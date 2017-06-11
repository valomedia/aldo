import {Component, OnInit} from '@angular/core';

import {Page} from './page';
import {PageService} from './page.service';

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
    `
})
export class PagesComponent implements OnInit {
    constructor(private pageService: PageService) {};

    pages: Page[];
    selectedPage: Page;

    ngOnInit(): void {
        this.pageService.getPages().then((pages) => this.pages = pages);
    }
    select(page: Page): void { this.selectedPage = page; }
}

