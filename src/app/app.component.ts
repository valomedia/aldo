import {Component, OnInit} from '@angular/core';

import {Page} from './page';
import {PageService} from './page.service';

/*
 * The Component showing Aldo.
 */

@Component({
    selector: 'app',
    template: `
    <h1>{{title}}</h1>
    <page [page]='page'></page>
    <div>
        <h2>Seiten</h2>
        <ul class='pages'>
            <li
                    *ngFor='let page of pages'
                    (click)='select(page)'
                    [class.selected]='selectedPage === page'>
                <span class='badge'>{{page.id}}</span>{{page.name}}
            </li>
        </ul>
    </div>
    `,
    providers: [PageService]
})
export class AppComponent implements OnInit {
    constructor(private pageService: PageService) {};
    ngOnInit(): void {
        this.pageService.pages().then((pages) => this.pages = pages);
    }
    title = 'Aldo';
    pages: Page[];
    selectedPage: Page;
    select(page: Page): void { this.selectedPage = page; }
}

