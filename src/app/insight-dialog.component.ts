import {Component, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {Observable} from 'rxjs/Observable';

import {Page} from './page';
import {Insight} from './insight';

/*
 * The MatDialog showing the insights for a page.
 */

@Component({
    selector: 'insight-dialog',
    templateUrl: './_insight-dialog.component.html',
    styleUrls: ['./insight-dialog.component.css']
})
export class InsightDialogComponent {
    constructor(protected matDialogRef: MatDialogRef<Observable<string>>) {}

    protected _page?: Page;

    insight?: Insight;

    @Input()
    set page(page: Page|null) {
        if (page) {
            this._page = page;
            page.insights.subscribe(insight => this.insight = insight);
        }
    }
    get page() {
        return this._page;
    }
}

